import React from 'react';
import { ShoppingBasket, House, ReceiptText, CarFront, RollerCoaster, Dumbbell, Calendar } from 'lucide-react';

const BudgetPlanner = () => {
  const date = 'Monday, March 10, 2025';

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800 mr-8">March Budget Planner</h1>
          <span className="flex items-center text-gray-500">
            <Calendar className="mr-2" />
            {date}
          </span>
        </div>
        {/* Existing header content */}
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4 h-32">
            <div className="flex items-center mb-2">
              <CarFront className="text-[#626be8] mr-2" />
              <h3 className="text-lg font-medium">Transportation</h3>
            </div>
            <p className="text-2xl font-bold text-[#626be8]">£63</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 h-32">
            <div className="flex items-center mb-2">
              <ReceiptText className="text-[#626be8] mr-2" />
              <h3 className="text-lg font-medium">Utilities</h3>
            </div>
            <p className="text-2xl font-bold text-[#626be8]">£75</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 h-32">
            <div className="flex items-center mb-2">
              <House className="text-[#626be8] mr-2" />
              <h3 className="text-lg font-medium">Rent</h3>
            </div>
            <p className="text-2xl font-bold text-[#626be8]">£1,200</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 h-32">
            <div className="flex items-center mb-2">
              <ShoppingBasket className="text-[#626be8] mr-2" />
              <h3 className="text-lg font-medium">Groceries</h3>
            </div>
            <p className="text-2xl font-bold text-[#626be8]">£510</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 h-32">
            <div className="flex items-center mb-2">
              <RollerCoaster className="text-[#626be8] mr-2" />
              <h3 className="text-lg font-medium">Entertainment</h3>
            </div>
            <p className="text-2xl font-bold text-[#626be8]">£267</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 h-32">
            <div className="flex items-center mb-2">
              <Dumbbell className="text-[#626be8] mr-2" />
              <h3 className="text-lg font-medium">Sports</h3>
            </div>
            <p className="text-2xl font-bold text-[#626be8]">£150</p>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Total March Budget</h3>
            <p className="text-2xl font-bold">£2,900</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Total Spending</h3>
            <p className="text-2xl font-bold">£2,265</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Total Budget Left</h3>
            <p className="text-2xl font-bold">£635</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-gray-500">
        <div className="container mx-auto">
          <p>&copy; 2024 DreamStack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

