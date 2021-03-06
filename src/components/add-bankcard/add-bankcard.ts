import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessComponentModel } from '../../interfaces/core-interface';
import { bankcardNumberValidator, creditCardValidator, mobilePhoneValidator } from '../../validators/validators';
import { PersonalId } from './../../interfaces/response-interface';
import { MapperService } from './../../services/api/mapper-service';
import { BankcardService } from './../../services/business/bank-card-service';
import { PersonalService } from './../../services/business/personal-service';

@Component({
    selector: 'add-bankcard',
    templateUrl: 'add-bankcard.html',
})
export class AddBankcardComponent implements BusinessComponentModel {

    personalId: Observable<PersonalId>;

    bankcardForm: FormGroup;

    subscriptions: Subscription[] = [];

    cardInfoSubscription: Subscription;

    constructor(
        private viewCtrl: ViewController,
        private fb: FormBuilder,
        private bankcard: BankcardService,
        private personal: PersonalService,
        private mapper: MapperService
    ) {
        this.initialForm();
    }

    ngOnInit() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.personalId = this.personal.getPersonalId();
    }

    launch(): void {
        this.subscriptions = [
            this.bankcard.getBankInfoResponse()
                .subscribe(res => this.bankcardForm.patchValue({ cardType: res.bank_name + res.brand })),

            this.personal.getPersonalIdList(),

            this.personal.handlePersonalIdError(),

            this.bankcard.handleBankInfoError(),
        ];
    }

    initialForm() {
        this.bankcardForm = this.fb.group({
            cardNumber: ['', bankcardNumberValidator],
            phoneNumber: ['', mobilePhoneValidator],
            cardType: ['', creditCardValidator],
            isMaster: false,
        });
    }

    getCardType(): void {
        const cardNumber = this.bankcardForm.get('cardNumber') as FormControl;

        if (!bankcardNumberValidator(cardNumber)) {
            this.cardInfoSubscription && this.cardInfoSubscription.unsubscribe();

            this.cardInfoSubscription = this.bankcard.getBankInformation(Observable.of(cardNumber.value));
        }
    }

    execution() {
        this.viewCtrl.dismiss(this.mapper.transformAddBankcard(this.bankcardForm.value));
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    get cardNumber() {
        return this.bankcardForm.get('cardNumber');
    }

    get phoneNumber() {
        return this.bankcardForm.get('phoneNumber');
    }

    get cardTye() {
        return this.bankcardForm.get('cardType');
    }

}
