import React, { useState } from 'react';
import { Button } from './Button';
import './Search.css';

interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const Search = ({
  onSearch,
  initialQuery = '',
}: SearchProps) => {
  const [query, setQuery] = useState(initialQuery);

  return (
    <form
      className="search"
      method="get"
      onSubmit={(e) => { e.preventDefault(); onSearch(query); }}
    >
      <input
        type="search"
        name="q"
        placeholder="Text to search for…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button submit>
        Search
      </Button>
    </form>
  );
};
