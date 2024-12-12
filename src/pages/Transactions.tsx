import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash2, PlusCircle, Edit3 } from 'lucide-react';
import useBudgetStore from '../store';


type Transaction = {
  id: number;
  transaction: string;
  category: string;
  amount: number;
  date: string;  // or Date if that's more appropriate
};

const Transactions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const budgetCategory = queryParams.get('budget') || 'entertainment'.toLowerCase();

  // Use Zustand store for transactions
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useBudgetStore();
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  // Instead of declaring filteredTransactions locally, directly use filtered ones:
  useEffect(() => {
    const filtered = transactions[budgetCategory] || [];
    setFilteredTransactions(filtered); // If no transactions found, set it to an empty array
  }, [transactions, budgetCategory]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editTransaction, setEditTransaction] = useState({
    transaction: '',
    category: budgetCategory.charAt(0).toUpperCase() + budgetCategory.slice(1),
    amount: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (id: number) => {
    const transactionToEdit = filteredTransactions.find((t) => t.id === id);
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
    const updatedTransaction = {
      id,
      transaction: editTransaction.transaction,
      category: editTransaction.category,
      amount: parseFloat(editTransaction.amount),
      date: editTransaction.date,
    };

    updateTransaction(budgetCategory.toLowerCase(), id, updatedTransaction);
    setEditId(null);
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
    // Make sure the input fields are valid
    if (editTransaction.transaction && editTransaction.amount && editTransaction.date) {
      const newTransaction = {
        id: filteredTransactions.length ? filteredTransactions[filteredTransactions.length - 1].id + 1 : 1,
        transaction: editTransaction.transaction,
        category: editTransaction.category,
        amount: parseFloat(editTransaction.amount),
        date: editTransaction.date,
      };
  
      // Add the new transaction to the store
      addTransaction(budgetCategory, newTransaction);
  
      // Clear the form and reset states
      setEditTransaction({
        transaction: '',
        category: budgetCategory.charAt(0).toUpperCase() + budgetCategory.slice(1),
        amount: '',
        date: '',
      });
  
      setEditId(null);  // Reset the edit mode
    }
  };

  const totalSpending = filteredTransactions.reduce((total, t) => total + t.amount, 0);

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
          {filteredTransactions.map((t) => (
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
                  onClick={() => deleteTransaction(budgetCategory.toLowerCase(), t.id)} // Correct usage
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
