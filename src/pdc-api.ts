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

const logError = (error: unknown, path: string, params: URLSearchParams) => {
  logger.error({ error, params }, `Error fetching ${path}`);
};

// Custom React hook to make authenticated requests to the configured API
const usePdcApi = <T>(
  path: string,
  params: URLSearchParams = new URLSearchParams(),
): T | null => {
  const { fetch } = useOidcFetch();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setResponse(null);
    const url = new URL(path, API_URL);
    url.search = params.toString();
    fetch(url)
      .then(throwNotOk)
      .then((res) => res.json())
      .then(setResponse)
      .catch((e) => logError(e, path, params));

    /* eslint-disable-next-line react-hooks/exhaustive-deps --
     *
     * fetch should not be a dependency, because although it or its internal
     * state may change from render to render, such changes are not relevant:
     * a change in the way we make a request should not trigger an API request
     *
     * params is a dependency, but as an object - and often a newly-created
     * object - depending on it directly causes spurious renders; instead, use
     * its string value, which should be stable
     */
  }, [path, params.toString()]);

  return response;
};

interface ApiBaseField {
  id: number;
  label: string;
  shortCode: string;
}

const useBaseFields = () => usePdcApi<ApiBaseField[]>('/baseFields');

interface ApiProposal {
  id: number;
  versions: {
    version: number;
    fieldValues: {
      applicationFormField: {
        baseFieldId: number;
        position: number;
      };
      value: string;
    }[];
  }[];
}

const useProposal = (proposalId: string) => (
  usePdcApi<ApiProposal>(
    `/proposals/${proposalId}`,
    new URLSearchParams({
      includeFieldsAndValues: 'true',
    }),
  )
);

interface ApiProposals {
  entries: ApiProposal[];
  total: number;
}

const PROPOSALS_DEFAULT_PAGE = '1';
const PROPOSALS_DEFAULT_COUNT = '1000';
const PROPOSALS_DEFAULT_QUERY = '';

const useProposals = (page: string, count: string, query: string) => (
  usePdcApi<ApiProposals>(
    '/proposals',
    new URLSearchParams({
      _page: page,
      _count: count,
      _content: query,
    }),
  )
);

interface PlatformProviderResponse {
  createdAt: string;
  externalId: string;
  platformProvider: string;
  data: object;
}

const useProviderData = (externalId: string) => (
  usePdcApi<PlatformProviderResponse[]>(
    '/platformProviderResponses',
    new URLSearchParams({
      externalId,
    }),
  )
);

export {
  PROPOSALS_DEFAULT_COUNT,
  PROPOSALS_DEFAULT_PAGE,
  PROPOSALS_DEFAULT_QUERY,
  useBaseFields,
  useProposal,
  useProposals,
  useProviderData,
};

export type {
  ApiBaseField,
  ApiProposal,
};
