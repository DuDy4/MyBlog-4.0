import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../providers/AuthProvider"


export default function Header(){

    const {user, signOut} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand flexCorner">
                    {user && <button className="logOutButton" onClick={signOut}>Sigh out</button>}
                </a>
                <div className="navbar-brand">{
                    user ? `Hello: ${user.firstName}` : <div id="signDiv" data-text="sign_with_google"></div>
                }</div>

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
                        <Link className="nav-link" to='/write_post'>
                            Write post
                        </Link>
                    </li>}
                </ul>
            </div>
        </nav>
    )
}