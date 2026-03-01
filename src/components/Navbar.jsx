import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>RideShare</h2>

      <div style={styles.linkContainer}>
        <Link style={styles.link} to="/">Home</Link>

        {/* Offer Ride visible only to Rider & Admin */}
        {user && (user.role === "rider" || user.role === "admin") && (
          <Link style={styles.link} to="/offer">
            Offer Ride
          </Link>
        )}

        <Link style={styles.link} to="/find">Find Ride</Link>

        {/* Admin Dashboard visible only to Admin */}
        {user && user.role === "admin" && (
          <Link style={styles.link} to="/admin">
            Admin
          </Link>
        )}

        {user ? (
          <>
            <span style={{ marginLeft: "20px", marginRight: "15px" }}>
              Welcome, {user.username}
            </span>
            <button
              onClick={logout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </>
        ) : (
          <Link style={styles.link} to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#111",
    color: "white",
    width: "100%",
    boxSizing: "border-box"
  },
  logo: {
    margin: 0,
    fontSize: "22px"
  },
  linkContainer: {
    display: "flex",
    alignItems: "center"
  },
  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  },
  logoutBtn: {
    padding: "5px 10px",
    border: "none",
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px"
  }
}

export default Navbar