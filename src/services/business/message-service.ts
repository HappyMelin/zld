import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { orderBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    DecreaseUnreadMessageCountAction,
    IncreaseReadMessagePageAction,
    IncreaseUnreadMessagePageAction,
    ResetMessagePageAction,
    SetMessageReadTypeAtLocalAction,
    UpdateReadSelectedTypeAction,
    UpdateReadTimeOrderAction,
    UpdateUnreadSelectedTypeAction,
    UpdateUnreadTimeOrderAction,
} from './../../actions/action/message-action';
import { OrderFlag } from './../../interfaces/order-interface';
import { MessageReadTag, RequestOption } from './../../interfaces/request-interface';
import { Message } from './../../interfaces/response-interface';
import {
    AppState,
    selectMessageContentResponse,
    selectMessageDeleteResponse,
    selectMessageLimit,
    selectMessageListResponse,
    selectReadCount,
    selectReadMessagePage,
    selectReadMessages,
    selectReadMessageSelectedType,
    selectReadMessageTimeOrder,
    selectUnreadMessageCountResponse,
    selectUnreadMessagePage,
    selectUnreadMessages,
    selectUnreadMessageSelectedType,
    selectUnreadMessageTimeOrder,
} from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';

@Injectable()
export class MessageService {
    constructor(
        private store: Store<AppState>,
        private processor: ProcessorService,
        private error: ErrorService,
        private userInfo: UserService
    ) {

    }

    /* ======================================================Request methods=================================================== */

    private getMessageList(page: Observable<number>, option: Observable<RequestOption> = Observable.of({})): Subscription {
        return this.processor.messageListProcessor(
            option.combineLatest(
                this.userInfo.getSid(),
                this.store.select(selectMessageLimit),
                page,
                (option, sid, limit, page) => ({ ...option, sid, limit, page })
            )
        );
    }

    getMessageListByReadState(tag: number): Subscription {
        const page = tag === MessageReadTag.read ? this.store.select(selectReadMessagePage) : this.store.select(selectUnreadMessagePage);

        return this.getMessageList(page, Observable.of({ read_tag: tag }));
    }

    getMessageListByNotifier(tag: number) {
        // return this.getMessageList(Observable.of({ msg_tag: tag }));
    }

    getMessageContent(id: Observable<number>): Subscription {
        return this.processor.messageContentProcessor(id.withLatestFrom(this.userInfo.getSid(), (title_id, sid) => ({ sid, title_id })));
    }

    getUnreadMessageCount(): Subscription {
        return this.processor.unreadMessageCountProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    deleteMessage(ids: Observable<number[]>): Subscription {
        return this.processor.messageDeleteProcessor(ids.withLatestFrom(this.userInfo.getSid(), (title_ids, sid) => ({ sid, title_ids })));
    }

    /* ==========================================================Local store model methods=========================================== */

    increaseReadPage(): void {
        this.store.dispatch(new IncreaseReadMessagePageAction());
    }

    increaseUnreadPage(): void {
        this.store.dispatch(new IncreaseUnreadMessagePageAction());
    }

    resetPage(): void {
        this.store.dispatch(new ResetMessagePageAction());
    }

    updateUnreadSelectedType(type: number): void {
        this.store.dispatch(new UpdateUnreadSelectedTypeAction(type));
    }

    updateReadSelectedType(type: number): void {
        this.store.dispatch(new UpdateReadSelectedTypeAction(type));
    }

    updateUnreadTimeOrder(order: number): void {
        this.store.dispatch(new UpdateUnreadTimeOrderAction(order));
    }

    updateReadTimeOrder(order: number): void {
        this.store.dispatch(new UpdateReadTimeOrderAction(order));
    }

    decreaseUnreadCount(): void {
        this.store.dispatch(new DecreaseUnreadMessageCountAction());
    }

    setMessageReadTypeAtLocal(id: number): void {
        this.store.dispatch(new SetMessageReadTypeAtLocalAction(id));
    }

    /* ============================================================Data acquisition======================================================== */

    haveMoreUnreadMessage(): Observable<boolean> {
        return this.store.select(selectUnreadMessagePage)
            .combineLatest(
            this.store.select(selectMessageLimit),
            this.store.select(selectUnreadMessageCountResponse).filter(value => !!value).map(res => res.count).distinctUntilChanged(),
            (currentPage, limit, count) => currentPage * limit < count
            )
            .startWith(true);
    }

    haveMoreReadMessage(): Observable<boolean> {
        return this.store.select(selectReadMessagePage)
            .combineLatest(
            this.store.select(selectMessageLimit),
            this.store.select(selectReadCount).filter(value => !!value).distinctUntilChanged(),
            (currentPage, limit, count) => currentPage * limit < count
            )
            .startWith(true);
    }

    getMessageListComplete(): Observable<boolean> {
        return this.store.select(selectMessageListResponse)
            .filter(value => !!value)
            .map(res => !!res);
    }

    getUnreadMessages(): Observable<Message[]> {
        return this.store.select(selectUnreadMessages)
            .filter(value => !!value)
            .combineLatest(
            this.getUnreadTimeOrder(),
            this.getUnreadSelectedType(),
            this.projectFn
            );
    }

    getReadMessages(): Observable<Message[]> {
        return this.store.select(selectReadMessages)
            .filter(value => !!value)
            .combineLatest(
            this.getReadTimeOrder(),
            this.getReadSelectedType(),
            this.projectFn
            );
    }

    getUnreadTimeOrder(): Observable<number> {
        return this.store.select(selectUnreadMessageTimeOrder);
    }

    getReadTimeOrder(): Observable<number> {
        return this.store.select(selectReadMessageTimeOrder);
    }

    getUnreadSelectedType(): Observable<number> {
        return this.store.select(selectUnreadMessageSelectedType);
    }

    getReadSelectedType(): Observable<number> {
        return this.store.select(selectReadMessageSelectedType);
    }

    getUnreadCount(): Observable<number | string> {
        return this.store.select(selectUnreadMessageCountResponse)
            .filter(value => !!value && !!value.count)
            .map(res => res.count < 99 ? res.count : '99+');
    }

    getContent(): Observable<string> {
        return this.store.select(selectMessageContentResponse).filter(value => !!value).map(res => res.content);
    }

    /* ============================================================Error handle======================================================== */

    handleError(): Subscription[] {
        return [
            this.error.handleApiRequestError(this.store.select(selectMessageListResponse)),

            this.error.handleApiRequestError(this.store.select(selectUnreadMessageCountResponse)),

            this.error.handleApiRequestError(this.store.select(selectMessageDeleteResponse)),

            this.error.handleApiRequestError(this.store.select(selectMessageContentResponse)),
        ];
    }

    private projectFn(source: Message[], time: number, selectedType: number): Message[] {
        const condition = time === OrderFlag.highToLow ? 'desc' : 'asc';

        let result = orderBy(source, ['create_time'], [condition]);

        if (selectedType) {
            result = result.filter(item => item.msg_type === selectedType);
        } else {
            // nothing to do 
        }

        return result;
    }
}
