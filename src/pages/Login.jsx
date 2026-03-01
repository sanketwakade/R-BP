import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("user")

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (!username.trim()) {
      alert("Enter username")
      return
    }

    // ✅ Now login saves both username and role
    login(username.trim(), role)

    navigate("/")
  }

  return (
    <div className="page-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="form">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="user">User</option>
          <option value="rider">Rider</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login