import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  //check if user already login
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token && token != "token") {
      navigate("/");
    }
  }, [token]);

  const [UserSignUpData, setUserSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let newErrors = {};
    const { name, email, password, confirmPassword } = UserSignUpData;

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   const { name, email, password } = UserSignUpData;
  //   const userData = { name, email, password };

  //   try {
  //     const response = await axios.post(
  //       "https://event-management-production-718.up.railway.app/user/createNewUser",
  //       userData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("Signup Successful:", response.data);
  //     if (response.status === 201) {
  //       navigate("/login");
  //     }
  //   } catch (err) {
  //     console.error("Something went wrong!", err);

  //     // Check if it's an email error
  //     if (
  //       err.response &&
  //       err.response.data.msg ===
  //         "Email already exists. Please use a different email."
  //     ) {
  //       setErrors((prev) => ({
  //         ...prev,
  //         email:
  //           "This email is already registered. Please use a different one.",
  //       }));
  //     } else {
  //       setErrors((prev) => ({
  //         ...prev,
  //         email: "Email already exists. Please use a different email.",
  //       }));
  //     }
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://event-management-production-718.up.railway.app/user/createNewUser",
        UserSignUpData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Signup Successful:", response.data);
      if (response.status === 201) navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);

      const errorMessage = err.response?.data?.msg;

      // Check if the error is related to an existing email
      if (errorMessage === "Email already exists.") {
        setErrors((prev) => ({
          ...prev,
          email:
            "This email is already registered. Please use a different one.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: errorMessage || "Something went wrong! Please try again.",
        }));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#2C2C2C]">
      <div className="bg-[#dfa674] rounded-2xl flex flex-col md:flex-row max-w-3xl w-full p-6 items-center shadow-lg">
        <div className="px-8 md:w-1/2">
          <h2 className="font-bold text-3xl text-[#002D74]">
            Join the Event Community!
          </h2>
          <p className="text-sm mt-4 text-[#002D74]">
            Sign up to stay updated on the latest events and manage your
            bookings effortlessly.
          </p>
          <form className="flex flex-col gap-4 mt-6" onSubmit={handleSignUp}>
            <input
              className={`w-full p-2 border rounded-md ${
                errors.name ? "border-red-500" : ""
              }`}
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="-mt-4 text-sm text-red-500">{errors.name}</p>
            )}

            <input
              className={`w-full p-2 border rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="-mt-4 text-sm text-red-500">{errors.email}</p>
            )}

            <div className="relative">
              <input
                className={`w-full p-2 border rounded-md ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute text-gray-400 cursor-pointer top-2 right-3"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEye
                  className="absolute text-gray-400 cursor-pointer top-2 right-3"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password && (
              <p className="-mt-4 text-sm text-red-500">{errors.password}</p>
            )}

            <div className="relative">
              <input
                className={`w-full p-2 border rounded-md ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleInputChange}
              />
              {showConfirmPassword ? (
                <FaRegEyeSlash
                  className="absolute text-gray-400 cursor-pointer top-2 right-3"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FaRegEye
                  className="absolute text-gray-400 cursor-pointer top-2 right-3"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="-mt-4 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}

            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to={"../login"} className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        <div className="hidden w-1/2 md:block">
          <img
            className="rounded-2xl max-h-[400px]"
            src="https://cdn.pixabay.com/photo/2014/04/09/17/48/man-320276_1280.png"
            alt="Signup form illustration"
          />
        </div>
      </div>
    </div>
  );
}
