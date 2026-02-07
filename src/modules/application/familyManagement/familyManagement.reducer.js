import { actionTypes as familyManagementActionTypes } from "./familyManagement.action";
import { actionTypes as authActionTypes } from "../auth/auth.action";

const initialState = {
    allFamilyMembers: null,
}

export const familyManagementReducer = (state = initialState, action) => {
    switch (action.type) {

        case familyManagementActionTypes.FetchAllFamilyMembersSuccess:
            if (action.payload && action.payload?.success === true) {
                return { ...state, allFamilyMembers: action.payload?.data };
            } else {
                return { ...state, allFamilyMembers: null };
            }

        case authActionTypes.PostLogoutSuccess:
            return { ...state, allFamilyMembers: null };
        
        default:
            return state;
    }
}
