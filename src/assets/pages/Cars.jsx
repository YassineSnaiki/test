"use client"

import { useState, useEffect } from "react"

export default function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0,
    next_page_url: null,
    prev_page_url: null,
  })

  const fetchCars = async (url = "http://carrental.test/api/cars") => {
    setLoading(true)
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch cars")
      }

      const data = await response.json()

      setCars(data.data)
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: data.per_page,
        total: data.total,
        from: data.from,
        to: data.to,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const handlePageChange = (url) => {
    if (url) {
      fetchCars(url)
      // Scroll to top when changing pages
      window.scrollTo(0, 0)
    }
  }

  if (loading && cars.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => fetchCars()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
          <p className="mt-2 text-gray-600">Choose from our wide selection of rental vehicles</p>
        </div>

        {/* Filters - You can expand this section as needed */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">
                Showing {pagination.from}-{pagination.to} of {pagination.total} cars
              </span>
            </div>
            
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={car.image || "/placeholder.svg?height=200&width=300"}
                alt={car.name || "Car"}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{car.name || "Car Name"}</h3>
                  <span className="text-blue-600 font-bold">${car.price_per_day || car.price || 50}/day</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="mr-4">{car.category || "Sedan"}</span>
                  <span className="mr-4">{car.seats || 5} Seats</span>
                  <span>{car.transmission || "Automatic"}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {car.description || "A comfortable and reliable vehicle for your journey."}
                </p>
                <div className="flex space-x-2">
                  <a href={`/car/${car.id}`}  className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.last_page > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(pagination.prev_page_url)}
                disabled={!pagination.prev_page_url}
                className={`px-4 py-2 rounded-md ${
                  pagination.prev_page_url
                    ? "bg-white text-blue-600 border border-gray-300 hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(`http://carrental.test/api/cars?page=${page}`)}
                  className={`px-4 py-2 rounded-md ${
                    pagination.current_page === page
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(pagination.next_page_url)}
                disabled={!pagination.next_page_url}
                className={`px-4 py-2 rounded-md ${
                  pagination.next_page_url
                    ? "bg-white text-blue-600 border border-gray-300 hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}