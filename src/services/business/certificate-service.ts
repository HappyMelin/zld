import { selectPersonalIdImageResponse } from './../../reducers/index-reducer';
import { getCertificateResponse } from './../../reducers/reducer/certificate-reducer';
import { UserService } from './user-service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUploadResult, selectCertificateResponse } from '../../reducers/index-reducer';
import { Observable } from 'rxjs/Observable';
import { CertificateFormModel } from '../api/mapper-service';
import { ProcessorService } from '../api/processor-service';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/zip';
import { CertificateOptions, UploadOptions } from '../../interfaces/request-interface';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import { ErrorService } from '../errors/error-service';

@Injectable()
export class CertificateService {

    constructor(
        private store: Store<AppState>,
        private process: ProcessorService,
        private userInfo: UserService,
        private errorService: ErrorService
    ) {
    }

    /*=========================================================Data acquisition========================================================*/

    getCertificateResult(): Observable<boolean> {
        return this.store.select(selectCertificateResponse).filter(value => !!value).map(res => res.auth_pass);
    }

    getRealName(): Observable<string> {
        return this.userInfo.getRealName();
    }

    getSuccessOfUploadPersonalImageResponse(): Observable<boolean> {
        return this.store.select(selectPersonalIdImageResponse)
            .filter(value => !!value)
            .map(res => !!res); //FIXME: 这个地方有问题,响应的状态没有处理
    }

    /*=========================================================API request===================================================*/

    /**
     * @description
     * Handle the certification event from UI. The form's data is converted into two parts,
     * part of which is used to upload the image, and the other part is used when the authentication interface is called
     * */
    certificate(form: Observable<CertificateFormModel>): Subscription[] {
        const source = form.map(form => this.process.certificateForm(form));

        return [this.uploadPersonalIdImage(source), this.userCertificate(source)];
    }

    private uploadPersonalIdImage(source: Observable<CertificateOptions>): Subscription {
        return this.process.uploadPersonalIdImagesProcessor(
            source.mergeMap(
                ({ imageface, imageback }) => Observable.of({ type: 'imageback', file: imageface }, { type: 'imageface', file: imageback }))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    private userCertificate(source: Observable<CertificateOptions>): Subscription {
        return this.process.certificateProcessor(
            this.getSuccessOfUploadPersonalImageResponse()
                .mergeMapTo(
                source.map(({ realname, num }) => ({ realname, num }))
                    .withLatestFrom(
                    this.userInfo.getSid(),
                    (option, sid) => ({ ...option, sid })
                    )
                )
        );
    }

    /* =======================================================Error handle====================================================*/

    handleError() {
        return this.errorService.handleErrorInSpecific(this.store.select(selectCertificateResponse), 'CER_CERTIFICATE_FAIL');
    }

    /**
     * @description
     * Monitor the result of upload images and handle error when upload fail.
     * */
    monitorUploadResult(): Subscription {
        const errorMessage = this.store.select(selectUploadResult)
            .mergeMap(data => Observable
                .from(data)
                .filter(data => data.code !== 1000)
                .map(data => data.msg)
                .distinctUntilChanged()
                .reduce((acc, cur) => {
                    acc.errorMessage += cur;
                    return acc;
                }, { errorMessage: '' })
            );

        return this.errorService.handleErrorInSpecific(errorMessage, 'UPLOAD_FAIL_TIP');
    }
}
