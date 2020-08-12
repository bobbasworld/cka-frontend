import React, { Component, Fragment } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import BitesCard from '../BitesCard/BitesCard';
import Dots from '../../img/dots.png';

import styles from './Bites.module.css';
import axios from 'axios'

class Bites extends Component {
    state = {
        FA: null,
        TA: null
    }

    componentDidMount() {
        console.log("BITES CDM")
        axios.get('http://127.0.0.1:8000/api/bites/')
            .then(res => {
                let data = res.data
                let fa = data.filter(item => {
                    return item.bite_type === 'fundamental'
                })
                let ta = data.filter(item => {
                    return item.bite_type === 'technical'
                })
                this.setState({
                    FA: fa,
                    TA: ta
                })
            })
            .catch(err => console.error(err))

    }

    render() {
        return (
            <Fragment>
                <Navbar />
                <div className="container">
                    <div className={styles.bitesHeader}>
                        <span className={styles.dotsImage1}><img src={Dots} alt="dots" width="30" height="30" /></span>
                        <div className={styles.bitesHeaderText}>
                            <h3 className={styles.bitesTitle}>Cryptocurrency Bites</h3>
                            <p className={styles.bitesSubtitle}>Fundamental and Technical Indicators to pick a project.</p>
                        </div>
                        <span className={styles.dotsImage2}><img src={Dots} alt="dots" width="30" height="30" /></span>
                    </div>
                    <BitesCard fa={this.state.FA} ta={this.state.TA} />
                </div>
            </Fragment>
        )
    }
}

export default Bites