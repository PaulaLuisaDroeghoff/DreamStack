import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Goal, Plus } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface SavingGoal {
  image: string;
  name: string;
  progress: number;
  route: string;
}

const SavingGoals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<SavingGoal[]>([
    {
      image: "/Umbrella.png", 
      name: 'Beach Vacation',
      progress: 70,
      route: '/goaldetail?goal=beachvacation',
    },
    {
      image: 'Car.jpeg',
      name: 'New Car',
      progress: 25,
      route: '/goaldetail?goal=newcar',
    },
    {
      image: '/Machine.jpg',
      name: 'Coffee Machine',
      progress: 70,
      route: '/goaldetail?goal=coffeemachine',
    },
  ]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800 mr-4">Saving Goals</h1>
          <button
            onClick={() => navigate('/addgoal')} // Direct to goal addition page
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Plus className="text-[#000000]" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:shadow-xl"
              onClick={() => navigate(goal.route)}
            >
              {/* Goal Name */}
              <h3 className="text-lg font-medium text-center">{goal.name}</h3>

              {/* Goal Image */}
              <img
                src={goal.image}
                alt={goal.name}
                className="w-48 h-32 object-contain"
              />
              
              {/* Circular Progress Bar (Pie Chart) */}
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={goal.progress}
                  text={`${goal.progress}%`}
                  strokeWidth={8}
                  styles={buildStyles({
                    pathColor: '#000000',
                    textColor: '#000000',
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SavingGoals;
