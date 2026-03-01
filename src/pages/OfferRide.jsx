import { useState } from "react"

function OfferRide({ rides, setRides }) {
  const [formData, setFormData] = useState({
    riderName: "",
    contact: "",
    from: "",
    to: "",
    date: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (
      !formData.riderName ||
      !formData.contact ||
      !formData.from ||
      !formData.to ||
      !formData.date
    ) {
      alert("Please fill all fields!")
      return
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      alert("Enter valid 10-digit contact number")
      return
    }

    const newRide = {
      id: Date.now(),
      ...formData,
      seats: 1,
      isBooked: false,
      rating: 0
    }

    setRides([...rides, newRide])

    // Reset form
    setFormData({
      riderName: "",
      contact: "",
      from: "",
      to: "",
      date: ""
    })
  }

  const handleDelete = (id) => {
    const updatedRides = rides.filter((ride) => ride.id !== id)
    setRides(updatedRides)
  }

  return (
    <div className="page-container">
      <h2>Offer a Ride</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="riderName"
          placeholder="Rider Name"
          value={formData.riderName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
        />

        <input
          type="text"
          name="from"
          placeholder="From"
          value={formData.from}
          onChange={handleChange}
        />

        <input
          type="text"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <button type="submit">Offer Ride</button>
      </form>

      <h3 style={{ marginTop: "40px" }}>Available Rides</h3>

      {rides.map((ride) => (
        <div key={ride.id} className="ride-card">
          <p><strong>Rider:</strong> {ride.riderName}</p>
          <p><strong>Contact:</strong> {ride.contact}</p>
          <p><strong>From:</strong> {ride.from}</p>
          <p><strong>To:</strong> {ride.to}</p>
          <p><strong>Date:</strong> {ride.date}</p>
          <p><strong>Seat Available:</strong> {ride.seats}</p>

          <button onClick={() => handleDelete(ride.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default OfferRide