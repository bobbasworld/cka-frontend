import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import styles from './ProjectCard.module.css';

import fireIcon from '../../img/fire_icon.png';
import moment from 'moment'


class BitesCard extends Component {

    state = {
        projectsCount: 3
    }


    handleSeeMoreProjects = () => {
        this.setState((prevState, props) => {
            return { projectsCount: prevState.projectsCount + 3 }
        })
    }

    handleClick = (title) => {
        this.props.history.push('/projects/' + title)
    }

    render() {
        let projects = null
        console.log("Project Card Props: ", this.props)

        if (this.props) {
            // console.log("props in projecard:", this.props)
            projects = this.props.projects
        }

        let projectItem = projects && projects.length ? projects.slice(0, this.state.projectsCount).map((project, index) => {

            let published_date = project.published_date
            let project_logo = project['project_twitter_image']

            let convertedDate = moment(published_date).format('MMMM Do, YYYY')

            return (
                <div onClick={() => this.handleClick(project.title)} key={index} className="col-lg-4 col-md-6 col-sm-12">
                    <div className={styles.projectcardContainer}>
                        <img className={styles.projectcardDrawing} src={project_logo} alt="drawing" width="100" height="100" />
                        <p className={styles.projectcardTitle}>{project.title}</p>
                        <p className={styles.projectcardDate}>Published {convertedDate}</p>
                    </div>
                </div>
            )
        }) : null

        // check if only one project in  projects prop
        // if (projects && projects.length == 1) {
        //     let date = projects[0]['published_date']
        //     let convertedDate = moment(date).format('YYYY MM DD')

        //     return (
        //         <div onClick={() => this.handleClick(projects[0].title)} className="col-lg-4 col-md-6 col-sm-12">
        //             <div className={styles.projectcardContainer}>
        //                 <img className={styles.projectcardDrawing} src={projects[0]['project_twitter_image']} alt="drawing" width="150" height="130" />
        //                 <p className={styles.projectcardTitle}>{projects[0].title}</p>
        //                 <p className={styles.projectcardDate}>{convertedDate.fromNow()}</p>
        //             </div>
        //         </div>
        //     )
        // }

        return (
            <Fragment>
                <span>
                    <img src={fireIcon} alt="fire" width="30px" height="30px" />
                    <h4 className={styles.projectcardHeading}>Hot Projects</h4>
                </span>

                <div className="container">
                    <div className="row">
                        {projectItem}
                    </div>
                </div>


                {/* Projects See More Button */}
                {
                    projects ?
                        this.state.projectsCount < projects.length ? (
                            <span onClick={this.handleSeeMoreProjects} className={styles.projectcardSeeMore}>See More</span>
                        ) : null
                        : null
                }

            </Fragment>
        )
    }

}

export default withRouter(BitesCard)