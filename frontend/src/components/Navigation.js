import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <header className="navbar-header">
            <nav className="container">
                <h1 className="logo">B<span>C</span>D</h1>
                <ul className="nav-links">
                    <li className="active"><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                    {/* <li><Link to="/contact">How it Works</Link></li> */}
                </ul>
                <div>
                    <Link to="/connect" className="btn connect">Connect</Link>
                </div>
            </nav>
        </header>
     );
}
 
export default Navbar;