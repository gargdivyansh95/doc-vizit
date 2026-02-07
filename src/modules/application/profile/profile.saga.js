import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosRequestPromise } from '@/config';
import { actionTypes, profileActions } from './profile.action';

export function* getUserProfile(action) {
    const { mobileNumber } = action.payload;
    const requestURL = `/api/profile?mobileNumber=${mobileNumber}`;
    let options = {};
    options.method = 'GET';
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            yield put(profileActions.userProfileSuccess(response.data));
            if (action?.onSuccess) {
                action?.onSuccess(response.data);
            }
        } else {
            if (action?.onError) {
                action?.onError(response.data);
            }
        }
    } catch (error) {
        console.error('User Profile Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

export function* updateUserProfile(action) {
    const requestURL = `/api/profile`;
    let options = {};
    options.method = 'PUT';
    options.data = action.payload;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            yield put(profileActions.userProfile({mobileNumber: action.payload.mobile_number}));
            if (action?.onSuccess) {
                action?.onSuccess(response.data);
            }
        } else {
            if (action?.onError) {
                action?.onError(response.data);
            }
        }
    } catch (error) {
        console.error('Update User Profile Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

export function* postDeleteUser(action) {
    const { memberId } = action.payload;
    const requestURL = `/api/profile/${memberId}`;
    let options = {};
    options.method = 'DELETE';
    options.data = {};
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Delete Report Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.UserProfile, getUserProfile);
    yield takeLatest(actionTypes.UpdateUserProfile, updateUserProfile);
    yield takeLatest(actionTypes.PostDeleteUser, postDeleteUser);
}