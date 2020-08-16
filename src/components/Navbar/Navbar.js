import React, { Component } from 'react';
import styles from "./Navbar.module.css";
import { connect } from 'react-redux';

import Logo from "../../img/cka_logo.png"
import { Link, NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/auth';
import axios from 'axios';
import Avatar from 'react-avatar';




class Navbar extends Component {

    state = {
        showAvatarOptions: false
    }

    componentDidMount() {
        this.setState({
            showAvatarOptions: false
        })
        console.log("Navbar - CDM")
    }

    handleLogout = (e) => {
        this.setState({
            showAvatarOptions: false
        })
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

    displayAvatarOptions = (e) => {
        this.setState({ showAvatarOptions: !this.state.showAvatarOptions })
        // let elem = document.getElementsByClassName("avatarOptions")[0]
        // console.log("elem: ", elem)
        // elem.style.display = 'block'
    }

    componentWillUnmount() {
        this.displayAvatarOptions()
    }


    render() {
        console.log("Navbar - render")
        let username = null
        if (this.props.user) {
            username = this.props.user.username
        }

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
                                        <NavLink activeClassName="active" className={`${styles.navItem}`} to="/dashboard">Dashboard</NavLink>
                                        <NavLink activeClassName="active" className={styles.navItem} to="/lessons">Lessons</NavLink>
                                        <NavLink activeClassName="active" className={styles.navItem} to="/bites">Bites</NavLink>
                                        <NavLink activeClassName="active" className={styles.navItem} to="/news">News</NavLink>
                                        <NavLink activeClassName="active" className={styles.navItem} to="/markets">Markets</NavLink>

                                        <div className="dropdown">

                                        </div>
                                        <Avatar
                                            size="40"
                                            round={true}
                                            name={username}
                                            className={`${styles.navbarAvatar}`}
                                            onClick={this.displayAvatarOptions}
                                        />
                                        {
                                            this.state.showAvatarOptions ?
                                                <div className={`avatarOptions ${styles.navbarAvatarOptions}`}>
                                                    <Link onClick={this.handleLogout} className={`${styles.navbarAvatarItem}`} to="/login">Logout</Link>
                                                    {/* <a className={`${styles.navbarAvatarItem}`} href="#">Action</a>
                                                    <a className={`${styles.navbarAvatarItem}`} href="#">Another action</a> */}
                                                </div>
                                                : null
                                        }
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
        isAuthenticated: state.isAuthenticated,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        // onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);