import React, { useState } from 'react';
import { Bell, BellOff, Edit } from 'lucide-react';

const AccountManagement = () => {
  const [formData, setFormData] = useState({
    firstName: 'David',
    lastName: 'Smith',
    dateOfBirth: '1990-01-01',
    street: '123 Main St',
    postCode: '12345',
    city: 'London',
    country: 'United Kingdom',
    email: 'user@dreamstack.com',
    notificationsEnabled: true,
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prevData) => ({
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
    if (editingField === field) {
      handleSave(); // Save the data when toggling off
    } else {
      setEditingField(field);
    }
  };
  

  const handleSave = () => {
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handlePasswordSubmit = () => {
    const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRequirements.test(passwordData.newPassword)) {
      setPasswordMessage('New password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.');
    } else {
      setPasswordMessage('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '' });
    }
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="text-black underline flex-grow"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div className="space-y-4">
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Old Password"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="border rounded px-3 py-2 w-full"
              />
              <button
                onClick={handlePasswordSubmit}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 mt-2"
              >
                Close
              </button>
              {passwordMessage && (
                <p className={`mt-2 text-sm ${passwordMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                  {passwordMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
