// import React from "react";
// import "./css/style.css";
// import "./css/bootstrap.min.css";
// import "./css/animate.css";
// import "./css/animate.min.css";
// import "./App.css";
// import Admin from "./pages/Admin.jsx"
// import Header from "./components/common/Header";
// import Restaurant from "./pages/restaurant.js";
// import Schedule from "./pages/schedule.js"
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import {
//   Home,
//   Booking,
//   AboutUs,
//   Contact,
//   PageNotFound,
//   Room,
//   Services,
//   Testimonial,
// } from "./pages/index";
// import Login from "./pages/user/Login";
// import Dashboard from "./pages/user/dashboard.js"
// import BookRoom from "./pages/user/bookroom.js";
// import BookResturant from "./pages/user/bookresturant.js";
// import Footer from "./components/common/Footer";
// export default function App() {
//   return (
//     <>
//       <div>
//         <Router>
//           <Header />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/testimonial" element={<Testimonial />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/*" element={<PageNotFound />} />
//             <Route path="/rooms" element={<Room />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/user/login" element={<Login />} />
//         <Route path="/user/dashboard" element={<Dashboard />} />
//         <Route path="/user/bookroom" element={<BookRoom />} />
//         <Route path="/user/bookrestaurant" element={<BookResturant />} />
//         <Route path="/admin" element={<Admin />} />
//         <Route path="/restaurant" element={<Restaurant />} />
//         <Route path="/restaurant/schedule" element={<Schedule />} />
//           </Routes>
//           <Footer />
//         </Router>
//       </div>
//     </>
//   );
// }

import React from "react";
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/animate.css";
import "./css/animate.min.css";
import "./App.css";
import Admin from "./pages/Admin.jsx"
import Header from "./components/common/Header";
import Restaurant from "./pages/restaurant.js";
import Schedule from "./pages/schedule.js"
import { BrowserRouter,Routes, Route } from "react-router-dom";
import {
  Home,
  AboutUs,
  Contact,
  PageNotFound,
  Room,
  Services,
  Testimonial,
} from "./pages/index";
import Login from "./pages/user/Login";
import Dashboard from "./pages/user/dashboard.jsx"
import BookRoom from "./pages/user/bookroom.js";
import BookResturant from "./pages/user/bookresturant.js";
import Footer from "./components/common/Footer";

export default function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/services" element={<Services />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/bookroom" element={<BookRoom />} />
            <Route path="/user/bookrestaurant" element={<BookResturant />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/restaurant/schedule" element={<Schedule />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}
