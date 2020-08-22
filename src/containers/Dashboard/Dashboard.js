import React, { Component, Fragment } from 'react';
import DashboardNewsfeed from '../../components/DashboardNewsfeed/DashboardNewsfeed';
import DashboardLessons from '../../components/DashboardLessons/DashboardLessons';
import DashboardPrices from '../../components/DashboardPrices/DashboardPrices';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import styles from './Dashboard.module.css';
import Drawing from '../../img/dashboard_drawing.png';

import axios from 'axios'


class Dashboard extends Component {

    state = {
        news: [],
        lessons: [],
        prices: [],
        // user: {}
    }

    signal = axios.CancelToken.source()

    abortController = new AbortController()

    componentDidMount() {
        const token = localStorage.getItem('token')
        this.props.onLoadUser(token)

        // console.log("USER in DASHBOARD CDM: ", this.props.user)
        const CP_API_KEY = process.env.REACT_APP_CRYPTOPANIC_API_KEY;
        const herokucorsProxy = 'https://cors-anywhere.herokuapp.com/'
        const crypto_panic_url = herokucorsProxy + `https://cryptopanic.com/api/v1/posts/?auth_token=${CP_API_KEY}&public=true`
        const binance_24h_prices = "https://api.binance.com/api/v3/ticker/24hr"
        const icons_url = "https://rest.coinapi.io/v1/assets/icons/{iconSize}"
        // const lessons_url = this.props.user ? `http://127.0.0.1:8000/api/lessons/?search=${this.props.user.level}` : null

        // https://cryptoicons.org/api/icon/btc/200       
        // const cryptoicons_url = "https://cryptoicons.org/api/:style/:currency/:size"

        const cryptopanicConfig = {
            headers: {
                'X-Requested-With': 'axios'
            }
        }

        axios.all([
            // axios.get(icons_url),
            axios.get(crypto_panic_url, cryptopanicConfig, {
                signal: this.signal.token
            }),
            // axios.get(lessons_url, {
            //     signal: this.signal.token
            // }),
            axios.get(binance_24h_prices, {
                signal: this.signal.token
            }),
        ])
            .then(axios.spread((newsResults, pricesResults) => {
                // console.log("News Results: ", newsResults.data['results'])
                // console.log("Lessons Results: ", lessonsResults.data)
                // console.log("Prices Results: ", pricesResults.data)

                this.setState({
                    // icons: iconsResults.data,
                    // user: userResult.data,
                    news: newsResults.data['results'],
                    prices: pricesResults.data,

                })

                // console.log("State: ", this.state)
                // console.log("Icons: ", this.state.icons)
            }))
            .catch(err => {
                console.log(err)
            })
        // console.log("DASHBOARD COMPONENTDIDMOUNT!")

    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            // this.setState({
            //     user: this.props.user
            // })
            // console.log("USER IN DASHBOARD CDU: ", this.props.user)
            const lessons_url = this.props.user ? `http://127.0.0.1:8000/api/lessons/?search=${this.props.user.level}` : null

            axios.get(lessons_url, {
                signal: this.signal.token
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
            // console.log("USER IN gDSFP: ", nextProps.user)
            return { user: nextProps.user }
        }
        else return null
    }


    componentWillUnmount() {
        this.abortController.abort()
        this.signal.cancel('API is being cancelled')
    }


    render() {

        const token = localStorage.getItem('token');
        let username = null

        if (this.props.user) {
            let { user } = this.props
            // console.log("Username in dashboard render: ", this.props.user.username)
            username = user.username.charAt(0).toUpperCase() + user.username.slice(1)
        }

        if (!token) {
            return <Redirect to="/login" />
        }

        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className={styles.dashboardHeader}>
                                <div className={styles.dashboardHeaderText}>
                                    <h3 className={styles.dashboardTitle}>Hello, {username}</h3>
                                    <p className={styles.dashboardText}>You're not so far away from <br /> progressing to the next Level!</p>
                                </div>
                                <img className={styles.dashboardDrawing} src={Drawing} alt="drawing" />
                            </div>
                            <DashboardNewsfeed news={this.state.news} />
                            <DashboardLessons lessons={this.state.lessons} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <DashboardPrices icons={this.state.icons} prices={this.state.prices} />
                        </div>
                    </div>
                </div>
            </Fragment >
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.loading,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadUser: (token) => dispatch(actions.loadUser(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);