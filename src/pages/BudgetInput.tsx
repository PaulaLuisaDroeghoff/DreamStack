import React, { useState } from "react";
import { Calendar } from "lucide-react"; // Import Lucide icons
import { useNavigate } from "react-router-dom"; // Use navigate to redirect
import { useToast } from "../components/ui/hooks/use-toast";

const initialSavingGoals = [
    { id: 1, title: "Beach Vacation", image: "Umbrella.png", targetAmount: 2000, remainingAmount: 600, allocatedAmount: 0 },
    { id: 2, title: "New Car", image: "Car.jpeg", targetAmount: 7000, remainingAmount: 5600, allocatedAmount: 0 },
    { id: 3, title: "Coffee Machine", image: "Machine.jpg", targetAmount: 1000, remainingAmount: 300, allocatedAmount: 0 },
];

const BudgetAllocation: React.FC = () => {
    const [totalBudget, setTotalBudget] = useState(""); // Total budget input by the user
    const [spendingBudget, setSpendingBudget] = useState(""); // Budget for spending
    const [savingGoals, setSavingGoals] = useState(initialSavingGoals); // List of saving goals
    const [showModal, setShowModal] = useState(false); // Modal state to control visibility

    const navigate = useNavigate(); // Hook for navigation

    const {toast} = useToast();

    // Get the current month
    const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

    // Handle saving goal allocation change
    const handleSavingGoalChange = (id: number, value: number) => {
        setSavingGoals((prevGoals) =>
            prevGoals.map((goal) =>
                goal.id === id
                    ? { ...goal, allocatedAmount: value }
                    : goal
            )
        );
    };

    const handleBudgetSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Calculate the total allocated budget
        const allocatedTotal =
            Number(spendingBudget) + savingGoals.reduce((acc, goal) => acc + goal.allocatedAmount, 0);

        if (allocatedTotal !== Number(totalBudget)) {
            toast({title: "Total allocation does not equal budget input",description:"Please allocate the total budget across spending and saving goals."});
        } else {
            toast({title: "Budget allocated successfully!"});
            setShowModal(true); // Show modal upon successful submission
        }
    };

    // Handle modal close and redirect
    const handleModalClose = () => {
        setShowModal(false); // Close modal
        navigate("/budgetplanning"); // Redirect to budget planning page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-white text-black p-6">
            {/* Page Header */}
            <div className="w-full flex justify-between items-center mb-8 p-6">
                <h1 className="text-2xl font-bold">Budget Allocation</h1>
                <div className="flex items-center">
                    <Calendar className="text-gray-600 mr-2" size={24} />
                    <span className="text-xl">{currentMonth}</span>
                </div>
            </div>

            {/* Budget Allocation Form */}
            <div className="w-full max-w-7xl px-6">
                <form onSubmit={handleBudgetSubmit} className="space-y-6">
                    {/* Total Budget Section */}
                    <div>
                        <label htmlFor="totalBudget" className="block text-lg font-medium mb-2">
                            Total Budget
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md bg-white">
                            <input
                                type="number"
                                id="totalBudget"
                                value={totalBudget}
                                onChange={(e) => setTotalBudget(e.target.value)}
                                className="w-full p-3 border-none outline-none"
                                placeholder="Enter your total budget"
                                required
                            />
                        </div>
                    </div>

                    {/* Spending Budget Section */}
                    <div>
                        <label htmlFor="spendingBudget" className="block text-lg font-medium mb-2">
                            Add to: Spending Budget
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md bg-white">
                            <input
                                type="number"
                                id="spendingBudget"
                                value={spendingBudget}
                                onChange={(e) => setSpendingBudget(e.target.value)}
                                className="w-full p-3 border-none outline-none"
                                placeholder="Allocate spending budget"
                            />
                        </div>
                    </div>

                    {/* Saving Goals Section */}
                    <div className="mt-6">
                        <h2 className="text-lg font-medium mb-2"> Add to: Saving Goals</h2>
                        <div className="flex justify-evenly space-x-6 mb-6">
                            {savingGoals.map((goal) => (
                                <div key={goal.id} className="flex flex-col items-center p-4 bg-white shadow-md rounded-md w-48 border border-gray-300">
                                    <img src={goal.image} alt={goal.title} className="w-30 h-24 object-contain"/>
                                    <h3 className="text-lg font-medium mb-2">{goal.title}</h3>
                                    <p className="text-sm text-gray-600">Target: £{goal.targetAmount}</p>
                                    <p className="text-sm text-gray-600">Remaining: £{goal.remainingAmount}</p>
                                    <input
                                        type="number"
                                        value={goal.allocatedAmount}
                                        onChange={(e) => handleSavingGoalChange(goal.id, Number(e.target.value))}
                                        className="mt-2 p-2 border border-gray-300 rounded-md text-center"
                                        min={0}
                                        max={goal.remainingAmount}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-6 bg-black text-white rounded-md hover:bg-gray-800"
                    >
                        Submit Budget Allocation
                    </button>
                </form>
            </div>

            {/* Modal after successful budget submission */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-2xl font-bold text-black mb-4">Budget Allocated Successfully!</h2>
                        <p className="text-lg text-gray-600 mb-6">Your budget allocation was successful. Click below to proceed.</p>
                        <button
                            onClick={handleModalClose}
                            className="w-full py-3 bg-black text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetAllocation;
