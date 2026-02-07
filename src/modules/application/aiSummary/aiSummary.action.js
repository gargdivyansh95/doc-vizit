export const actionTypes = {
    PostGenerateAISummary: '[AI Summary] Post Generate AI Summary Action',
    GetAISummaryList: '[AI Summary] Get AI Summary List Action',
    GetAISummaryDetailsById: '[AI Summary] Get AI Summary Details By Id Action',
    PostDeleteAISummary: '[AI Summary] Post Delete AI Summary Action',
};

export const aiSummaryActions = {
    postGenerateAISummary: (payload, onSuccess, onError) => ({ type: actionTypes.PostGenerateAISummary, payload, onSuccess, onError }),
    getAISummaryList: (payload, onSuccess, onError) => ({ type: actionTypes.GetAISummaryList, payload, onSuccess, onError }),
    getAISummaryDetailsById: (payload, onSuccess, onError) => ({ type: actionTypes.GetAISummaryDetailsById, payload, onSuccess, onError }),
    postDeleteAISummary: (payload, onSuccess, onError) => ({ type: actionTypes.PostDeleteAISummary, payload, onSuccess, onError }),
};
