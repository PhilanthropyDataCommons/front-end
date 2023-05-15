import React, { useEffect } from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { useParams } from 'react-router-dom';
import {
  ApiBaseField,
  ApiProposal,
  useBaseFields,
  useProposal,
  useProposals,
} from '../pdc-api';
import { mapProposals } from '../map-proposals';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { ProposalDetailPanel } from '../components/ProposalDetailPanel';
import { ProposalListGridPanel } from '../components/ProposalListGridPanel';

interface ProposalListGridLoaderProps {
  baseFields: ApiBaseField[] | null;
}

const ProposalListGridLoader = (
  { baseFields }: ProposalListGridLoaderProps,
) => {
  const proposals = useProposals('1', '1000');

  if (baseFields === null || proposals === null) {
    return (
      <div>Loading data...</div>
    );
  }

  return (
    <PanelGridItem>
      <ProposalListGridPanel
        proposals={mapProposals(baseFields, proposals.entries)}
      />
    </PanelGridItem>
  );
};

const getValueOfBaseField = (
  baseFields: ApiBaseField[],
  proposal: ApiProposal,
  baseFieldShortCode: string,
) => {
  const field = baseFields.find(({ shortCode }) => (
    shortCode === baseFieldShortCode
  ));
  if (field === undefined) {
    return undefined;
  }
  const fieldValue = proposal.versions[0]?.fieldValues.find(({ applicationFormField }) => (
    applicationFormField.baseFieldId === field.id
  ));
  return fieldValue?.value ?? undefined;
};

const mapBaseFields = (
  baseFields: ApiBaseField[],
  proposal: ApiProposal,
) => (
  (proposal.versions[0]?.fieldValues ?? []).map(({ applicationFormField, value }) => {
    const baseField = baseFields.find(({ id }) => (
      id === applicationFormField.baseFieldId
    ));
    return {
      shortCode: baseField?.shortCode ?? 'missing',
      fieldName: baseField?.label ?? 'missing',
      position: applicationFormField.position,
      value,
    };
  })
);

const getApplicant = (
  baseFields: ApiBaseField[],
  proposal: ApiProposal,
) => (
  getValueOfBaseField(baseFields, proposal, 'organization_name')
    ?? getValueOfBaseField(baseFields, proposal, 'organization_dba_name')
    ?? getValueOfBaseField(baseFields, proposal, 'organization_legal_name')
    ?? getValueOfBaseField(baseFields, proposal, 'proposal_primary_contact_name')
    ?? getValueOfBaseField(baseFields, proposal, 'proposal_submitter_name')
    ?? 'Unknown Applicant'
);

interface ProposalDetailPanelLoaderProps {
  baseFields: ApiBaseField[] | null;
}

const ProposalDetailPanelLoader = (
  { baseFields }: ProposalDetailPanelLoaderProps,
) => {
  const params = useParams();
  const proposalId = params.proposalId ?? 'missing';
  const proposal = useProposal(proposalId);

  useEffect(() => {
    if (baseFields === null || proposal === null) {
      document.title = 'Proposal Detail - Philanthropy Data Commons';
    } else {
      const applicant = getApplicant(baseFields, proposal);
      document.title = `${applicant} Proposal Detail - Philanthropy Data Commons`;
    }
    return () => { document.title = 'Philanthropy Data Commons'; };
  }, [baseFields, proposal]);

  if (baseFields === null || proposal === null) {
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

  const title = getValueOfBaseField(baseFields, proposal, 'proposal_name')
    ?? getValueOfBaseField(baseFields, proposal, 'proposal_title');
  const applicant = getApplicant(baseFields, proposal);
  const applicantId = getValueOfBaseField(baseFields, proposal, 'organization_tax_id');
  const version = proposal.versions[0]?.version ?? 0;
  const values = mapBaseFields(baseFields, proposal);

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
  const baseFields = useBaseFields();

  return (
    <PanelGrid sidebarred>
      <ProposalListGridLoader
        baseFields={baseFields}
      />
      <ProposalDetailPanelLoader
        baseFields={baseFields}
      />
    </PanelGrid>
  );
};

const ProposalDetail = withOidcSecure(ProposalDetailLoader);
export { ProposalDetail };
