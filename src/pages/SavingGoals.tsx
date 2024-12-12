import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash } from 'lucide-react'; // Importing the Trash icon
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useBudgetStore from '../store';

const SavingGoals = () => {
  const navigate = useNavigate();
  const { savingGoals, addSavingGoal, deleteSavingGoal } = useBudgetStore();

  const [showModal, setShowModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    setGoalToDelete(index); // Set the index of the goal to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  const confirmDelete = () => {
    if (goalToDelete !== null) {
      // Remove the selected goal
      deleteSavingGoal(goalToDelete);
    }
    setShowModal(false); // Close the modal
    setGoalToDelete(null); // Reset the index
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
    setGoalToDelete(null); // Reset the index
  };

  const handleGoalClick = (route: string) => {
    navigate(route);  // Navigate to the path defined in the goal's route
  };

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
          {savingGoals.map((goal, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 relative flex flex-col items-center justify-center space-y-4 cursor-pointer hover:shadow-xl"
              onClick={() => handleGoalClick(goal.route)} // Add click handler for navigation
            >
              {/* Goal Name */}
              <h3 className="text-lg font-medium text-center">{goal.title}</h3>

              {/* Goal Image */}
              <img
                src={goal.image}
                alt={goal.title}
                className="w-48 h-32 object-contain"
              />

              {/* Circular Progress Bar (Pie Chart) */}
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={goal.progress}
                  text={`${Math.round(goal.progress)}%`}
                  strokeWidth={8}
                  styles={buildStyles({
                    pathColor: '#000000',
                    textColor: '#000000',
                  })}
                />
              </div>

              {/* Trash Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from triggering navigation
                  handleDelete(index);
                }}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-white hover:bg-white"
              >
                <Trash className="text-black" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-black mb-4">Are you sure?</h2>
            <p className="text-gray-700 mb-4">
              Do you really want to delete this saving goal? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-black"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingGoals;
