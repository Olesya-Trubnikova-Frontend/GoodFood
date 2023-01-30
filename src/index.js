import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FormLog } from './components/FormLog/FormLog';
import { FormReg } from "./components/FormReg/FormReg";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Products } from './components/Products/Products';
import { Main } from './components/Main/Main';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TokenContextProvider from './contexts/TokenContext';

// функция создания роутинга
const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <App />,
			children: [
				{
					index: "true",
					element: <Main />,
				},
				{
					path: "signin/",
					element: <FormLog />,
				},
				{
					path: "signup/",
					element: <FormReg />,
				},
				{
					path: "products/",
					element: <Products />,
				},
			],
		},
	], {basename: "/GoodFood"});

	// регистрируем query-клиент и оборачиваем в него приложение
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		}
	}
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <RouterProvider router={router} />
      </TokenContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);