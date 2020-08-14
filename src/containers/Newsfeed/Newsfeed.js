import React, { Component, Fragment } from 'react';
import NewsfeedItem from '../NewsfeedItem/NewsfeedItem';

import Dots from '../../img/dots.png';

import styles from './Newsfeed.module.css';
import axios from 'axios';



class Newsfeed extends Component {

    state = {
        articles: null,
    }

    signal = axios.CancelToken.source()


    componentDidMount() {
        const CP_API_KEY = process.env.REACT_APP_CRYPTOPANIC_API_KEY
        const herokucorsProxy = 'https://cors-anywhere.herokuapp.com/'
        const cryptopanicUrl = herokucorsProxy + `https://cryptopanic.com/api/v1/posts/?auth_token=${CP_API_KEY}&public=true`

        const cryptopanicConfig = {
            headers: {
                'X-Requested-With': 'axios'
            }
        }

        axios.get(cryptopanicUrl, cryptopanicConfig, {
            cancelToken: this.signal.token
        })
            .then(res => {
                this.setState({
                    articles: res.data.results
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    handleSeeMoreArticles = () => {
        this.setState((prevState, props) => {
            return { articles: prevState.articles + 5 }
        })
    }


    componentWillUnmount() {
        this.signal.cancel('API is being cancelled in Newsfeed')
    }


    render() {

        return (
            <Fragment>
                <div className="container">
                    <div className={styles.newsfeedHeader}>
                        <span className={styles.dotsImage1}><img src={Dots} alt="dots" width="30" height="30" /></span>
                        <div className={styles.newsfeedHeaderText}>
                            <h3 className={styles.newsfeedTitle}>Cryptocurrency News</h3>
                        </div>
                        <span className={styles.dotsImage2}><img src={Dots} alt="dots" width="30" height="30" /></span>
                    </div>
                    <NewsfeedItem articles={this.state.articles} />
                </div>
            </Fragment >
        )
    }

}

export default Newsfeed