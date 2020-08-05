import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, isAuthenticated, isLoading, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isLoading) {
                    return <h2>Loading.....</h2>
                } else if (!isAuthenticated) {
                    return <Redirect to='/login' />
                } else {
                    return <Component {...props} />
                }

            }}
        />
    )
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading
    }
}


export default connect(mapStateToProps)(PrivateRoute);