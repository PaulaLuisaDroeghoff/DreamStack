import React from "react";
import { Card, CardContent } from "../components/ui/card";

const AccountsPage = () => {
  const accounts = [
    {
      id: "1",
      name: "Checking - 8374",
      balance: "$5,342.56",
      type: "Checking",
    },
    { id: "2", name: "Savings - 2946", balance: "$12,845.22", type: "Savings" },
    {
      id: "3",
      name: "Credit Card - 7291",
      balance: "$0.00",
      type: "Credit Card",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 h-full">
      <h2 className="text-2xl font-semibold mb-6">Your Accounts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <h3 className="font-medium">{account.name}</h3>
                <p className="text-2xl font-bold">{account.balance}</p>
                <p className="text-sm text-gray-500">{account.type}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;
