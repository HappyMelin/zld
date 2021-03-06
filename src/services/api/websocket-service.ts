import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/retryWhen';

import { Injectable } from '@angular/core';
import { ENV } from '@app/env';
import * as _ from 'lodash';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { WsRequest } from '../../interfaces/request-interface';
import { WsResponse } from '../../interfaces/response-interface';
import { curry2Right } from '../utils/util';
import { TipService } from './../tip-service';

interface ErrorTipUnit {
    message: string;
}


/**
 * @description This service is used for interacting with server.
 * */
@Injectable()
export class WebsocketService {
    private url = `ws://${ENV.DOMAIN}/wsapi`;

    private inputStream: QueueingSubject<string>;

    private messages: Observable<WsResponse>;

    private connectionStatus: Observable<number>;

    private connectionStatusSubscription: Subscription;

    constructor(
        private tip: TipService
    ) {
        this.connect();
    }

    /**
     * @description
     * Sending data to the server and returning a stream for the requester to use.
     * The requester can get the data needed from this stream.
     * */
    send(parameter: WsRequest) {
        this.inputStream.next(JSON.stringify(parameter));

        return this.messages.filter(res => res.command.path === parameter.command.path);
    }

    /**
     * @description
     * Create a socket connection to generate a multicast observable for service.
     * Reinitiate the connection every 2 seconds when there is an error in the observable.
     * */
    connect() {

        if (this.messages) return;

        const { messages, connectionStatus } = websocketConnect(this.url, this.inputStream = new QueueingSubject<string>());

        this.messages = messages
            .map((msg: string) => {
                const response: WsResponse = JSON.parse(msg);

                response.data = this.handleDataStructure(response.data);

                response.isError = response.code > 2000;

                if (response.isError) response.data.errorMessage = this.handleError(response);

                return response;
            })
            .retryWhen(errors => {
                this.tip.showTip('网络连接已断开', 3000, 'middle')

                return errors.delay(2000);
            })
            .share()

        this.connectionStatus = connectionStatus;

        this.connectionStatusSubscription = connectionStatus.subscribe(numberConnected => {
            console.log('number of connected sockets:', numberConnected)
        });
    }

    /**
     * @description
     * Deal with the problem of uncertain data structure.
     * */
    private handleDataStructure(data: any): object {
        if (Array.isArray(data) || typeof data === 'string') return { information: data }; //如果有一天后台发疯这data又有了新了类型，就在这加。稳定，稳定，稳定，接口的数据结构一定要稳定，不要当耳旁风。

        if (typeof data === 'object') return data;

        return {};
    }

    /**
     * @description
     * Get all error information from server.
     * */
    private handleError(data: WsResponse): string {
        const message = this.arrangeErrorInfo(data.detail);

        return _.isObject(data.detail) ? _.find([message, data.msg], _.identity) : data.msg;
    }

    /**
     * @description
     * Use depth first to recurrence the attributes of the object and record the traversal path.
     * */
    private createErrorSheet(item, record = {}) {
        if (_.isArray(item)) {
            return _.map(item, curry2Right(_.assign)(record));
        } else {
            return _.map(_.toPairs(item), ele => {
                const key = _.isArray(ele[1]) ? 'key' : 'form';

                record[key] = ele[0];

                return this.createErrorSheet(ele[1], record);
            });
        }
    }

    /**
     * @description
     * Iterate attribute of an object.
     * */
    private arrangeErrorInfo(data: string | object): string {
        return _.isString(data) ? data : _.chain(data)
            .map(item => this.createErrorSheet(item))
            .flattenDeep()
            .map((msg: ErrorTipUnit, index) => `${msg.message}\n`)
            .value()
            .join('');
    }
}

