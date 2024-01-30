import {Link} from "react-router-dom";

export default function Footer(){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
            <br/>
            <Link className="nav-link" to="/Contact">
                Contact us
            </Link>
        </nav>
    )
}