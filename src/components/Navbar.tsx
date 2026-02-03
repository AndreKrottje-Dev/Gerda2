import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                    <span className="nav-icon">DA</span>
                    <span className="nav-label">Dashboard</span>
                </Link>

                <Link to="/food" className={`nav-item ${isActive('/food') ? 'active' : ''}`}>
                    <span className="nav-icon">VO</span>
                    <span className="nav-label">Voeding</span>
                </Link>

                <Link to="/exercise" className={`nav-item ${isActive('/exercise') ? 'active' : ''}`}>
                    <span className="nav-icon">TR</span>
                    <span className="nav-label">Training</span>
                </Link>

                <Link to="/progress" className={`nav-item ${isActive('/progress') ? 'active' : ''}`}>
                    <span className="nav-icon">PR</span>
                    <span className="nav-label">Voortgang</span>
                </Link>

                <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
                    <span className="nav-icon">PF</span>
                    <span className="nav-label">Profiel</span>
                </Link>
            </div>
        </nav>
    );
}
