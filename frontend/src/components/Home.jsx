import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ShowData from "./ShowData.jsx"

export default function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");}

    try {
      const res = await fetch("http://localhost:3000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
    setMessage("");
  };

  return (
    <div>
      <div>
        <h1>Home Page</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="submit" value="send message" />
        </form>
      </div>
      <div>
        <h1>Show Message</h1>
        <ShowData/>
      </div>
    </div>
  );
}
