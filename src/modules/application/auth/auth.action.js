export const actionTypes = {
    PostGetOtp: '[Auth] Post Get OTP Action',
    PostLogin: '[Auth] Post Login Action',
    PostLoginSuccess: '[Auth] Post Login Success Action',
    PostRegister: "[Auth] Post Register Action",
    PostVerifyRegister: "[Auth] Post Verify Register Action",
    PostResendOTP: "[Auth] Post Resend OTP Action",
    PostLogout: "[Auth] Post Logout Action",
    PostLogoutSuccess: "[Auth] Post Logout Success Action",
    SkipWelcomeSuccess: '[Auth] Skip Welcome Success Action',
    FetchMasterData: '[Auth] Fetch Master Data Action',
    FetchMasterDataSuccess: '[Auth] Fetch Master Data Success Action',
};

export const authActions = {
    postGetOtp: (payload, onSuccess, onError) => ({ type: actionTypes.PostGetOtp, payload, onSuccess, onError }),
    postLogin: (payload, onSuccess, onError) => ({ type: actionTypes.PostLogin, payload, onSuccess, onError }),
    postLoginSuccess: (payload) => ({ type: actionTypes.PostLoginSuccess, payload }),
    postRegister: (payload, onSuccess, onError) => ({ type: actionTypes.PostRegister, payload, onSuccess, onError }),
    postVerifyRegister: (payload, onSuccess, onError) => ({ type: actionTypes.PostVerifyRegister, payload, onSuccess, onError }),
    postResendOTP: (payload, onSuccess, onError) => ({ type: actionTypes.PostResendOTP, payload, onSuccess, onError }),
    postLogout: (onSuccess, onError) => ({ type: actionTypes.PostLogout, onSuccess, onError }),
    postLogoutSuccess: () => ({ type: actionTypes.PostLogoutSuccess }),
    skipWelcomeSuccess: (payload) => ({ type: actionTypes.SkipWelcomeSuccess, payload }),
    fetchMasterData: (payload, onSuccess, onError) => ({ type: actionTypes.FetchMasterData, payload, onSuccess, onError }),
    fetchMasterDataSuccess: (payload) => ({ type: actionTypes.FetchMasterDataSuccess, payload }),
};
