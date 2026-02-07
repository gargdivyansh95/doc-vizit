import { all } from 'redux-saga/effects';
import * as auth from '../modules/application/auth/auth.saga';
import * as profile from '../modules/application/profile/profile.saga';
import * as dashboard from '../modules/application/dashboard/dashboard.saga';
import * as reports from '../modules/application/reports/reports.saga';
import * as aiSummary from '../modules/application/aiSummary/aiSummary.saga';
import * as familyManagement from '../modules/application/familyManagement/familyManagement.saga';

export default function* rootSaga() {
    yield all([
        auth.saga(),
        profile.saga(),
        dashboard.saga(),
        reports.saga(),
        aiSummary.saga(),
        familyManagement.saga(),
    ]);
}
