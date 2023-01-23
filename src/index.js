import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FormLog } from './components/FormLog/FormLog';
import { FormReg } from "./components/FormReg/FormReg";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Products } from './components/Products/Products';
import { Main } from './components/Main/Main';

// функция создания роутинга
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
				path: "",
        index: "true",
        element: <Main />,
      },
      {
        path: "signin",
        element: <FormLog />,
      },
      {
        path: "signup",
        element: <FormReg />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);