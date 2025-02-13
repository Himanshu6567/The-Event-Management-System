import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notauthorized, setNotAuthorized] = useState(false);
  const [showLogoutbtn, setshowLogoutbtn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setshowLogoutbtn(false);
    }
    if (token === "token") {
      setNotAuthorized(true);
    } else {
      setNotAuthorized(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    toggleMenu();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link
            to={"/"}
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/image/2.png" className="h-10 rounded-full" alt="Logo" />
            <li li>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                EventSphere
              </span>
            </li>
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-menu"
          >
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  onClick={toggleMenu}
                  to={"/MyDashBoard"}
                  className="block px-3 py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link
                  onClick={toggleMenu}
                  to={"/allevents"}
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  All Events
                </Link>
              </li>
              <li>
                <Link
                  onClick={toggleMenu}
                  to={"/form"}
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Add Event +
                </Link>
              </li>
              <div className="flex items-center space-x-4">
                {notauthorized && (
                  <Link
                    onClick={toggleMenu}
                    to={"/login"}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Log In
                  </Link>
                )}
                {showLogoutbtn && (
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
