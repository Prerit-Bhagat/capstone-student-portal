import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointment from "./pages/Appointment";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home";
import PastReports from "./pages/PastReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/past-reports" element={<PastReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
