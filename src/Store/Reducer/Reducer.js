import ActionTypes from '../Constant/constant';

const INITIAL_STATE = {
    userInfo: [],
    goToWebMessage: '',
    // loader: false,
    isLoggedIn: false,
    internet: '',
    allCoupons: [],
    walletData: [],
    usedCoupons: [],
    isLoader: false,
    isError: false,
    errorMessage: '',
    userDetails: {}



}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload
            })
        case ActionTypes.USERINFO:
            return ({
                ...state,
                userInfo: action.payload
            })
        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })
        // case ActionTypes.SHOWERROR:
        //     return ({
        //         ...state,
        //         goToWebMessage: action.payload
        //     })
        // case ActionTypes.SHOWLOADER:
        //     return ({
        //         ...state,
        //         loader: true
        //     })
        // case ActionTypes.HIDELOADER:
        //     return ({
        //         ...state,
        //         loader: false
        //     })

        case ActionTypes.LOADER:
            return ({
                ...state,
                isLoader: !state.isLoader
            })
        case ActionTypes.SHOWERROR:
            return ({
                ...state,
                isLoader: !state.isLoader,
                isError: !state.isError,
                errorMessage: action.payload
            })
        case ActionTypes.HIDEERROR:
            return ({
                ...state,
                isError: false,
                errorMessage: ''
            })


        case ActionTypes.ISLOGGEDIN:
            return ({
                ...state,
                isLoggedIn: true
            })
        case ActionTypes.COUPONS:
            return ({
                ...state,
                allCoupons: action.payload
            })
        case ActionTypes.WALLET:
            return ({
                ...state,
                walletData: action.payload
            })
        case ActionTypes.USERDETAILS:
            return ({
                ...state,
                userDetails: action.payload
            })
        case ActionTypes.USEDCOUPONS:
            return ({
                ...state,
                usedCoupons: action.payload
            })


        default:
            return state;
    }

}