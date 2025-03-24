"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function MyTickets() {
  const [tickets, setTickets] = useState([])
  const [newTicket, setNewTicket] = useState({title: "", description: ""})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
          navigate("/login");
        }
        const fetchTickets = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/my-tickets", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                
                const data = await response.json();
           
                
        setTickets(data.data);
       console.log(data.data);
       
        setLoading(false)
        
      } catch (err) {
        console.error("Failed to fetch tickets:", err)
        setError("Failed to load tickets. Please try again later.")
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const getStatusColor = (status) => {
 
    
    switch (status?.toLowerCase()) {
      case "created":
        return "bg-blue-500 text-white"
      case "open":
        return "bg-yellow-500 text-white"
      case "closed":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newTicket?.title || !newTicket?.description) {
      alert("Please fill in all fields")
      return
    }

    try {
      const token = localStorage.getItem("token")

      const response = await fetch("http://127.0.0.1:8000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTicket),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      console.log(data);
      
      // Add the new ticket to the list
      setTickets(tickets=>[data,...tickets]);
      
      // Reset form and hide it
      setNewTicket({ title: "", description: "" })
      setShowForm(false)
    } catch (err) {
      console.error("Failed to create ticket:", err)
      alert("Failed to create ticket. Please try again.")
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTicket({
      ...newTicket,
      [name]: value,
    })
  }
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
        <div className="border rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Loading your tickets...</h2>
          </div>
          <div className="p-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-4 p-4 border rounded-md">
                <div className="flex flex-col space-y-3">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex space-x-2">
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-medium">Error</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <a href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Go Home
            </button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 float-right hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Ticket
        </button>
        {showForm && (
        <div className="border rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h2 className="text-lg font-medium">Create New Ticket</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTicket?.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ticket title"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTicket?.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your issue in detail"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {(!tickets||tickets.length === 0) ? (
        <div className="border rounded-lg shadow-sm">
          <div className="p-6">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">No tickets found</h3>
              <p className="text-gray-600 mb-4">You don't have any support tickets yet.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                  Create New Ticket
                </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{ticket.title}</h3>
                    <p className="text-sm text-gray-600">
                      Ticket #{ticket.id} • Created on {formatDate(ticket.created_at)}
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <p className="mb-4 line-clamp-2">{ticket.description}</p>
                <div className="flex justify-between items-center">
                  <a href={`/tickets/${ticket.id}`}>
                    <button className="inline-flex items-center border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-1 px-3 rounded-md text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Details
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}