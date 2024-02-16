import './App.css';
import Header from "./Comps/Header";
import Footer from "./Comps/footer";
import {Outlet} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
  return (
      //I kept the clientId as literal to avoid problems with another .env
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <div className="App">
            <Header />
            <div className="content">
              <Outlet />
            </div>
            <Footer />
          </div>
      </GoogleOAuthProvider>
  );
}

export default App;
