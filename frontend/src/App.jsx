import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import MonthlyBudget from "./pages/monthlyBudget";

export default function App() {
  return (
    <>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/" className="text-blue-600">Home</Link>
        <Link to="/budget" className="text-blue-600">Budget</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<MonthlyBudget />} />
      </Routes>
    </>
  );
}
