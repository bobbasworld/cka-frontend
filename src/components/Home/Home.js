import React, { Fragment } from "react";
import { Link, Redirect } from 'react-router-dom';

import styles from './Home.module.css';
import Drawing from '../../img/home_drawing.png';



const Home = () => {
    const token = localStorage.getItem('token')
    if (token) {
        return <Redirect to='/dashboard' />
    }
    return (
        <Fragment>
            <div className={`container ${styles.showcase}`}>
                <div className="row">
                    <div className={`col ${styles.showcaseLeft}`}>
                        <h1 className={styles.showcaseTitle}>Simple and Actionable Crypto Bites</h1>
                        <p className={styles.showcaseText}>No nonsense crypto tools and strategies created by experts to help you navigate the crypto space with ease.</p>
                        <Link className={`${styles.getStarted} ${styles.signup}`} to="/signup">Get Started</Link>
                    </div>
                    <div className={`col ${styles.showcaseRight}`}>
                        <img className={styles.showcaseDrawing} src={Drawing} alt="Crypto" />
                    </div>
                </div>
            </div >
        </Fragment>
    );
}

export default Home;