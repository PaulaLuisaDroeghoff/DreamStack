import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DollarSign, Zap, Truck, Wifi, ShoppingCart } from 'lucide-react';

interface SavingGoal {
  id: number;
  name: string;
  title: string;
  totalAmount: number;
  savedAmount: number;
  milestones: string[];
  image: string;
}

const GoalDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      ],
    }
  ];

  const queryParams = new URLSearchParams(location.search);
  const goalCategory = queryParams.get('goal') || '';

  const goal = savingGoals.find((g) => g.name === goalCategory);

  if (!goal) {
    return <div>Goal not found!</div>;
  }

  const amountRemaining = goal.totalAmount - goal.savedAmount;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b p-6">
        <h1 className="text-2xl font-bold text-gray-800">{goal.title}</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <img
              src={goal.image}
              alt="Goal Image"
              className="w-48 h-32 object-cover mr-6"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{goal.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-gray-600">Total Amount</h3>
              <p className="text-2xl font-bold">£{goal.totalAmount}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Saved Amount</h3>
              <p className="text-2xl font-bold text-green-600">£{goal.savedAmount}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Amount Remaining</h3>
              <p className="text-2xl font-bold text-red-600">£{amountRemaining}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Milestones</h3>
          <ul className="list-disc pl-6">
            {goal.milestones.map((milestone, index) => (
              <li key={index} className="text-gray-700 mb-2">{milestone}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default GoalDetail;
