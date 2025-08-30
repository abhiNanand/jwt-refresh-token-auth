import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  //note
  // res.ok fetch ka built-in property hai:
  // Agar response ka status 200–299 ke beech hai → res.ok === true
  // Agar status 400, 401, 500 etc. hai → res.ok === false

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="label-input">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="label-input">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>don't have an account?</label>
          <button type="button" className="noAccount" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}
