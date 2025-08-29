import { RouterProvider } from "react-router";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./components/style.css";
import appRouter from "./Routes/appRoutes";

export default function App() {
  return (
    <div className="container">
      <RouterProvider router = {appRouter} />
    </div>
  );
}