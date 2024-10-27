import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './layouts/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewOperation from './layouts/NewOperation';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/new_operation',
		element: <NewOperation />,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
