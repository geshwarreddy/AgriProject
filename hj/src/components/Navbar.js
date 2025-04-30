// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
// import "../styles/Navbar.css"; // Import custom CSS
// import { UserContext } from "./context/UserContext"; // Import UserContext
// import { useSelector } from "react-redux";
// import { store } from "../redux/store";
// import { useDispatch } from "react-redux";
// import { revertUser,settingUser } from "../redux/Silce/userSlice";
// import Cookies from "js-cookie"; // Import js-cookie to read cookies

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, setUser } = useContext(UserContext); // Access user and setUser from context
//   const navigate = useNavigate();

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   const dispatch = useDispatch();

//   const newUser = useSelector((store) => store.user);

//   // Check if a token exists in cookies
//   const token = Cookies.get("token"); // Adjust 'token' to the actual cookie name you are using

//   // useEffect(() => {
//   //   // Log whenever the `user` context updates to confirm reactivity
//   //   console.log("Navbar detected user change:", newUser);
//   // }, [newUser]);
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       dispatch(settingUser(parsedUser)); // Sync with Redux
//       setUser(parsedUser); // Sync with context
//     }
//   }, [dispatch, setUser]);
//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:3001/api/logout", {
//         // Add a logout route in the backend
//         method: "POST",
//         credentials: "include",
//       });
//       localStorage.removeItem("user");
//       setUser(null); // Clear user state
//       dispatch(revertUser());
//       navigate("/login"); // Redirect to login page
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <h1 className="navbar-brand">MyApp</h1>
//         <button className="toggle-button" onClick={toggleNavbar}>
//           ☰ {/* Unicode character for hamburger icon */}
//         </button>
//         <div className={`nav-links ${isOpen ? "active" : ""}`}>
//           <Link to="/" className="nav-link">
//             Home
//           </Link>
//           <Link to="/about" className="nav-link">
//             About
//           </Link>
//           <Link to="/services" className="nav-link">
//             Services
//           </Link>
//           <Link to="/contact" className="nav-link">
//             Contact
//           </Link>

//           {/* Conditionally render Add Report link */}
//           {(newUser || token) && (
//             <>
//               <Link to="/add-report" className="nav-link">
//                 Add Report
//               </Link>
//               <Link to="/details" className="nav-link">
//                 Details
//               </Link>
//             </>
//           )}

//           {!newUser ? (
//             <Link to="/login" className="nav-link">
//               Login
//             </Link>
//           ) : (
//             <button onClick={handleLogout} className="nav-link">
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { revertUser, settingUser } from "../redux/Silce/userSlice";
import Cookies from "js-cookie";
import '../styles/Navbar.css';
export default function Navbar() {
  const api=`http://localhost:3001`
  //const api=`https://agriproject-120l.onrender.com`
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newUser = useSelector((store) => store?.user);
  

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(settingUser(parsedUser));
      setUser(parsedUser);
    }
  }, [dispatch, setUser]);

  const handleLogout = async () => {
    try {
      await fetch(`${api}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      setUser(null);
      dispatch(revertUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">AgriInsight</h1>
        <button className="toggle-button" onClick={toggleNavbar} aria-label="Toggle navigation">
          <span className="hamburger"></span>
        </button>
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
          <Link to="/about" className="nav-link">
            <span className="nav-icon">ℹ️</span>
            <span className="nav-text">About</span>
          </Link>
          <Link to="/services" className="nav-link">
            <span className="nav-icon">🛠️</span>
            <span className="nav-text">Services</span>
          </Link>
          <Link to="/contact" className="nav-link">
            <span className="nav-icon">📞</span>
            <span className="nav-text">Contact</span>
          </Link>

          {(newUser?.role === "volunteer" && newUser?.token) && (
            <>
              <Link to="/add-report" className="nav-link">
                <span className="nav-icon">📝</span>
                <span className="nav-text">Add Report</span>
              </Link>
            </>
          )}
          {(newUser?.role === "admin" && newUser?.token) && (
            <>
              <Link to="/approvetable" className="nav-link">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Approve New Users</span>
              </Link>

            </>
          )}
          {(newUser?.token) && (
            <Link to="/details" className="nav-link">
              <span className="nav-icon">📊</span>
              <span className="nav-text">Details</span>
            </Link>
          )}

          {!newUser ? (
            <Link to="/login" className="nav-link">
              <span className="nav-icon">👤</span>
              <span className="nav-text">Login</span>
            </Link>
          ) : (
            <button onClick={handleLogout} className="nav-link logout-btn">
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}