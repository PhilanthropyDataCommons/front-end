import React, { useEffect } from 'react';
import { OidcSecure } from '@axa-fr/react-oidc';
import { useParams } from 'react-router-dom';
import {
  CanonicalField,
  Proposal,
  useCanonicalFields,
  useProposal,
} from '../pdc-api';
import { ProposalDetailPanel } from '../components/ProposalDetailPanel';

const getValueOfCanonicalField = (
  canonicalFields: CanonicalField[],
  proposal: Proposal,
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
  canonicalFields: CanonicalField[],
  proposal: Proposal,
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
  canonicalFields: CanonicalField[],
  proposal: Proposal,
) => (
  getValueOfCanonicalField(canonicalFields, proposal, 'organization_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'organization_dba_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'organization_legal_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'proposal_primary_contact_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'proposal_submitter_name')
    ?? 'Unknown Applicant'
);

const ProposalDetail = () => {
  const params = useParams();
  const proposalId = params.proposalId ?? 'missing';
  const canonicalFields = useCanonicalFields();
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
      <OidcSecure>
        <ProposalDetailPanel
          proposalId={0}
          title="Loading..."
          applicant="Loading..."
          applicantId="00-0000000"
          version={0}
          values={[]}
        />
      </OidcSecure>
    );
  }

  const title = getValueOfCanonicalField(canonicalFields, proposal, 'proposal_name')
    ?? getValueOfCanonicalField(canonicalFields, proposal, 'proposal_title');
  const applicant = getApplicant(canonicalFields, proposal);
  const applicantId = getValueOfCanonicalField(canonicalFields, proposal, 'organization_tax_id');
  const version = proposal.versions[0]?.version ?? 0;
  const values = mapCanonicalFields(canonicalFields, proposal);

  return (
    <OidcSecure>
      <ProposalDetailPanel
        proposalId={proposal.id}
        title={title}
        applicant={applicant}
        applicantId={applicantId}
        version={version}
        values={values}
      />
    </OidcSecure>
  );
};

export { ProposalDetail };
