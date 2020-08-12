import * as actionTypes from './actionTypes'
import axios from 'axios'



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


export const userLoading = () => {
    return {
        type: actionTypes.USER_LOADING
    }
}


export const userLoaded = (user) => {
    return {
        type: actionTypes.USER_LOADED,
        user: user
    }
}

export const logout = () => {
    axios.post('http://127.0.0.1:8000/auth/logout/')
        .then(res => {
            console.log(res)
            console.log('LOGOUT ACTION SUCCESS!')
            localStorage.removeItem('token')
        })
        .catch(err => {
            console.log(err)
        })

    // localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

// export const checkAuthTimeout = expirationTime => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout())
//         }, expirationTime * 1000)
//     }
// }

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart())

        axios.post('http://127.0.0.1:8000/auth/login/', {
            email: username,
            password: password
        }).then(res => {
            console.log("data: ", res.data)
            const token = res.data.key;
            // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            // localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            // dispatch(checkAuthTimeout(3600));
        }).catch(err => {
            console.log(err.message)
            dispatch(authFail("Unable to log in with provided credentials."))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.key
            // const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token)
            // localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(token))
            // dispatch(checkAuthTimeout(3600))
        }).catch(err => {
            console.log(err.message)
            dispatch(authFail("Invalid credentials! Make sure your email is valid, passwords are atleast 8 characters, passwords are not common, and passwords match!"))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === null) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));

            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
            //     dispatch(authSuccess(token));
            //     dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            // }
        }
    }
}


export const loadUser = (token) => {
    return dispatch => {
        dispatch(userLoading())

        const config = {
            headers: {
                'Authorization': `Token ${token}`
            }
        }

        // get user
        axios.get('http://127.0.0.1:8000/auth/user/', config)
            .then(res => {
                console.log('USER LOADED')
                dispatch(userLoaded(res.data))
            })
            .catch(err => {
                console.log("USER LOADING ERROR: ", err)
            })

    }
}