import { AttendanceResultTeamStatListResponse, RequestAggregationResponse } from './../../interfaces/response-interface';
import { AttendanceResultTeamStatListOptions, RequestAggregationOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

/* ===============================================Attendance by team================================================ */

export const GET_ATTENDANCE_RESULT_TEAM_STAT = 'GET_ATTENDANCE_RESULT_TEAM_STAT';

export class GetAttendanceResultTeamStatListAction implements Action {
    readonly type = GET_ATTENDANCE_RESULT_TEAM_STAT;

    constructor(public payload: AttendanceResultTeamStatListOptions) { }
}

export const ATTENDANCE_RESULT_TEAM_STAT_FAIL = 'ATTENDANCE_RESULT_TEAM_STAT_FAIL';

export class AttendanceResultTeamStatFailAction implements Action {
    readonly type = ATTENDANCE_RESULT_TEAM_STAT_FAIL;

    constructor(public payload: AttendanceResultTeamStatListResponse) { }
}

export const ATTENDANCE_RESULT_TEAM_STAT_SUCCESS = 'ATTENDANCE_RESULT_TEAM_STAT_SUCCESS';

export class AttendanceResultTeamStatSuccessAction implements Action {
    readonly type = ATTENDANCE_RESULT_TEAM_STAT_SUCCESS;

    constructor(public payload: AttendanceResultTeamStatListResponse) { }
}

/* ===============================================Work flow statistics================================================ */

export const GET_WORK_FLOW_STATISTICS = 'GET_WORK_FLOW_STATISTICS';

export class GetWorkFlowStatisticsAction implements Action {
    readonly type = GET_WORK_FLOW_STATISTICS;

    constructor(public payload: RequestAggregationOptions) { }
}

export const WORK_FLOW_STATISTICS_FAIL = 'WORK_FLOW_STATISTICS_FAIL';

export class WorkFlowStatisticsFailAction implements Action {
    readonly type = WORK_FLOW_STATISTICS_FAIL;

    constructor(public payload: RequestAggregationResponse) { }
}

export const WORK_FLOW_STATISTICS_SUCCESS = 'WORK_FLOW_STATISTICS_SUCCESS';

export class WorkFlowStatisticsSuccessAction implements Action {
    readonly type = WORK_FLOW_STATISTICS_SUCCESS;

    constructor(public payload: RequestAggregationOptions) { }
}

export type Actions = GetAttendanceResultTeamStatListAction
    | AttendanceResultTeamStatFailAction
    | AttendanceResultTeamStatSuccessAction
    | GetWorkFlowStatisticsAction
    | WorkFlowStatisticsFailAction
    | WorkFlowStatisticsSuccessAction;