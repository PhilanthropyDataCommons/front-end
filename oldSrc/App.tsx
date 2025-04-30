import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import { NotFound } from './pages/NotFound';
import { Landing } from './pages/Landing';
import './App.css';

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [
			{ path: '/', Component: Landing },
			{ path: '*', Component: NotFound },
		],
	},
]);

const App = () => <RouterProvider router={router} />;

export { App };
