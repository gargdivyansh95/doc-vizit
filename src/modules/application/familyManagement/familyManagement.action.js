export const actionTypes = {
    FetchFamilyMembers: '[Family] Fetch Family Members Action',
    AddFamilyMember: '[Family] Add Family Member Action',
    UpdateFamilyMember: '[Family] Update Family Member Action',
    FetchAllFamilyMembers: '[Family] Fetch All Family Members Action',
    FetchAllFamilyMembersSuccess: '[Family] Fetch All Family Members Success Action',
};

export const familyManagementActions = {
    fetchFamilyMembers: (payload, onSuccess, onError) => ({ type: actionTypes.FetchFamilyMembers,payload, onSuccess, onError }),
    addFamilyMember: (payload, onSuccess, onError) => ({ type: actionTypes.AddFamilyMember, payload, onSuccess, onError }),
    updateFamilyMember: (payload, onSuccess, onError) => ({ type: actionTypes.UpdateFamilyMember, payload, onSuccess, onError }),
    fetchAllFamilyMembers: (payload, onSuccess, onError) => ({ type: actionTypes.FetchAllFamilyMembers, payload, onSuccess, onError }),
    fetchAllFamilyMembersSuccess: (payload) => ({ type: actionTypes.FetchAllFamilyMembersSuccess, payload }),
};
