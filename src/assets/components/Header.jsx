import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Convert to boolean
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
    
            const response = await fetch("http://carrental.test/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                localStorage.removeItem("token"); // Remove token on successful logout
                setIsLoggedIn(false);
                navigate("/login"); // Redirect to login page
            } else {
                console.error("Logout failed:", await response.json());
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-blue-600">CarRental</h1>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8">
                    <a href="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </a>
                    <a href="/cars" className="text-gray-700 hover:text-blue-600">
                        Cars
                    </a>
                    <a href="/locations" className="text-gray-700 hover:text-blue-600">
                        Locations
                    </a>
                    <a href="/about" className="text-gray-700 hover:text-blue-600">
                        About
                    </a>
                    <a href="/contact" className="text-gray-700 hover:text-blue-600">
                        Contact
                    </a>
                </nav>

                {/* Authentication Links */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <a href="/login" className="text-gray-700 hover:text-blue-600">
                                Login
                            </a>
                            <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Sign Up
                            </a>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
