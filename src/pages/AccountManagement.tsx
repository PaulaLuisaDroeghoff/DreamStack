import React, { useState } from 'react';
import { Bell, BellOff, Edit, Trash } from 'lucide-react';
import useBudgetStore from '../store'; // Import Zustand store

const AccountManagement = () => {
  const {
    userData,
    passwordData,
    passwordMessage,
    editingField,
    isPasswordModalOpen,
    isDeleteModalOpen,
    updateUserData,
    toggleNotifications,
    setEditingField,
    handlePasswordChange,
    setPasswordMessage,
    togglePasswordModal,
    toggleDeleteModal,
    resetPasswordData,
  } = useBudgetStore();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
  
    // If it's a checkbox (boolean), use `checked`, otherwise use `value`
    const newValue = type === 'checkbox' ? checked : value;
  
    // Only update the userData with the correct type
    updateUserData(name, newValue as string); // Ensuring it is treated as a string
  };

  const handlePasswordSubmit = () => {
    const passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRequirements.test(passwordData.newPassword)) {
      setPasswordMessage('New password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.');
    } else {
      setPasswordMessage('');
      resetPasswordData();
      togglePasswordModal();
      setIsSuccessModalOpen(true);
    }
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

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Account Management</h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Account Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            {['firstName', 'lastName', 'dateOfBirth', 'street', 'postCode', 'city', 'country'].map((field) => (
              <div className="flex items-center" key={field}>
                <label className="font-medium w-48">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                </label>
                {editingField === field ? (
                  field === 'notificationsEnabled' ? (
                    <input
                      type="checkbox"
                      name={field}
                      checked={userData[field as keyof typeof userData] as boolean}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="flex-grow"
                    />
                  ) : (
                    <input
                      type={field === 'dateOfBirth' ? 'date' : 'text'}
                      name={field}
                      value={String(userData[field as keyof typeof userData])}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="border rounded px-3 py-2 flex-grow"
                    />
                  )
                ) : (
                  <span className="flex-grow">{userData[field as keyof typeof userData]}</span>
                )}
                <button
                  onClick={() => handleEditField(field)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <Edit size={20} />
                </button>
              </div>
            ))}
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
              {userData.notificationsEnabled ? (
                <Bell size={20} />
              ) : (
                <BellOff size={20} />
              )}
            </button>
            <span className="ml-3 text-gray-700">
              {userData.notificationsEnabled ? 'On' : 'Off'}
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
                  value={userData.email}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="border rounded px-3 py-2 flex-grow"
                />
              ) : (
                <span className="flex-grow">{userData.email}</span>
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
                onClick={togglePasswordModal}
                className="text-black underline flex-grow"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Button */}
      <button
        onClick={toggleDeleteModal}
        className="absolute bottom-4 left-4 text-black flex items-center"
      >
        <Trash size={20} />
        <span className="ml-2">Delete Account</span>
      </button>

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">This action cannot be undone.</p>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            >
              Yes, Delete
            </button>
            <button
              onClick={toggleDeleteModal}
              className="bg-gray-300 text-black py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Old Password:</label>
              <input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">New Password:</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            {passwordMessage && (
              <p className="text-red-500 text-sm mb-4">{passwordMessage}</p>
            )}
            <div className="flex justify-between">
              <button
                onClick={handlePasswordSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={togglePasswordModal}
                className="bg-gray-300 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
