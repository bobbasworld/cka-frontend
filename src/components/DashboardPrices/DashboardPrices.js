import React, { Fragment, Component } from 'react';
import styles from './DashboardPrices.module.css';

// import defaultCoin from '../../img/crypto_icons/default.svg';
import Logo from '../../img/cka_logo.png'

import axios from 'axios';


class DashboardPrices extends Component {

    state = {
        imageStatus: 'loading'
    }

    // componentDidMount() {
    //     // axios.get('https://cryptoicons.org/api/icon/btc/200').then(res => {
    //     //     console.log("image: ", res)
    //     // })
    //     //     .catch(err => console.log(err))
    //     axios('https://rest.coinapi.io/v1/assets/icons/{iconSize}', {
    //         method: 'GET',
    //         mode: 'no-cors',
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Content-Type': 'application/json',
    //         },
    //         withCredentials: true,
    //         credentials: 'same-origin',
    //     }).then(res => {
    //         console.log(res.data)
    //         this.setState({
    //             icons: res.data
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    handleImageLoaded = () => {
        this.setState({
            imageStatus: "loaded"
        })
    }

    handleImageErrored = () => {
        this.setState({
            imageStatus: "loadError"
        })
    }



    render() {
        let { prices } = this.props
        // console.log("icons: ", icons[0])

        // sort in descending order by price change %
        prices.sort((a, b) => {
            let a_price_change = parseFloat(a.priceChangePercent), b_price_change = parseFloat(b.priceChangePercent)
            return b_price_change - a_price_change
        })

        // filter list to include only BTC pairs
        let pricesList = prices.filter(item => {
            return item['symbol'].includes('BTC')
        })

        // slice to get the top 20 items
        let resultList = pricesList.slice(0, 20)
        console.log("Sorted: ", resultList)

        const priceItem = resultList.map((item, index) => {
            let pair_symbol = item['symbol']
            let raw_symbol = pair_symbol.split('BTC')[0]
            let symbol = raw_symbol.toLowerCase()
            // console.log("pair symbol: ", pair_symbol)
            // console.log("Symbol: ", raw_symbol)

            // get percent change
            let priceChangePercent = parseFloat(item['priceChangePercent']).toFixed(2)
            // get price
            let price = item['lastPrice']

            // get icons
            // let iconUrl = this.state.imageStatus === "loaded" ? `https://cryptoicons.org/api/icon/${symbol}/200` : Logo


            // console.log("iconURL: ", iconUrl)
            // get icon
            // "https://cryptoicons.org/api/icon/${symbol}/200"

            return (
                <div key={index} className={styles.dashpricesItem}>
                    <div className={`d-flex flex-row ${styles.dashpricesItemText}`}>
                        {/* <img src={iconUrl}
                            onLoad={this.handleImageLoaded}
                            alt=""
                            width="20"
                            height="20" /> */}
                        <span className={`${styles.dashpricesId}`}>{index + 1 + '.'}</span>
                        <span className={`${styles.dashpricesSymbol}`}>{raw_symbol ? raw_symbol : 'BTC'}</span>
                        <span className={priceChangePercent > 0 ? styles.dashpricesPercent1 : styles.dashpricesPercent2}>{priceChangePercent + '%'}</span>
                        <span className={styles.dashpricesPrice}>{price}</span>
                    </div>
                </div>
            )
        })

        return (
            <Fragment>
                <div className={styles.dashpricesCard}>
                    <h3 className={styles.dashpricesHeader}>24hr Top BTC Pairs</h3>
                    <div className={`d-flex flex-row ${styles.dashpricesTitles}`}>
                        <span className={`${styles.dashpricesTitle}`}>Symbol</span>
                        <span className={styles.dashpricesTitle}>Change</span>
                        <span className={styles.dashpricesTitle}>Price</span>
                    </div>
                    {priceItem}
                </div>

            </Fragment>
        )
    }

}

export default DashboardPrices;