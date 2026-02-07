import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosRequestPromise } from '@/config';
import { actionTypes, familyManagementActions } from './familyManagement.action';

export function* getFamilyMembers(action) {
    const requestURL = `/api/familyManagement`;
    let options = {};
    options.method = 'GET';
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Family Members List Saga Error:', error);
        action?.onError(error.response.data);
    }
}

export function* addFamilyMember(action) {
    const requestURL = `/api/familyManagement`;
    let options = {};
    options.method = 'POST';
    options.data = action.payload;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 201) {
            // yield put(profileActions.userProfile({mobileNumber: action.payload.mobile_number}));
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Add Family Member Saga Error:', error);
       action?.onError(error.response.data);
    }
}

export function* updateFamilyMember(action) {
    console.log(action, 'action')
    const requestURL = `/api/familyManagement/${action.payload.memberId}`;
    let options = {};
    options.method = 'PUT';
    options.data = action.payload.payload;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Update Family Member Saga Error:', error);
        action?.onError(error.response.data);
    }
}

// get all family memebers including self
export function* getAllFamilyMembers(action) {
    const requestURL = `/api/familyManagement/familyMembers`;
    let options = {};
    options.method = 'GET';
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            yield put(familyManagementActions.fetchAllFamilyMembersSuccess(response.data));
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('All Family Members List Saga Error:', error);
        action?.onError(error.response.data);
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.FetchFamilyMembers, getFamilyMembers);
    yield takeLatest(actionTypes.AddFamilyMember, addFamilyMember);
    yield takeLatest(actionTypes.UpdateFamilyMember, updateFamilyMember);
    yield takeLatest(actionTypes.FetchAllFamilyMembers, getAllFamilyMembers);
}