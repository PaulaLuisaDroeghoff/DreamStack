import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../components/ui/hooks/use-toast";

const TransferPage = () => {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const accounts = [
    { id: "1", name: "Checking - 8374", balance: "$5,342.56" },
    { id: "2", name: "Savings - 2946", balance: "$12,845.22" },
    { id: "3", name: "Credit Card - 7291", balance: "$0.00" },
  ];

  const handleTransfer = () => {
    toast({
      title: "Transfer initiated",
      description: `You have successfully transferred ${amount} from ${fromAccount} to ${toAccount}`,
    });
    //console.log("Transfer initiated", { fromAccount, toAccount, amount });
  };

  return (
    <div className="p-6 bg-gray-50 h-full">
      <h2 className="text-2xl font-semibold mb-6">Transfer Funds</h2>
      <Card className="w-full max-w-xl mx-auto">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label>From Account</Label>
            <Select onValueChange={setFromAccount} value={fromAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.name}>
                    <div className="flex justify-between">
                      <span>{account.name}</span>
                      <span className="text-gray-500">{account.balance}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>To Account</Label>
            <Select onValueChange={setToAccount} value={toAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.name}>
                    <div className="flex justify-between">
                      <span>{account.name}</span>
                      <span className="text-gray-500">{account.balance}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Transfer Amount</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full"
            />
          </div>

          <Button onClick={handleTransfer} className="w-full">
            Transfer Funds
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferPage;
