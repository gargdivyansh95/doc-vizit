export const actionTypes = {
    PostUploadReport: '[Reports] Post Upload Report Action',
    GetReportsList: '[Reports] Get Report List Action',
    // GetReportsListSuccess: '[Reports] Get Report List Success Action',
    GetReportDetailsById: '[Reports] Get Report Details By Id Action',
    PostDeleteReport: '[Reports] Post Delete Report Action',
    PostShareReport: '[Reports] Post Share Report Action',
    PostAccessLog: '[Reports] Post Access Log Action',
};

export const reportsActions = {
    postUploadReport: (payload, onSuccess, onError) => ({ type: actionTypes.PostUploadReport, payload, onSuccess, onError }),
    getReportsList: (payload, onSuccess, onError) => ({ type: actionTypes.GetReportsList, payload, onSuccess, onError }),
    // getReportsListSuccess: (payload) => ({ type: actionTypes.GetReportsListSuccess, payload }),
    getReportDetailsById: (payload, onSuccess, onError) => ({ type: actionTypes.GetReportDetailsById, payload, onSuccess, onError }),
    postDeleteReport: (payload, onSuccess, onError) => ({ type: actionTypes.PostDeleteReport, payload, onSuccess, onError }),
    postShareReport: (payload, onSuccess, onError) => ({ type: actionTypes.PostShareReport, payload, onSuccess, onError }),
    postAccessLog: (payload, onSuccess, onError) => ({ type: actionTypes.PostAccessLog, payload, onSuccess, onError }),
};
