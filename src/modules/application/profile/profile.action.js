export const actionTypes = {
    UserProfile: '[Profile] User Profile Action',
    UserProfileSuccess: '[Profile] User Profile Success Action',
    UpdateUserProfile: '[Profile] Update User Profile Action',
    PostDeleteUser: '[Profile] Post Delete User Action',
};

export const profileActions = {
    userProfile: (payload, onSuccess, onError) => ({ type: actionTypes.UserProfile, payload, onSuccess, onError }),
    userProfileSuccess: (payload) => ({ type: actionTypes.UserProfileSuccess, payload }),
    updateUserProfile: (payload, onSuccess, onError) => ({ type: actionTypes.UpdateUserProfile, payload, onSuccess, onError }),
    postDeleteUser: (payload, onSuccess, onError) => ({ type: actionTypes.PostDeleteUser, payload, onSuccess, onError }),
};
