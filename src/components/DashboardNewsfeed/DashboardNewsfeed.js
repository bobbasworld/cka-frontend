import React, { Fragment } from 'react';
import styles from './DashboardNewsfeed.module.css';
import uuid from 'react-uuid';
import moment from 'moment';



const DashboardNewsfeed = (props) => {

    let { news } = props

    let news1 = news.slice(0, 3)
    // console.log("news: ", news1)

    const newsItem = news1.map((item) => {
        let currencies = item.currencies ? item.currencies[0] : null
        let code = item.currencies ? currencies.code : null
        // console.log('curriencies: ', currencies)
        // console.log('code: ', code)

        let inputDate = item['published_at']
        let convertedDate = moment(inputDate)
        const m = moment(convertedDate)

        let url = item['url']

        return (
            <div key={uuid()} className={styles.dashnewsfeedItem}>
                <p className={styles.dashnewsfeedItemText}>
                    <a href={url} target="_blank">{item['title']}</a>
                </p>
                <span className={styles.dashnewsfeedDate}>
                    {m.fromNow()}
                </span>
                <span className={styles.dashnewsfeedCode}>{code ? code : 'News'}</span>
            </div>

        )
    })

    return (
        <Fragment>
            <div className={styles.dashnewsfeedCard}>
                <h3 className={styles.dashnewsfeedHeader}>News Feed</h3>
                {newsItem}
            </div>
        </Fragment >
    );
}

export default DashboardNewsfeed;