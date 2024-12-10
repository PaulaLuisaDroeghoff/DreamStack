import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSavingGoal: React.FC = () => {
  const [goalTitle, setGoalTitle] = useState('');
  const [goalImage, setGoalImage] = useState('');
  const [totalAmount, setTotalAmount] = useState<number | string>('');
  const [savedAmount, setSavedAmount] = useState<number | string>('');
  const [milestones, setMilestones] = useState<string[]>(['']);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const navigate = useNavigate(); // Hook to navigate after closing the modal
  
  const handleMilestoneChange = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const removeMilestone = (index: number) => {
    const newMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(newMilestones);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate data before submitting
    if (!goalTitle || !goalImage || !totalAmount || !savedAmount || milestones.some(m => m.trim() === '')) {
      alert("Please fill in all the fields correctly.");
      return;
    }

    // Prepare the goal data for submission
    const newGoal = {
      title: goalTitle,
      image: goalImage,
      totalAmount: parseFloat(totalAmount.toString()),
      savedAmount: parseFloat(savedAmount.toString()),
      milestones,
    };

    console.log('Goal created:', newGoal);
    
    // Open the modal after goal creation
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal and redirect to the saving goals page
    setIsModalOpen(false);
    navigate('/savings'); // Redirect to the Saving Goals page
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b p-6">
        <h1 className="text-2xl font-bold text-gray-800">Create a Saving Goal</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <form onSubmit={handleSubmit}>
            {/* Goal Title */}
            <div className="mb-6">
              <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-600">Goal Title</label>
              <input
                id="goalTitle"
                type="text"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Goal Image */}
            <div className="mb-6">
              <label htmlFor="goalImage" className="block text-sm font-medium text-gray-600">Goal Image URL</label>
              <input
                id="goalImage"
                type="text"
                value={goalImage}
                onChange={(e) => setGoalImage(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Total Amount */}
            <div className="mb-6">
              <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-600">Total Amount</label>
              <input
                id="totalAmount"
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Saved Amount */}
            <div className="mb-6">
              <label htmlFor="savedAmount" className="block text-sm font-medium text-gray-600">Saved Amount</label>
              <input
                id="savedAmount"
                type="number"
                value={savedAmount}
                onChange={(e) => setSavedAmount(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Milestones */}
            <div className="mb-6">
              <label htmlFor="milestones" className="block text-sm font-medium text-gray-600">Milestones</label>
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="text"
                    value={milestone}
                    onChange={(e) => handleMilestoneChange(index, e.target.value)}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder={`Milestone ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addMilestone}
                className="text-black0 mt-2"
              >
                Add Milestone
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-black"
              >
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Modal for Goal Created */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold">Goal Created Successfully!</h3>
            <p className="mt-4">Your saving goal has been created successfully. You can now track your progress.</p>
            <div className="mt-4 space-x-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSavingGoal;
