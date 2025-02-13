import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../Context/SocketContext";

export default function EventDetails() {
  const [eventDetail, setEventDetail] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();
  const socket = useSocket();

  useEffect(() => {
    getEventDetails();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("joinEvent", (data) => {
        const { id, attendeeCount } = data;
        console.log(id, attendeeCount);

        setEventDetail((prevDetails) =>
          prevDetails._id === id
            ? { ...prevDetails, attendeesCount: attendeeCount }
            : prevDetails
        );
      });

      return () => {
        socket.off("joinEvent");
      };
    } else {
      console.log("Socket not found");
    }
  }, [socket]);

  const getEventDetails = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.get(
        `https://event-management-production-718.up.railway.app/event/getDetails/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setEventDetail(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false); 
    }
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

  return (
    <div className="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      {loading ? (
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      ) : (
        <>
          <img
            src={eventDetail.image}
            alt={eventDetail.eventName}
            className="object-cover w-full h-64 rounded-lg"
          />

          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            {eventDetail.eventName}
          </h2>
          <p className="mt-2 text-gray-600">{eventDetail.description}</p>

          <div className="mt-4 space-y-2">
            <p className="text-gray-700">
              📅 <strong>Date:</strong> {eventDetail.date}
            </p>
            <p className="text-gray-700">
              ⏰ <strong>Time:</strong> {eventDetail.time}
            </p>
            <p className="text-gray-700">
              📍 <strong>Location:</strong> {eventDetail.location}
            </p>
            <p className="font-semibold text-indigo-500">
              🎟 <strong>Category:</strong> {eventDetail.category}
            </p>
            <p className="text-gray-600">
              👥 <strong>Total Attendees:</strong> {eventDetail.attendeesCount}
            </p>
          </div>

          <button
            onClick={() => handleJoinEvent(eventDetail._id)}
            className="w-full px-6 py-3 mt-6 text-white transition bg-green-500 rounded-md shadow-md hover:bg-green-600"
          >
            Attend Event
          </button>
        </>
      )}
    </div>
  );
}
