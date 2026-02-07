import { actionTypes as profileActionTypes } from "./profile.action";
import { actionTypes as authActionTypes } from "../auth/auth.action";

const initialState = {
    userProfile: null,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case profileActionTypes.UserProfileSuccess:
            if (action.payload && action.payload?.success === true) {
                return { ...state, userProfile: action.payload?.data };
            } else {
                return { ...state, userProfile: null };
            }

        case authActionTypes.PostLogoutSuccess:
            return { ...state, userProfile: null };
        
        default:
            return state;
    }
}
