import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash2, PlusCircle, Edit3 } from 'lucide-react';

// Mock transactions data
const transactionsData = {
  entertainment: [
    { id: 1, transaction: 'Cinema Tickets', category: 'Entertainment', amount: 50.0, date: '2025-03-09' },
    { id: 2, transaction: 'Theater Show', category: 'Entertainment', amount: 60.0, date: '2025-03-08' },
    { id: 3, transaction: 'Concert', category: 'Entertainment', amount: 75.0, date: '2025-03-06' },
    { id: 4, transaction: 'Amusement Park', category: 'Entertainment', amount: 82.0, date: '2025-03-05' },
  ],
  groceries: [
    { id: 1, transaction: 'Tesco', category: 'Grocery', amount: 50.5, date: '2025-03-09' },
    { id: 2, transaction: 'Waitrose', category: 'Grocery', amount: 16.8, date: '2025-03-09' },
    { id: 3, transaction: 'M&S Food', category: 'Grocery', amount: 20.65, date: '2025-03-08' },
    { id: 4, transaction: 'Asda', category: 'Grocery', amount: 102.3, date: '2025-03-06' },
  ],
  rent: [
    { id: 1, transaction: 'Flat Rent', category: 'Rent', amount: 1000.0, date: '2025-03-09' },
    { id: 2, transaction: 'Parking Spot Rent', category: 'Rent', amount: 200.0, date: '2025-03-08' },
  ],
  sports: [
    { id: 1, transaction: 'Gym Membership', category: 'Sports', amount: 50.0, date: '2025-03-09' },
    { id: 2, transaction: 'Tennis Lessons', category: 'Sports', amount: 40.0, date: '2025-03-08' },
    { id: 3, transaction: 'Swimming Pool', category: 'Sports', amount: 30.0, date: '2025-03-06' },
    { id: 4, transaction: 'Yoga Class', category: 'Sports', amount: 30.0, date: '2025-03-05' },
  ],
  transportation: [
    { id: 1, transaction: 'Bus Ticket', category: 'Transport', amount: 15.0, date: '2025-03-09' },
    { id: 2, transaction: 'Train Ride', category: 'Transport', amount: 20.0, date: '2025-03-08' },
    { id: 3, transaction: 'Taxi', category: 'Transport', amount: 18.0, date: '2025-03-06' },
    { id: 4, transaction: 'Bike Rental', category: 'Transport', amount: 10.0, date: '2025-03-05' },
  ],
  utilities: [
    { id: 1, transaction: 'Water Bill', category: 'Utilities', amount: 20.0, date: '2025-03-09' },
    { id: 2, transaction: 'Gas', category: 'Utilities', amount: 15.0, date: '2025-03-08' },
    { id: 3, transaction: 'Wifi', category: 'Utilities', amount: 20.0, date: '2025-03-06' },
    { id: 4, transaction: 'Electricity', category: 'Utilities', amount: 20.0, date: '2025-03-05' },
  ]
  // Add other categories as needed
};

const Transactions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const budgetCategory = queryParams.get('budget') || 'entertainment';

  const [transactions, setTransactions] = useState(transactionsData[budgetCategory] || []);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTransaction, setEditTransaction] = useState({
    transaction: '',
    category: budgetCategory.charAt(0).toUpperCase() + budgetCategory.slice(1),
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
    setEditId(-1);
    setEditTransaction({
      transaction: '',
      category: budgetCategory.charAt(0).toUpperCase() + budgetCategory.slice(1),
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
    setEditId(null);
  };

  const totalSpending = transactions.reduce((total, t) => total + t.amount, 0);

  const handleNavigateToBudgetPlanning = () => {
    navigate('/budgetplanning');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{budgetCategory.charAt(0).toUpperCase() + budgetCategory.slice(1)} Spending</h1>
      </div>

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
                      const value = e.target.value.replace(/£/, '');
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
                      const value = e.target.value.replace(/[^\d]/g, '');
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

      <div className="mt-4 flex justify-center">
        <PlusCircle
          className="text-gray-400 cursor-pointer"
          size={36}
          onClick={handleAddTransaction}
        />
      </div>

      <div className="mt-4 text-right text-xl font-bold">
        # Total Spending: £{totalSpending.toFixed(2)}
      </div>

      <div className="mt-4 flex justify-start">
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleNavigateToBudgetPlanning}
        >
          Go to Budget Planning
        </button>
      </div>
    </div>
  );
};

export default Transactions;