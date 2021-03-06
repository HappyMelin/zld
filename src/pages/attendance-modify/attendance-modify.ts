import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { AuditTarget, MissionListItem, WorkFlowPageType } from './../../interfaces/mission-interface';
import { ProcessIdOptions, SpecificWorkFlowState } from './../../interfaces/request-interface';
import { modifyAttendance } from './../../services/business/icon-service';
import { StatisticsService } from './../../services/business/statistics-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { PermissionService } from './../../services/config/permission-service';
import { applyAttendanceModifyPage, attendanceModifyDetailPage, MissionRoot } from './../pages';

@IonicPage()
@Component({
    selector: 'page-attendance-modify',
    templateUrl: 'attendance-modify.html',
})
export class AttendanceModifyPage implements BusinessPageModel{

    total: Observable<number>;

    list: Observable<MissionListItem[]>;

    operate: Observable<boolean>;

    haveMoreData: Observable<boolean>;

    subscriptions: Subscription[] = [];

    nextPage$: Subject<InfiniteScroll> = new Subject();

    audit$: Subject<AuditTarget> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private workFlow: WorkFlowService,
        private permission: PermissionService,
        private statistic: StatisticsService
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

    initialModel(): void {
        this.total = this.workFlow.getCount();

        this.list = this.workFlow.getList();

        this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getAttendanceModifyPage());

        this.operate = this.permission.getOperatePermission(modifyAttendance.icon, MissionRoot)
    }

    launch(): void {
        this.subscriptions = [
            this.workFlow.getSpecificWorkFlowList(
                Observable.of({ process_id: ProcessIdOptions.attendanceModify, ...this.workFlow.getWorkFlowStateOption(SpecificWorkFlowState.pending) }),
                this.workFlow.getAttendanceModifyPage()
            ),

            this.statistic.updateWorkFlowStatisticAtLocal(ProcessIdOptions.attendanceModify, this.workFlow.getTaskUpdateSuccessCount()),

            ...this.workFlow.getNextPage(this.nextPage$, WorkFlowPageType.attendanceModifyPage),

            this.workFlow.updateMultiTask(this.audit$.map(({ comment, ids, approve }) => ({ approve: Number(approve), ids, comment }))),

            this.workFlow.handleWorkFlowError(),

            this.workFlow.handleUpdateError(),
        ];
    }

    goToNextPage(target: MissionListItem): void {
        this.navCtrl.push(attendanceModifyDetailPage, { id: target.id, status: target.status }).then(() => { });
    }

    applyAttendanceModify(): void {
        this.navCtrl.push(applyAttendanceModifyPage);
    }

    ionViewWillUnload() {
        this.workFlow.resetWorkFlowResponse();

        this.workFlow.resetTaskUpdateResponse();

        this.workFlow.resetPage(WorkFlowPageType.attendanceModifyPage);

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
