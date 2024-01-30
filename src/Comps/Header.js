import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../providers/AuthProvider"

export default function Header(){

    const {user, signIn, signOut} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand flexCorner">
                    {user && <button onClick={signOut}>Sigh out</button>}
                    {user ? <h4>Hello {user.userName}</h4> : <button onClick={signIn}>Sigh in</button> }
                </a>
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