import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { MessageRoot, MineRoot, MissionRoot, ProjectRoot } from '../pages';
import { CraftService } from './../../services/business/craft-service';
import { MessageService } from './../../services/business/message-service';
import { NationalityService } from './../../services/business/nationality-service';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage implements BusinessPageModel {
    MessageRoot: any = MessageRoot;

    ProjectRoot: any = ProjectRoot;

    MissionRoot: any = MissionRoot;

    MineRoot: any = MineRoot;

    messageTitle: Observable<string>;

    projectTitle: Observable<string>;

    missionTitle: Observable<string>;

    mineTitle: Observable<string>;

    messageBadge: Observable<number | string>;

    subscriptions: Subscription[];

    constructor(
        private translateService: TranslateService,
        private message: MessageService,
        private nationality: NationalityService,
        private workType: CraftService
    ) {
        this.initialTitle();
    }

    ionViewDidLoad() {
        this.launch();

        this.initialModel();
    }

    launch(): void {
        this.subscriptions = [

            this.nationality.handleError(),

            this.workType.handleError(),

            this.message.getUnreadMessageCount(),
        ];
    }

    initialModel(): void {
        this.messageBadge = this.message.getUnreadCount();
    }

    initialTitle() {
        this.messageTitle = this.translateService.get('MESSAGE');

        this.projectTitle = this.translateService.get('PROJECT');

        this.missionTitle = this.translateService.get('MISSION');

        this.mineTitle = this.translateService.get('MINE');
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
