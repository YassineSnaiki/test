export default function Home() {

    
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Customer Care</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your one-stop solution for all customer support needs. Track, manage, and resolve your support tickets
          efficiently.
        </p>
        <div className="mt-8">
          <a href="/my-tickets">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mr-4 text-lg">
              View My Tickets
            </button>
          </a>
        
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="border rounded-lg shadow-sm p-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated team is available round the clock to assist you with any issues.
            </p>
          </div>
        </div>
        <div className="border rounded-lg shadow-sm p-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Ticket Tracking</h3>
            <p className="text-gray-600">Track the status of your support tickets in real-time.</p>
          </div>
        </div>
        <div className="border rounded-lg shadow-sm p-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Quick Resolution</h3>
            <p className="text-gray-600">We aim to resolve your issues in the shortest possible time.</p>
          </div>
        </div>
        <div className="border rounded-lg shadow-sm p-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Communication</h3>
            <p className="text-gray-600">Stay updated with regular communication on your ticket status.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-8 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-medium mb-2">Create a Ticket</h3>
              <p className="text-gray-600">Submit your issue through our easy-to-use ticket creation form.</p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-medium mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor the status of your ticket through your dashboard.</p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-medium mb-2">Get Resolution</h3>
              <p className="text-gray-600">Receive timely updates and resolution for your issues.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

