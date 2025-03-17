"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

export default function Car() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/login");
    }
    const fetchCar = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://carrental.test/api/cars/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch car details")
        }

        const data = await response.json()
        console.log(data);
        setCar(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [id, navigate])

  const handleBooking = async (e) => {
    e.preventDefault();

    // Calculate the number of days between startDate and endDate
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate the total price using the car's price per day
    const totalPrice = car.price_per_day * diffDays;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://carrental.test/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          car_id: car.id,
          start_date: startDate,
          end_date: endDate,
          total_price: totalPrice
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Booking failed:", errorData);
        // Optionally, you could set an error state here to display to the user.
      } else {
        const bookingData = await response.json();
        console.log("Booking successful:", bookingData);
        location.href = bookingData.url;
        // Optionally, redirect or update the UI as needed after booking.
      }
    } catch (error) {
      console.error("An error occurred during booking:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
            <Link
              to="/cars"
              className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
            >
              Back to Cars
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Car Not Found</h2>
          <p>We couldn't find the car you're looking for.</p>
          <Link to="/cars" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Browse Available Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/cars" className="text-blue-600 hover:underline flex items-center">
            ← Back to Cars
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Car Image */}
            <div className="md:w-1/2">
              <img
                src={car.image || "/placeholder.svg?height=400&width=600"}
                alt={car.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Car Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900">{car.brand}</h1>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {car.is_available ? "Available" : "Not Available"}
                </span>
              </div>

              <div className="mt-4">
                <span className="text-2xl font-bold text-blue-600">${car.price_per_day}/day</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Model</span>
                  <span className="font-medium">{car.model}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Year</span>
                  <span className="font-medium">{car.year}</span>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">
                  {car.description || "A comfortable and reliable vehicle for your journey."}
                </p>
              </div>

              {/* Features/Amenities */}
              {car.features && car.features.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Features</h2>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {car.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="border-t border-gray-200 p-6 md:p-8 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Book This Car</h2>
            <form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date*
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date*
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
