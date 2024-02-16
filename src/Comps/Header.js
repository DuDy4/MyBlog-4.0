import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../providers/AuthProvider"
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import GoogleLoginButton from "./GoogleLoginButton";

export default function Header(){

    const {user, signIn, signOut} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand flexCorner">
                    {user && <button onClick={signOut}>Sigh out</button>}
                </a>
                <a className="navbar-brand" href="#">{
                    user ? `Hello: ${user.userName}` : <div id='signInDiv'></div>
                }</a>

                <GoogleLoginButton/>
                {/*{//Google-auth library broke my project, so I used another library*/}
                {/*    !user && <GoogleLogin  onSuccess={(credentialResponse) => {*/}
                {/*    const credentialDecoded = jwtDecode(credentialResponse.credential)*/}
                {/*    console.log(credentialResponse)*/}
                {/*    console.log(credentialDecoded);*/}
                {/*    signIn(credentialDecoded);*/}
                {/*}} onError={() => {*/}
                {/*    console.log("login error");*/}
                {/*}}/>}*/}
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/posts'>
                            Posts
                        </Link>
                    </li>
                    {user && <li className="nav-item">
                        <Link className="nav-link" to='/admin'>
                            Admin
                        </Link>
                    </li>}
                </ul>
            </div>
        </nav>
    )
}