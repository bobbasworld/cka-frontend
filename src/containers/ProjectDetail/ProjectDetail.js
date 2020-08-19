import React, { Component, Fragment } from 'react';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo';
import Avatar from 'react-avatar';

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
        let title, content,
            date, convertedDate,
            youtube_url,
            author_name,
            project_twitter_url,
            project_twitter_image
                = null


        // check if data is loaded in state...this avoids undefined or null error
        if (data) {
            title = data[0].title
            content = data[0].content
            date = data[0].published_date
            youtube_url = data[0].youtube_embed_url
            author_name = data[0].author_name
            project_twitter_url = data[0].project_twitter_url
            project_twitter_image = data[0].project_twitter_image
        }

        convertedDate = moment(date).format('MMMM Do, YYYY')

        let projectDetail = data ? (
            <div className={styles.projectdetailContainer}>
                <h3 className={styles.projectdetailTitle}>{title}</h3>
                <span>
                    <a href={project_twitter_url} target="_blank">
                        <Avatar
                            size="40"
                            round={true}
                            src={project_twitter_image}
                        />
                    </a>

                    <span className={styles.projectdetailAuthorName}>by {author_name} | </span>
                    <span className={styles.projectdetailDate}>{convertedDate}</span>
                </span>
                <p className={styles.projectdetailContent} >
                </p>
                <YoutubeVideo embedUrl={youtube_url} />
                <ReactMarkdown source={content} escapeHtml={false} />
                {/* <hr />
                <br />
                <span>
                    <a href={project_twitter_url} target="_blank">
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
                <hr /> */}
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