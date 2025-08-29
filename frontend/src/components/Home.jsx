import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) 
      navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
