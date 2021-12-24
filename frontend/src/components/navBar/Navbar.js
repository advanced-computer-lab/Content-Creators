import React, { useState, useEffect, useContext } from "react";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../helpers/UserContext";

function Navbar() {
    const [user, setUser] = useContext(UserContext);
    const { authenticated, admin } = user;
    console.log("USERRRRRR ISSSSS", user);
    // {"user_id":"61bf9f936209fc466c127b8b","username":"husseljo","admin":false,"iat":1640366085,"exp":1640373285}

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    useEffect(() => {
        showButton();
    }, [useContext(UserContext)]);

    window.addEventListener("resize", showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img src="/images/logologo.png" width="50" height="50" />
                        Ibn Firnas Airlines
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/reserved-flights"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Reserved Flights
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/flights"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Flights
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/aboutus"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                About us
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/login"
                                className="nav-links-mobile"
                                onClick={closeMobileMenu}
                            >
                                SIGN IN
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="nav-links"
                                onClick={() => {
                                    // setUser({ username: "DONGOL" });
                                    setUser((prevState) => {
                                        console.log("prevState was: ", prevState);
                                        const newUser = {
                                            ...prevState,
                                            authenticated: !prevState.authenticated,
                                        };
                                        return newUser;
                                    });
                                }}
                            >
                                WHATEVER
                            </Link>
                        </li>
                    </ul>
                    {button && (
                        <Button buttonStyle="btn--outline">
                            {authenticated ? "SIGN OUT" : "SIGN IN"}
                        </Button>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
