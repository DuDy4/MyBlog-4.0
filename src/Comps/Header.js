import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../providers/AuthProvider"
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

export default function Header(){

    const {user, signIn, signOut} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand flexCorner">
                    {user && <button onClick={signOut}>Sigh out</button>}
                    {user && <h4>Hello {user.given_name}</h4>}
                </a>
                {!user && <GoogleLogin  onSuccess={(credentialResponse) => {
                    const credentialDecoded = jwtDecode(credentialResponse.credential)
                    console.log(credentialResponse)
                    console.log(credentialDecoded);
                    signIn(credentialDecoded);
                }} onError={() => {
                    console.log("login error");
                }}/>}
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