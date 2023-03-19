import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FormLog } from './components/FormLog/FormLog';
import { FormReg } from "./components/FormReg/FormReg";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Cart } from './components/Cart/Cart';
import { Provider } from "react-redux/es/exports";
import { store } from "./redux/store";
import { Cathalog } from './components/Cathalog/Cathalog';
import { Favorite } from './components/Favorite/Favorite';
import { User } from "./components/User/User";

// функция создания роутинга
const router = createBrowserRouter([
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
        element: <Cathalog />,
      },
      {
        path: "cart/",
        element: <Cart />,
      },
      {
        path: "favorite/",
        element: <Favorite />,
      },
      {
        path: "user/",
        element: <User />,
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
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);