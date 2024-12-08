import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./globals.css";
import App from "./App";
import BudgetPlanning from "./pages/BudgetPlanning";
import AccountManagement from "./pages/AccountManagement";
import { Toaster } from "./components/ui/toaster";
import SavingsGoals from "./pages/SavingGoals";
import TransactionsGroceries from "./pages/TransactionsGroceries";
import TransactionsTransportation from "./pages/TransactionsTransportation";
import AISavingSuggestions from "./pages/AISavingSuggestions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="savings" element={<SavingsGoals />} />
          <Route path="budgetplanning" element={<BudgetPlanning />} />
          <Route path="accountmanagement" element={<AccountManagement />} />
          <Route path="transactionsgroceries" element={<TransactionsGroceries />} />
          <Route path="transactionstransportation" element={<TransactionsTransportation />} />
          <Route path="savingsuggestions" element={<AISavingSuggestions />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
