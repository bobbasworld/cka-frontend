import React from 'react';
import styles from "./Navbar.module.css";

import Logo from "../../img/cka_logo.png"
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="bg-white navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <img src={Logo} alt="Crypto Knowledge Alliance" width="60px" height="60px" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="justify-content-end collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/* <a className="nav-item nav-link active" href="#"><span className="sr-only">(current)</span></a> */}

                        <Link className={styles.login} to="/login">Login</Link>
                        <Link className={styles.signup} to="/signup">Sign Up</Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;