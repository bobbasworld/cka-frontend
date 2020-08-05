import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth1';

import styles from './Login.module.css';
import Logo from '../../img/cka_logo.png';


class Login extends Component {

    state = {
        "email": '',
        "password": ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('values:', this.state)
        console.log('submit')
    }

    render() {

        // let errorMessage = null
        // if (this.props.error) {
        //     errorMessage = (
        //         <p className='text-danger'>{this.props.error.message}</p>
        //     )
        // }

        return (
            <Fragment>
                <nav className="bg-white navbar navbar-expand-lg navbar-light bg-light" >
                    <div className="container">
                        <Link to="/">
                            <img src={Logo} alt="Crypto Knowledge Alliance" width="60px" height="60px" />
                        </Link>
                    </div>
                </nav>
                <div className={`container ${styles.signupForm}`}>
                    {/* {errorMessage} */}
                    <h2 className={styles.formTitle}>Let's get you right into the action!</h2>
                    <form onSubmit={this.handleSubmit} className={styles.form}>
                        <div className="form-group">
                            <input onChange={this.handleChange} value={this.state.email} name="email" placeholder="Enter your email" type="email" className={`form-control ${styles.formInput}`} id="email" aria-describedby="emailHelp" />
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChange} value={this.state.password} name="password" placeholder="Enter your password" type="password" className={`form-control ${styles.formInput}`} id="password" />
                        </div>

                        {/* {
                            this.props.loading ?
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="sr-only">Loading...</span>
                                </button>
                                :
                                <button type="submit" className={`btn btn-primary ${styles.signupButton}`}><span className={styles.signupText}>Login</span></button>
                        } */}
                        <button type="submit" className={`btn btn-primary ${styles.signupButton}`}><span className={styles.signupText}>Login</span></button>
                        <small className={`form-text text-muted ${styles.welcomeMessage}`}>No account? <Link to='/signup'>Create one</Link></small>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default Login;

// const mapStateToProps = state => {
//     return {
//         loading: state.loading,
//         error: state.error
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (username, password) => dispatch(actions.authLogin(username, password))
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Login);


