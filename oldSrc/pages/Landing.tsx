import { useOidc } from '@axa-fr/react-oidc';
import { UserIcon } from '@heroicons/react/24/outline';
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
		<Panel className="landing-panel">
			<PanelBody>
				<h3 style={{ fontWeight: '600' }}>
					Philanthropy Data Commons Administrative Interface
				</h3>
				<p>
					This site provides administrative tools for the Philanthropy Data
					Commons.{' '}
					<OffsiteLink to="https://philanthropydatacommons.org">
						Read more about the project here.
					</OffsiteLink>
				</p>
				<div
					className={`launch-buttons ${isAuthenticated ? 'authenticated' : ''}`}
				>
					{!isAuthenticated && (
						<Button
							color="blue"
							inverted
							block
							onClick={() => {
								login('/').catch(logger.error);
							}}
						>
							<UserIcon className="icon" />
							Log in
						</Button>
					)}
				</div>

				<dl>
					<Dli>
						<dt>Have questions or feedback?</dt>
						<dd>
							Email the team:{' '}
							<EmailLink to="info@philanthropydatacommons.org" subject="PDC" />
						</dd>
					</Dli>
					<Dli>
						<dt>Code Repository</dt>
						<dd>
							<OffsiteLink to="https://github.com/PhilanthropyDataCommons/front-end">
								Please visit our repository to raise any issues or feature
								requests.
							</OffsiteLink>
						</dd>
					</Dli>
				</dl>
			</PanelBody>
		</Panel>
	);
};

export { Landing };
