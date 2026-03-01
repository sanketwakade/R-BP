import { useState } from "react"

function FindRide({ rides, setRides }) {
  const [search, setSearch] = useState("")

  // 🔎 Filter + Sort
  const filteredRides = rides
    .filter(
      (ride) =>
        ride.from.toLowerCase().includes(search.toLowerCase()) ||
        ride.to.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  // ⭐ Rating Handler
  const handleRating = (id, ratingValue) => {
    const updatedRides = rides.map((ride) => {
      if (ride.id === id) {
        return { ...ride, rating: ratingValue }
      }
      return ride
    })
    setRides(updatedRides)
  }

  // 📅 Booking Handler
  const handleBook = (idToBook) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const updatedRides = rides.map((ride) => {
      const rideDate = new Date(ride.date)

      if (ride.id === idToBook) {
        if (rideDate < today) {
          alert("Cannot book a past ride!")
          return ride
        }

        if (ride.seats > 0) {
          return { ...ride, seats: 0, isBooked: true }
        }
      }

      return ride
    })

    setRides(updatedRides)
  }

  return (
    <div className="page-container">
      <h2>Find a Ride</h2>

      <input
        type="text"
        placeholder="Search by From or To..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "350px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {filteredRides.length === 0 ? (
        <p>No rides available.</p>
      ) : (
        filteredRides.map((ride) => (
          <div key={ride.id} className="ride-card">
            <p><strong>Rider:</strong> {ride.riderName}</p>

            {ride.isBooked && (
              <p><strong>Contact:</strong> {ride.contact}</p>
            )}

            <p><strong>From:</strong> {ride.from}</p>
            <p><strong>To:</strong> {ride.to}</p>
            <p><strong>Date:</strong> {ride.date}</p>
            <p><strong>Seats:</strong> {ride.seats}</p>

            {/* ⭐ Rating Section */}
            {ride.isBooked && (
              <div style={{ marginTop: "10px" }}>
                <p><strong>Rate Ride:</strong></p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(ride.id, star)}
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      color: star <= ride.rating ? "gold" : "gray"
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}

            {/* 🚲 Booking Button */}
            <button
              onClick={() => handleBook(ride.id)}
              disabled={
                ride.seats === 0 ||
                new Date(ride.date) < new Date().setHours(0, 0, 0, 0)
              }
              style={{
                backgroundColor:
                  ride.seats === 0
                    ? "gray"
                    : new Date(ride.date) < new Date().setHours(0, 0, 0, 0)
                    ? "orange"
                    : "green",
                marginTop: "10px",
                padding: "6px 10px",
                border: "none",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              {new Date(ride.date) < new Date().setHours(0, 0, 0, 0)
                ? "Ride Expired"
                : ride.seats === 0
                ? "Full"
                : "Book Ride"}
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default FindRide