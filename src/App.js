import './App.css';
import Header from "./Comps/Header";
import Footer from "./Comps/footer";
import {Outlet} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
  return (
      //I kept the clientId as literal to avoid problems with another .env
      <GoogleOAuthProvider clientId="171850772487-t35e7nm30qhl51r5e0rd8a4dt8b516ek.apps.googleusercontent.com">
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
