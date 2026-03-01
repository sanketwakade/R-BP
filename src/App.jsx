import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import ProtectedRoute from "./components/ProtectedRoute"

import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import OfferRide from "./pages/OfferRide"
import FindRide from "./pages/FindRide"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  const [rides, setRides] = useState(() => {
    const savedRides = localStorage.getItem("rides")
    return savedRides ? JSON.parse(savedRides) : []
  })

  useEffect(() => {
    localStorage.setItem("rides", JSON.stringify(rides))
  }, [rides])

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/offer"
          element={
            <ProtectedRoute allowedRoles={["rider", "admin"]}>
              <OfferRide rides={rides} setRides={setRides} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard rides={rides} setRides={setRides} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/find"
          element={<FindRide rides={rides} setRides={setRides} />}
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App