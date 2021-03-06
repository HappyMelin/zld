import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import {
    Certification,
    CustomWorkExperience,
    Education,
    Family,
    PlatformExperience,
} from '../../interfaces/personal-interface';
import { BasicInformation, PersonalId } from './../../interfaces/response-interface';
import { PersonalService } from './../../services/business/personal-service';
import { UserService } from './../../services/business/user-service';

@IonicPage()
@Component({
    selector: 'page-personal',
    templateUrl: 'personal.html',
})
export class PersonalPage implements BusinessPageModel{
    type = 'basic';

    workType = 'platform';

    subscriptions: Subscription[] = [];

    userId: number;

    basic: Observable<BasicInformation>;

    family: Observable<Family>;

    workExperience: Observable<CustomWorkExperience[]>;

    platformExperience: Observable<PlatformExperience[]>;

    certification: Observable<Certification[]>;

    personalIdInfo: Observable<PersonalId>;

    education: Observable<Education[]>;

    constructor(
        private navParams: NavParams,
        private userInfo: UserService,
        private personal: PersonalService
    ) {
        this.userId = this.navParams.get('userId');
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    launch() {
        const option = this.userId ? Observable.of(this.userId) : this.userInfo.getUserId();

        this.subscriptions = [
            this.personal.getBasicInfoList(option),

            this.personal.handleBasicInfoError(),
        ];
    }

    initialModel() {
        this.basic = this.personal.getBasicFromBasicInfoList();

        this.personalIdInfo = this.personal.getPersonalIdFromBasicInfoList();

        this.certification = this.personal.getCertificationsFromBasicInfoList();

        this.family = this.personal.getFamilyFromBasicInfoList();

        this.education = this.personal.getEducationsFromBasicInfoList();

        this.workExperience = this.personal.getCustomWorkExperiencesFromBasicInfoList();
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
