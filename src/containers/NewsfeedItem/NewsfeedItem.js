import React, { Component, Fragment } from 'react';

import styles from './NewsfeedItem.module.css';
import newsfeedDrawing from '../../img/newsfeed_drawing.png';

import moment from 'moment';

class NewsfeedItem extends Component {

    state = {
        articles: null,
        articleCount: 5
    }


    handleSeeMoreArticles = () => {
        this.setState((prevState, props) => {
            return { articleCount: prevState.articleCount + 5 }
        })
    }



    render() {
        let articles = null;
        let newsFeedItem = null;


        if (this.props) {
            articles = this.props.articles
            console.log('articles: ', this.props.articles)
        }

        newsFeedItem = articles ? articles.slice(0, this.state.articleCount).map((item, index) => {
            let title = item.title
            let url = item.url
            let domain = item.domain
            let pub_date = item.published_at
            let convertedDate = moment(pub_date).fromNow()

            return (
                <div key={index} className={styles.newsfeedItemContainer}>
                    <div className={styles.newsfeedItemTitleContainer}>
                        <span className={styles.newsfeedItemTitle}>
                            <span className={styles.newsfeedItemDrawing} >
                                <img src={newsfeedDrawing} alt="drawing" width="60" height="60" />
                            </span>
                            <span className={styles.newsfeedItemTitleText}>
                                <a href={url} target="_blank">{title}</a>
                            </span>
                        </span>
                    </div>
                    <p>
                        <span className={styles.newsfeedItemUrl}>{domain}</span>
                        <span className={styles.newsfeedItemDate}>{convertedDate}</span>
                    </p>
                    <hr />
                </div >

            )
        }) : <h3>Loading...</h3>





        return (
            <Fragment>
                {newsFeedItem}
                {
                    articles ?
                        this.state.articleCount < articles.length ? (
                            <span onClick={this.handleSeeMoreArticles} className={styles.newsfeedSeeMore}>See More</span>
                        ) : null
                        : null
                }
                <br />
                <br />
                <br />
                <br />
            </Fragment >
        )
    }

}

export default NewsfeedItem