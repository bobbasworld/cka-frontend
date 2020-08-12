import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from './SelectLevel.module.css';

import Logo from '../../img/cka_logo.png';
import Arrow from '../../img/right_arrow.png';
import Drawing from '../../img/select_drawing.png';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import axios from 'axios';

class SelectLevel extends Component {

    state = {
        token: '',
        email: '',
        username: '',
        level: ''
    }

    componentDidMount() {
        // console.log('SELECT LEVEL COMPONENTDIDMOUNT')
        const token = localStorage.getItem('token');
        this.setState({
            token: token
        })
        // console.log("token in CDM: ", token)

        axios.defaults.headers.common['Authorization'] = `Token ${token}`
        console.log("token in CWRP:", token)
        axios.get('http://127.0.0.1:8000/auth/user/').then(res => {
            // console.log(res.data)
            this.setState({
                email: res.data.email,
                username: res.data.username,
                level: res.data.level
            })
        }).catch(err => {
            console.log(err)
        })

    }

    // componentWillReceiveProps(nextProps, prevState) {
    //     const token = nextProps.token
    //     axios.defaults.headers.common['Authorization'] = `Token ${token}`
    //     console.log("token in CWRP:", token)
    //     axios.get('http://127.0.0.1:8000/auth/user/').then(res => {
    //         console.log(res.data)
    //     }).catch(err => {
    //         console.log(err)
    //     })

    // }


    // componentWillReceiveProps(newProps) {
    //     // this.props.onTryAutoSignup()

    //     console.log('componentWillReceiveProps')
    //     // const token = newProps.token
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         console.log('Token in componentWillReceiveProps: ', token)
    //         this.setState({
    //             token: token
    //         })
    //     } else {
    //         console.log('No Token in componentWillReceiveProps')
    //         this.props.history.push('/signup')
    //     }
    // }

    handleClick = (e) => {
        this.setState({
            level: e.target.name
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log("state:", this.state)
        const { token, email, username, level } = this.state
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
        const data = {
            "email": email,
            "username": username,
            "level": level
        }
        axios.put("http://127.0.0.1:8000/auth/user/", data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        this.props.history.push('/dashboard')
    }



    render() {
        console.log('render')

        // if (!this.state.token) {
        //     return <Redirect to="/signup" />
        // }

        return (
            this.props.loading ? <h2>Loading...</h2>
                :
                <Fragment>
                    <nav className="bg-white navbar navbar-expand-lg navbar-light bg-light" >
                        <div className="container">
                            <Link to="/">
                                <img src={Logo} alt="Crypto Knowledge Alliance" width="60px" height="60px" />
                            </Link>
                        </div>
                    </nav>
                    <div className={`container ${styles.selectForm}`}>
                        <h2 className={styles.formTitle}>Select Level</h2>
                        <form onSubmit={this.handleSubmit} className={styles.form}>
                            <div className="form-group">
                                <input onClick={this.handleClick} name="beginner" value="Beginner (< 6 months)" type="button" className={`${styles.formInput}`} id="beginner" />
                            </div>
                            <div className="form-group" >
                                <input onClick={this.handleClick} name="intermediate" value="Intermediate (6 months - 1 year)" type="button" className={`${styles.formInput}`} id="intermediate" />
                            </div>
                            <div className="form-group">
                                <input onClick={this.handleClick} name="advanced" value="Advanced (> 1 year)" type="button" className={`${styles.formInput}`} id="advanced" />
                            </div>
                            <br />
                            <p className={styles.infoText}>This helps us curate content for you so that you can get up to speed as soon as possible!</p>
                            <button className={styles.nextBtn} type="submit">Next <span><img className={styles.rightArrow} src={Arrow} alt="right" width="12px" height="10px" /></span></button>
                        </form>
                        <img className={styles.drawing} src={Drawing} alt="drawing" width="350px" height="420px" />
                    </div>
                </Fragment >

        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        token: state.token
    }
}

{/* // const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignup: () => dispatch(actions.authCheckState())
//     }
// } */}

export default connect(mapStateToProps)(SelectLevel);