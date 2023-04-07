import React from 'react';
import { Link } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import { TableCellsIcon, UserIcon } from '@heroicons/react/24/solid';
import { getLogger } from '../logger';
import { Panel, PanelBody } from '../components/Panel';
import { Button } from '../components/Button';
import { Dli } from '../components/Dli';
import { EmailLink } from '../components/EmailLink';
import { OffsiteLink } from '../components/OffsiteLink';
import './Landing.css';

const logger = getLogger('<Landing>');

const Landing = () => {
  const { login, isAuthenticated } = useOidc();

  return (
    <Panel
      fill={false}
      className="landing-panel"
    >
      <PanelBody>
        <h3 style={{ fontWeight: '600' }}>Welcome to the Philanthropy Data Commons pilot.</h3>
        <p>
          This data viewer displays the data in the Philanythropy Data Commons pilot.
          {' '}
          <OffsiteLink to="https://philanthropydatacommons.org">
            Read more about the project here.
          </OffsiteLink>
        </p>
        {isAuthenticated ? (
          <Link
            to="/proposals"
            className="button button--color-blue button--inverted"
          >
            <TableCellsIcon className="icon" />
            Go to the Dashboard
          </Link>
        ) : (
          <Button
            color="blue"
            inverted
            onClick={() => { login('/').catch(logger.error); }}
          >
            <UserIcon className="icon" />
            Log in
          </Button>
        )}
        <dl>
          {!isAuthenticated && (
            <Dli>
              <dt>Need an account?</dt>
              <dd>
                Email Jim McGowan:
                {' '}
                <EmailLink
                  to="jimmcgowan@opentechstrategies.com"
                  subject="PDC Pilot account"
                />
              </dd>
            </Dli>
          )}
          <Dli>
            <dt>Have questions or feedback?</dt>
            <dd>
              Email the team:
              {' '}
              <EmailLink
                to="info@philanthropydatacommons.org"
                subject="PDC Pilot"
              />
            </dd>
          </Dli>
          <Dli className="subtle">
            <dt>Contribute on GitHub:</dt>
            <dd>
              This project is developed as open source at
              {' '}
              <OffsiteLink to="https://github.com/PhilanthropyDataCommons">
                PhilanthropyDataCommons
              </OffsiteLink>
              /
              <OffsiteLink to="https://github.com/PhilanthropyDataCommons/data-viewer">
                data-viewer
              </OffsiteLink>
            </dd>
          </Dli>
        </dl>
      </PanelBody>
    </Panel>
  );
};

export { Landing };