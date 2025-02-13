import { Route, Routes } from "react-router-dom";
import Login from "./Components/Authorization/Login";
import Navbar from "./Components/Home/Navbar";
import Signup from "./Components/Authorization/SignUp";
import HomePage from "./Components/Home/HomePage";
import Footer from "./Components/Home/Footer";
import EventCreationForm from "./Components/Event/EventCreationForm";
import EventDetails from "./Components/Event/EventDetails";
import AllEvents from "./Components/Event/AllEvents";
import MyDashBoard from "./Components/Event/MyDashBoard";
import { SocketProvider } from "./Components/Context/SocketContext";

function App() {
  return (
    <div>
      <SocketProvider>
        <Navbar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<EventCreationForm />} />
          <Route path="/allEvents" element={<AllEvents />} />
          <Route path="/details/:id" element={<EventDetails />} />
          <Route path="/MyDashBoard" element={<MyDashBoard />} />
        </Routes>
        <Footer />
      </SocketProvider>
    </div>
  );
}

export default App;
