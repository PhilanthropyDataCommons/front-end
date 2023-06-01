import React from 'react';
import { ClosablePanel, PanelTitle } from '../Panel';
import { DataPlatformProviderPanel } from './DataPlatformProviderPanel';

const providers = {
  candid: {
    name: 'Candid',
  },
  'charity-navigator': {
    name: 'Charity Navigator',
  },
};
type KnownProvider = keyof typeof providers;

const isValidProvider = (provider: string): provider is KnownProvider => (
  Object.hasOwn(providers, provider)
);

interface DataPlatformProviderProps {
  externalId: string | undefined;
  onClose: () => void;
  provider: string;
}

const Invalid = ({
  onClose,
  provider,
}: Omit<Required<DataPlatformProviderProps>, 'externalId'>) => (
  <ClosablePanel
    onClose={onClose}
    title={(
      <PanelTitle>
        Invalid Provider
      </PanelTitle>
    )}
  >
    {`The data platform provider ${provider} is not recognized.`}
  </ClosablePanel>
);

interface ClosableKnownProviderProps {
  onClose: () => void;
  provider: KnownProvider;
}
const Loading = ({
  onClose,
  provider,
}: ClosableKnownProviderProps) => (
  <ClosablePanel
    onClose={onClose}
    title={(
      <PanelTitle>
        {providers[provider].name}
      </PanelTitle>
    )}
  >
    {`Loading data from ${providers[provider].name}...`}
  </ClosablePanel>
);

interface ProviderPanelLoaderProps {
  externalId: string;
  onClose: () => void;
  provider: KnownProvider;
}

const ProviderPanelLoader = ({
  externalId,
  onClose,
  provider,
}: ProviderPanelLoaderProps) => (
  <DataPlatformProviderPanel
    applicant={externalId}
    onClose={onClose}
    provider={provider}
    url="https://example.com"
    values={[
      {
        jsonPath: 'label1',
        fieldName: 'Label 1',
        value: 'ABC123',
      },
      {
        jsonPath: 'label2',
        fieldName: 'Label 2',
        value: 'ABC123',
      },
      {
        jsonPath: 'label3',
        fieldName: 'Label 3',
        value: 'ABC123',
      },
      {
        jsonPath: 'label4',
        fieldName: 'Label 4',
        value: 'ABC123',
      },
    ]}
  />
);

const DataPlatformProviderLoader = ({
  externalId,
  onClose,
  provider,
}: DataPlatformProviderProps) => {
  if (!isValidProvider(provider)) {
    return <Invalid onClose={onClose} provider={provider} />;
  }
  if (externalId === undefined) {
    return <Loading onClose={onClose} provider={provider} />;
  }
  return (
    <ProviderPanelLoader
      externalId={externalId}
      onClose={onClose}
      provider={provider}
    />
  );
};

export { DataPlatformProviderLoader };
