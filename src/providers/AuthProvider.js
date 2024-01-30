import {createContext, useCallback, useEffect, useState} from "react";
// import {GoogleAuth} from "google-auth-library"; GoogleAuth

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleCredentialResponse = useCallback((response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    // You can send the token to the server here for verification
    fetch(`${process.env.REACT_APP_API_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: response.credential })
    }).then((response) => {
      //save user to db + create JWT to the client
      console.log(response);
      setUser({ id: 1, userName: 'Nir' })
    });
  }, []);

  const signIn = ({ userName, password }) => {
    // check if valid
    setUser({ userName: 'Admin' })
  }

  // useEffect(() => {
  //   window.google?.accounts.id.initialize({
  //     client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //     callback: handleCredentialResponse,
  //   });
  //   window.google?.accounts.id.renderButton(
  //       document.getElementById('signInDiv'),
  //       { theme: 'outline', size: 'large' }
  //   );
  // }, [handleCredentialResponse]);

  const signOut = () => {
    setUser(null);
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
