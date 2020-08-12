import axios from 'axios';

import * as actionTypes from './actionTypes';

// CHECK TOKEN AND LOAD USER
export const loadUser = (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING })

    // Get token from state
    const token = getState().token


}