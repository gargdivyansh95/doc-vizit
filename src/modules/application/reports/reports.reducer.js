import { actionTypes } from "./reports.action";

const initialState = {
    reports: null,
}

export const reportsReducer = (state = initialState, action) => {
    switch (action.type) {

        // case actionTypes.GetReportsListSuccess:
        //     if (action.payload && action.payload?.success === true) {
        //         return { ...state, reports: action.payload?.data };
        //     } else {
        //         return { ...state, reports: null };
        //     }
        
        default:
            return state;
    }
}
