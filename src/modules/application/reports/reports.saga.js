import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosRequestPromise } from '@/config';
import { actionTypes, reportsActions } from './reports.action';

export function* postUploadReport(action) {
    const requestURL = `/api/reports/upload`;
    let options = {};
    options.method = 'POST';
    options.data = action.payload;
    options.headers = {
        'Content-Type': 'multipart/form-data'
    };
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 201) {
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Upload Reports Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

export function* getReportsList(action) {
    const requestURL = `/api/reports?search=${action.payload.search}&sort=${action.payload.sort}&filter=${action.payload.filter}`;
    let options = {};
    options.method = 'GET';
    options.data = {};
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            // yield put(reportsActions.getReportsListSuccess(response.data));
            action?.onSuccess(response.data);
        } else {
            action?.onError(response.data);
        }
    } catch (error) {
        console.error('Get Reports List Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

export function* getReportDetailsById(action) {
    const { reportId } = action.payload;
    const requestURL = `/api/reports/${reportId}`;
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
        console.error('Get Reports List Saga Error:', error);
        if (action?.onError) {
            action?.onError(error.response.data);
        }
    }
}

export function* postDeleteReport(action) {
    const { reportId } = action.payload;
    const requestURL = `/api/reports/${reportId}`;
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

export function* postShareReport(action) {
    const body = action.payload;
    let requestURL = '/api/reports/reportShare';
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
        console.error('Report Share Saga Error:', error);
        action.onError(error.response.data);
    }
}

export function* postAccessLog(action) {
    const body = action.payload;
    let requestURL = '/api/reports/accessLog';
    let options = {};
    options.method = 'POST';
    options.data = body;
    try {
        const response = yield call(axiosRequestPromise, requestURL, options);
        if (response.status === 200) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Report Access Log Saga Error:', error);
        action.onError(error.response.data);
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.PostUploadReport, postUploadReport);
    yield takeLatest(actionTypes.GetReportsList, getReportsList);
    yield takeLatest(actionTypes.GetReportDetailsById, getReportDetailsById);
    yield takeLatest(actionTypes.PostDeleteReport, postDeleteReport);
    yield takeLatest(actionTypes.PostShareReport, postShareReport);
    yield takeLatest(actionTypes.PostAccessLog, postAccessLog);
}