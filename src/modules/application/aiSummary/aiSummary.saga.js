import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosRequestPromise } from '@/config';
import { actionTypes } from './aiSummary.action';

export function* postGenerateAISummary(action) {
    const body = action.payload;
    let requestURL = '/api/aiSummary/generateSummary';
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
        console.error('Generate AI Summary Saga Error:', error);
        action.onError(error.response.data);
    }
}

export function* getAISummaryList(action) {
    const requestURL = `/api/aiSummary`;
    let options = {};
    options.method = 'GET';
    options.data = {};
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Get AI Summary List Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

export function* getAISummaryDetails(action) {
    const { summaryId } = action.payload;
    const requestURL = `/api/aiSummary/${summaryId}`;
    let options = {};
    options.method = 'GET';
    options.data = {};
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Get AI Summary Details Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

export function* postDeleteAISummary(action) {
    const { summaryId } = action.payload;
    const requestURL = `/api/aiSummary/${summaryId}`;
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
        console.error('Delete AI Summary Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.PostGenerateAISummary, postGenerateAISummary);
    yield takeLatest(actionTypes.GetAISummaryList, getAISummaryList);
    yield takeLatest(actionTypes.GetAISummaryDetailsById, getAISummaryDetails);
    yield takeLatest(actionTypes.PostDeleteAISummary, postDeleteAISummary);
}