import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBasket, House, ReceiptText, CarFront, RollerCoaster, Dumbbell, Calendar, Plus, Star} from 'lucide-react';

interface BudgetCategory {
  icon: React.ElementType;
  name: string;
  amount: number;
  route: string;
}

const BudgetPlanner = () => {
  const navigate = useNavigate();
  const date = 'Monday, March 10, 2025';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { icon: CarFront, name: 'Transportation', amount: 63, route: '/transactionstransportation' },
    { icon: ReceiptText, name: 'Utilities', amount: 75, route: '/transactionsutilities' },
    { icon: House, name: 'Rent', amount: 1200, route: '/transactionsrent' },
    { icon: ShoppingBasket, name: 'Groceries', amount: 510, route: '/transactionsgroceries' },
    { icon: RollerCoaster, name: 'Entertainment', amount: 267, route: '/transactionsentertainment' },
    { icon: Dumbbell, name: 'Sports', amount: 150, route: '/transactionssports' },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '' });

  const handleAddCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, { ...newCategory, icon: Star, amount: 0, route: `/transactions${newCategory.name.toLowerCase()}` }]);
      setNewCategory({ name: '' });
      setIsModalOpen(false);
    }
  };

  const totalBudget = 2900;
  const totalSpending = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800 mr-8">Budget Planner</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Plus className="text-[#626be8]" />
          </button>
          <span className="flex items-center text-gray-500 ml-4">
            <Calendar className="mr-2" />
            {date}
          </span>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              className="w-full mb-4 p-2 border rounded"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#626be8] text-white rounded"
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
                <category.icon className="text-[#626be8] mr-2" />
                <h3 className="text-lg font-medium">{category.name}</h3>
              </div>
              <p className="text-2xl font-bold text-[#626be8]">£{category.amount}</p>
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
