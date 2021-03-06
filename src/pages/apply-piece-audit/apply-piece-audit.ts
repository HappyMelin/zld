import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { LaunchResponse } from '../../reducers/reducer/launch-reducer';
import { WorkerSelectComponent } from './../../components/worker-select/worker-select';
import { ContractType } from './../../interfaces/request-interface';
import { PiecePay } from './../../interfaces/response-interface';
import { WorkerItem } from './../../interfaces/worker-interface';
import { PieceAuditFormModel } from './../../services/api/mapper-service';
import { LaunchService } from './../../services/business/launch-service';
import { WorkerService } from './../../services/business/worker-service';
import { ConfigService } from './../../services/config/config-service';

@IonicPage()
@Component({
    selector: 'page-apply-piece-audit',
    templateUrl: 'apply-piece-audit.html',
})
export class ApplyPieceAuditPage implements BusinessPageModel{

    subscriptions: Subscription[] = [];

    workers: Observable<WorkerItem[]>;

    names: Observable<string>;

    form: FormGroup;

    attachList: string[] = [];

    apply$: Subject<PieceAuditFormModel> = new Subject();

    pieces: Observable<PiecePay[]>;

    constructor(
        private launchService: LaunchService,
        private worker: WorkerService,
        private fb: FormBuilder,
        private modalCtrl: ModalController,
        private config: ConfigService
    ) {
        this.initialForm();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();

        this.config.hideTabBar();
    }

    initialModel(): void {
        this.workers = this.worker.getSelectWorkersContainsContractId();

        this.names = this.workers.map(workers => workers.map(item => item.name).join(','));

        this.pieces = this.worker.getContractById(this.workers.mergeMap(workers => Observable.from(workers).map(item => item.id)))
            .map(contract => contract.work_piece_pay)
            .defaultIfEmpty([]);
    }

    initialForm(): void {
        this.form = this.fb.group({
            num: '',
            finishDate: '',
            comment: '',
            qualityPercent: ['', [Validators.max(100), Validators.min(1)]],
            piecePayId: '',
        });
    }

    launch(): void {
        this.subscriptions = [
            this.launchService.createPieceAudit(this.apply$.map(_ => ({ ...this.form.value, attach: this.attachList }))),

            this.launchService.uploadPieceAuditAttach(),

            this.launchService.getSuccessResponseOfPieceAudit().subscribe(_ => this.form.patchValue({ piecePayId: '' })),

            this.launchService.handlePieceAuditError(),

            this.worker.handleError(),
        ];
    }

    getAttach(attach: string[]): void {
        this.attachList = attach;
    }

    openWorkerSelect() {
        this.modalCtrl.create(WorkerSelectComponent, { option: { contract_type: ContractType.piecer }, single: true }, { cssClass: 'inset-modal' }).present();
    }

    ionViewWillUnload() {
        this.launchService.resetResponse(LaunchResponse.pieceAudit);

        this.subscriptions.forEach(item => item.unsubscribe());

        this.config.showTabBar();
    }

    get num() {
        return this.form.get('num');
    }

    get finishDate() {
        return this.form.get('finishDate');
    }

    get comment() {
        return this.form.get('comment');
    }

    get qualityPercent() {
        return this.form.get('qualityPercent');
    }

    get piecePayId() {
        return this.form.get('piecePayId');
    }
}
