import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/auth';

import styles from './Signup.module.css';
import Logo from '../../img/cka_logo.png';


class Signup extends Component {
    state = {
        username: '',
        email: '',
        password1: '',
        password2: '',
        inputError: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("values: ", this.state)
        // add any form validation here
        if (this.state.password1 !== this.state.password2) {
            this.setState({
                inputError: 'Passwords must match!'
            })
            return
        }
        this.props.onAuth(this.state.username, this.state.email, this.state.password1, this.state.password2)
        console.log('Signup Submitted!')
        this.props.history.push('/selectlevel')
    }


    render() {


        if (this.props.isAuthenticated) {
            return <Redirect to='/dashboard' />
        }


        return (
            <Fragment>
                {/* Navbar */}
                <nav className="bg-white navbar navbar-expand-lg navbar-light bg-light" >
                    <div className="container">
                        <Link to="/">
                            <img src={Logo} alt="Crypto Knowledge Alliance" width="60px" height="60px" />
                        </Link>
                    </div>
                </nav>

                <div className={`container ${styles.signupForm}`}>
                    {
                        this.props.error ?
                            <p className='text-danger'>{this.props.error}</p>
                            :
                            null
                    }
                    <h2 className={styles.formTitle}>Welcome! <br />Let's get you started!</h2>
                    <form onSubmit={this.handleSubmit} className={styles.form}>
                        <div className="form-group">
                            <input onChange={this.handleChange} value={this.state.username} name="username" placeholder="Enter your name" type="text" className={`form-control ${styles.formInput}`} id="name" />                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChange} value={this.state.email} name="email" placeholder="Enter your email" type="email" className={`form-control ${styles.formInput}`} id="email" aria-describedby="emailHelp" />
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChange} value={this.state.password1} name="password1" placeholder="Enter your password" type="password" className={`form-control ${styles.formInput}`} id="password" />
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChange} value={this.state.password2} name="password2" placeholder="Confirm your password" type="password" className={`form-control ${styles.formInput}`} id="confirmPassword" />
                        </div>
                        {
                            this.props.loading ?
                                (
                                    <Fragment>
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="sr-only">Loading...</span>
                                        </button>
                                    </Fragment>
                                )

                                :
                                (
                                    <Fragment>
                                        <small className={`form-text text-muted ${styles.welcomeMessage}`}>Welcome to the club!</small>
                                        <button type="submit" className={`btn btn-primary ${styles.signupButton}`}><span className={styles.signupText}>Sign Up</span></button>
                                        <small className={`form-text text-muted ${styles.welcomeMessage}`}>Already have an account? <Link to='/login'>Login</Link></small>
                                    </Fragment>
                                )

                        }


                    </form>
                </div>
            </Fragment>

        );
    }
}

// export default Signup;

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);


