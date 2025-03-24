"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function TicketDetail() {
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id);
    
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/tickets/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setTicket(data)
      } catch (err) {
        console.error("Failed to fetch ticket:", err)
        setError("Failed to load ticket details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTicket()
  }, [id, navigate])

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-500 text-white"

    switch (status.toLowerCase()) {
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
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <a href="/my-tickets" className="mr-4 text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Tickets
          </a>
          <h1 className="text-3xl font-bold">Ticket Details</h1>
        </div>
        <div className="border rounded-lg shadow-sm">
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <a href="/my-tickets" className="mr-4 text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Tickets
          </a>
          <h1 className="text-3xl font-bold">Ticket Details</h1>
        </div>
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
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <a href="/my-tickets" className="mr-4 text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Tickets
          </a>
          <h1 className="text-3xl font-bold">Ticket Details</h1>
        </div>
        <div className="border rounded-lg shadow-sm p-6">
          <p className="text-center text-gray-600">Ticket not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <a href="/my-tickets" className="mr-4 text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Tickets
        </a>
        <h1 className="text-3xl font-bold">Ticket #{ticket.id}</h1>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{ticket.title}</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
              {ticket.priority && (
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500 text-white">
                  {ticket.priority}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              <p>Created: {formatDate(ticket.created_at)}</p>
              {ticket.updated_at && ticket.updated_at !== ticket.created_at && (
                <p>Last Updated: {formatDate(ticket.updated_at)}</p>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Description</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {ticket.description}
            </div>
          </div>

          {/* Comments Section (if available) */}
          {ticket.comments && ticket.comments.length > 0 && (
            <div className="border-t mt-6 pt-4">
              <h3 className="text-lg font-medium mb-3">Comments</h3>
              <div className="space-y-4">
                {ticket.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{comment.user}</span>
                      <span className="text-sm text-gray-600">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {ticket.status !== "closed" && (
            <div className="border-t mt-6 pt-4 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mr-3">
                Add Comment
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded">
                Close Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
