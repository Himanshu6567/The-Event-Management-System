import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocket } from "../Context/SocketContext";

export default function MyDashBoard() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [attendedEvents, setattendedEvents] = useState([]);

  const socket = useSocket();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token == "token") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getAttendedEvents();
    getMyCreatedEvents();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("joinEvent", (data) => {
        const { id, attendeeCount } = data;
        // console.log(id, attendeeCount);
        setCreatedEvents((prevEvents) => {
          const updatedEvents = prevEvents.map((e) =>
            e._id === id ? { ...e, attendeesCount: attendeeCount } : e
          );
          console.log("Updated Events:", updatedEvents);
          setCreatedEvents(updatedEvents);
          return updatedEvents;
        });
        // ////
        setattendedEvents((prevEvents) => {
          const updatedEvents = prevEvents.map((e) =>
            e._id === id ? { ...e, attendeesCount: attendeeCount } : e
          );
          console.log("Updated Events:", updatedEvents);
          setattendedEvents(updatedEvents);
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

  const getAttendedEvents = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://event-management-production-718.up.railway.app/event/myAttendedEvents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        // console.log(response.data);
        setattendedEvents(response.data.events);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMyCreatedEvents = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "https://event-management-production-718.up.railway.app/event/MyCreatedEvents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setCreatedEvents(response.data.events);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  return (
    <div className="max-w-6xl p-6 mx-auto">
      {/* Attended Events Section */}
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        🎟 My Attended Events
      </h2>
      {attendedEvents.length > 0 ? (
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-gray-700 bg-gray-200">
                  <th className="p-3 text-left whitespace-nowrap">
                    Event Name
                  </th>
                  <th className="p-3 text-left whitespace-nowrap">
                    Date & Time
                  </th>
                  <th className="p-3 text-left whitespace-nowrap">Location</th>
                  <th className="p-3 text-left whitespace-nowrap">Attendees</th>
                  <th className="p-3 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendedEvents.map((event) => (
                  <tr key={event._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{event.eventName}</td>
                    <td className="p-3">
                      {event.date} | {event.time}
                    </td>
                    <td className="p-3">{event.location}</td>
                    <td className="p-3">{event.attendeesCount}</td>
                    <td className="p-3">
                      <Link
                        to={`/details/${event._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-gray-600 bg-white rounded-lg shadow-md">
          <p className="text-xl font-semibold">
            😕 You haven't attended any events yet.
          </p>
          <p className="mt-2">
            Find an exciting event, join, and make unforgettable memories! 🎉
          </p>
          <Link
            to="/allEvents"
            className="inline-block px-5 py-2 mt-4 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Browse Events
          </Link>
        </div>
      )}

      {/* Created Events Section */}
      <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-800">
        📅 My Created Events
      </h2>
      {createdEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {createdEvents.map((event) => (
            <div key={event._id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">
                {event.eventName}
              </h3>
              <p className="mt-1 text-gray-600">
                📅 {event.date} | ⏰ {event.time}
              </p>
              <p className="mt-1 text-gray-600">📍 {event.location}</p>
              <p className="mt-1 text-gray-600">
                👥 Total Attendees: {event.attendeesCount}
              </p>

              <div className="flex mt-4 space-x-3">
                <Link
                  to={`/details/${event._id}`}
                  className="px-4 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-600 bg-white rounded-lg shadow-md">
          <p className="text-xl font-semibold">📭 No events created yet.</p>
          <p className="mt-2">
            Start something amazing! Create an event and bring people together.
            🎊
          </p>
          <Link
            to="/form"
            className="inline-block px-5 py-2 mt-4 text-white transition bg-green-500 rounded-md hover:bg-green-600"
          >
            Create an Event
          </Link>
        </div>
      )}
    </div>
  );
}
