import React, { useState } from 'react';
import { Landmark, Trash2, PlusCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useBudgetStore from '../store'; // Import Zustand store

const BankConnectionsList = () => {
  const { bankConnections, removeConnection } = useBudgetStore(); // Access Zustand store
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [accountToRemove, setAccountToRemove] = useState<number | null>(null);
  const navigate = useNavigate();

  const initiateRemoveConnection = (id: number) => {
    setAccountToRemove(id);
    setShowConfirmModal(true);
  };

  const confirmRemoveConnection = () => {
    if (accountToRemove) {
      removeConnection(accountToRemove); // Remove connection via Zustand
      setShowConfirmModal(false);
      setAccountToRemove(null);
    }
  };

  const cancelRemoveConnection = () => {
    setShowConfirmModal(false);
    setAccountToRemove(null);
  };

  const handleAddNewConnection = () => {
    navigate('/connect');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 text-center w-80">
            <AlertCircle size={48} className="mx-auto mb-4" />
            <p className="font-bold mb-4">Are you sure you want to disconnect this account?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelRemoveConnection}
                className="px-4 py-2 border-2 border-black font-bold"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveConnection}
                className="px-4 py-2 bg-black text-white font-bold"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="pb-4 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Bank Connections</h1>
          </div>
        </div>

        {/* Connections List */}
        {bankConnections.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle size={48} className="mx-auto mb-4" />
            <p className="font-bold">No bank accounts connected</p>
            <p className="text-sm">Add a bank account to start tracking your finances</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bankConnections.map((connection) => (
              <div key={connection.id} className="p-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center mb-2">
                    <Landmark size={20} className="mr-2" />
                    <span className="font-bold">{connection.bankName}</span>
                  </div>
                  <div className="text-sm">
                    <p>{connection.accountType} - **** {connection.lastFourDigits}</p>
                    <p className="text-gray-600">Last synced: {connection.lastSynced}</p>
                  </div>
                </div>
                <button
                  onClick={() => initiateRemoveConnection(connection.id)}
                  className="hover:bg-gray-100 p-2 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Connection Button */}
        <div className="mt-6">
          <button
            onClick={handleAddNewConnection}
            className="w-full bg-black text-white p-3 font-bold flex items-center justify-center hover:bg-gray-800"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New Bank Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankConnectionsList;
