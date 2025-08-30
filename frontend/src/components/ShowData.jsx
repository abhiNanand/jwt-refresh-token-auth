import { useState, useEffect } from "react";

export default function ShowData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/message", {
          headers: {
            Authorization: `Bearer ${token}`,},
          method: "GET",
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  },[]);

  return (
    <div>
      {Array.isArray(data) && data.map((item) => (
  <div key={item._id}>
    <h3>User Name: {item.name}</h3>
    {item.messages.map((msg) => (
      <ol key={msg._id}>
        <li>{msg.message} - <i>{new Date(msg.createdAt).toLocaleString()}</i></li>
      </ol>
    ))}
  </div>
))}
    </div>
  );
}