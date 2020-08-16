import React, { Component, Fragment } from 'react';
import styles from './LessonDetail.module.css';

import ReactMarkdown from 'react-markdown/with-html';

class LessonDetail extends Component {

    state = {
        lesson: null
    }

    async componentDidMount() {
        // this.getLesson()
        let title = this.props.match.params.title
        let url = `http://127.0.0.1:8000/api/lessons/?search=${title}`

        const response = await fetch(url)
        const json = await response.json()
        console.log("Data: ", json)

        this.setState({
            lesson: json
        })

    }


    render() {
        const { lesson } = this.state
        let title, content = null


        if (lesson) {
            title = lesson[0]['title']
            content = lesson[0]['content']
            // console.log("Title: ", title)
            // console.log("Content: ", content)
        }


        let lessonDetail = lesson ? (
            <div className={styles.lessondetailContainer}>
                <h3 className={styles.lessondetailTitle}>{title}</h3>
                {/* <p className={styles.lessondetailContent}>{content}</p> */}
                <ReactMarkdown source={content} escapeHtml={false} />
            </div>
        ) : (
                <h6 className="text-center">Loading...</h6>
            )

        return (
            <Fragment>
                <div className="container">
                    {lessonDetail}
                </div>
            </Fragment>
        )
    }
}

export default LessonDetail;