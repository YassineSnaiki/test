"use client"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatedTickets() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Fetch logged-in user and update role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const user = await response.json();
        setRole(user.role);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [navigate]);

  // Once role is known, fetch tickets if allowed
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (role === null) return; // wait for role to load
    if (role === "customer") {
      navigate("/");
      return;
    }
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/tickets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        // Store only tickets with status "created"
        const createdTickets = data.data.filter(
          (ticket) => ticket.status?.toLowerCase() === "created"
        );
        setTickets(createdTickets);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        setError("Failed to load tickets. Please try again later.");
        setLoading(false);
      }
    };
    fetchTickets();
  }, [role, navigate]);

  // Update ticket status from "created" to "open"
  const handleOpenTicket = async (ticketId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tickets/${ticketId}`, {
        method: "PUT", // or PATCH if that's what your API expects
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "open" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // Remove the ticket from the list once it has been updated
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );
    } catch (err) {
      console.error("Failed to update ticket status:", err);
      alert("Failed to update ticket status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({
      ...newTicket,
      [name]: value,
    });
  };

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
    );
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
    );
  }

  // Filtered tickets: only those with a "created" status
  const createdTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "created"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      
   
      {createdTickets.length === 0 ? (
        <div className="border rounded-lg shadow-sm">
          <div className="p-6">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">No created tickets found</h3>
              <p className="text-gray-600 mb-4">There are no tickets in "created" status.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                Create New Ticket
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {createdTickets.map((ticket) => (
            <div key={ticket.id} className="border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{ticket.title}</h3>
                    <p className="text-sm text-gray-600">
                      Ticket #{ticket.id} • Created on{" "}
                      {formatDate(ticket.created_at)}
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleOpenTicket(ticket.id)}
                      className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded-md text-sm"
                    >
                      Open
                    </button>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
  );
}
