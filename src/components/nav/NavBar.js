import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <>
            <ul className="navbar">
                {localStorage.getItem("auth_token") !== null ? (
                    <>
                        <li className="navbar__item" onClick={() => navigate('/events')}>
                            Events
                        </li>
                        <li className="navbar__item">
                            The Vibe Tribe!
                        </li>
                        <li className="navbar__item" onClick={() => navigate('/tickets')}>
                            Get Help!
                        </li>
                        <li className="navbar__item">
                            <button
                                className="nav-link fakeLink"
                                onClick={() => {
                                    localStorage.removeItem("auth_token");
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : null}
            </ul>
        </>
    );
}

