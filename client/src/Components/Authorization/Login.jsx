import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token && token != "token") {
      navigate("/");
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!userDetails.email) newErrors.email = "Email is required";
    if (!userDetails.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://event-management-production-718.up.railway.app/user/loginUser",
        userDetails,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);

        navigate("/");
      }
    } catch (err) {
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
    }
  };

  const handleGuestLogin = () => {
    const token = "token";
    localStorage.setItem("token", token);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-blue-50">
      <div className="flex flex-col items-center w-full max-w-3xl p-6 bg-blue-100 shadow-lg rounded-2xl md:flex-row">
        <div className="px-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-900">Login</h2>
          <p className="mt-4 text-sm text-blue-700">Sign in to continue.</p>
          <form className="flex flex-col gap-4 mt-6">
            <input
              className={`w-full p-3 border rounded-md transition-all duration-300 ${
                errors.email
                  ? "border-red-500"
                  : "border-blue-300 focus:ring-2 focus:ring-blue-500"
              }`}
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}

            <div className="relative">
              <input
                className={`w-full p-3 border rounded-md transition-all duration-300 ${
                  errors.password
                    ? "border-red-500"
                    : "border-blue-300 focus:ring-2 focus:ring-blue-500"
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={handleInputChange}
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute text-blue-500 cursor-pointer top-3 right-3"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEye
                  className="absolute text-blue-500 cursor-pointer top-3 right-3"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}

            <button
              onClick={handleLogIn}
              className="py-3 font-medium text-white transition-transform duration-300 bg-blue-900 rounded-xl hover:scale-105 hover:bg-blue-700"
            >
              Login
            </button>

            <button
              onClick={handleGuestLogin}
              className="py-3 font-medium text-white transition-transform duration-300 bg-gray-600 rounded-xl hover:scale-105 hover:bg-gray-800"
            >
              Login as Guest
            </button>
          </form>
          <div className="mt-6 text-center text-blue-700">
            <p className="text-sm">Forgot password?</p>
          </div>
          <div className="flex items-center justify-between mt-4 text-sm">
            <p>Don't have an account?</p>
            <Link
              to="/signup"
              className="px-4 py-2 font-medium text-white transition-transform duration-300 bg-blue-900 rounded-xl hover:scale-110 hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="hidden w-1/2 md:block">
          <img
            className="rounded-2xl max-h-[400px] object-cover"
            src="https://cdn.pixabay.com/photo/2013/07/13/12/04/android-159109_1280.png"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}
