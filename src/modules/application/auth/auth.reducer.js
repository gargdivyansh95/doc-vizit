import { actionTypes } from './auth.action';

const initialState = {
    user: undefined,
    authToken: undefined,
    refreshToken: undefined,
    skipWelcome: false,
    masterData: undefined,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.PostLoginSuccess:
            if (action.payload && action.payload?.success === true) {
                return { ...state, user: action.payload?.data, authToken: action.payload?.data?.token, refreshToken: action.payload?.data?.refreshToken };
            } else {
                return { ...state, user: null, authToken: null, refreshToken: null };
            }

        case actionTypes.SkipWelcomeSuccess:
            if (action.payload) {
                return { ...state, skipWelcome: action.payload };
            } else {
                return { ...state, skipWelcome: false };
            }
        
        case actionTypes.FetchMasterDataSuccess:
            if (action.payload) {
                return { ...state, masterData: action.payload };
            } else {
                return { ...state, masterData: undefined };
            }
        
        case actionTypes.PostLogoutSuccess:
            return { ...state, user: null, authToken: null, refreshToken: null, skipWelcome: false };
        default:
            return state;
    }
}
