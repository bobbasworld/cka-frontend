import React from "react";
import { Link } from 'react-router-dom';

import styles from './Home.module.css';
import Drawing from '../../img/home_drawing.png';

const Home = () => {
    return (
        <div className={`container ${styles.showcase}`}>
            <div className="row">
                <div className={`col ${styles.showcaseLeft}`}>
                    <h1 className={styles.showcaseTitle}>Simple and Actionable Crypto Bites</h1>
                    <p className={styles.showcaseText}>No nonsense crypto tools and strategies created by experts to help you navigate the crypto space with ease.</p>
                    <Link className={styles.signup} to="/signup">Get Started</Link>
                </div>
                <div className={`col ${styles.showcaseRight}`}>
                    <img src={Drawing} alt="Crypto" width="450px" height="350px" />
                </div>
            </div>
        </div >
    );
}

export default Home;