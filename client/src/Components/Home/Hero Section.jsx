import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="bg-[#FCFBF9] px-6 py-12 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center lg:justify-around">
      {/* Left Section */}
      <div className="w-full lg:w-[40%] space-y-6 text-center lg:text-left">
        <h2 className="font-serif text-2xl font-bold leading-snug text-red-500 lg:text-4xl">
          Plan, Manage, and Enjoy Your Events Seamlessly!
        </h2>
        <p className="mt-4 text-lg text-red-400 lg:text-xl">
          From weddings to corporate events, make every moment unforgettable
          with our all-in-one event management platform.
        </p>
        <button>
          <Link
            to={"/allEvents"}
            className="px-6 py-3 mt-5 text-white transition bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600"
          >
            Explore Events
          </Link>
        </button>
        <p className="font-medium text-gray-600">
          Trusted by <span className="font-bold text-indigo-500">500+</span>{" "}
          event organizers & attendees.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[50%] flex justify-center mt-8 lg:mt-0">
        <img
          className="w-full h-auto max-w-md lg:max-w-lg"
          src="/image/2.png"
          alt="Event illustration"
        />
      </div>
    </div>
  );
}
