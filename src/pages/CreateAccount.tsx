import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        day: '',
        month: '',
        year: '',
        street: '',
        city: '',
        postCode: '',
        country: '',
        email: '',
        password: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));

        // Validate password requirements
        if (e.target.name === 'password') {
            const password = e.target.value;
            setPasswordRequirements({
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /\d/.test(password),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div
            className="h-screen bg-cover bg-fixed pt-0"
            style={{
                backgroundImage: 'url(Wallpaper.png)', // Use your StarWallpaper.jpg file here
                backgroundSize: 'cover', // Ensures the wallpaper fills the entire screen
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', // Centers the image on the page
            }}
        >
            <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Account Creation</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="firstName" className="block font-medium mb-2">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" className="block font-medium mb-2">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="day" className="block font-medium mb-2">Day</label>
                            <input
                                type="text"
                                id="day"
                                name="day"
                                value={formData.day}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="month" className="block font-medium mb-2">Month</label>
                            <input
                                type="text"
                                id="month"
                                name="month"
                                value={formData.month}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year" className="block font-medium mb-2">Year</label>
                            <input
                                type="text"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="street" className="block font-medium mb-2">Street and House No.</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="border rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                            <label htmlFor="city" className="block font-medium mb-2">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postCode" className="block font-medium mb-2">Post Code</label>
                            <input
                                type="text"
                                id="postCode"
                                name="postCode"
                                value={formData.postCode}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="country" className="block font-medium mb-2">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="border rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="email" className="block font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password" className="block font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <ul className="password-requirements mt-2">
                            <li className={passwordRequirements.length ? 'text-green-500' : 'text-red-500'}>
                                At least 8 characters
                            </li>
                            <li className={passwordRequirements.uppercase ? 'text-green-500' : 'text-red-500'}>
                                At least 1 uppercase letter
                            </li>
                            <li className={passwordRequirements.lowercase ? 'text-green-500' : 'text-red-500'}>
                                At least 1 lowercase letter
                            </li>
                            <li className={passwordRequirements.number ? 'text-green-500' : 'text-red-500'}>
                                At least 1 number
                            </li>
                            <li className={passwordRequirements.special ? 'text-green-500' : 'text-red-500'}>
                                At least 1 special character
                            </li>
                        </ul>
                    </div>
                    <button type="submit" className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded w-full">
                        Create account
                    </button>
                </form>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4">Account Created Successfully!</h2>
                            <p className="mb-6">You can now proceed to the budget planning page.</p>
                            <a
                                href="budgetplanning"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Go to Budget Planning
                            </a>
                            <button
                                className="mt-4 text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                <div className="text-center mt-4">
                    <a href="login" className="text-black hover:underline">
                        Already got an account? Sign in here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
