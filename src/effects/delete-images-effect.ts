import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import {
    DELETE_IMAGES,
    DeleteImagesAction,
    DeleteImagesFailAction,
    DeleteImagesSuccessAction,
} from './../actions/action/delete-images-action';

@Injectable()
export class DeleteImagesEffect extends Command {

    @Effect()
    workType$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_IMAGES)
        .switchMap((action: DeleteImagesAction) => this.ws
            .send(this.getDeleteImages(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_IMAGES))
            .map(msg => msg.isError
                ? new DeleteImagesFailAction(msg.data)
                : new DeleteImagesSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}
