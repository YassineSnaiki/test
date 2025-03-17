"use client"

import { useEffect, useState } from "react"

export default function HomePage() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [dropoffDate, setDropoffDate] = useState("")
  const [cars,setCars] = useState([]);
  console.log(cars);
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://carrental.test/api/cars");
        if (response.ok) {
            
            const res = await response.json();
            console.log(res);
          setCars(res.data); // Assuming the API returns an array of cars
        } else {
          console.error("Failed to fetch cars:", await response.json());
        }
      } catch (error) {
        console.error("An error occurred while fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
    // Handle search logic here
    console.log({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Find Your Perfect Rental Car</h2>
            <p className="text-xl">Best prices guaranteed, wide selection of vehicles</p>
          </div>

      
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              car.is_available ? (<div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={car.image || "/placeholder.svg"} alt={car.model} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{car.brand}</h3>
                    <span className="text-blue-600 font-bold">${car.price_per_day}/day</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4">{car.model}</span>
                    <span>{car.year}</span>
                  </div>
                  <a href={`/car/${car.id}`} className="w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Rent Now
                  </a>
                </div>
              </div>) : null
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-block bg-white text-blue-600 border border-blue-600 py-2 px-6 rounded-md hover:bg-blue-50 transition-colors"
            >
              View All Cars
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Car</h3>
              <p className="text-gray-600">
                Browse our wide selection of vehicles and choose the perfect one for your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Make a Reservation</h3>
              <p className="text-gray-600">Select your pickup and return dates and complete your booking in minutes.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Ride</h3>
              <p className="text-gray-600">Pick up your car at the designated location and enjoy your journey!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">John Smith</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Great service and excellent cars. The rental process was smooth and hassle-free. Will definitely use
                again!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I was impressed with the condition of the car and the competitive pricing. Customer service was
                excellent too!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Michael Brown</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The online booking system was easy to use and the pickup/drop-off process was quick. Highly recommend!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CarRental</h3>
              <p className="text-gray-400">
                The best car rental service with affordable prices and a wide selection of vehicles.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cars
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Locations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Rental Street, City</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@carrental.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-2">Subscribe to get special offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full text-gray-800 rounded-l-md focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CarRental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

