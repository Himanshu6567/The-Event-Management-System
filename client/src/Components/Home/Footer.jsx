
import React from "react";
import { FaPen } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";

export default function Footer() {
  return (
    <div>
      <footer className="mt-10 text-gray-100 bg-gradient-to-br from-teal-900 via-emerald-800 to-green-700">
        <div className="grid max-w-6xl grid-cols-1 gap-12 px-4 py-10 mx-auto md:grid-cols-3">
          {/* About Section */}
          <div>
            <h4 className="mb-4 text-2xl font-bold text-white">About Us</h4>
            <p className="text-lg text-gray-200">
              We bring people together by offering reliable event management
              services. Our goal is to ensure seamless experiences for both
              organizers and participants.
            </p>
          </div>
          {/* Quick Links Section */}
          <div>
            <h4 className="mb-4 text-2xl font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-lg text-gray-200 transition duration-300 hover:text-yellow-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg text-gray-200 transition duration-300 hover:text-yellow-400"
                >
                  Upcoming Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg text-gray-200 transition duration-300 hover:text-yellow-400"
                >
                  Become a Partner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-lg text-gray-200 transition duration-300 hover:text-yellow-400"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Section */}
          <div>
            <h4 className="mb-4 text-2xl font-bold text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-lg text-gray-200">
                <FaMapMarkerAlt />
                <span>123, Event Street, Dehradun</span>
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-200">
                <FaPen />
                <span>support@eventhub.com</span>
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-200">
                <MdOutlineDoneOutline />
                <span>+91 9719440155</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="py-4 text-sm text-center text-gray-300 bg-gradient-to-br from-emerald-800 to-green-900">
          © {new Date().getFullYear()} EventHub. All rights reserved. Crafted
          with care for unforgettable events.
        </div>
      </footer>
    </div>
  );
}
