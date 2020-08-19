import React, { Component, Fragment } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './Projects.module.css';
import axios from 'axios'

// https://www.youtube.com/watch?v=hmC1lTsaSX8
class Projects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projects: null
        }
        this.signal = axios.CancelToken.source()
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/projects/', {
            cancelToken: this.signal.token
        }).then(res => {
            // console.log(res.data)
            this.setState({ projects: res.data })
        })
            .catch(err => {
                console.error(err)
            })
    }

    componentWillUnmount() {
        this.signal.cancel('Projects API being cancelled!')
    }


    // embedUrl='https://www.youtube.com/embed/hmC1lTsaSX8'
    render() {
        let projects = null;
        if (this.state.projects) {
            projects = this.state.projects
        }

        return (
            <Fragment>
                <ProjectCard projects={projects} />
            </Fragment>
        )
    }

}

export default Projects;