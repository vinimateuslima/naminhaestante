import "./App.css";

import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
