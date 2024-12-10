import React from 'react';
import { useLocation } from 'react-router-dom';

interface SavingGoal {
  id: number;
  name: string;
  title: string;
  totalAmount: number;
  savedAmount: number;
  milestones: string[];
  image: string;
}

const savingGoals: SavingGoal[] = [
  {
    id: 1,
    title: 'Beach Vacation',
    name: 'beachvacation',
    image: 'Umbrella.png', // Replace with actual image URL
    totalAmount: 2000,
    savedAmount: 1400,
    milestones: [
      'Flights',
      'Hotel',
      'Activities',
    ],
  },
  {
    id: 2,
    title: 'New Car',
    name: 'newcar',
    image: 'Car.jpeg', 
    totalAmount: 7000,
    savedAmount: 1400,
    milestones: [
      'Buy the car',
      'Get insurance',
    ],
  },
  {
    id: 3,
    title: 'Coffee Machine',
    name: 'coffeemachine',
    image: 'Machine.jpg', 
    totalAmount: 1000,
    savedAmount: 700,
    milestones: [
      'Buy the machine',
      'Buy a coffee grinder',
    ],
  }
];

const GoalDetailHeader: React.FC<{ title: string }> = ({ title }) => (
  <header className="bg-white border-b p-6 flex justify-center">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
  </header>
);

const GoalDetailInfo: React.FC<{ goal: SavingGoal }> = ({ goal }) => {
  const amountRemaining = goal.totalAmount - goal.savedAmount;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 grid grid-cols-3 gap-4">
      <div className="flex flex-col items-center">
        <img
          src={goal.image}
          alt="Goal Image"
          className="w-full h-auto object-cover mb-4"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-4">
          <h3 className="font-medium text-gray-600">Total Amount</h3>
          <p className="text-2xl font-bold">£{goal.totalAmount}</p>
        </div>
        <div className="flex flex-col items-center mb-4">
          <h3 className="font-medium text-gray-600">Saved Amount</h3>
          <p className="text-2xl font-bold text-green-600">£{goal.savedAmount}</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-medium text-gray-600">Amount Remaining</h3>
          <p className="text-2xl font-bold text-red-600">£{amountRemaining}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="text-xl font-semibold mb-4">Milestones</h2>
        <div className="space-y-4">
          {goal.milestones.map((milestone, index) => (
            <div key={index} className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700">{milestone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GoalDetail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const goalCategory = queryParams.get('goal') || '';

  const goal = savingGoals.find((g) => g.name === goalCategory);

  if (!goal) {
    return <div>Goal not found!</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <GoalDetailHeader title={goal.title} />
      <main className="flex-1 overflow-y-auto p-8">
        <GoalDetailInfo goal={goal} />
      </main>
    </div>
  );
};

export default GoalDetail;
