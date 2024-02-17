import {createContext, useEffect, useState} from "react";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState('')
  const url = "http://localhost:4000/oauth";
  const {handleGoogle} = useFetch(url)

  const signIn = (user) => {
    setUser(user)
    localStorage.setItem("user", user.given_name)
  }

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("title");
    localStorage.removeItem("content");

  }

  const value = {
    user, signOut, signIn
  }

  useEffect(() => {
    const theUser = localStorage.getItem("user");
    const theToken = localStorage.getItem("token")

    if (theUser && !theUser.includes("undefined") &&
        theToken && !theToken.includes(undefined)) {
      setUser(JSON.parse(theUser));
      setUserToken(JSON.parse(theToken))
    } else {
      window.google?.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });
      window.google?.accounts.id.renderButton(
          document.getElementById('signDiv'),
          { theme: 'outline', size: 'large' }
      );
    }
  }, [handleGoogle]);

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  )
}
