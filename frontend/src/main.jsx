import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./routes/Home";
import AddBook from "./routes/AddBook";
import Book from "./routes/Book.jsx";
import UpdateBook from "./routes/UpdateBook.jsx";
import Search from "./routes/Search.jsx";
import Login from "./routes/Login/Login.jsx";

// PrivateRoute
import PrivateRoute from "./routes/PrivateRoute.jsx";

import { UserProvider } from "./Context/UserContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />, // Página de login pública
      },
      {
        path: "/",
        element: <PrivateRoute />, // Wrapper para rotas protegidas
        children: [
          {
            path: "/",
            element: <Home />, // Rota protegida
          },
          {
            path: "/add-book",
            element: <AddBook />, // Rota protegida
          },
          {
            path: "/books/:id",
            element: <Book />, // Rota protegida
          },
          {
            path: "/update-book/:id",
            element: <UpdateBook />, // Rota protegida
          },
          {
            path: "/search",
            element: <Search />, // Rota protegida
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
