import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
       <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Signup</h1>
           <div className="label-input">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <label>Already have an account?</label>
          <button className="noAccount" onClick={()=>navigate('/login')}>Login</button>
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
     
  );
}
