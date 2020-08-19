import React, { Component, Fragment } from 'react';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo';

import styles from './ProjectDetail.module.css';

import axios from 'axios';
import moment from 'moment';
import ReactMarkdown from 'react-markdown/with-html';


class ProjectDetail extends Component {

    state = {
        data: null
    }

    async componentDidMount() {
        let title = this.props.match.params.title
        let url = `http://127.0.0.1:8000/api/projects/?search=${title}`


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
        let title, content, date, convertedDate, youtube_url = null


        // check if data is loaded in state...this avoids undefined or null error
        if (data) {
            title = data[0].title
            content = data[0].content
            date = data[0].published_date
            youtube_url = data[0].youtube_embed_url
        }

        convertedDate = moment(date).format('MMMM Do, YYYY')

        let projectDetail = data ? (
            <div className={styles.projectdetailContainer}>
                <h3 className={styles.projectdetailTitle}>{title}</h3>
                <span className={styles.projectdetailDate}>{convertedDate}</span>
                <p className={styles.projectdetailContent} >
                </p>
                <YoutubeVideo embedUrl={youtube_url} />
                <ReactMarkdown source={content} escapeHtml={false} />
            </div>
        ) : (
                <div className="text-center">Loading...</div>
            )



        return (
            <Fragment>
                <div className="container">
                    {projectDetail}
                </div>
            </Fragment>
        )
    }
}

export default ProjectDetail