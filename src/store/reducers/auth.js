const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

// export const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         default:
//             return state
//     }
// }

// OR

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}