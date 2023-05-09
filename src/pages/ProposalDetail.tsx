import React, { useEffect } from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { useParams } from 'react-router-dom';
import {
  ApiCanonicalField,
  ApiProposal,
  useCanonicalFields,
  useProposal,
  useProposals,
} from '../pdc-api';
import { mapProposals } from '../map-proposals';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { ProposalDetailPanel } from '../components/ProposalDetailPanel';
import { ProposalListGridPanel } from '../components/ProposalListGridPanel';

interface ProposalListGridLoaderProps {
  canonicalFields: ApiCanonicalField[] | null;
}

const ProposalListGridLoader = (
  { canonicalFields }: ProposalListGridLoaderProps,
) => {
  const proposals = useProposals('1', '1000');

  if (canonicalFields === null || proposals === null) {
    return (
      <div>Loading data...</div>
    );
  }

  return (
    <PanelGridItem>
      <ProposalListGridPanel
        proposals={mapProposals(canonicalFields, proposals.entries)}
      />
    </PanelGridItem>
  );
};

const getValueOfCanonicalField = (
  canonicalFields: ApiCanonicalField[],
  proposal: ApiProposal,
  canonicalFieldShortCode: string,
) => {
  const field = canonicalFields.find(({ shortCode }) => (
    shortCode === canonicalFieldShortCode
  ));
  if (field === undefined) {
    return undefined;
  }
  const fieldValue = proposal.versions[0]?.fieldValues.find(({ applicationFormField }) => (
    applicationFormField.canonicalFieldId === field.id
  ));
  return fieldValue?.value ?? undefined;
};

const mapCanonicalFields = (
  canonicalFields: ApiCanonicalField[],
  proposal: ApiProposal,
) => (
  (proposal.versions[0]?.fieldValues ?? []).map(({ applicationFormField, value }) => {
    const canonicalField = canonicalFields.find(({ id }) => (
      id === applicationFormField.canonicalFieldId
    ));
    return {
      shortCode: canonicalField?.shortCode ?? 'missing',
      fieldName: canonicalField?.label ?? 'missing',
      position: applicationFormField.position,
      value,
    };
  })
);

const getApplicant = (
  canonicalFields: ApiCanonicalField[],
  proposal: ApiProposal,
) => (
  getValueOfCanonicalField(canonicalFields, proposal, 'organization_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'organization_dba_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'organization_legal_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'proposal_primary_contact_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'proposal_submitter_name')
    ?? 'Unknown Applicant'
);

interface ProposalDetailPanelLoaderProps {
  canonicalFields: ApiCanonicalField[] | null;
}

const ProposalDetailPanelLoader = (
  { canonicalFields }: ProposalDetailPanelLoaderProps,
) => {
  const params = useParams();
  const proposalId = params.proposalId ?? 'missing';
  const proposal = useProposal(proposalId);

  useEffect(() => {
    if (canonicalFields === null || proposal === null) {
      document.title = 'Proposal Detail - Philanthropy Data Commons';
    } else {
      const applicant = getApplicant(canonicalFields, proposal);
      document.title = `${applicant} Proposal Detail - Philanthropy Data Commons`;
    }
    return () => { document.title = 'Philanthropy Data Commons'; };
  }, [canonicalFields, proposal]);

  if (canonicalFields === null || proposal === null) {
    return (
      <PanelGridItem>
        <ProposalDetailPanel
          proposalId={0}
          title="Loading..."
          applicant="Loading..."
          applicantId="00-0000000"
          version={0}
          values={[]}
        />
      </PanelGridItem>
    );
  }

  const title = getValueOfCanonicalField(canonicalFields, proposal, 'proposal_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'proposal_title');
  const applicant = getApplicant(canonicalFields, proposal);
  const applicantId = getValueOfCanonicalField(canonicalFields, proposal, 'organization_tax_id');
  const version = proposal.versions[0]?.version ?? 0;
  const values = mapCanonicalFields(canonicalFields, proposal);

  return (
    <PanelGridItem>
      <ProposalDetailPanel
        proposalId={proposal.id}
        title={title}
        applicant={applicant}
        applicantId={applicantId}
        version={version}
        values={values}
      />
    </PanelGridItem>
  );
};

const ProposalDetailLoader = () => {
  const canonicalFields = useCanonicalFields();

  return (
    <PanelGrid sidebarred>
      <ProposalListGridLoader
        canonicalFields={canonicalFields}
      />
      <ProposalDetailPanelLoader
        canonicalFields={canonicalFields}
      />
    </PanelGrid>
  );
};

const ProposalDetail = withOidcSecure(ProposalDetailLoader);
export { ProposalDetail };
