import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import faDrawing from '../../img/fa_drawing.png';
import taDrawing from '../../img/ta_drawing.png';
import styles from './BitesCard.module.css';

import moment from 'moment'


class BitesCard extends Component {

    state = {
        faCount: 3,
        taCount: 3
    }


    handleClick = (title) => {
        this.props.history.push('/bites/' + title)
    }


    handleSeeMoreFa = () => {
        this.setState((prevState, props) => {
            return { faCount: prevState.faCount + 3 }
        })
    }

    handleSeeMoreTa = () => {
        this.setState((prevState, props) => {
            return { taCount: prevState.taCount + 3 }
        })
    }


    render() {
        let faBites = null
        let taBites = null

        if (this.props) {
            console.log("props in bitescard:", this.props)
            faBites = this.props.fa
            taBites = this.props.ta
        }

        let faItem = faBites ? faBites.slice(0, this.state.faCount).map((bite, index) => {

            let published_date = bite.published_date
            let convertedDate = moment(published_date)
            const m = moment(convertedDate)

            return (
                <div onClick={() => this.handleClick(bite.title)} key={index} className="col-lg-4 col-md-6 col-sm-12">
                    <div className={styles.bitescardContainer}>
                        <img className={styles.bitescardfaDrawing} src={faDrawing} alt="drawing" width="150" height="130" />
                        <p className={styles.bitescardTitle}>{bite.title}</p>
                        <p className={styles.bitescardDate}>{m.fromNow()}</p>
                    </div>
                </div>
            )
        })
            : null

        let taItem = taBites ? taBites.slice(0, this.state.taCount).map((bite, index) => {

            let published_date = bite.published_date
            let convertedDate = moment(published_date)
            const m = moment(convertedDate)

            return (
                <div onClick={() => this.handleClick(bite.title)} key={index} className="col-lg-4 col-md-6 col-sm-12">
                    <div className={styles.bitescardContainer}>
                        <img className={styles.bitescardtaDrawing} src={taDrawing} alt="drawing" width="135" height="110" />
                        <p className={styles.bitescardTitle}>{bite.title}</p>
                        <p className={styles.bitescardDate}>{m.fromNow()}</p>
                    </div>
                </div>
            )
        })
            : null

        return (
            <Fragment>
                <h3 className={styles.bitescardFaTitle}>Fundamental Analysis Bites</h3>
                <div className="row">
                    {faItem}
                </div>


                {/* FA See More Button */}
                {
                    faBites ?
                        this.state.faCount < faBites.length ? (
                            <span onClick={this.handleSeeMoreFa} className={styles.bitescardSeeMore}>See More</span>
                        ) : null
                        : null
                }

                <h3 className={styles.bitescardTaTitle}>Technical Analysis Bites</h3>
                <div className="row">
                    {taItem}
                </div>

                {/* TA See More Button */}
                {
                    taBites ?
                        this.state.taCount < taBites.length ? (
                            <span onClick={this.handleSeeMoreTa} type="button" className={styles.bitescardSeeMore}>See More</span>
                        ) : null
                        : null
                }

            </Fragment>
        )
    }

}

export default withRouter(BitesCard)