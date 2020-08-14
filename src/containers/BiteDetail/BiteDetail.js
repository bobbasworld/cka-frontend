import React, { Component, Fragment } from 'react';

import styles from './BiteDetail.module.css';

import axios from 'axios';
import moment from 'moment';

class BiteDetail extends Component {

    state = {
        data: null
    }

    async componentDidMount() {
        let title = this.props.match.params.title
        let url = `http://127.0.0.1:8000/api/bites/?search=${title}`

        axios.get(url)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
            .catch(err => console.error(err))

    }

    render() {
        let { data } = this.state
        let title, content, date, convertedDate = null

        // check if data is loaded in state...this avoids undefined or null error
        if (data) {
            title = data[0].title
            content = data[0].content
            date = data[0].published_date
        }

        convertedDate = moment(date).format('MMMM Do, YYYY')

        let biteDetail = data ? (
            <div className={styles.bitedetailContainer}>
                <h3 className={styles.bitedetailTitle}>{title}</h3>
                <span className={styles.bitedetailDate}>{convertedDate}</span>
                <p className={styles.bitedetailContent}>{content}</p>
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