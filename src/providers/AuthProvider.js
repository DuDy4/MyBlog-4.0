import {createContext, useEffect, useState} from "react";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState('')
  const url = process.env.REACT_APP_API_SERVER_URL + "/oauth";
  const {handleGoogle} = useFetch(url)

  const signIn = (user) => {
    setUser(user)
    localStorage.setItem("user", user)
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
    const localStorageUser = localStorage.getItem("user");
    const localStorageToken = localStorage.getItem("token")
    if(!userToken) {
      setUserToken(JSON.parse(localStorageToken));
    }
    if(!user) {
      setUser(JSON.parse(localStorageUser));
      //Start to render the login
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
