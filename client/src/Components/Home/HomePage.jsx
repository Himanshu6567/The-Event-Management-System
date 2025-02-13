import React, { useEffect } from "react";
import HeroSection from "./Hero Section";
import GetInTouch from "./GetInTouch";
import HomeEvents from "../Event/HomeEvents";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <HeroSection />
      <HomeEvents />
      <GetInTouch />
    </div>
  );
}
