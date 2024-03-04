import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
	const location = useLocation();
	return (
		<>
			<h1>Page Not Found</h1>
			<p>
				We do not know the route <code>{location.pathname}</code>
			</p>
		</>
	);
};

export { NotFound };
