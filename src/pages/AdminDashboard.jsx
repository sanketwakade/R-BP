import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function AdminDashboard({ rides, setRides }) {
  const { user } = useContext(AuthContext)

  if (!user || user.role !== "admin") {
    return (
      <div className="page-container">
        <h2>Access Denied</h2>
        <p>You are not authorized to view this page.</p>
      </div>
    )
  }

  const totalRides = rides.length
  const bookedRides = rides.filter((ride) => ride.isBooked).length

  const averageRating =
    rides.length > 0
      ? (
          rides.reduce((sum, ride) => sum + (ride.rating || 0), 0) /
          rides.length
        ).toFixed(1)
      : 0

  const handleDelete = (id) => {
    const updatedRides = rides.filter((ride) => ride.id !== id)
    setRides(updatedRides)
  }

  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <p><strong>Total Rides:</strong> {totalRides}</p>
        <p><strong>Booked Rides:</strong> {bookedRides}</p>
        <p><strong>Average Rating:</strong> ⭐ {averageRating}</p>
      </div>

      <h3>All Rides</h3>

      {rides.map((ride) => (
        <div key={ride.id} className="ride-card">
          <p><strong>Rider:</strong> {ride.riderName}</p>
          <p><strong>From:</strong> {ride.from}</p>
          <p><strong>To:</strong> {ride.to}</p>
          <p><strong>Date:</strong> {ride.date}</p>
          <p><strong>Status:</strong> {ride.isBooked ? "Booked" : "Available"}</p>
          <p><strong>Rating:</strong> ⭐ {ride.rating}</p>

          <button
            onClick={() => handleDelete(ride.id)}
            style={{
              marginTop: "10px",
              padding: "6px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Delete Ride
          </button>
        </div>
      ))}
    </div>
  )
}

export default AdminDashboard