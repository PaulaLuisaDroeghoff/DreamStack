import React, { useState } from 'react';
import { Bell, BellOff, Edit } from 'lucide-react';

const AccountManagement = () => {
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        street: '123 Main St',
        postCode: '12345',
        city: 'Springfield',
        country: 'USA',
        email: 'john.doe@example.com',
        notificationsEnabled: true,
    });

    const [editingField, setEditingField] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const toggleNotifications = () => {
        setFormData((prevData) => ({
            ...prevData,
            notificationsEnabled: !prevData.notificationsEnabled,
        }));
    };

    const handleEditField = (field: string) => {
        setEditingField(field);
    };

    const handleSave = () => {
        setEditingField(null);
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Account Management</h1>

            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Account Information */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
                    <div className="space-y-4">
                        {/* First Name */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">First Name:</label>
                            {editingField === 'firstName' ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{formData.firstName}</span>
                            )}
                            <button
                                onClick={() => handleEditField('firstName')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <Edit size={20} />
                            </button>
                        </div>

                        {/* Last Name */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">Last Name:</label>
                            {editingField === 'lastName' ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{formData.lastName}</span>
                            )}
                            <button
                                onClick={() => handleEditField('lastName')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <Edit size={20} />
                            </button>
                        </div>

                        {/* Date of Birth */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">Date of Birth:</label>
                            {editingField === 'dateOfBirth' ? (
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{formData.dateOfBirth}</span>
                            )}
                            <button
                                onClick={() => handleEditField('dateOfBirth')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <Edit size={20} />
                            </button>
                        </div>

                        {/* Street */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">Street & House No:</label>
                            {editingField === 'street' ? (
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{formData.street}</span>
                            )}
                            <button
                                onClick={() => handleEditField('street')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <Edit size={20} />
                            </button>
                        </div>

                        {/* Postcode */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">Postcode:</label>
                            {editingField === 'postCode' ? (
                                <input
                                    type="text"
                                    name="postCode"
                                    value={formData.postCode}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{formData.postCode}</span>
                            )}
                            <button
                                onClick={() => handleEditField('postCode')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <Edit size={20} />
                            </button>
                        </div>

                        {/* City */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">City:</label>
                            {editingField === 'city' ? (
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{formData.city}</span>
                            )}
                            <button
                                onClick={() => handleEditField('city')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <Edit size={20} />
                            </button>
                        </div>

                        {/* Country */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">Country:</label>
                            {editingField === 'country' ? (
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{formData.country}</span>
                            )}
                            <button
                                onClick={() => handleEditField('country')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <Edit size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
                    <div className="flex items-center">
                        <label className="font-medium w-48">Notifications:</label>
                        <button
                            onClick={toggleNotifications}
                            className="ml-2 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {formData.notificationsEnabled ? (
                                <Bell size={20} />
                            ) : (
                                <BellOff size={20} />
                            )}
                        </button>
                        <span className="ml-3 text-gray-700">
                            {formData.notificationsEnabled ? 'On' : 'Off'}
                        </span>
                    </div>
                </div>

                {/* Login Information */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Login Information</h2>
                    <div className="space-y-4">
                        {/* Email */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">Email:</label>
                            {editingField === 'email' ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{formData.email}</span>
                            )}
                            <button
                                onClick={() => handleEditField('email')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                <Edit size={20} />
                            </button>
                        </div>

                        {/* Change Password */}
                        <div className="flex items-center">
                            <label className="font-medium w-48">Password:</label>
                            <a
                                href="/changepassword"
                                className="text-blue-500 hover:underline flex-grow"
                            >
                                Change Password
                            </a>
                        </div>
                    </div>
                </div>

                {/* Save Changes */}
                {editingField && (
                    <button
                        onClick={handleSave}
                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
};

export default AccountManagement;
