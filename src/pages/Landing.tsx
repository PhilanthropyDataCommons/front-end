import { Link } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import {
	BuildingOffice2Icon,
	DocumentTextIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
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
					Welcome to the Philanthropy Data Commons.
				</h3>
				<p>
					This site displays the data in the Philanthropy Data Commons.{' '}
					<OffsiteLink to="https://philanthropydatacommons.org">
						Read more about the project here.
					</OffsiteLink>
				</p>
				<div
					className={`launch-buttons ${isAuthenticated ? 'authenticated' : ''}`}
				>
					{isAuthenticated ? (
						<>
							<Link
								to="/changemakers"
								className="button button--color-blue button--inverted button--block"
							>
								<BuildingOffice2Icon />
								View changemakers
							</Link>
							<Link
								to="/proposals"
								className="button button--color-blue button--inverted button--block"
							>
								<DocumentTextIcon />
								View proposals
							</Link>
						</>
					) : (
						<>
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
							<Link
								to="/changemakers"
								className="button button--color-gray button--block"
							>
								<BuildingOffice2Icon />
								View public changemaker data
							</Link>
						</>
					)}
				</div>

				<dl>
					{!isAuthenticated && (
						<Dli>
							<dt>Need an account?</dt>
							<dd>
								Email Jonathan Mergy:{' '}
								<EmailLink
									to="jmergy@philanthropydatacommons.org"
									subject="PDC account"
								/>
							</dd>
						</Dli>
					)}
					<Dli>
						<dt>Have questions or feedback?</dt>
						<dd>
							Email the team:{' '}
							<EmailLink to="info@philanthropydatacommons.org" subject="PDC" />
						</dd>
					</Dli>
					<Dli>
						<dt>Recent improvements</dt>
						<dd>
							<OffsiteLink to="https://github.com/PhilanthropyDataCommons/front-end/blob/main/RECENT_CHANGES.md">
								Read a summary of recent changes here.
							</OffsiteLink>
						</dd>
					</Dli>
				</dl>
			</PanelBody>
		</Panel>
	);
};

export { Landing };
