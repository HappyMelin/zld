import { degrees } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { TimeService } from './../../services/utils/time-service';
import { Certificate, WorkType } from './../../interfaces/response-interface';
import { CraftService } from './../../services/business/craft-service';
import { MapperService } from './../../services/api/mapper-service';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'add-work-certificate',
  templateUrl: 'add-work-certificate.html'
})
export class AddWorkCertificateComponent {

  buttonText = 'ADD_BUTTON';

  title = 'ADD_CERTIFICATE';

  certificateForm: FormGroup;

  today: string;

  expireDate: string;

  expireEndDate: string;

  degrees = degrees;

  workTypes: Observable<WorkType[]>;

  frontTip = 'CERTIFICATE_FRONT_TIP';

  backTip = 'CERTIFICATE_BACK_TIP';

  constructor(
    public fb: FormBuilder,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public mapper: MapperService,
    public workType: CraftService,
    public timeService: TimeService
  ) {
    this.initialData();

    this.initialForm();
  }

  initialData() {
    this.today = this.timeService.getDate(new Date(), true);

    this.workTypes = this.workType.getWorkTypeList();
  }

  initialForm() {
    this.certificateForm = this.fb.group({
      workTypeId: '',
      certificateNumber: '',
      firstGetDate: '',
      availableStartDate: '',
      availableEndDate: '',
      education: '',
      mechanism: '',
      imageFace: '',
      imageBack: ''
    });

    const form: Certificate = this.navParams.get('form');

    if (form) this.updateForm(form);
  }

  updateForm(data: Certificate): void {
    this.buttonText = 'UPDATE_BUTTON';

    this.title = 'UPDATE_CERTIFICATE';

    this.certificateForm.patchValue({
      workTypeId: data.worktype_id,
      certificateNumber: data.num,
      firstGetDate: data.firstget_date,
      availableStartDate: data.usestart_date,
      availableEndDate: data.usefinish_date,
      education: data.education,
      mechanism: data.mechanism
    });
  }

  updateExpireDate(date: string) {
    this.expireDate = date;

    this.certificateForm.patchValue({ availableEndDate: '', availableStartDate: '' });
  }

  updateExpireEndDate(date: string): void {
    this.expireEndDate = date;

    this.certificateForm.patchValue({ availableEndDate: '' });
  }

  execution() {
    this.viewCtrl.dismiss(this.mapper.transformAddCertificate(this.certificateForm.value));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getImageFace(url = ''): void {
    this.certificateForm.patchValue({ imageFace: url });
  }

  getImageBack(url = ''): void {
    this.certificateForm.patchValue({ imageBack: url });
  }

  get workTypeId() {
    return this.certificateForm.get('workTypeId');
  }

  get certificateNumber() {
    return this.certificateForm.get('certificateNumber');
  }

  get firstGetDate() {
    return this.certificateForm.get('firstGetDate');
  }

  get availableStartDate() {
    return this.certificateForm.get('availableStartDate');
  }

  get availableEndDate() {
    return this.certificateForm.get('availableEndDate');
  }

  get education() {
    return this.certificateForm.get('education');
  }

  get mechanism() {
    return this.certificateForm.get('mechanism');
  }
}
