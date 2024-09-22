import "./App.css";

import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup"]; // Rotas para ocultar a Navbar

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover
        theme="light"
      />
      <div className="container">
        <Outlet />
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      </div>
    </div>
  );
}

export default App;
