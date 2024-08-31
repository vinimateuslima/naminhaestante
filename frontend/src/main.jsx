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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/books/:id",
        element: <Book />,
      },
      {
        path: "/update-book/:id",
        element: <UpdateBook />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
