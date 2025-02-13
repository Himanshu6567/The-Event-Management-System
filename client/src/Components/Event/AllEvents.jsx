import React, { useEffect, useState, useContext } from "react";

import axios, { all } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSocket } from "../Context/SocketContext";
export default function AllEvents() {
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [noEventsMessage, setNoEventsMessage] = useState("");
  const [notauthorized, setNotAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    if (token === "token") setNotAuthorized(true); //for guest user
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://event-management-production-718.up.railway.app/allEvents"
      );

      if (response.status === 200) {
        setAllEvents(response.data.allEvents);
        setFilteredEvents(response.data.allEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setNoEventsMessage("🎭 No events found ");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("joinEvent", (data) => {
        const { id, attendeeCount } = data;
        // console.log( id, attendeeCount);
        setAllEvents((prevEvents) => {
          const updatedEvents = prevEvents.map((e) =>
            e._id === id ? { ...e, attendeesCount: attendeeCount } : e
          );
          console.log("Updated Events:", updatedEvents);
          setFilteredEvents(updatedEvents);
          return updatedEvents;
        });
      });
    }

    if (!socket) {
      console.log("socket not found");
    }

    return () => {
      if (socket) socket.off("eventUpdated");
    };
  }, [socket]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const events = category
      ? allEvents.filter((event) => event.category === category)
      : allEvents;
    setFilteredEvents(events);
    setNoEventsMessage("🎭 No events found ");
  };

  const handleDateSearch = (e) => {
    const date = e.target.value;
    const events = allEvents.filter((event) => event.date === date);
    setFilteredEvents(events);
    setNoEventsMessage("🎭 No events found ");
  };

  const handleGetEventsByPastFuture = (e) => {
    const filter = e.target.id;
    const today = new Date().toISOString().split("T")[0];
    const filtered = allEvents.filter((event) =>
      filter === "upcoming" ? event.date >= today : event.date < today
    );
    setFilteredEvents(filtered);
    setNoEventsMessage("🎭 No events found ");
  };

  const handleJoinEvent = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://event-management-production-718.up.railway.app/event/join/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) console.log("Join successful");
    } catch (error) {
      console.log(
        error.response?.status === 400 ? "You already joined" : error
      );
    }
  };

  const handleClearSearch = () => {
    //clear filter
    setFilteredEvents(allEvents);
    setNoEventsMessage("");
    document.querySelector("select").value = "";
    document.querySelector('input[type="date"]').value = "";
    document
      .querySelectorAll('input[name="eventType"]')
      .forEach((el) => (el.checked = false));
  };

  return (
    <div className="min-h-screen p-6 text-gray-100 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <h2 className="mb-6 text-3xl font-bold text-center text-indigo-400">
        🎉 All Events 🎉
      </h2>

      <div className="flex flex-col justify-between gap-4 p-4 bg-gray-900 rounded-lg shadow-lg sm:flex-row">
        <div className="flex flex-wrap items-center gap-4">
          <select
            onChange={handleCategoryChange}
            className="w-48 p-2 text-gray-300 bg-gray-800 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Concert">Concert</option>
            <option value="Meetup">Meetup</option>
          </select>
          <input
            type="date"
            onChange={handleDateSearch}
            className="w-48 p-2 text-gray-300 bg-gray-800 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center text-gray-300">
            <input
              type="radio"
              id="upcoming"
              name="eventType"
              onChange={handleGetEventsByPastFuture}
              className="mr-2"
            />
            Upcoming
          </label>
          <label className="flex items-center text-gray-300">
            <input
              type="radio"
              id="pastEvent"
              name="eventType"
              onChange={handleGetEventsByPastFuture}
              className="mr-2"
            />
            Past Event
          </label>
          <button onClick={handleClearSearch}>Reset </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-center text-indigo-400">Fetching events...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="overflow-hidden bg-gray-800 rounded-lg shadow-lg hover:scale-105"
            >
              <img
                src={event.image}
                alt={event.eventName}
                className="object-cover w-full h-28"
              />
              <div className="p-3">
                <h3 className="font-bold text-indigo-400 text-md">
                  {event.eventName}
                </h3>
                <p className="text-xs text-gray-300">
                  📅 {event.date} | ⏰ {event.time}
                </p>
                <p className="text-xs text-gray-400">📍 {event.location}</p>
                <p className="text-xs font-semibold text-green-400">
                  🎟 {event.category}
                </p>
                <p className="text-xs text-gray-300">
                  👥 {event.attendeesCount} Attendees
                </p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleJoinEvent(event._id)}
                    disabled={notauthorized}
                    className={`px-3 py-1 text-xs transition bg-green-500 rounded-md hover:bg-green-600 ${
                      notauthorized
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500"
                    }`}
                  >
                    Attend
                  </button>
                  <button
                    className={`px-3 py-1 text-xs transition bg-indigo-500 rounded-md hover:bg-indigo-600 ${
                      notauthorized
                        ? "bg-indigo-300 cursor-not-allowed"
                        : "bg-indigo-500"
                    }`}
                    disabled={notauthorized}
                  >
                    <Link
                      to={`/details/${event._id}`}
                      className={`px-3 py-1 text-xs transition rounded-md ${
                        notauthorized
                          ? "cursor-not-allowed"
                          : "hover:bg-indigo-600"
                      }`}
                      style={notauthorized ? { pointerEvents: "none" } : {}}
                    >
                      Details
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6 mt-6 bg-gray-100 rounded-lg">
            <p className="text-lg font-medium text-gray-700">
              {noEventsMessage}
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
              alt="No Events"
              className="w-24 h-24 mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}
