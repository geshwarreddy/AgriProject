import React, { createContext, useState, useEffect } from "react";
import Loading from "../Loading.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem("user");
    console.log("storedUser",storedUser);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(!user);



  const checkLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/check-login", {
        method: "GET",
        credentials: "include", 
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }else{
        const errorData = await response.json();
        console.log(errorData.msg);
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking login:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!user) {
      checkLogin();
    }
  }, [user]);

  if (loading) {
    return <div>{<Loading />}</div>; // Optional: Replace with a loader component
  }


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
