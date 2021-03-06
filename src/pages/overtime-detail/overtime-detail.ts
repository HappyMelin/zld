import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { Overtime, WorkFlow } from './../../interfaces/response-interface';
import { overtime } from './../../services/business/icon-service';
import { OvertimeService } from './../../services/business/overtime-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { PermissionService } from './../../services/config/permission-service';
import { MissionRoot } from './../pages';

@IonicPage()
@Component({
    selector: 'page-overtime-detail',
    templateUrl: 'overtime-detail.html',
})
export class OvertimeDetailPage implements BusinessPageModel{

    id: number;

    workFlow: Observable<WorkFlow>;

    overtime: Observable<Overtime>;

    subscriptions: Subscription[] = [];

    isAuditButtonVisibility: Observable<boolean>;

    audit$: Subject<boolean> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private workFlowService: WorkFlowService,
        private overtimeService: OvertimeService,
        private permission: PermissionService
    ) {
        this.id = navParams.get('id');
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel() {
        this.workFlow = this.workFlowService.getWorkFlow(this.id);

        this.overtime = this.overtimeService.getOvertimeRecords().map(res => res[0]);

        this.isAuditButtonVisibility = this.workFlowService.isAuditButtonVisibility(
            this.navParams.get('status'),
            this.permission.getOperatePermission(overtime.icon, MissionRoot)
        );
    }

    launch() {
        this.subscriptions = [
            this.overtimeService.getOvertimeRecordList(this.overtimeService.getRecordOptions(this.id, this.navParams.get('status'))),

            this.workFlowService.getTaskUpdateSuccessResponse().subscribe(_ => this.navCtrl.pop()),

            this.workFlowService.auditTask(this.audit$.mapTo(this.id)),

            this.overtimeService.handleError(),
        ];
    }

    ionViewWillUnload() {
        this.workFlowService.resetTaskUpdateResponse();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

}
