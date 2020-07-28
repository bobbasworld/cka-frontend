import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div className={`container ${styles.signupForm}`}>
                <h2 className={styles.formTitle}>Let's get you right into the action!</h2>
                <form className={styles.form}>
                    <div className="form-group">
                        <input placeholder="Enter your email" type="email" className={`form-control ${styles.formInput}`} id="email" aria-describedby="emailHelp" />
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <input placeholder="Enter your password" type="password" className={`form-control ${styles.formInput}`} id="password" />
                    </div>
                    <button type="submit" className={`btn btn-primary ${styles.signupButton}`}><span className={styles.signupText}>Login</span></button>
                    <small className={`form-text text-muted ${styles.welcomeMessage}`}>No account? <Link to='/signup'>Create one</Link></small>
                </form>
            </div>
        );
    }
}

export default Login;


