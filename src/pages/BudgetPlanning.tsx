import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBudgetStore from '../store'; // Correct import for Zustand store
import {House, Calendar, Plus} from 'lucide-react';

const BudgetPlanner = () => {
  const navigate = useNavigate();
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the Zustand store
  const { categories, addCategory, totalBudget } = useBudgetStore();

  // Calculate total spending dynamically
  const totalSpending = categories.reduce((sum, category) => sum + category.amount, 0);

  const [newCategory, setNewCategory] = useState({ title: '' });

  const handleAddCategory = () => {
    if (newCategory.title) {
      addCategory({
        icon: 'Star', // Default icon as string (adjust if dynamic icon components are needed)
        title: newCategory.title,
        amount: 0,
        route: `/transactions?budget=${newCategory.title.toLowerCase()}`,
      });
      setNewCategory({ title: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800 mr-8">Budget Planner</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Plus className="text-black" />
          </button>
          <span className="flex items-center text-gray-500 ml-4">
            <Calendar className="mr-2 text-black" />
            {currentMonth}
          </span>
        </div>
        <button
          onClick={() => navigate('/BudgetInput')}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Add Monthly Budget
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              className="w-full mb-4 p-2 border rounded"
              value={newCategory.title}
              onChange={(e) => setNewCategory({ title: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 h-32 cursor-pointer"
              onClick={() => navigate(category.route)}
            >
              <div className="flex items-center mb-2">
                {/* Replace with dynamic icon logic if needed */}
                <House className="text-black mr-2" />
                <h3 className="text-lg font-medium text-black">{category.title}</h3>
              </div>
              <p className="text-2xl font-bold text-black">£{category.amount}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium">Total March Budget</h3>
            <p className="text-2xl font-bold">£{totalBudget}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium">Total Spending</h3>
            <p className="text-2xl font-bold">£{totalSpending}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium">Total Budget Remaining</h3>
            <p className="text-2xl font-bold">£{totalBudget - totalSpending}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetPlanner;
