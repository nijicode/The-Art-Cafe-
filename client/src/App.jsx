import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import { Admin } from "./pages/admin/Admin";
import { Toaster } from "sonner";
import Preloader from "./components/preloader/Preloader";

function App() {
  const location = useLocation();

  const getToasterPosition = () => {
    switch (location.pathname) {
      case "/":
        return "bottom-center";
      case "/admin":
        return "top-center";
      default:
        return "top-right";
    }
  };
  return (
    <div>
      <Preloader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Toaster position={getToasterPosition()} />
    </div>
  );
}

export default App;
