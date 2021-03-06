import { Injectable } from '@angular/core';

import {
    Certification,
    CustomWorkExperience,
    Edu,
    Education as EducationUI,
    Family,
    PlatformExperience,
} from './../../interfaces/personal-interface';
import {
    AttendanceCardAddOptions,
    CertificateAddOptions,
    CertificateOptions,
    ChangePhoneOptions,
    CreateAttendanceModifyOptions,
    CreateLeaveOptions,
    CreateOvertimeOptions,
    CreatePieceAuditOptions,
    CreateWorkerContractModifyOptions,
    CreateWorkerContractOptions,
    EducationAddOptions,
    HomeInfoUpdateOptions,
    LaunchWorkerContractOptions,
    LocationCardAddOptions,
    LoginOptions,
    RegisterOptions,
    ResetPasswordOptions,
    TeamAddOptions,
    TeamUpdateOptions,
    WorkerBankNoAddOptions,
    WorkerContractEditOptions,
    WorkExperienceAddOptions,
    WorkExperienceUpdateOptions,
} from './../../interfaces/request-interface';
import {
    Certificate,
    ContractTypeOfResponse,
    Education,
    Home,
    PlatformWorkExperience,
    WorkExperience,
    WorkType,
} from './../../interfaces/response-interface';

export interface LoginFormModel {
    mobilePhone: string;
    password: string;
    imageVerification: string;
}

export interface SignUpFormModel {
    userType: string;
    mobilePhone: string;
    phoneVerification: string;
    passwordInfo: {
        password: string;
        confirmPassword: string
    }
    imageVerification?: string;
    company?: string;
    realName?: string;
}

export interface ResetPwdFormModel {
    mobilePhone: string;
    phoneVerification: string;
    passwordInfo: {
        password: string;
        confirmPassword: string
    }
    imageVerification?: string;
}

export interface CertificateFormModel {
    realName: string;
    personalId: string;
    personalIdPhoto: {
        front: string;
        back: string;
    }
}

export interface AddTeamFormModel {
    teamName: string;
    foreman: {
        name: string;
        id: number;
    };
    qualityClerk: {
        name: string;
        id: number;
    }
}

export interface AddAttendanceCardFormModel {
    cardNumber: string;
    userId?: number;
    userName?: string;
}

export interface AddLocationCardFormModel {
    cardNumber: string;
    userId?: number;
    userName?: string;
}

export interface EducationAddFormModel {
    startDate: string;
    endDate: string;
    major: string;
    degree: number;
    school: string;
}

export interface WorkExperienceFormModel {
    startDate: string;
    endDate: string;
    company: string;
    project: string;
    job: string;
}

export interface WorkExperienceUpdateFormModel extends WorkExperienceFormModel {
    id: number;
}

export interface AddBankcardFormModel {
    cardNumber: string;
    phoneNumber: string;
    cardType: string;
    isMaster: boolean;
}

export interface AddCertificateFormModel {
    workTypeId: number;
    certificateNumber: string;
    firstGetDate: string;
    availableStartDate: string;
    availableEndDate: string;
    education: string;
    mechanism: string;
    imageFace?: string;
    imageBack?: string;
}

export interface WorkerContractFormModel {
    formType: string;
    teamId: number;
    workTypeId: number;
    startDay: string;
    endDay: string;
    payDay: number;
    morningOnDuty: string;
    morningOffDuty: string;
    comment: string;
    afternoonOnDuty: string;
    afternoonOffDuty: string;
    workerIds: number[];
    attach: string[];
}

export interface TimeTypeWorkerContractFormModel extends WorkerContractFormModel {
    hourlyWage: number;
    content: string;
    // timeUnit: string;
}

export interface PieceTypeFormModel {
    name: string;
    location: string;
    pieceWage: number;
    num: number;
    standard?: string;
}

export interface PieceTypeWorkerContractFormModel extends WorkerContractFormModel {
    pieces: PieceTypeFormModel[];
}

export interface AttendanceModifyFormModel {
    reason: string;
    attendanceIds: number[];
    onDutyTime: string;
    offDutyTime: string;
    attach: string[];
}

export interface LeaveFormModel {
    leaveType: string;
    startDay: string;
    endDay: string;
    reason: string;
    contractIds: number[];
    attach: string[];
}

export interface OvertimeFormModel {
    payType: string;
    day: string;
    startTime: string;
    endTime: string;
    reason: string;
    contractIds: number[];
    attach: string[];
}

export interface PieceAuditFormModel {
    num: number;
    finishDate: string;
    comment: string;
    qualityPercent: number;
    piecePayId: number;
    attach: string[];
}

export interface WorkerContractModifyFormModel {
    date: string;
    contractId: number;
    attach: string[];
}

/* ======================================================Worker contract edit========================================= */

export interface WorkerContractEditFormModel {
    afternoonOffDuty?: string;
    afternoonOnDuty?: string;
    comment: string;
    contractId: number;
    endDay: string;
    morningOffDuty: string;
    morningOnDuty: string;
    payDay: string;
    type: string;
    attach: string[];
}

export interface TimeTypeWorkerContractEditFormModel extends WorkerContractEditFormModel {
    hourlyWage: number;
    content: string;
    id: number;
}

export interface PieceTypeEditFormModel extends PieceTypeFormModel {
    id?: number;
}

export interface PieceTypeWorkerContractEditFormModel extends WorkerContractEditFormModel {
    pieces: PieceTypeEditFormModel[];
}

export interface ChangeAccountFormModel {
    oldMobilePhone: string;
    newMobilePhone: string;
    oldPhoneVerification: string;
    newPhoneVerification: string;
    oldImageVerification: string;
    newImageVerification: string;
}

@Injectable()
export class MapperService {
    constructor() {
    }

    loginFormMap(form: LoginFormModel): LoginOptions {
        return {
            username: form.mobilePhone,
            password: form.password,
            captcha_code: form.imageVerification,
        };
    }

    signUpFormMap(form: SignUpFormModel): RegisterOptions {
        return {
            username: form.mobilePhone,
            password: form.passwordInfo.password,
            code: form.phoneVerification,
            real_name: form.realName,
            captcha_code: form.imageVerification,
            userType: Number(form.userType),
        };
    }

    resetPwdForm(form: ResetPwdFormModel): ResetPasswordOptions {
        return {
            username: form.mobilePhone,
            password: form.passwordInfo.password,
            code: form.phoneVerification,
            captcha_code: form.imageVerification,
        };
    }

    certificateForm(form: CertificateFormModel): CertificateOptions {
        return {
            realname: form.realName,
            num: form.personalId,
            sid: '',
            imageface: form.personalIdPhoto.front,
            imageback: form.personalIdPhoto.back,
        };
    }

    addTeamForm(form: AddTeamFormModel): TeamAddOptions {
        return {
            sid: '',
            project_id: 0,
            leader_id: form.foreman.id,
            quality_manage_id: form.qualityClerk.id,
            name: form.teamName,
        };
    }

    updateTeamForm(form: AddTeamFormModel, team_id: number): TeamUpdateOptions {
        return Object.assign({}, this.addTeamForm(form), { team_id });
    }

    addAttendanceCardForm(form: AddAttendanceCardFormModel): AttendanceCardAddOptions {
        return {
            sid: '',
            attendance_card_form: {
                user_id: form.userId,
                ic_card_num: form.cardNumber,
                userName: form.userName,
            },
        };
    }

    addLocationCardForm(form: AddLocationCardFormModel): LocationCardAddOptions {
        return {
            sid: '',
            dev_id: form.cardNumber,
            user_id: form.userId,
            userName: form.userName,
        }
    }

    transformCertification(cer: Certificate, types: WorkType[]): Certification {
        const target = types.find(item => item.id === cer.worktype_id);

        const workType = target.name;

        const expire = cer.usestart_date + '-' + cer.usefinish_date;

        const { education, mechanism } = cer;

        return {
            workType,
            expire,
            mechanism,
            education: Edu[education],
            identifier: cer.num,
            imageFace: cer.imageface,
            imageBack: cer.imageback,
        }
    }

    transformEducation(source: Education): EducationUI {
        const { degree, major } = source;

        const education = Edu[degree];

        const school = source.school__name;

        const expire = source.start_date + '—' + source.finish_date;

        return { expire, school, education, major }
    }

    transformFamily(source: Home): Family {
        return {
            marriage: Number(source.marriage),
            marryDay: source.marryday,
            children: source.childnum,
            emergencyName: source.emergency_contact_name,
            emergencyPhone: source.emergency_contact_tel,
            emergencyRelation: source.emergency_contact_relation,
            addressArea: source.homeaddr__province + ' ' + source.homeaddr__city + ' ' + source.homeaddr__dist,
            addressDetail: source.homeaddr__street + ' ' + source.homeaddr__detail,
        }
    }

    transformFamilyOptions(source: Family): HomeInfoUpdateOptions {
        const [province, city, dist] = source.addressArea.split(' ');

        return {
            emergency_contact_name: source.emergencyName,
            emergency_contact_tel: source.emergencyPhone,
            emergency_contact_relation: source.emergencyRelation,
            marriage: source.marriage,
            childnum: source.children,
            province: province,
            city: city,
            dist: dist,
            street: '',
            detail: source.addressDetail,
            marryday: source.marryDay,
        } as HomeInfoUpdateOptions  // no sid;
    }

    transformWorkExperience(source: WorkExperience): CustomWorkExperience {
        return {
            expire: source.start + '—' + source.finish,
            project: source.project_name,
            company: source.company_name,
            job: source.job,
            id: source.id,
        }
    }

    transformPlatformWorkExperience(source: PlatformWorkExperience): PlatformExperience {
        return {
            expire: source.start_day + '—' + source.finish_day,
            workType: source.worktype__name,
            project: source.team__project__name,
            team: source.team__name,
        }
    }

    transformEducationExperience(source: EducationAddFormModel): EducationAddOptions {
        return {
            start_date: source.startDate,
            finish_date: source.endDate,
            school__name: source.school,
            degree: source.degree,
            major: source.major,
            sid: '',
        }
    }

    transformWorkExperienceAddOptions(source: WorkExperienceFormModel): WorkExperienceAddOptions {
        return {
            sid: '',
            start: source.startDate,
            finish: source.endDate,
            company_name: source.company,
            project_name: source.project,
            job: source.job,
        }
    }

    transformWorkExperienceUpdateOptions(source: WorkExperienceUpdateFormModel): WorkExperienceUpdateOptions {
        return {
            ...this.transformWorkExperienceAddOptions(source),
            id: source.id,
        }
    }

    transformAddBankcard(source: AddBankcardFormModel): WorkerBankNoAddOptions {
        return {
            sid: '',
            num: source.cardNumber,
            phone_num: source.phoneNumber,
            is_master: source.isMaster,
            user_id: NaN,
        }
    }

    transformAddCertificate(source: AddCertificateFormModel): CertificateAddOptions {
        return {
            education: source.education,
            firstget_date: source.firstGetDate,
            imageback: source.imageBack,
            imageface: source.imageFace,
            mechanism: source.mechanism,
            num: source.certificateNumber,
            sid: '',
            usefinish_date: source.availableEndDate,
            usestart_date: source.availableStartDate,
            worktype_id: source.workTypeId,
        }
    }

    private getWorkerContractCommonPart(source: WorkerContractFormModel): LaunchWorkerContractOptions {
        return {
            additional_content: source.comment,
            afternoon_time_off_duty: source.afternoonOnDuty,
            afternoon_time_on_duty: source.afternoonOffDuty,
            attach: source.attach,
            finish_day: source.endDay,
            formType: source.formType,
            morning_time_off_duty: source.morningOffDuty,
            morning_time_on_duty: source.morningOnDuty,
            pay_day: source.payDay,
            start_day: source.startDay,
            team_id: source.teamId,
            worker_id: source.workerIds,
            worktype_id: source.workTypeId,
        }
    }
    private transformTimeTypeWorkerContractForm(source: TimeTypeWorkerContractFormModel): CreateWorkerContractOptions {
        return {
            sid: '',
            worker_contract: this.getWorkerContractCommonPart(source),
            work_time_pay: [{
                pay_mount: source.hourlyWage,
                content: source.content,
                time_unit: '小时',
            }],
        }
    }

    private transformPieceTypeWorkerContractForm(source: PieceTypeWorkerContractFormModel): CreateWorkerContractOptions {
        return {
            sid: '',
            worker_contract: this.getWorkerContractCommonPart(source),
            work_piece_pay: source.pieces.map(({ name, pieceWage, location, num, standard }) => ({ name, location, num, pay_mount: pieceWage, standard })),
        }
    }

    transformWorkerContractForm(source: WorkerContractFormModel): CreateWorkerContractOptions {
        return source.formType === '1'
            ? this.transformTimeTypeWorkerContractForm(source as TimeTypeWorkerContractFormModel)
            : this.transformPieceTypeWorkerContractForm(source as PieceTypeWorkerContractFormModel);
    }

    transformAttendanceModifyForm(source: AttendanceModifyFormModel): CreateAttendanceModifyOptions {
        return {
            sid: '',
            attend_amend: {
                reason: source.reason,
                result_id: source.attendanceIds,
                on_duty: source.onDutyTime,
                off_duty: source.offDutyTime,
                attach: source.attach,
            },
        }
    }

    transformLeaveForm(source: LeaveFormModel): CreateLeaveOptions {
        return {
            sid: '',
            leave: {
                reason: source.reason,
                type: source.leaveType,
                start: source.startDay,
                finish: source.endDay,
                contracts_id: source.contractIds,
                attach: source.attach,
            },
        }
    }

    transformOvertimeForm(source: OvertimeFormModel): CreateOvertimeOptions {
        return {
            sid: '',
            work_over_time: {
                type: source.payType,
                day: source.day,
                start: source.startTime,
                finish: source.endTime,
                reason: source.reason,
                contracts_id: source.contractIds,
                attach: source.attach,
            },
        }
    }

    transformPieceAuditForm(source: PieceAuditFormModel): CreatePieceAuditOptions {
        return {
            sid: '',
            work_piece_finish_flow: {
                num: Number(source.num),
                quality_percent: Number(source.qualityPercent) / 100,
                comment: source.comment,
                finish_date: source.finishDate,
                work_piece_pay_id: source.piecePayId,
                attach: source.attach,
            },
        }
    }

    transformWorkerContractModifyForm(source: WorkerContractModifyFormModel): CreateWorkerContractModifyOptions {
        return {
            sid: '',
            contract_time_change_flow: {
                date_after: source.date,
                contract_id: source.contractId,
                attach: source.attach,
            },
        }
    }

    private transformWorkerContractEditFormCommonPart(source: WorkerContractEditFormModel): WorkerContractEditOptions {
        return {
            sid: '',
            contract_id: source.contractId,
            attach: source.attach,
            worker_contract: {
                additional_content: source.comment,
                morning_time_off_duty: source.morningOffDuty,
                morning_time_on_duty: source.morningOnDuty,
                afternoon_time_off_duty: source.afternoonOffDuty,
                afternoon_time_on_duty: source.afternoonOnDuty,
                pay_day: source.payDay,
                finish_day: source.endDay,
            },
        }
    }

    private transformTimeTypeWorkerContractEditForm(source: TimeTypeWorkerContractEditFormModel): WorkerContractEditOptions {
        return {
            ...this.transformWorkerContractEditFormCommonPart(source),
            work_time_pay: [{
                pay_mount: source.hourlyWage,
                content: source.content,
                id: source.id,
            }],
        };
    }

    private transformPieceTypeWorkerContractEditForm(source: PieceTypeWorkerContractEditFormModel): WorkerContractEditOptions {
        return {
            ...this.transformWorkerContractEditFormCommonPart(source),
            work_piece_pay: source.pieces.map(item => ({
                name: item.name,
                id: item.id,
                location: item.location,
                pay_mount: item.pieceWage,
                standard: item.standard,
                num: item.num,
            })),
        };
    }

    transformWorkerContractEditForm(source: WorkerContractEditFormModel): WorkerContractEditOptions {
        return source.type === ContractTypeOfResponse.timer
            ? this.transformTimeTypeWorkerContractEditForm(source as TimeTypeWorkerContractEditFormModel)
            : this.transformPieceTypeWorkerContractEditForm(source as PieceTypeWorkerContractEditFormModel);
    }

    transformChangeAccountForm(source: ChangeAccountFormModel): ChangePhoneOptions {
        return {
            sid: '',
            username: source.oldMobilePhone,
            new_username: source.newMobilePhone,
            code: source.oldPhoneVerification,
            new_code: source.newPhoneVerification,
        };
    }
}
