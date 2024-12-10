import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WebAuthnFingerprintDemo from "./Fingerprint";
import { toast } from "react-hot-toast";

const LogIn: React.FC = () => {
    const navigate = useNavigate();
    const imageSrc = "Hands.png"; // Replace with the correct image path
    const [showAuthModal, setShowAuthModal] = useState(false); // Modal visibility state
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [emailSent, setEmailSent] = useState(false); // Track if email has been sent
    const [verificationCode, setVerificationCode] = useState(""); // Verification code state

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Show authentication modal for verification
        setShowAuthModal(true);
    };

    const handleForgotPasswordClick = () => {
        setShowModal(true); // Show the modal when "Forgot Password?" is clicked
    };

    const handleCloseModal = () => {
        setShowModal(false); // Hide the modal when "Go Back to Login" is clicked
    };

    const handlePasswordResetSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle password reset logic here (e.g., send reset email)
        // After submission, show the success message
        setEmailSent(true); // Show success message
    };

    const handleCodeVerification = () => {
        navigate("/budgetplanning"); // Redirect after successful login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex w-full max-w-4xl p-8">
                {/* Left Section: Image */}
                <div className="w-1/2">
                    <img
                        src={imageSrc}
                        alt="Login Image"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Section: Login Form */}
                <div className="w-1/2 p-8">
                    <h1 className="text-4xl font-bold text-black mb-6 text-center">
                        Sign In
                    </h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-black"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 mt-2 border border-black rounded-md"
                                placeholder="example@domain.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-black"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-3 mt-2 border border-black rounded-md"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                {/* Custom checkbox */}
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="h-5 w-5 text-black border-black rounded-sm focus:ring-0 checked:bg-black checked:border-black"
                                />
                                <label htmlFor="rememberMe" className="text-sm text-black">
                                    Remember Me
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPasswordClick}
                                className="text-sm text-black"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-black text-white rounded-md"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-black">
                        Don't have an account?{" "}
                        <a href="/createaccount" className="text-black font-bold">
                            Sign up here
                        </a>

                    </div>
                </div>
            </div>

                        {/* Authentication Modal */}
                        {showAuthModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-2xl font-bold text-black mb-4">
                            Verify Your Identity
                        </h2>
                        <div className="space-y-4">
                            <WebAuthnFingerprintDemo/>
                            <div>
                                <label
                                    htmlFor="verificationCode"
                                    className="block text-lg font-semibold  text-center text-black"
                                >
                                    OR
                                </label>
                                <label
                                    htmlFor="verificationCode"
                                    className="block text-lg  text-center text-black"
                                >
                                    Enter Verification Code
                                </label>
                                <input
                                    type="text"
                                    id="verificationCode"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="w-full p-3 mt-2 border border-grey rounded-md"
                                    placeholder="Enter code sent to your email"
                                />
                            </div>
                            <button
                                onClick={handleCodeVerification}
                                className="w-full py-3 mt-2 bg-black text-white rounded-md"
                            >
                                Verify Code
                            </button>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 text-sm text-black"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Forgot Password */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        {emailSent ? (
                            // Success message after email is sent
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-4">
                                    Check your emails to reset your password.
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="mt-4 text-sm text-black hover:text-black"
                                >
                                    Go Back to Login
                                </button>
                            </div>
                        ) : (
                            // Password reset form
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-4">
                                    Reset Password
                                </h2>
                                <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="resetEmail"
                                            className="block text-sm font-medium text-black"
                                        >
                                            Enter your email
                                        </label>
                                        <input
                                            type="email"
                                            id="resetEmail"
                                            className="w-full p-3 mt-2 border border-black rounded-md"
                                            placeholder="example@domain.com"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 mt-4 bg-black text-white rounded-md"
                                    >
                                        Send Reset Link
                                    </button>
                                </form>
                                <button
                                    onClick={handleCloseModal}
                                    className="mt-4 text-sm text-black hover:text-balck"
                                >
                                    Go Back to Login

                                </button>
                                <WebAuthnFingerprintDemo/>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogIn;
