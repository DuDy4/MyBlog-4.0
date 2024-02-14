import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (user) => {

    setUser(user)
    localStorage.setItem("user", user.given_name)
  }

  useEffect(() => {
    const user = {};
    user.given_name = localStorage.getItem("user");
    console.log(user.given_name)
    setUser(user);
  }, []);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value = {
    user, signOut, signIn
  }

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  )
}
