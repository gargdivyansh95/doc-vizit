import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './dashboard.action';
import { axiosRequestPromise } from '@/config';

export function* getDashboardReport(action) {
    const { search, sort, filter, userId } = action.payload;
    const requestURL = `/api/dashboard?search=${search}&sort=${sort}&filter=${filter}`;
    let options = {};
    options.method = 'GET';
    options.data = {};
    options.headers = {
        user_id: userId
    };
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Get Dashboard Report Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.FetchDashboardReport, getDashboardReport);
}