import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes, authActions } from './auth.action';
import { axiosRequestPromise } from '@/config';
import { profileActions } from '../profile/profile.action';
import { jwtDecode } from 'jwt-decode';

export function* postGetOtp(action) {
    const body = action.payload;
    let requestURL = '/api/auth/getOtp';
    let options = {};
    options.method = 'POST';
    options.data = body;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 201) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Get OTP Saga Error:', error);
        action.onError(error.response.data);
    }
}

export function* postLogin(action) {
    const body = action.payload;
    let requestURL = '/api/auth/login';
    let options = {};
    options.method = 'POST';
    options.data = body;

    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            const decoded = jwtDecode(response.data?.data?.token);
            yield put(authActions.postLoginSuccess(response.data));
            yield put(profileActions.userProfile({mobileNumber: decoded.sub}));
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Login Saga Error:', error);
        action.onError(error.response.data);
    }
}

export function* postRegister(action) {
    const body = action.payload;
    let requestURL = '/api/auth/signup';
    let options = {};
    options.method = 'POST';
    options.data = body;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 201) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Register Saga Error:', error);
        action.onError(error.response.data);
    }
}

export function* postVerifyRegister(action) {
    const body = action.payload;
    let requestURL = '/api/auth/signup/verify';
    let options = {};
    options.method = 'POST';
    options.data = body;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 201) {
            const decoded = jwtDecode(response.data?.data?.token);
            yield put(authActions.postLoginSuccess(response.data));
            yield put(profileActions.userProfile({mobileNumber: decoded.sub}));
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Verify Register Saga Error:', error);
        action.onError(error.response.data);
    }
}

export function* postResendOtp(action) {
    const body = action.payload;
    let requestURL = '/api/auth/resendOtp';
    let options = {};
    options.method = 'POST';
    options.data = body;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 201) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Resend OTP Saga Error:', error);
        action.onError(error.response.data);
    }
}

export function* postLogout(action) {
    try {
        const response = yield call(axios.post, "/api/auth/logout");
        if (response.status === 200) {
            yield put(authActions.postLogoutSuccess());
            action.onSuccess(response.data);
        }
    } catch (error) {
        console.error("Logout Error:", error);
    }
}

export function* fetchMasterData(action) {
    const body = action.payload;
    let requestURL = '/api/auth/master';
    let options = {};
    options.method = 'POST';
    options.data = body;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            yield put(authActions.fetchMasterDataSuccess(response.data?.data?.data));
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Fetcg Master Saga Error:', error);
        action.onError(error.response.data);
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.PostGetOtp, postGetOtp);
    yield takeLatest(actionTypes.PostLogin, postLogin);
    yield takeLatest(actionTypes.PostRegister, postRegister);
    yield takeLatest(actionTypes.PostVerifyRegister, postVerifyRegister);
    yield takeLatest(actionTypes.PostResendOTP, postResendOtp);
    yield takeLatest(actionTypes.PostLogout, postLogout);
    yield takeLatest(actionTypes.FetchMasterData, fetchMasterData);
}