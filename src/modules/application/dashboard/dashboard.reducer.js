import { actionTypes } from "./dashboard.action";

const initialState = {
    // skipWelcome: false,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.SkipWelcomeSuccess:
        //     if (action.payload) {
        //         return { ...state, skipWelcome: action.payload };
        //     } else {
        //         return { ...state, skipWelcome: false };
        //     }
        default:
            return state;
    }
};
