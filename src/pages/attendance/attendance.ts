import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AttendanceState } from '../../interfaces/attendance-interface';
import { BusinessPageModel } from '../../interfaces/core-interface';
import { RequestOption } from '../../interfaces/request-interface';
import { AttendanceResult, Team } from '../../interfaces/response-interface';
import { applyAttendanceModifyPage, attendanceRecordPage, ProjectRoot } from '../../pages/pages';
import { attendanceList } from '../../services/api/command';
import { AttendanceService } from '../../services/business/attendance-service';
import { attendance as attendanceIcon } from '../../services/business/icon-service';
import { TeamService } from '../../services/business/team-service';
import { TimeService } from '../../services/utils/time-service';
import { PermissionService } from './../../services/config/permission-service';

@IonicPage()
@Component({
    selector: 'page-attendance',
    templateUrl: 'attendance.html',
})
export class AttendancePage implements BusinessPageModel{
    startDate: string;

    endDate: string;

    today: string;

    teams: Observable<Team[]>;

    selectedTeams: Team[];

    attendances: Observable<AttendanceResult[]>;

    subscriptions: Subscription[] = [];

    operatePermission: Observable<boolean>;

    actionSheet$$: Subscription;

    nextPage$: Subject<InfiniteScroll> = new Subject();

    selectedAttendanceState: number;

    haveMoreData: Observable<boolean>;

    count: Observable<number>;

    orderType: string;

    sortType: number;

    setTeam$: Subject<Team[]> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private attendance: AttendanceService,
        private timeService: TimeService,
        private teamService: TeamService,
        private permission: PermissionService
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.attendance.getAttendances(this.getAttendanceOption()),

            this.getDate(),

            this.attendance.getSelectedAttendanceState().subscribe(state => this.selectedAttendanceState = state),

            this.teamService.getSelectedTeams().subscribe(_ => this.attendance.resetAttendance()),

            this.attendance.getOrderType().subscribe(type => this.orderType = type),

            this.attendance.getSortType().subscribe(type => this.sortType = type),

            this.teamService.setSelectTeams(this.setTeam$.map(teams => teams.map(item => item.id))),

            ...this.attendance.getNextPage(this.nextPage$),

            this.teamService.handleError(),

            this.attendance.handleAttendanceError(),

            this.attendance.handleAttendanceModifyError(),

            this.attendance.handleAttendanceConfirmError(),
        ];
    }

    initialModel(): void {
        this.today = this.timeService.getDate(this.timeService.getYesterday(), true);

        this.attendances = this.attendance.getWrappedAttendanceResultList();

        this.teams = this.teamService.getOwnTeamsContainsSelectedProp();

        this.haveMoreData = this.attendance.haveMoreData();

        this.operatePermission = this.permission.getOperatePermission(attendanceIcon.icon, ProjectRoot);

        this.count = this.attendance.getWrappedAttendanceCount();
    }

    getDate(): Subscription {
        return this.attendance.getSelectedDate()
            .subscribe(data => {
                this.startDate = this.timeService.getDate(data.start, true);
                this.endDate = this.timeService.getDate(data.end, true);
            });
    }

    getAttendanceOption(): Observable<RequestOption> {
        return this.teamService.getSelectedTeams()
            .combineLatest(
            this.attendance.getSelectedDate().map(data => ({ start_day: this.timeService.getDate(data.start, true), end_day: this.timeService.getDate(data.end, true) })),
            this.attendance.getSelectedAttendanceState().map(state => attendanceList.noMagicNumber.get(AttendanceState[state]).value),
            (ids, date, queryType) => ({ ...date, team_id: ids, ...queryType })
            );
    }

    /* ========================================================Attendance operation========================================================= */

    setDate(type: string) {
        const data = type === 'start' ? this.startDate : this.endDate;

        this.attendance.setDate(type, data);

        this.attendance.resetAttendance();
    }

    updateSelectedAttendanceState(state: string): void {
        this.attendance.setSelectedAttendanceState(Number(state));

        this.attendance.resetAttendance();
    }

    sortAttendanceBy(target: number) {
        this.attendance.switchSortType(target);
    }

    switchOrderType(order: string): void {
        this.attendance.switchOrderType(order);
    }

    /* ========================================================Team operation========================================================= */

    showActionSheet(attendances: AttendanceResult[]) {
        this.actionSheet$$ && this.actionSheet$$.unsubscribe();

        const applyFn = () => this.navCtrl.push(applyAttendanceModifyPage);

        this.actionSheet$$ = this.attendance.showActionSheet(attendances, applyFn);
    }

    goToDetailPage(attendance: AttendanceResult) {
        this.navCtrl.push(attendanceRecordPage, { attendance, rootName: ProjectRoot, iconName: attendanceIcon.icon }).then(() => { });
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item && item.unsubscribe());

        this.attendance.resetAttendance();

        this.actionSheet$$ && this.actionSheet$$.unsubscribe();
    }
}
