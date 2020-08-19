import React, { Component, Fragment } from 'react';

import styles from './BiteDetail.module.css';

import axios from 'axios';
import moment from 'moment';
import ReactMarkdown from 'react-markdown/with-html';
import Avatar from 'react-avatar';


class BiteDetail extends Component {

    state = {
        data: null
    }

    signal = axios.CancelToken.source()

    componentDidMount() {
        let title = this.props.match.params.title
        let url = `http://127.0.0.1:8000/api/bites/?search=${title}`


        axios.get(url, {
            cancelToken: this.signal.token
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
            .catch(err => console.error(err))

    }

    componentWillUnmount() {
        this.signal.cancel('BiteDetail API is being cancelled!')
    }



    render() {
        let { data } = this.state
        let title, content,
            date, convertedDate,
            author_name, author_description,
            author_twitter_image,
            author_twitter_url
                = null


        // check if data is loaded in state...this avoids undefined or null error
        if (data) {
            title = data[0].title
            content = data[0].content
            date = data[0].published_date
            author_name = data[0].author_name
            author_description = data[0].author_description
            author_twitter_image = data[0].author_twitter_image
            author_twitter_url = data[0].author_twitter_url
            console.log("twitter url: ", author_twitter_url)
        }

        convertedDate = moment(date).format('MMMM Do, YYYY')

        let biteDetail = data ? (
            <div className={styles.bitedetailContainer}>
                <h3 className={styles.bitedetailTitle}>{title}</h3>
                <span>
                    <a href={author_twitter_url} target="_blank">
                        <Avatar
                            size="40"
                            round={true}
                            src={author_twitter_image}
                            className={`${styles.navbarAvatar}`}
                        />
                    </a>

                    <span className={styles.bitedetailAuthorName}>by {author_name} | </span>
                    <span className={styles.bitedetailDate}>{convertedDate}</span>
                </span>
                <p className={styles.bitedetailContent} >
                </p>
                <ReactMarkdown source={content} escapeHtml={false} />
                <hr />
                <br />
                <span>
                    <a href={author_twitter_url} target="_blank">
                        <Avatar
                            size="40"
                            round={true}
                            src={author_twitter_image}
                            className={`${styles.navbarAvatar}`}
                        />
                    </a>
                    <span className={styles.bitedetailAuthorName}>by {author_name}</span>
                    <p className={styles.bitedetailAuthorDescription}>{author_description}</p>
                    <br />
                </span>
                <hr />
            </div>
        ) : (
                <div className="text-center">Loading...</div>
            )



        return (
            <Fragment>
                <div className="container">
                    {biteDetail}
                </div>
            </Fragment>
        )
    }
}

export default BiteDetail