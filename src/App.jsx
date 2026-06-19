import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import LandingPage from "./pages/LandingPage";
import MyBookings from "./pages/MyBookings";
import AdminPage from "./pages/admin/AdminPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminRoomPage from "./pages/admin/AdminRoomPage";
import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";

//import "dotenv/config";
//BASE_URL = import.meta.env.VITE_API_URL;
//axios.defaults.baseURL = BASE_URL;
//axios.defaults.baseURL = "http://127.0.0.1:6066";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
function App() {
  //console.log(process.env.REACT_APP_API_URL);
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={18}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          removeDelay: 1000,
          style: {
            background: "#FDFCAFFF",
            color: "green",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book/:roomId" exact element={<BookingPage />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users" element={<AdminUserPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          <Route path="/admin/rooms" element={<AdminRoomPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>

      <footer className="bg-primary text-white text-center p-4 w-full mt-auto">
        &copy; 2026 Wasan Stay
      </footer>
    </div>
  );
}

export default App;
