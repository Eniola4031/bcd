import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <header className="navbar-header">
            <nav className="container">
                <h1 className="logo">B<span>CD</span></h1>
                <ul className="nav-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">How it Works</Link></li>
                    <li><Link href="/explore">Explore</Link></li>
                </ul>
                <div>
                    <Link href="/connect" className="btn connect">Connect</Link>
                </div>
            </nav>
        </header>
     );
}
 
export default Navbar;