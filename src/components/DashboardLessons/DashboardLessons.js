import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './DashboardLessons.module.css';


const DashboardLessons = ({ lessons }) => {

    let lessons1 = lessons.slice(0, 3)

    const lessonItem = lessons1.map((lesson, index) => {
        // console.log("lesson item: ", lesson)
        let title = lesson.title
        let level = lesson.level
        let levelCaps = level.charAt(0).toUpperCase() + level.slice(1)

        let url = '/lessons/' + title

        return (
            <div key={index} className={styles.dashlessonsItem}>
                <p className={styles.dashlessonsItemText}>
                    <span className={styles.dashlessonsId}>
                        {index + 1 + '.'}
                    </span>
                    <Link to={url}>{title}</Link>
                </p>
                <span className={styles.dashlessonsLevel}>{levelCaps}</span>
            </div >

        )
    })

    return (
        <Fragment>
            <div className={styles.dashlessonsCard}>
                <h3 className={styles.dashlessonsHeader}>Lessons</h3>
                {lessonItem}
                <Link to='/lessons'><span className={styles.dashlessonsSeeMore}>See More</span></Link>
            </div>
        </Fragment>
    )
}

export default DashboardLessons;