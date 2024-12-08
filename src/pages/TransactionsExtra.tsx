import React, { useState } from 'react';
import { Trash2, PlusCircle, Edit3 } from 'lucide-react';

// Define a type for the transaction object
interface Transaction {
  id: number;
  transaction: string;
  category: string;
  amount: number;
  date: string;
}

const TransactionsExtra = () => {
  // Initialize transactions with no data (empty array)
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // State for editing and adding transactions
  const [editId, setEditId] = useState<number | null>(null); // Allows for editing or adding new transactions
  const [editTransaction, setEditTransaction] = useState({
    transaction: '',
    category: 'Extra', // Default category for new transaction
    amount: '',
    date: '',
  });

  // Handle editing an existing transaction
  const handleEdit = (id: number) => {
    const transactionToEdit = transactions.find((t) => t.id === id);
    if (transactionToEdit) {
      setEditId(id);
      setEditTransaction({
        transaction: transactionToEdit.transaction,
        category: transactionToEdit.category,
        amount: transactionToEdit.amount.toString(),
        date: transactionToEdit.date,
      });
    }
  };

  // Handle saving edited transaction
  const handleSave = (id: number) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, ...editTransaction, amount: parseFloat(editTransaction.amount) } : t
      )
    );
    setEditId(null); // Exit edit mode
  };

  // Handle adding a new transaction
  const handleAddTransaction = () => {
    setEditId(-1); // Special flag to indicate adding a new transaction
    setEditTransaction({
      transaction: '',
      category: 'Extra', // Default category for new transaction
      amount: '',
      date: '',
    });
  };

  // Save a new transaction
  const handleSaveNewTransaction = () => {
    const newTransaction: Transaction = {
      id: transactions.length ? transactions[transactions.length - 1].id + 1 : 1, // Auto-increment the ID
      transaction: editTransaction.transaction,
      category: editTransaction.category,
      amount: parseFloat(editTransaction.amount),
      date: editTransaction.date,
    };

    setTransactions(
      [...transactions, newTransaction].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
    setEditId(null); // Exit edit mode
  };

  // Handle deleting a transaction
  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Calculate total spending
  const totalSpending = transactions.reduce((total, t) => total + t.amount, 0);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Extra Spending</h1>
      </div>

      {/* Transactions Table */}
      <table className="w-full text-left border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border border-gray-200">Transaction</th>
            <th className="p-3 border border-gray-200">Category</th>
            <th className="p-3 border border-gray-200">Amount</th>
            <th className="p-3 border border-gray-200">Date</th>
            <th className="p-3 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200">
                {editId === t.id ? (
                  <input
                    type="text"
                    name="transaction"
                    value={editTransaction.transaction}
                    onChange={(e) =>
                      setEditTransaction({ ...editTransaction, transaction: e.target.value })
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleSave(t.id)}
                  />
                ) : (
                  t.transaction
                )}
              </td>
              <td className="p-3 border border-gray-200">
                {editId === t.id ? (
                  <input
                    type="text"
                    name="category"
                    value={editTransaction.category}
                    onChange={(e) =>
                      setEditTransaction({ ...editTransaction, category: e.target.value })
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleSave(t.id)}
                  />
                ) : (
                  t.category
                )}
              </td>
              <td className="p-3 border border-gray-200">
                {editId === t.id ? (
                  <input
                    type="text"
                    name="amount"
                    value={`£${editTransaction.amount}`}
                    onChange={(e) => {
                      const value = e.target.value.replace(/£/, '');
                      if (!isNaN(Number(value)) || value === '') {
                        setEditTransaction({ ...editTransaction, amount: value });
                      }
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave(t.id)}
                  />
                ) : (
                  `£${t.amount.toFixed(2)}`
                )}
              </td>
              <td className="p-3 border border-gray-200">
                {editId === t.id ? (
                  <input
                    type="text"
                    name="date"
                    value={editTransaction.date}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      let formattedValue = value;
                      if (value.length > 4)
                        formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`;
                      else if (value.length > 2)
                        formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}`;
                      setEditTransaction({ ...editTransaction, date: formattedValue });
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave(t.id)}
                  />
                ) : (
                  t.date
                )}
              </td>
              <td className="p-3 border border-gray-200 flex items-center space-x-2">
                <Edit3
                  className="text-gray-400 cursor-pointer"
                  size={24}
                  onClick={() => handleEdit(t.id)}
                />
                <Trash2
                  className="text-gray-400 cursor-pointer"
                  size={24}
                  onClick={() => handleDelete(t.id)}
                />
              </td>
            </tr>
          ))}

          {/* New Transaction Form */}
          {editId === -1 && (
            <tr className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200">
                <input
                  type="text"
                  name="transaction"
                  value={editTransaction.transaction}
                  onChange={(e) =>
                    setEditTransaction({ ...editTransaction, transaction: e.target.value })
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTransaction()}
                />
              </td>
              <td className="p-3 border border-gray-200">
                <input
                  type="text"
                  name="category"
                  value={editTransaction.category}
                  onChange={(e) =>
                    setEditTransaction({ ...editTransaction, category: e.target.value })
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTransaction()}
                />
              </td>
              <td className="p-3 border border-gray-200">
                <input
                  type="text"
                  name="amount"
                  value={`£${editTransaction.amount}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/£/, '');
                    if (!isNaN(Number(value)) || value === '') {
                      setEditTransaction({ ...editTransaction, amount: value });
                    }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTransaction()}
                />
              </td>
              <td className="p-3 border border-gray-200">
                <input
                  type="text"
                  name="date"
                  value={editTransaction.date}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d]/g, '');
                    let formattedValue = value;
                    if (value.length > 4)
                      formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`;
                    else if (value.length > 2)
                      formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}`;
                    setEditTransaction({ ...editTransaction, date: formattedValue });
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTransaction()}
                />
              </td>
              <td className="p-3 border border-gray-200 flex items-center space-x-2">
                <PlusCircle
                  className="text-gray-400 cursor-pointer"
                  size={24}
                  onClick={handleSaveNewTransaction}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Transaction Button */}
      <div className="mt-4 flex justify-center">
        <PlusCircle
          className="text-gray-400 cursor-pointer"
          size={36}
          onClick={handleAddTransaction}
        />
      </div>

      {/* Total Spending */}
      <div className="mt-4 text-right text-xl font-bold">
        # Total Spending: £{totalSpending.toFixed(2)}
      </div>
    </div>
  );
};

export default TransactionsExtra;
