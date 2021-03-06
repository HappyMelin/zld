import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfiniteScroll } from 'ionic-angular';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { BusinessComponentModel } from '../../interfaces/core-interface';
import { Message, MessageType } from './../../interfaces/response-interface';
import { MessageService } from './../../services/business/message-service';

const messageTypes = [
    { value: 0, text: MessageType[0] },
    { value: 1, text: MessageType[1] },
    { value: 2, text: MessageType[2] },
    { value: 3, text: MessageType[3] },
    { value: 4, text: MessageType[4] },
    { value: 5, text: MessageType[5] },
    { value: 7, text: MessageType[7] },
    { value: 8, text: MessageType[8] },
]

@Component({
    selector: 'message-list',
    templateUrl: 'message-list.html',
})
export class MessageListComponent implements BusinessComponentModel {
    @Input() messages: Message[];

    @Input() haveMoreData: boolean;

    @Input() selectedTimeOrder = 0;

    @Input() selectedType = 0;

    @Output() getNextPage: EventEmitter<InfiniteScroll> = new EventEmitter();

    @Output() timeOrder: EventEmitter<string> = new EventEmitter();

    @Output() displayType: EventEmitter<string> = new EventEmitter();

    @Output() showContent: EventEmitter<Message> = new EventEmitter();

    messageTypes = messageTypes;

    subscriptions: Subscription[] = [];

    delete$: Subject<Message> = new Subject();

    constructor(
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.messageService.deleteMessage(this.delete$.map(item => [item.id])),
        ];
    }

    initialModel(): void {

    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
