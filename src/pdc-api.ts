import { useEffect, useState } from 'react';
import { useOidcFetch } from '@axa-fr/react-oidc';
import { getLogger } from './logger';

const logger = getLogger('pdc-api');

const API_URL = process.env.REACT_APP_API_URL;

const throwNotOk = (res: Response): Response => {
  if (!res.ok) {
    throw new Error(`Response status: ${res.status} ${res.statusText}`);
  }
  return res;
};

const logError = (error: unknown, path: string) => {
  logger.error({ error }, `Error fetching ${path}`);
};

// Custom React hook to make authenticated requests to the configured API
const usePdcApi = <T>(path: string): T | null => {
  const { fetch } = useOidcFetch();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch(new URL(path, API_URL))
      .then(throwNotOk)
      .then((res) => res.json())
      .then(setResponse)
      .catch((e) => logError(e, path));

    /* eslint-disable-next-line react-hooks/exhaustive-deps --
     * fetch should not be a dependency, because although it or its internal
     * state may change from render to render, such changes are not relevant:
     * a change in the way we make a request should not trigger an API request
     */
  }, [path]);

  return response;
};

interface CanonicalField {
  id: number;
  label: string;
  shortCode: string;
}

const useCanonicalFields = () => usePdcApi<CanonicalField[]>('/canonicalFields');

interface Proposal {
  id: number;
  versions: {
    version: number;
    fieldValues: {
      applicationFormField: {
        canonicalFieldId: number;
        position: number;
      };
      value: string;
    }[];
  }[];
}

const useProposal = (proposalId: string) => (
  usePdcApi<Proposal>(`/proposals/${proposalId}?includeFieldsAndValues=true`)
);

const useProposals = (page: string, count: string) => {
  const { fetch } = useOidcFetch();
  const [proposals, setProposals] = useState<number[]>([]);
  const [proposalsDetails, setProposalsDetails] = useState<Proposal[]>([]);

  useEffect(() => {
    const path = `/proposals?_page=${page}&_count=${count}`;
    fetch(new URL(path, API_URL))
      .then(throwNotOk)
      .then((res) => res.json())
      .then((data: { id: number; }[]) => data.map(({ id }) => id))
      .then(setProposals)
      .catch((e: unknown) => logError(e, path));
  }, [page, count]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Promise.all(
      proposals.map((id) => (
        fetch(new URL(`/proposals/${id}?includeFieldsAndValues=true`, API_URL))
          .then(throwNotOk)
          .then((res) => res.json())
      )),
    )
      .then(setProposalsDetails)
      .catch((error: unknown) => logger.error({ error }, 'Error fetching individual proposal in list'));
  }, [proposals]); // eslint-disable-line react-hooks/exhaustive-deps

  return proposalsDetails;
};

export {
  useCanonicalFields,
  usePdcApi,
  useProposal,
  useProposals,
};

export type {
  CanonicalField,
  Proposal,
};