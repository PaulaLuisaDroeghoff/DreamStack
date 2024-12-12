import React, { useState } from 'react';
import {
  Landmark,
  CreditCard,
  Hash,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useBudgetStore from '../store'; 

const OpenBankingConnection = () => {
  const [accountType, setAccountType] = useState('local');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [iban, setIban] = useState('');
  const [bic, setBic] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for "Account Found"
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal state for success
  const [isVerificationPending, setIsVerificationPending] = useState(false); // Control verification state

  const addConnection = useBudgetStore((state) => state.addConnection); // Accessing Zustand store function
  const navigate = useNavigate(); // Initialize navigate

  // Sample local and international bank lists
  const localBanks = ['Barclays', 'HSBC', 'Lloyds', 'NatWest'];
  const internationalBanks = ['Chase', 'Citi', 'Deutsche Bank', 'BNP Paribas'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation for both local and international
    if (accountType === 'local' && (!bankName || !accountNumber || !sortCode)) {
      setError('Please fill in all fields for the local bank account');
      return;
    } else if (accountType === 'international' && (!bankName || !iban || !bic)) {
      setError('Please fill in all fields for the international bank account');
      return;
    }

    // Open the "Account Found" modal
    setIsModalOpen(true);
    setIsVerificationPending(true); // Now we expect the verification code
  };

  const handleSubmitVerification = () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    // Close the "Account Found" modal and show the success modal
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);

    // Add the new connection to Zustand store
    const newConnection = {
      id: Date.now(), // Use a unique id (for simplicity, using the current timestamp)
      bankName,
      accountType,
      accountNumber: accountType === 'local' ? accountNumber : '',
      sortCode: accountType === 'local' ? sortCode : '',
      iban: accountType === 'international' ? iban : '',
      bic: accountType === 'international' ? bic : '',
      lastSynced: 'Just now', // You can add logic to track the last synced time
      lastFourDigits: accountType === 'local' ? accountNumber.slice(-4) : iban.slice(-4), // Extract last four digits
    };

    addConnection(newConnection); // Add the new connection to the Zustand store
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/bankconnections'); // Redirect to bankconnections page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <div className="p-4 flex items-center justify-center">
          <h2 className="text-2xl font-bold">Connect Bank Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Account Type Selector */}
          <div className="relative">
            <label className="block mb-2 font-bold flex items-center">
              <Landmark size={16} className="mr-2" />
              Select Account Type
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`py-2 px-4 rounded ${accountType === 'local' ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setAccountType('local')}
              >
                Local (UK)
              </button>
              <button
                type="button"
                className={`py-2 px-4 rounded ${accountType === 'international' ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setAccountType('international')}
              >
                International
              </button>
            </div>
          </div>

          {/* Bank Name Selector */}
          <div className="relative">
            <label htmlFor="bankName" className="block mb-2 font-bold flex items-center">
              <Landmark size={16} className="mr-2" />
              Bank Name
            </label>
            <div className="flex items-center border-2 border-gray-300">
              <select
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-2 outline-none"
              >
                <option value="">Select a Bank</option>
                {accountType === 'local'
                  ? localBanks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))
                  : internationalBanks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
              </select>
            </div>
          </div>

          {/* Fields for Local Account */}
          {accountType === 'local' && (
            <>
              <div className="relative">
                <label htmlFor="accountNumber" className="block mb-2 font-bold flex items-center">
                  <CreditCard size={16} className="mr-2" />
                  Account Number
                </label>
                <input
                  id="accountNumber"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 outline-none"
                  placeholder="Enter your account number"
                />
              </div>

              <div className="relative">
                <label htmlFor="sortCode" className="block mb-2 font-bold flex items-center">
                  <Hash size={16} className="mr-2" />
                  Sort Code
                </label>
                <input
                  id="sortCode"
                  type="text"
                  value={sortCode}
                  onChange={(e) => setSortCode(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 outline-none"
                  placeholder="Enter your sort code"
                />
              </div>
            </>
          )}

          {/* Fields for International Account */}
          {accountType === 'international' && (
            <>
              <div className="relative">
                <label htmlFor="iban" className="block mb-2 font-bold flex items-center">
                  <CreditCard size={16} className="mr-2" />
                  IBAN
                </label>
                <input
                  id="iban"
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 outline-none"
                  placeholder="Enter your IBAN"
                />
              </div>

              <div className="relative">
                <label htmlFor="bic" className="block mb-2 font-bold flex items-center">
                  <Hash size={16} className="mr-2" />
                  BIC
                </label>
                <input
                  id="bic"
                  type="text"
                  value={bic}
                  onChange={(e) => setBic(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 outline-none"
                  placeholder="Enter your BIC"
                />
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center justify-center text-red-600 font-bold">
              <AlertTriangle size={16} className="mr-2" />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 font-bold flex items-center justify-center hover:bg-gray-800"
          >
            Connect Account
            <ArrowRight size={16} className="ml-2" />
          </button>
        </form>
      </div>

      {/* Modal for Account Found */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h3 className="text-xl font-bold">Account Found!</h3>
            <p className="mt-4">Check your banking app and insert the verification code below.</p>
            <div className="mt-4">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full p-2 border-2 border-gray-300 outline-none"
              />
            </div>
            <div className="mt-4 space-x-4">
              <button
                onClick={handleSubmitVerification}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-grey-500 text-black px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h3 className="text-xl font-bold">Connection Created Successfully!</h3>
            <div className="mt-4">
              <button
                onClick={handleCloseSuccessModal}
                className="bg-black text-white px-4 py-2 rounded"
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

export default OpenBankingConnection;
