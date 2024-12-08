import React, { useState } from 'react';
import { Trash2, PlusCircle, Edit3 } from 'lucide-react';

const TransactionsTransportation = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, transaction: 'Bus Ticket', category: 'Transport', amount: 15.0, date: '2025-03-09' },
    { id: 2, transaction: 'Train Ride', category: 'Transport', amount: 20.0, date: '2025-03-08' },
    { id: 3, transaction: 'Taxi', category: 'Transport', amount: 18.0, date: '2025-03-06' },
    { id: 4, transaction: 'Bike Rental', category: 'Transport', amount: 10.0, date: '2025-03-05' },
  ]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editTransaction, setEditTransaction] = useState({
    transaction: '',
    category: 'Transport', // Default value for the category
    amount: '',
    date: '',
  });

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

  const handleSave = (id: number) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, ...editTransaction, amount: parseFloat(editTransaction.amount) } : t
      )
    );
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = () => {
    setEditId(-1); // Special flag to indicate a new transaction is being added
    setEditTransaction({
      transaction: '',
      category: 'Transport', // Default value for the new transaction
      amount: '',
      date: '',
    });
  };

  const handleSaveNewTransaction = () => {
    const newTransaction = {
      id: transactions.length ? transactions[transactions.length - 1].id + 1 : 1,
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

  const totalSpending = transactions.reduce((total, t) => total + t.amount, 0);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Transport Spending</h1>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                      const value = e.target.value.replace(/£/, ''); // Remove any existing £
                      if (!isNaN(Number(value)) || value === '') {
                        setEditTransaction((prev) => ({ ...prev, amount: value }));
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
                      const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
                      let formattedValue = value;
                      if (value.length > 4)
                        formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`;
                      else if (value.length > 2)
                        formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}`;
                      setEditTransaction((prev) => ({ ...prev, date: formattedValue }));
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
                  onClick={() =>
                    setTransactions(transactions.filter((tr) => tr.id !== t.id))
                  }
                />
              </td>
            </tr>
          ))}
          {editId === -1 && (
            <tr className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200">
                <input
                  type="text"
                  name="transaction"
                  value={editTransaction.transaction}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTransaction()}
                />
              </td>
              <td className="p-3 border border-gray-200">
                <input
                  type="text"
                  name="category"
                  value={editTransaction.category}
                  onChange={handleChange}
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
                      setEditTransaction((prev) => ({ ...prev, amount: value }));
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
                    setEditTransaction((prev) => ({ ...prev, date: formattedValue }));
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

export default TransactionsTransportation;
