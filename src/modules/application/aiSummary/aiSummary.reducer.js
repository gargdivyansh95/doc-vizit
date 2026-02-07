import { actionTypes } from "./aiSummary.action";

const initialState = {
    aiSummary: null,
}

export const aiSummaryReducer = (state = initialState, action) => {
    switch (action.type) {

        // case actionTypes.GetReportsListSuccess:
        //     if (action.payload && action.payload?.success === true) {
        //         return { ...state, aiSummary: action.payload?.data };
        //     } else {
        //         return { ...state, aiSummary: null };
        //     }
        
        default:
            return state;
    }
}
