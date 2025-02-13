import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EventCreationForm() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token == "token") {
      navigate("/login");
    }
  }, []);

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("eventName", eventData.name);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("category", eventData.category);
    if (eventData.image) {
      formData.append("image", eventData.image);
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://event-management-production-718.up.railway.app/event/createNewEvent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 201) {
        console.log(response.data);
        setMessage("Event created successfully!");
        setEventData({
          name: "",
          description: "",
          date: "",
          time: "",
          location: "",
          category: "",
          image: null,
        });

        navigate("/MyDashBoard");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create event.");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-8 mx-auto mt-10 translate-y-10 bg-white rounded-lg shadow-2xl opacity-0 animate-fade-in">
      <h2 className="mb-6 text-3xl font-bold text-center text-indigo-600">
        Create an Event
      </h2>

      {message && (
        <p className="p-3 mb-4 text-white bg-green-500 rounded-lg">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block font-semibold text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          <div>
            <label className="block font-semibold text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={eventData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select Category</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Concert">Concert</option>
              <option value="Meetup">Meetup</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Event Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white transition-transform transform bg-indigo-500 rounded-lg shadow-lg hover:bg-indigo-600 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          disabled={loading}
        >
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
