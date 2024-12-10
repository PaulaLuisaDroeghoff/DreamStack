import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import WebAuthnFingerprintDemo from "./Fingerprint";
import Button from "@mui/material/Button";

const LogIn2: React.FC = () => {
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false); // Modal visibility state
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Forgot password modal
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState(""); // Verification code state

    const handleLoginSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Show authentication modal for verification
        setShowAuthModal(true);
    };

    const handleCloseModal = () => {
        setShowAuthModal(false);
        setShowForgotPasswordModal(false);
    };

    const handleForgotPasswordSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Simulate password reset email sent
        toast.success("Password reset email sent. Please check your inbox.");
        handleCloseModal();
    };

    const handleCodeVerification = () => {
        if (verificationCode === "123456") { // Example: Correct code
            toast.success("Verification successful!");
            navigate("/budget-planner"); // Redirect after successful login
        } else {
            toast.error("Incorrect verification code.");
        }
    };

    const handleFingerprintVerification = () => {
        // Example: Successful fingerprint authentication
        toast.success("Fingerprint verification successful!");
        navigate("/budget-planner"); // Redirect after successful login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex w-full max-w-4xl p-8">
                {/* Left Section: Image */}
                <div className="w-1/2">
                    <img
                        src="Hands.png"
                        alt="Login Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Section: Login Form */}
                <div className="w-1/2 p-8">
                    <h1 className="text-4xl font-bold text-black mb-6 text-center">
                        Sign In
                    </h1>
                    <form className="space-y-6" onSubmit={handleLoginSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-black">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mt-2 border border-black rounded-md"
                                placeholder="example@domain.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-black">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mt-2 border border-black rounded-md"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={() => setShowForgotPasswordModal(true)}
                                className="text-sm text-black"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button type="submit" className="w-full py-3 mt-4 bg-black text-white rounded-md">
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
                                    className="block text-sm font-medium text-black"
                                >
                                    Enter Verification Code
                                </label>
                                <input
                                    type="text"
                                    id="verificationCode"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="w-full p-3 mt-2 border border-black rounded-md"
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

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-2xl font-bold text-black mb-4">Reset Password</h2>
                        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
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
                            className="mt-4 text-sm text-black"
                        >
                            Go Back to Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogIn2;
