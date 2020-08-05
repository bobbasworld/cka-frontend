import React, { Component } from 'react';
import styles from "./Navbar.module.css";
import { connect } from 'react-redux';

import Logo from "../../img/cka_logo.png"
import { Link, NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/auth1';




class Navbar extends Component {

    // componentDidMount() {
    //     this.props.onTryAutoSignup()
    // }

    handleLogout = (e) => {
        this.props.onLogout()
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

                        {/* <a className="nav-item nav-link active" href="#"><span className="sr-only">(current)</span></a> */}

                        {/* {
                            this.props.isAuthenticated ?
                                (
                                    <div className="navbar-nav">
                                        <Link className={`${styles.navItem} ${styles.active}`} to="/dashboard">Dashboard</Link>
                                        <Link className={styles.navItem} to="/lessons">Lessons</Link>
                                        <Link className={styles.navItem} to="/bites">Bites</Link>
                                        <Link className={styles.navItem} to="/news">News</Link>
                                        <Link className={styles.navItem} to="/markets">Markets</Link>
                                        <Link onClick={this.handleLogout} className={styles.login} to="/login">Logout</Link>
                                    </div>
                                )
                                :
                                (
                                    <div className="navbar-nav">
                                        <Link className={styles.login} to="/login">Login</Link>
                                        <Link className={styles.signup} to="/signup">Sign Up</Link>
                                    </div>
                                )
                        } */}
                        <div className="navbar-nav">
                            <Link className={styles.login} to="/login">Login</Link>
                            <Link className={styles.signup} to="/signup">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.token !== null
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onLogout: () => dispatch(actions.logout()),
//         onTryAutoSignup: () => dispatch(actions.authCheckState())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);