import React, { Component, Fragment } from 'react'
import styles from './LessonCard.module.css'
import { withRouter } from 'react-router-dom';

import LessonDrawing from '../../img/lesson_drawing.png';

class LessonCard extends Component {


    handleClick = (title) => {
        this.props.history.push('/lessons/' + title)
    }


    render() {

        let lessonItem = this.props.lessons ? this.props.lessons.map((lesson, index) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                    <div onClick={() => this.handleClick(lesson.title)} className={styles.lessoncardContainer}>
                        <img src={LessonDrawing} alt="drawing" width="100" height="100" />
                        <p className={styles.lessoncardTitle}>{lesson['title']}</p>
                    </div >
                </div>
            )
        })
            :
            <p>No Lessons!</p>


        return (
            <Fragment>
                <div className="row">
                    {lessonItem}
                </div>

            </Fragment >
        )
    }

}



export default withRouter(LessonCard);