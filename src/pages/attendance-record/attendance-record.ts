import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { uniqBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { AttendanceInstant, AttendanceResult } from '../../interfaces/response-interface';
import { AttendanceRecordService } from '../../services/business/attendance-record-service';
import { AttendanceService } from '../../services/business/attendance-service';
import { FaceImageComponent } from './../../components/face-image/face-image';
import { PermissionService } from './../../services/config/permission-service';
import { applyAttendanceModifyPage } from './../pages';

@IonicPage()
@Component({
    selector: 'page-attendance-record',
    templateUrl: 'attendance-record.html',
})
export class AttendanceRecordPage implements BusinessPageModel{

    attendanceResult: AttendanceResult;

    operatePermission: Observable<boolean>;

    records: Observable<AttendanceInstant[]>;

    haveMoreData: Observable<boolean>;

    actionSheet$$: Subscription;

    subscriptions: Subscription[] = [];

    nextPage$: Subject<InfiniteScroll> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private attendance: AttendanceService,
        private attendanceRecord: AttendanceRecordService,
        private permission: PermissionService,
        private modalCtrl: ModalController
    ) {
        this.attendanceResult = this.navParams.get('attendance');
    }

    ionViewDidLoad() {
        const rootName = this.navParams.get('rootName');

        const iconName = this.navParams.get('iconName');

        this.operatePermission = this.permission.getOperatePermission(iconName, rootName);

        this.initialModel();

        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.attendanceRecord.getAttendanceInstantList(Observable.of({ start_day: this.attendanceResult.day, end_day: this.attendanceResult.day, user_id: [this.attendanceResult.contract__worker_id] })),

            ...this.attendanceRecord.getNextPage(this.nextPage$),

            this.attendanceRecord.handleError(),
        ];
    }

    initialModel(): void {
        this.haveMoreData = this.attendanceRecord.haveMoreData();

        this.records = this.attendanceRecord
            .getAttendanceRecord()
            .scan((acc, cur) => acc.concat(cur))
            .map(result => uniqBy(result, 'id'));
    }

    showActionSheet(): void {
        this.actionSheet$$ && this.actionSheet$$.unsubscribe();

        const applyFn = () => this.navCtrl.push(applyAttendanceModifyPage);

        this.actionSheet$$ = this.attendance.showActionSheet([this.attendanceResult], applyFn);
    }


    showCapture(instant: AttendanceInstant): void {
        const { similarity, screen_image, capture_image } = instant;

        this.modalCtrl.create(FaceImageComponent, { similarity, screen: screen_image, capture: capture_image }).present();
    }

    ionViewWillUnload() {
        this.attendanceRecord.resetRecordResponse();
        
        this.actionSheet$$ && this.actionSheet$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

    ionViewWillLeave() {
        this.attendanceRecord.resetPage();
    }
}
