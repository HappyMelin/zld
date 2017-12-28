import { GetCertificateListAction } from './../actions/action/work-certificate-action';
import {Injectable} from '@angular/core';
import {WebsocketService} from '../services/api/websocket-service';
import {AppState} from '../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {ResponseAction} from '../interfaces/response-interface';
import {Observable} from 'rxjs/Observable';
import {GET_WORK_TYPE_LIST, WorkTypeListFailAction, WorkTypeListSuccessAction} from '../actions/action/craft-action';
import {Command} from '../services/api/command';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CraftEffect extends Command {
  @Effect()
  workType: Observable<ResponseAction> = this.actions$
    .ofType(GET_WORK_TYPE_LIST)
    .mergeMap((action: GetCertificateListAction) => this.ws
      .send(this.getWorkTypeList())
      .takeUntil(this.actions$.ofType(GET_WORK_TYPE_LIST))
      .map(msg => msg.isError ? new WorkTypeListFailAction(msg.data) : new WorkTypeListSuccessAction(msg.data))
      .catch(error => of(error))
    );

  constructor(public ws: WebsocketService,
              public store: Store<AppState>,
              public actions$: Actions) {
    super();
  }
}
