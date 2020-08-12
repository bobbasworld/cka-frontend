import React, { Component } from 'react';
import styles from "./Navbar.module.css";
import { connect } from 'react-redux';

import Logo from "../../img/cka_logo.png"
import { Link, NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/auth';
import axios from 'axios';




class Navbar extends Component {


    handleLogout = (e) => {
        this.props.onLogout()
        // axios.post('http://127.0.0.1:8000/auth/logout/')
        //     .then(res => {
        //         console.log(res)
        //         console.log('LOGOUT ACTION SUCCESS!')
        //         localStorage.removeItem('token')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }

    handleNavClick = (e) => {
        // const elem = document.querySelectorAll(".navItem");
        // console.log(elem);
        // elem.addEventListener('click', () => {
        //     elem.classList.add('active');
        // })
        // e.target.classList.add('active')
        // console.log(e.target.className)
    }


    render() {
        return (
            <nav className="bg-white navbar navbar-expand-lg navbar-light bg-light" >
                <div className="container">
                    <Link to="/">
                        <img src={Logo} alt="Crypto Knowledge Alliance" width="60px" height="60px" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="justify-content-end collapse navbar-collapse" id="navbarNavAltMarkup">

                        <a className="nav-item nav-link active" href="#"><span className="sr-only">(current)</span></a>

                        {
                            this.props.isAuthenticated ?
                                (
                                    <div className="navbar-nav">
                                        <NavLink onClick={this.handleNavClick} className={`${styles.navItem}`} to="/dashboard">Dashboard</NavLink>
                                        <NavLink onClick={this.handleNavClick} className={styles.navItem} to="/lessons">Lessons</NavLink>
                                        <NavLink onClick={this.handleNavClick} className={styles.navItem} to="/bites">Bites</NavLink>
                                        <NavLink onClick={this.handleNavClick} className={styles.navItem} to="/news">News</NavLink>
                                        <NavLink onClick={this.handleNavClick} className={styles.navItem} to="/markets">Markets</NavLink>
                                        <NavLink onClick={this.handleNavClick} onClick={this.handleLogout} className={styles.login} to="/login">Logout</NavLink>
                                    </div>
                                )
                                :
                                (
                                    <div className="navbar-nav">
                                        <NavLink className={styles.login} to="/login">Login</NavLink>
                                        <NavLink className={styles.signup} to="/signup">Sign Up</NavLink>
                                    </div>
                                )
                        }

                    </div>
                </div>
            </nav>
        );
    }
}



const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        // onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);