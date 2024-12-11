import React, { useState } from 'react';
import { CreditCard, Calendar, DollarSign, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageMembership = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
    const [isCancelSuccessPopupOpen, setIsCancelSuccessPopupOpen] = useState(false);
    const [isPaymentSuccessPopupOpen, setIsPaymentSuccessPopupOpen] = useState(false);
    const navigate = useNavigate();

    const subscriptionDetails = {
        plan: 'Monthly Renewing Plan',
        card: '**** **** **** 1234',
        nextPaymentDate: '2024-01-15',
        amountPerMonth: '4.99',
        currency: 'GBP',
    };

    // Get the current year
    const currentYear = new Date().getFullYear();
    // Create a list of future years (e.g., current year and the next 10 years)
    const years = Array.from({ length: 11 }, (_, index) => currentYear + index);

    // List of months (January to December)
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCancelClick = () => {
        setIsCancelPopupOpen(true);
    };

    const handleCancelConfirm = () => {
        setIsCancelPopupOpen(false);
        setIsCancelSuccessPopupOpen(true);
    };

    const handleCancelSuccessClose = () => {
        setIsCancelSuccessPopupOpen(false);
        navigate('/budgetplanning');
    };

    const handleCancelReject = () => {
        setIsCancelPopupOpen(false);
        navigate('/managemembership');
    };

    const handlePaymentMethodChange = () => {
        setIsModalOpen(false);
        setIsPaymentSuccessPopupOpen(true);
    };

    const handlePaymentSuccessClose = () => {
        setIsPaymentSuccessPopupOpen(false);
        navigate('/budgetplanning');
    };

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Membership</h1>
            <div className="max-w-xl mx-auto space-y-6">
                {/* Subscription Plan */}
                <div className="flex items-center space-x-4">
                    <Calendar size={24} className="text-black" />
                    <div>
                        <p className="font-medium text-lg">Plan</p>
                        <p className="text-gray-700">{subscriptionDetails.plan}</p>
                    </div>
                </div>

                {/* Card Details */}
                <div className="flex items-center space-x-4">
                    <CreditCard size={24} className="text-black" />
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="font-medium text-lg">Payment Method</p>
                            <p className="text-gray-700">{subscriptionDetails.card}</p>
                        </div>
                        <button onClick={handleEditClick} className="text-black hover:text-gray-700">
                            <Edit3 size={20} />
                        </button>
                    </div>
                </div>

                {/* Next Payment */}
                <div className="flex items-center space-x-4">
                    <Calendar size={24} className="text-black" />
                    <div>
                        <p className="font-medium text-lg">Next Payment Date</p>
                        <p className="text-gray-700">{subscriptionDetails.nextPaymentDate}</p>
                    </div>
                </div>

                {/* Payment Amount */}
                <div className="flex items-center space-x-4">
                    <DollarSign size={24} className="text-black" />
                    <div>
                        <p className="font-medium text-lg">Amount Per Month</p>
                        <p className="text-gray-700">
                            {subscriptionDetails.currency} {subscriptionDetails.amountPerMonth}
                        </p>
                    </div>
                </div>

                {/* Cancel Membership */}
                <div className="text-center mt-6">
                    <button
                        onClick={handleCancelClick}
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                    >
                        Cancel Membership
                    </button>
                </div>
            </div>

            {/* Modal for Editing Payment Method */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                        <p className="text-sm text-gray-600 mb-4">Add a new payment method to your membership.</p>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Card number</label>
                                <input
                                    type="text"
                                    placeholder="Card number"
                                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ring-black"
                                />
                            </div>

                            <div className="flex space-x-3">
                                <div>
                                    <label className="block text-sm font-medium">Expires</label>
                                    <select className="border rounded-lg p-2 focus:outline-none focus:ring-2 ring-black">
                                        {months.map((month, index) => (
                                            <option key={index} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Year</label>
                                    <select className="border rounded-lg p-2 focus:outline-none focus:ring-2 ring-black">
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">CVC</label>
                                    <input
                                        type="text"
                                        placeholder="CVC"
                                        className="w-16 border rounded-lg p-2 focus:outline-none focus:ring-2 ring-black"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={handlePaymentMethodChange}
                            className="bg-black text-white w-full mt-4 py-2 rounded hover:bg-gray-800"
                        >
                            Continue
                        </button>

                        {/* Close Modal */}
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 text-gray-600 hover:text-black w-full text-center"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Cancel Membership Popup */}
            {isCancelPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <p className="text-lg font-medium mb-4">Are you sure?</p>
                        <p className="text-sm text-gray-600 mb-6">You will lose access to all premium features.</p>
                        <div className="flex justify-around">
                            <button
                                onClick={handleCancelConfirm}
                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleCancelReject}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Success Popup */}
            {isCancelSuccessPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <p className="text-lg font-medium mb-4">You successfully cancelled your membership.</p>
                        <button
                            onClick={handleCancelSuccessClose}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Payment Success Popup */}
            {isPaymentSuccessPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <p className="text-lg font-medium mb-4">Payment method changed successfully.</p>
                        <button
                            onClick={handlePaymentSuccessClose}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMembership;
