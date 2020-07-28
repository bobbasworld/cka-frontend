import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './Signup.module.css';


class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <Fragment>
                <div className={`container ${styles.signupForm}`}>
                    <h2 className={styles.formTitle}>Welcome! <br />Let's get you started!</h2>
                    <form className={styles.form}>
                        <div class="form-group">
                            <input placeholder="Enter your name" type="text" className={`form-control ${styles.formInput}`} id="name" />                        </div>
                        <div class="form-group">
                            <input placeholder="Enter your email" type="email" className={`form-control ${styles.formInput}`} id="email" aria-describedby="emailHelp" />
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div class="form-group">

                            <input placeholder="Enter your password" type="password" className={`form-control ${styles.formInput}`} id="password" />
                        </div>
                        <small className={`form-text text-muted ${styles.welcomeMessage}`}>Welcome to the club!</small>
                        <button type="submit" className={`btn btn-primary ${styles.signupButton}`}><span className={styles.signupText}>Sign Up</span></button>
                        <small className={`form-text text-muted ${styles.welcomeMessage}`}>Already have an account? <Link to='/login'>Login</Link></small>

                    </form>
                </div>
            </Fragment>
        );
    }
}

export default Signup;


