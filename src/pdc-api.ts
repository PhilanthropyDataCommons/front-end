import { useEffect, useState } from 'react';
import { useOidcFetch } from '@axa-fr/react-oidc';
import { getLogger } from './logger';

const logger = getLogger('pdc-api');

const API_URL = process.env.REACT_APP_API_URL;

// Custom React hook to make authenticated requests to the configured API
const usePdcApi = <T>(path: string): T | null => {
  const { fetch } = useOidcFetch();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch(new URL(path, API_URL))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Response status: ${res.status} ${res.statusText}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then(setResponse)
      .catch((error: unknown) => logger.error({ error }, `Error fetching ${path}`));

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

export {
  useCanonicalFields,
  usePdcApi,
  useProposal,
};

export type {
  CanonicalField,
  Proposal,
};
