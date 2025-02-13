import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomeEvents() {
  const [sampleEvents, setSampleEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(
        "https://event-management-production-718.up.railway.app/allEvents"
      );
      if (response.status === 200) {
        setSampleEvents(response.data.allEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="px-6 py-8 mx-auto bg-gray-100 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">
          🎉 Upcoming Events 🎉
        </h2>
        <Link
          to="/allevents"
          className="text-lg font-semibold text-indigo-600 hover:underline"
        >
          See More &gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleEvents.slice(0, 6).map((event) => (
          <div
            key={event._id}
            className="overflow-hidden transition duration-300 bg-white rounded-md shadow-md hover:shadow-lg hover:scale-105"
          >
            <img
              src={event.image}
              alt={event.name}
              className="object-cover w-full h-36"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {event.eventName}
              </h3>
              <p className="text-sm text-gray-600">
                📅 {event.date} | ⏰ {event.time}
              </p>
              <p className="text-sm text-gray-700">📍 {event.location}</p>
              <p className="text-sm font-semibold text-indigo-500">
                🎟 {event.category}
              </p>

              {/* <div className="flex justify-between mt-3">
                <button
                  disabled={notauthorized}
                  className="px-3 py-1 text-sm text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 disabled:bg-green-300"
                >
                  Attend
                </button>
                <button
                  disabled={notauthorized}
                  className="px-3 py-1 text-sm text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 disabled:bg-indigo-300"
                >
                  Details
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
