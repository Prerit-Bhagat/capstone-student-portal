import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/home";
import Appointment from "./pages/appointment/Appointment";
import PastReports from "./pages/past-reports/PastReports";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root ("/") to "/dashboard" */}
        <Route path="/" element={<Home />} />

        {/* App pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/past-reports" element={<PastReports />} />
      </Routes>
    </Router>
  );
}

export default App;
