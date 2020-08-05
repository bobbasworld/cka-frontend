import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../../img/cka_logo.png';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

class SelectLevel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
        console.log('constructor')
    }

    state = {
        token: ''
    }

    // componentDidMount() {
    //     console.log('componentDidMount')
    //     this.props.onTryAutoSignup()
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         console.log("Token in componentDidMount: ", token)
    //         // this.setState({})
    //     } else {
    //         console.log('No Token in componentDidMount')
    //     }
    // }


    // componentWillReceiveProps(newProps) {
    //     // this.props.onTryAutoSignup()

    //     console.log('componentWillReceiveProps')
    //     // const token = newProps.token
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         console.log('Token in componentWillReceiveProps: ', token)
    //         this.setState({
    //             token: token
    //         })
    //     } else {
    //         console.log('No Token in componentWillReceiveProps')
    //         this.props.history.push('/signup')
    //     }
    // }


    render() {
        console.log('render')
        // let output = null

        // if (this.props.loading == true) {
        //     output = <h4>Loading...</h4>
        // } else {
        //     output = (
        //         <Fragment>
        //             <nav className="bg-white navbar navbar-expand-lg navbar-light bg-light" >
        //                 <div className="container">
        //                     <Link to="/">
        //                         <img src={Logo} alt="Crypto Knowledge Alliance" width="60px" height="60px" />
        //                     </Link>
        //                 </div>
        //             </nav>
        //             <div className="container">
        //                 <h2>Select Level</h2>
        //             </div>
        //         </Fragment>
        //     )
        // }

        // this.props.loading === true ? <h2>Loading....</h2>
        // :
        // <div>
        //     <h2>SELECT LEVEL</h2>
        //     <h6>Token: {this.state.token}</h6>
        // </div>

        return (
            // this.props.loading === true ? <h2>Loading...</h2>
            //     :
            //     <Fragment>
            //         <nav className="bg-white navbar navbar-expand-lg navbar-light bg-light" >
            //             <div className="container">
            //                 <Link to="/">
            //                     <img src={Logo} alt="Crypto Knowledge Alliance" width="60px" height="60px" />
            //                 </Link>
            //             </div>
            //         </nav>
            //         <div className="container">
            //             <h2>Select Level</h2>
            //         </div>
            //     </Fragment>
            <Fragment>
                <nav className="bg-white navbar navbar-expand-lg navbar-light bg-light" >
                    <div className="container">
                        <Link to="/">
                            <img src={Logo} alt="Crypto Knowledge Alliance" width="60px" height="60px" />
                        </Link>
                    </div>
                </nav>
                <div className="container">
                    <h2>Select Level</h2>
                </div>
            </Fragment>

        )
    }
}


export default SelectLevel;

// const mapStateToProps = state => {
//     return {
//         loading: state.loading,
//         error: state.error,
//         token: state.token
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignup: () => dispatch(actions.authCheckState())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SelectLevel);