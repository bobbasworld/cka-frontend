import React, { Fragment, Component } from 'react';
import LessonCard from '../LessonCard/LessonCard';

import styles from './Lessons.module.css';
import axios from 'axios';

import { connect } from 'react-redux';

import Dots from '../../img/dots.png'
import * as actions from '../../store/actions/auth';


class Lessons extends Component {

    state = {
        lessons: []
    }

    signal = axios.CancelToken.source();

    abortController = new AbortController()


    componentDidMount() {
        const token = localStorage.getItem('token')
        this.props.onLoadUser(token)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            console.log("USER IN LESSONS CDU: ", this.props.user)
            const lessons_url = this.props.user ? `http://127.0.0.1:8000/api/lessons/?search=${this.props.user.level}` : null

            axios.get(lessons_url, {
                cancelToken: this.signal.token
            })
                .then(res => {
                    this.setState({
                        lessons: res.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user !== prevState.user) {
            console.log("USER IN LESSONS gDSFP: ", nextProps.user)
            return { user: nextProps.user }
        }
        else return null
    }


    componentWillUnmount() {
        this.abortController.abort()
        this.signal.cancel('API is being cancelled')
    }


    render() {

        console.log('Lessons User: ', this.props.user)
        return (
            <Fragment>
                <div className="container">
                    <div className={styles.lessonsHeader}>
                        <span className={styles.dotsImage1}><img src={Dots} alt="dots" width="30" height="30" /></span>
                        <div className={styles.lessonsHeaderText}>
                            <h3 className={styles.lessonsTitle}>Cryptocurrency Lessons</h3>
                        </div>
                        <span className={styles.dotsImage2}><img src={Dots} alt="dots" width="30" height="30" /></span>
                    </div>
                    <LessonCard lessons={this.state.lessons} />
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadUser: (token) => dispatch(actions.loadUser(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);