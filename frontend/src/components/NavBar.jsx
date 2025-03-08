import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar () {

    return (<nav className="navbar">
        <div className="navbar-brand">
            <Link to="/"> Amtrak FOIA Project </Link>
        </div>
    </nav>
    );
}

export default NavBar