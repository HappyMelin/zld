import { UpdateAttendanceCardAtLocal } from './../../actions/action/attendance-card-action';
import { MapperService, AddAttendanceCardFormModel } from './../api/mapper-service';
import { AttendanceCardListOptions, RequestOption, AttendanceCardUpdateOptions } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { AttendanceCardListResponse, AttendanceCard } from './../../interfaces/response-interface';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';
import { ProjectService } from './project-service';
import { AppState, selectAttendanceCardResponse, selectAttendanceCardAddResponse, selectAttendanceCardDeleteResponse, selectAttendanceCardUpdateResponse, selectAttendanceCards } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';

@Injectable()
export class AttendanceCardService {

    constructor(
        public store: Store<AppState>,
        public project: ProjectService,
        public userInfo: UserService,
        public error: ErrorService,
        public mapper: MapperService,
        public processor: ProcessorService
    ) {
    }

    getCardListResponse(): Observable<AttendanceCardListResponse> {
        return this.store.select(selectAttendanceCardResponse);
    }

    getCards(): Observable<AttendanceCard[]> {
        return this.store.select(selectAttendanceCards);
    }

    getAttendanceCardList(option: Observable<AttendanceCardListOptions>): Subscription {
        const sid = this.userInfo.getSid().map(sid => ({ sid }));

        return this.processor.attendanceCardListProcessor(sid);
    }

    addAttendanceCard(form: AddAttendanceCardFormModel): Subscription {
        const sid = this.userInfo.getSid();

        const option = this.mapper.addAttendanceCardForm(form)

        const options = sid.zip(
            Observable.of(option),
            (sid, option) => (Object.assign(option, { sid }))
        )

        return this.processor.attendanceCardAddProcessor(options);
    }

    deleteAttendanceCard(ids: Observable<number[]>): Subscription {
        const sid = this.userInfo.getSid();

        const option = sid.zip(
            ids,
            (sid, attendance_card_id) => ({ sid, attendance_card_id }) // 这奇葩的命名，明明数组，从名字上看起来却是单个，这鸟API，一不小心就踩地雷。
        );

        return this.processor.attendanceCardDeleteProcessor(option);
    }

    updateAttendanceCard(option: Observable<RequestOption>): Subscription {
        const sid = this.userInfo.getSid();

        const options = sid.zip(
            option,
            (sid, option) => ({ sid, ...option })
        ) as Observable<AttendanceCardUpdateOptions>;

        return this.processor.attendanceCardUpdateProcessor(options);
    }

    updateAttendanceCardAtLocal(name: string, companyId: number): void {
        this.store.dispatch(new UpdateAttendanceCardAtLocal({ name, companyId }));
    }

    /* ===================================================Error handle================================================== */

    handleError(): Subscription[] {
        return [this.handleAddError(), this.handleDeleteError(), this.handleQueryError(), this.handleUpdateError()];
    }

    handleQueryError(): Subscription {
        return this.error.handleErrorInSpecific(this.getCardListResponse(), 'API_ERROR');
    }

    handleAddError(): Subscription {
        const error = this.store.select(selectAttendanceCardAddResponse);

        return this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    handleDeleteError(): Subscription {
        const error = this.store.select(selectAttendanceCardDeleteResponse);

        return this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    handleUpdateError(): Subscription {
        const error = this.store.select(selectAttendanceCardUpdateResponse);

        return this.error.handleErrorInSpecific(error, 'API_ERROR');
    }
}