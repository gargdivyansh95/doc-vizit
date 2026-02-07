import { combineReducers } from 'redux';
import {authReducer} from '@/modules/application/auth/auth.reducer';
import { profileReducer } from '@/modules/application/profile/profile.reducer';
import { dashboardReducer } from '@/modules/application/dashboard/dashboard.reducer';
import { reportsReducer } from '@/modules/application/reports/reports.reducer';
import { aiSummaryReducer } from '@/modules/application/aiSummary/aiSummary.reducer';
import { familyManagementReducer } from '@/modules/application/familyManagement/familyManagement.reducer';

export const rootReducer = combineReducers({
    // theme: themeReducer,
    auth: authReducer,
    profile: profileReducer,
    dashboard: dashboardReducer,
    reports: reportsReducer,
    aiSummary: aiSummaryReducer,
    familyManagement: familyManagementReducer
});

export default rootReducer;
