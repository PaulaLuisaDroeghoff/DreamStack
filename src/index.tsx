import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./globals.css";
import App from "./App";
import BudgetPlanning from "./pages/BudgetPlanning";
import AccountManagement from "./pages/AccountManagement";
import { Toaster } from "./components/ui/toaster";
import SavingsGoals from "./pages/SavingGoals";
import SavingSuggestions from "./pages/SavingSuggestions";
import Transactions from "./pages/Transactions";
import LogIn from "./pages/LogIn";
import Connect from "./pages/ConnectBankAccount";
import BankConnections from "./pages/BankConnections";
import CreateAccount from "./pages/CreateAccount";
import SavingGoal from "./pages/SavingGoal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="savings" element={<SavingsGoals />} />
          <Route path="budgetplanning" element={<BudgetPlanning />} />
          <Route path="accountmanagement" element={<AccountManagement />} />
          <Route path="savingsuggestions" element={<SavingSuggestions />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="login" element={<LogIn />} />
          <Route path="connect" element={<Connect />} />
          <Route path="bankconnections" element={<BankConnections />} />
          <Route path="savinggoal" element={<SavingGoal />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
