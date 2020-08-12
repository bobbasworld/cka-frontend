import React, { Component, Fragment } from 'react';
import faDrawing from '../../img/fa_drawing.png';
import styles from './BitesCard.module.css';


class BitesCard extends Component {


    render() {
        let faBites = null
        let taBites = null

        if (this.props) {
            console.log("props in bitescard:", this.props)
            faBites = this.props.fa
            taBites = this.props.ta
        }

        let faItem = faBites ? faBites.map((bite, index) => {
            return (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                    <div className={styles.bitescardContainer}>
                        <img className={styles.bitescardfaDrawing} src={faDrawing} alt="drawing" width="150" height="130" />
                        <p className={styles.bitescardTitle}>{bite.title}</p>
                        <p className={styles.bitescardDate}>{bite.published_date}</p>
                    </div>
                </div>
            )
        })
            : null

        let taItem = taBites ? taBites.map((bite, index) => {
            return (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                    <div className={styles.bitescardContainer}>
                        <img className={styles.bitescardfaDrawing} src={faDrawing} alt="drawing" width="100" height="100" />
                        <p className={styles.bitescardTitle}>{bite.title}</p>
                        <p className={styles.bitescardDate}>{bite.published_date}</p>
                    </div>
                </div>
            )
        })
            : null

        return (
            <Fragment>
                <h3>Fundamental Analysis Bites</h3>
                <div className="row">
                    {faItem}
                </div>
                <h3>Technical Analysis Bites</h3>
                <div className="row">
                    {taItem}
                </div>
            </Fragment>
        )
    }

}

export default BitesCard