import React from 'react';
import styles from './YoutubeVideo.module.css';


class YoutubeVideo extends React.Component {

    // className={styles.youtubevideoContainer}
    render() {

        const { embedUrl } = this.props

        return (
            <iframe
                width="100%"
                height="310px"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
        )
    }

}

export default YoutubeVideo;