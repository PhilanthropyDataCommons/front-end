import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { FormElementGroup } from './FormElementGroup';
import './Search.css';
import { getLogger } from '../logger';

const logger = getLogger('Search');

interface SearchProps {
	onSearch: (query: string) => void | Promise<void>;
	initialQuery?: string;
}

export const Search = ({ onSearch, initialQuery = '' }: SearchProps) => {
	const [query, setQuery] = useState(initialQuery);

	return (
		<form
			className="search"
			method="get"
			onSubmit={(e) => {
				e.preventDefault();
				onSearch(query)?.catch(logger.error);
			}}
		>
			<FormElementGroup>
				<input
					type="search"
					name="q"
					placeholder="Text to search for…"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button submit disabled={query === ''}>
					Search
				</Button>
			</FormElementGroup>
			{initialQuery !== '' ? (
				<Link to="/proposals" className="button" onClick={() => setQuery('')}>
					Clear search
				</Link>
			) : null}
		</form>
	);
};
