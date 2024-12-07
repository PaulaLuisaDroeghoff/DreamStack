import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./globals.css";
import App from "./App";
import TransferPage from "./pages/TransferPage";
import DashboardPage from "./pages/DashboardPage";
import AccountsPage from "./pages/AccountsPage";
import SettingsPage from "./pages/SettingsPage";
import { Toaster } from "./components/ui/toaster";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DashboardPage />} />
          <Route path="transfer" element={<TransferPage />} />
          <Route path="accounts" element={<AccountsPage />} />
        </Route>
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
