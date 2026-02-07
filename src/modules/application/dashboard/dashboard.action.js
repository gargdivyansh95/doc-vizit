export const actionTypes = {
    FetchDashboardReport: '[Dashboard] Fetch Dashboard Report Action',
};

export const dashboardActions = {
    fetchDashboardReport: (payload, onSuccess, onError) => ({ type: actionTypes.FetchDashboardReport, payload, onSuccess, onError }),
};
