import { Injectable } from '@angular/core';
import { isEmpty, omit, omitBy } from 'lodash';

import { ApiUnit, Iterator, Operate } from '../../interfaces/api-interface';
import { CW, EME, LM, MM, PM, PME, QW, SW, TL, UW } from '../config/character';
import {
    AttendanceCardAddOptions,
    AttendanceCardDeleteOptions,
    AttendanceCardListOptions,
    AttendanceCardUpdateOptions,
    AttendanceInstantListOptions,
    AttendanceMachineListOptions,
    AttendanceModifyRecordListOptions,
    AttendanceResultConfirmOptions,
    AttendanceResultListOptions,
    AttendanceResultTeamStatListOptions,
    BankInfoOptions,
    BasicInfoListOptions,
    CertificateAddOptions,
    CertificateDeleteOptions,
    CertificateListOptions,
    CertificateOptions,
    CertificateUpdateOptions,
    ChangePhoneOptions,
    ChangePhoneVerifyCodeOptions,
    CheckPhoneOptions,
    CheckPhoneVerifyCodeOptions,
    CompanyUserListOptions,
    CreateAttendanceModifyOptions,
    CreateLeaveOptions,
    CreateOvertimeOptions,
    CreatePieceAuditOptions,
    CreateWorkerContractModifyOptions,
    CreateWorkerContractOptions,
    DeleteImagesOptions,
    EducationAddOptions,
    EducationDeleteOptions,
    EducationListOptions,
    EducationUpdateOptions,
    GroupsListOptions,
    HistoryLocationListOptions,
    HomeInfoListOptions,
    HomeInfoUpdateOptions,
    LeaveRecordListOptions,
    LocationCardAddOptions,
    LocationCardDeleteOptions,
    LocationCardListOptions,
    LocationCardUpdateOptions,
    LoginOptions,
    LogoutOptions,
    MessageContentOptions,
    MessageDeleteOptions,
    MessageListOptions,
    MultiTaskUpdateOptions,
    PayBillListOptions,
    PersonalIdListOptions,
    PhoneVerificationCodeOptions,
    PlatformWorkExperienceListOptions,
    ProcessIdOptions,
    ProjectAreaListOptions,
    ProjectListOptions,
    ProjectPayBillFlowListOptions,
    ProjectPayBillListOptions,
    ProjectPayProcessListOptions,
    QRLoginOptions,
    RegisterOptions,
    RequestAggregationOptions,
    ResetPasswordOptions,
    SearchCompanyOptions,
    SearchWorkerOptions,
    SetBankNoMasterOptions,
    SpecificWorkFlowState,
    TaskUpdateOptions,
    TeamAddOptions,
    TeamDeleteOptions,
    TeamListOptions,
    TeamMembersRealTimeStatisticsOptions,
    TeamUpdateOptions,
    UnreadMessageCountOptions,
    UploadAttendanceModifyAttachOptions,
    UploadCertificateImageOptions,
    UploadLeaveAttachOptions,
    UploadOvertimeAttachOptions,
    UploadPersonalIdImageOptions,
    UploadPieceAuditAttachOptions,
    UploadWorkerContractAttachOptions,
    UploadWorkerContractModifyAttachOptions,
    WorkerBankNoAddOptions,
    WorkerBankNoDeleteOptions,
    WorkerBankNoListOptions,
    WorkerContractEditOptions,
    WorkerContractFormType,
    WorkerContractOptions,
    WorkerDetailListOptions,
    WorkerDetailUpdateOptions,
    WorkExperienceAddOptions,
    WorkExperienceDeleteOptions,
    WorkExperienceListOptions,
    WorkExperienceUpdateOptions,
    WorkFlowListOptions,
    WorkOvertimeRecordListOptions,
    WorkPieceListOptions,
    WorkTypeRealTimeStatisticsOptions,
    WsRequest,
} from './../../interfaces/request-interface';
import {
    uploadAttendanceModifyAttach,
    uploadCertificateImage,
    uploadLeaveAttach,
    uploadOvertimeAttach,
    uploadPersonalIdImage,
    uploadPieceAuditAttach,
    uploadWorkerContractAttach,
    uploadWorkerContractModifyAttach,
} from './http-service';

/* =======================================================API unit definition===================================================================== */

const login: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.Login']]]),
};

const company: ApiUnit = {
    operates: new Map([
        [Operate.querying, ['employer.consumer.CompanyList']],
        [Operate.updates, ['employer.consumer.CompanyUpdate']],
        [Operate.addition, ['employer.consumer.CompanyAdd']],
        [Operate.deletion, ['employer.consumer.CompanyDelete']],
        [Operate.search, ['employer.consumer.SearchCompany']],
    ]),
};

const phoneVerificationCode: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.RegPhoneVerifyCode']]]),
};

const resetPhoneVerificationCode: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.ResetPWPhoneVerifyCode']]]),
};

const register: ApiUnit = {
    operates: new Map([
        [Operate.addition, ['employee.consumer.EmployeeRegister', 'employee.consumer.WorkerRegister']],
    ]),
};

const resetPassword: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.ResetPassword']]]),
};

const updatePersonalIdImage: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.PersonalIdUpdate']]]),
};

const changePhone: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.ChangePhone']]]),
};

const checkPhone: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.CheckPhone']]]),
};

const changePhoneVerify: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.ChangePhoneVerifyCode']]]),
};

const checkPhoneVerify: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.CheckPhoneVerifyCode']]]),
};

/* =======================================================Project===================================================================== */

const projectList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employer.consumer.ProjectList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, CW, QW, SW],
        opt: [],
    },
};

/* =======================================================Work contract===================================================================== */

export enum WorkerContract {
    unexpired = 'unexpired',
    timeTypeContract = 'timeTypeContract',
    pieceTypeContract = 'pieceTypeContract',
}

export const workerContractList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.WorkerContractList']]]),
    noMagicNumber: new Map([
        [WorkerContract.unexpired, new Iterator({ flag: 1 })],
        [WorkerContract.timeTypeContract, new Iterator({ contract_type: 1 })],
        [WorkerContract.pieceTypeContract, new Iterator({ contract_type: 2 })],
    ]),
    permission: {
        view: [PME, MM, PM, LM, TL, CW, QW, SW],
        opt: [],
    },
    specialCharacter: new Map([[SW, new Iterator({ self: 1 })]]),
};

/* =======================================================Work Type===================================================================== */

export const workTypeList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.WorkTypeList']]]),
};

/* ==============================================================Team========================================================================== */

export const teamList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.TeamList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL, QW],
        opt: [],
    },
    specialCharacter: new Map([
        [SW, new Iterator({ self: 1 })],
        [TL, new Iterator({ flag: 1 })],
        [LM, new Iterator({ flag: 1 })],
        [PM, new Iterator({ flag: 1 })],
        [MM, new Iterator({ flag: 1 })],
    ]),
};

export const teamAdd: ApiUnit = {
    operates: new Map([[Operate.addition, ['project.consumer.TeamAdd']]]),
    permission: {
        view: [],
        opt: [PME, PM],
    },
};

export const teamDelete: ApiUnit = {
    operates: new Map([[Operate.deletion, ['project.consumer.TeamDelete']]]),
    permission: {
        view: [],
        opt: [PM],
    },
};

export const teamUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['project.consumer.TeamUpdate']]]),
    permission: {
        view: [],
        opt: [PM],
    },
};

/* =======================================================Attendance===================================================================== */

export enum attendance {
    attendanceOnlyDisplay = 'onlyDisplay',
    unconfirmed = 'unconfirmed',
    confirmed = 'confirmed',
    applyToModify = 'applyToModify',
    allTypes = 'allTypes',
}

export const attendanceList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.AttendResultList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL],
        opt: [],
    },
    noMagicNumber: new Map([
        [attendance.attendanceOnlyDisplay, new Iterator({ flag: 1 })],
        [attendance.unconfirmed, new Iterator({ confirm: 0 })],
        [attendance.confirmed, new Iterator({ confirm: 1 })],
        [attendance.applyToModify, new Iterator({ confirm: 2 })],
        [attendance.allTypes, new Iterator({ confirm: 3 })],
    ]),
    specialCharacter: new Map([[SW, new Iterator({ self: 1 })]]),
};

export enum attendanceInstant {
    attendanceInstantOnlyDisplay = 'onlyDisplay', //鬼知道文档上的这个字段是干啥的
}

export const attendanceInstantList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.AttendanceInstantList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL, SW],
        opt: [],
    },
    noMagicNumber: new Map([[attendanceInstant.attendanceInstantOnlyDisplay, new Iterator({ flag: 1 })]]),
    specialCharacter: new Map([[SW, new Iterator({ self: 1 })]]),
};

export function onlyOwnTeam(ary: number[]): boolean {
    //TODO: 根据传进来的id:number确定这些班组是不是当前用户的班组。
    return true;
}

export const attendanceResultConfirm: ApiUnit = {
    operates: new Map([[Operate.updates, ['project.consumer.AttendResultConfirm']]]),
};

/* =======================================================Pay Bill===================================================================== */

export const payBillList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.PayBillList']]]),
    permission: {
        view: [PME, EME, PM, LM, TL, SW],
        opt: [],
    },
    specialCharacter: new Map([[TL, new Iterator({ check: onlyOwnTeam })], [SW, new Iterator({ self: 1 })]]),
};

export const payProcessList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.PayProcessList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL, SW],
        opt: [],
    },
    specialCharacter: new Map([[SW, new Iterator({ self: 1 })]]),
};

export const projectPayBillList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.ProjectPayBillList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL],
        opt: [],
    },
};

export const projectPayProcessList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.ProjectPayProcessList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL],
        opt: [],
    },
};
/* =======================================================Work piece===================================================================== */

export const workPieceList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.WorkPieceList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL, QW],
        opt: [],
    },
};

/* =======================================================Overtime===================================================================== */

export const workOvertimeRecordList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.WorkOvertimeRecordList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL],
        opt: [],
    },
};

/* =======================================================Statistics===================================================================== */

export const attendanceResultTeamStatList: ApiUnit = {
    operates: new Map([[Operate.querying, ['operation.consumer.AttendResultTeamStatList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL],
        opt: [],
    },
};

export const workFlowStatistics: ApiUnit = {
    operates: new Map([[Operate.querying, ['workflow.consumer.RequestAggregation']]]),
    permission: {
        view: [PM, LM, TL, SW],
        opt: [],
    },
};

export const realTimeStatistics: ApiUnit = {
    operates: new Map([[Operate.querying, ['operation.consumer.RealTimePeopleNum']]]),
    permission: {
        view: [PME, PM, MM],
        opt: [],
    },
};

/* =========================================================CompanyUser================================================================ */

export const companyUserList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employer.consumer.CompanyUserList']]]),
    permission: {
        view: [PME, EME, MM, PM],
        opt: [],
    },
};

/* ==========================================================Personal information api================================================================ */

export const basicInfoList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.BasicInfoList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
};

export const personalIdList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.PersonalIdList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

export const workerDetailList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.WorkerDetailList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW], //文档上的权限只有前6个，操
        opt: [],
    },
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

export const workerDetailUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.WorkerDetailUpdate']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const homeInfoList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.HomeInfoList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

export const homeInfoUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.HomeInfoUpdate']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const educationList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.EducationList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

export const educationAdd: ApiUnit = {
    operates: new Map([[Operate.addition, ['employee.consumer.EducationAdd']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const educationUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.EducationUpdate']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const educationDelete: ApiUnit = {
    operates: new Map([[Operate.deletion, ['employee.consumer.EducationDelete']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const workExperienceList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.WorkExperienceList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

export const workExperienceAdd: ApiUnit = {
    operates: new Map([[Operate.addition, ['employee.consumer.WorkExperienceAdd']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const workExperienceDelete: ApiUnit = {
    operates: new Map([[Operate.deletion, ['employee.consumer.WorkExperienceDelete']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const workExperienceUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.WorkExperienceUpdate']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const platformWorkExperienceList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.WorkPlatformExperienceList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

/* ==========================================================Attendance machine api================================================================ */

export const attendanceMachineList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.AttendanceMachineList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL, QW],
        opt: [],
    },
};

/* ==========================================================Attendance card api================================================================ */

export const attendanceCardList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employer.consumer.AttendanceCardList']]]),
    permission: {
        view: [PME, EME, MM, PM, TL],
        opt: [],
    },
};

export const attendanceCardAdd: ApiUnit = {
    operates: new Map([[Operate.addition, ['employer.consumer.AttendanceCardAdd']]]),
    permission: {
        view: [],
        opt: [MM, EME, PM],
    },
};

export const attendanceCardUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['employer.consumer.AttendanceCardUpdate']]]),
    permission: {
        view: [],
        opt: [PME, MM, EME, PM],
    },
};

export const attendanceCardDelete: ApiUnit = {
    operates: new Map([[Operate.deletion, ['employer.consumer.AttendanceCardDelete']]]),
    permission: {
        view: [],
        opt: [MM, PME, PM],
    },
};

/* ==========================================================Location card api================================================================ */

export const locationCardList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employer.consumer.LocationCardList']]]),
    permission: {
        view: [PME, EME, MM, PM, TL],
        opt: [],
    },
};

export const locationCardAdd: ApiUnit = {
    operates: new Map([[Operate.addition, ['employer.consumer.LocationCardAdd']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM],
    },
};

export const locationCardUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['employer.consumer.LocationCardUpdate']]]),
    permission: {
        view: [],
        opt: [MM, EME, PM],
    },
};

export const locationCardDelete: ApiUnit = {
    operates: new Map([[Operate.deletion, ['employer.consumer.LocationCardDelete']]]),
    permission: {
        view: [],
        opt: [MM, EME, PM],
    },
};

/* ==========================================================Location related api================================================================ */

export const historyLocationList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.ListHisLoc']]]),
    permission: {
        view: [PME, MM, PM, TL],
        opt: [],
    },
    specialCharacter: new Map([[SW, new Iterator({ self: 1 })]]),
};

export const projectAreaList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.ProjectAreaList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL, QW],
        opt: [],
    },
};

/* ========================================================Bank card model=========================================== */

export const bankInfo: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.BankInfo']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
};

export const workerBankNoList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.WorkerBankNoList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
    specialCharacter: new Map([
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

export const workerBankNoAdd: ApiUnit = {
    operates: new Map([[Operate.addition, ['employee.consumer.WorkerBankNoAdd']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const workerBankNoDelete: ApiUnit = {
    operates: new Map([[Operate.deletion, ['employee.consumer.WorkerBankNoDelete']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

export const setBankNoMaster: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.SetBankNoMaster']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
    },
};

/* ========================================================Certificate model=========================================== */

export const certificateList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.WorkCertificateList']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL, SW, QW, CW, UW],
        opt: [],
    },
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

export const certificateAdd: ApiUnit = {
    operates: new Map([[Operate.addition, ['employee.consumer.WorkCertificateCreate']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW],
    },
};

export const certificateDelete: ApiUnit = {
    operates: new Map([[Operate.deletion, ['employee.consumer.WorkCertificateDelete']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW],
    },
};

export const certificateUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['employee.consumer.WorkCertificateUpdate']]]),
    permission: {
        view: [],
        opt: [PME, EME, MM, PM, LM, TL, SW, QW, CW],
    },
};

/* ========================================================Message model=========================================== */

export const messageList: ApiUnit = {
    operates: new Map([[Operate.querying, ['operation.consumer.MsgTitleList']]]),
};

export const unreadMessageCount: ApiUnit = {
    operates: new Map([[Operate.querying, ['operation.consumer.UnreadMsgCount']]]),
};

export const messageDelete: ApiUnit = {
    operates: new Map([[Operate.deletion, ['operation.consumer.MsgTitleDelete']]]),
};

export const messageContent: ApiUnit = {
    operates: new Map([[Operate.querying, ['operation.consumer.ReadMsgContent']]]),
};

/* ========================================================Common model=========================================== */

export const logout: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.Logout']]]),
};

export const QRLogin: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.QRLoginForApp']]]),
};

export const nationalityList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.NationalityList']]]),
};

export const groupsList: ApiUnit = {
    operates: new Map([[Operate.querying, ['employee.consumer.GroupsList']]]),
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [EME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
        [UW, new Iterator({ self: 1 })],
    ]),
};

/* ========================================================Work flow model=========================================== */

export const multiTaskUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['workflow.consumer.MultiTaskUpdate']]]),
};

export const taskUpdate: ApiUnit = {
    operates: new Map([[Operate.updates, ['workflow.consumer.TaskUpdate']]]),
};

export const projectPayBillFlowList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.ProjectPayBillFlowList']]]),
};

export const workFlowList: ApiUnit = {
    operates: new Map([[Operate.querying, ['workflow.consumer.RequestList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL, QW, SW, CW],
        opt: [],
    },
    specialCharacter: new Map([
        [PME, new Iterator({ self: 1 })],
        [MM, new Iterator({ self: 1 })],
        [PM, new Iterator({ self: 1 })],
        [LM, new Iterator({ self: 1 })],
        [TL, new Iterator({ self: 1 })],
        [QW, new Iterator({ self: 1 })],
        [SW, new Iterator({ self: 1 })],
        [CW, new Iterator({ self: 1 })],
    ]),
    noMagicNumber: new Map([
        [SpecificWorkFlowState.launch, new Iterator({ flag: 1 })],
        [SpecificWorkFlowState.completed, new Iterator({ flag: 2 })],
        [SpecificWorkFlowState.pending, new Iterator({ flag: 3 })],
    ]),
};

export const attendanceModifyRecordList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.AmendAttendRecordList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL],
        opt: [],
    },
};

export const leaveRecordList: ApiUnit = {
    operates: new Map([[Operate.querying, ['project.consumer.LeaveRecordList']]]),
    permission: {
        view: [PME, MM, PM, LM, TL],
        opt: [],
    },
};

/* =========================================================Launch related======================================= */

export const multiProcessCreate: ApiUnit = {
    operates: new Map([[Operate.addition, ['workflow.consumer.MultiProcessCreate']]]),
    permission: {
        view: [],
        opt: [PM, LM, TL],
    },
};

export const deleteImages: ApiUnit = {
    operates: new Map([[Operate.deletion, ['operation.consumer.DeleteFiles']]]),
};

export const processCreate: ApiUnit = {
    operates: new Map([[Operate.addition, ['workflow.consumer.ProcessCreate']]]),
    permission: {
        view: [],
        opt: [PM, LM, TL],
    },
};

export const workerContractEdit: ApiUnit = {
    operates: new Map([[Operate.updates, ['project.consumer.WorkerContractEdit']]]),
    permission: {
        view: [],
        opt: [PM, LM, TL],
    },
};

export const searchWorker: ApiUnit = {
    operates: new Map([[Operate.querying, ['employer.consumer.SearchWorker']]]),
    permission: {
        view: [PME, EME, MM, PM, LM, TL],
        opt: [],
    },
};

/* ===================================================API END====================================================== */

@Injectable()
export class Command {
    workTimePayList = 'project.consumer.WorkTimePayList'; // 工人管理下的接口，工时支付列表；
    constructor() { }

    private getFullParameter(path: string, parameters: object): WsRequest {
        return { command: { path }, parameters };
    }

	/**
     * @description APIs before entry into the app: login, searchCompany, phoneVerificationCode, resetPhoneVerificationCode, register, resetPassword, updatePersonalIdImage.
     */
    login(option: LoginOptions): WsRequest {
        const path = login.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    searchCompany(option: SearchCompanyOptions): WsRequest {
        const path = company.operates.get(Operate.search)[0];

        return this.getFullParameter(path, option);
    }

    nationalityList() {
        const path = nationalityList.operates.get(Operate.querying)[0];

        const { command } = this.getFullParameter(path, {});

        return { command };
    }

    getGroupsList(option: GroupsListOptions): WsRequest {
        const path = groupsList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * FIXME: NO.1
     * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，phoneVerificationCode
     * 处理注册时的手机验证码，resetPhoneVerificationCode处理重置密码时的手机验证码。
     * */
    phoneVerificationCode(option: PhoneVerificationCodeOptions): WsRequest {
        const path = phoneVerificationCode.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    resetPhoneVerificationCode(option: PhoneVerificationCodeOptions): WsRequest {
        const path = resetPhoneVerificationCode.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    register(option: RegisterOptions): WsRequest {
        const index = option.company_id ? 0 : 1;

        const path = register.operates.get(Operate.addition)[index];

        return this.getFullParameter(path, option);
    }

    resetPassword(option: ResetPasswordOptions): WsRequest {
        const path = resetPassword.operates.get(Operate.updates)[0];

        return this.getFullParameter(path, option);
    }

    updatePersonalIdImage(option: CertificateOptions): WsRequest {
        const path = updatePersonalIdImage.operates.get(Operate.updates)[0];

        return this.getFullParameter(path, option);
    }

    uploadPersonalIdImage(option: UploadPersonalIdImageOptions): UploadPersonalIdImageOptions {
        const command = uploadPersonalIdImage.operates.get(Operate.updates)[0];

        return { ...option, command };
    }

    getCheckPhone(option: CheckPhoneOptions): WsRequest {
        const path = checkPhone.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getCheckPhoneVerify(option: CheckPhoneVerifyCodeOptions): WsRequest {
        const path = checkPhoneVerify.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getChangePhone(option: ChangePhoneOptions): WsRequest {
        const path = changePhone.operates.get(Operate.updates)[0];

        return this.getFullParameter(path, option);
    }

    getChangePhoneVerify(option: ChangePhoneVerifyCodeOptions): WsRequest {
        const path = changePhoneVerify.operates.get(Operate.updates)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Project API: getProjectList;
     */
    getProjectList(option: ProjectListOptions): WsRequest {
        const path = projectList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Contract related API: getWorkerContractList;
     */
    getWorkerContractList(option: WorkerContractOptions, ...magicNumberNames: string[]): WsRequest {
        const path = workerContractList.operates.get(Operate.querying)[0];

        const magicOption = magicNumberNames.reduce((acc, cur) => {
            const param = workerContractList.noMagicNumber.get(cur);
            return { ...acc, ...param };
        }, {});

        return this.getFullParameter(path, { ...option, ...magicOption });
    }

	/**
     * @description WorkType API: getWorkTypeList;
     */
    getWorkTypeList(): WsRequest {
        const path = workTypeList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, {});
    }

	/**
     * @description team API: getTeamList, getTeamAdd, getTeamUpdate, getTeamDelete;
     */
    getTeamList(option: TeamListOptions): WsRequest {
        const path = teamList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getTeamAdd(option: TeamAddOptions): WsRequest {
        const path = teamAdd.operates.get(Operate.addition)[0];

        return this.getFullParameter(path, option);
    }

    getTeamUpdate(option: TeamUpdateOptions): WsRequest {
        const path = teamUpdate.operates.get(Operate.updates)[0];

        return this.getFullParameter(path, option);
    }

    getTeamDelete(option: TeamDeleteOptions): WsRequest {
        const path = teamDelete.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Attendance API: getAttendanceList, getAttendanceInstantList, getAttendanceResultConfirm;
     */
    getAttendanceList(option: AttendanceResultListOptions): WsRequest {
        const path = attendanceList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getAttendanceInstantList(option: AttendanceInstantListOptions): WsRequest {
        const path = attendanceInstantList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getAttendanceResultConfirm(option: AttendanceResultConfirmOptions): WsRequest {
        const path = attendanceResultConfirm.operates.get(Operate.updates)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Salary related API: getPayBillList, getPayProcessList, getProjectPayBillList, getProjectPayProcessList;
     */
    getPayBillList(option: PayBillListOptions): WsRequest {
        const path = payBillList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getProjectPayBillList(option: ProjectPayBillListOptions): WsRequest {
        const path = projectPayBillList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getProjectPayProcessList(option: ProjectPayProcessListOptions): WsRequest {
        const path = projectPayProcessList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Work piece API: getWorkerPieceList;
     */
    getWorkPieceList(option: WorkPieceListOptions): WsRequest {
        const path = workPieceList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Overtime API: getWorkOvertimeRecordList;
     */
    getWorkOvertimeRecordList(option: WorkOvertimeRecordListOptions): WsRequest {
        const path = workOvertimeRecordList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Statistics related API: getAttendanceResultTeamStatList, getWorkFlowStatistics;
     */
    getAttendanceResultTeamStatList(option: AttendanceResultTeamStatListOptions): WsRequest {
        const path = attendanceResultTeamStatList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getWorkFlowStatistics(option: RequestAggregationOptions): WsRequest {
        const path = workFlowStatistics.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Company user API: getCompanyUser;
     */
    getCompanyUserList(option: CompanyUserListOptions): WsRequest {
        const path = companyUserList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Personal information API: getBasicInfo, getPersonalIdList, getWorkerDetailList...;
     */
    getBasicInfoList(option: BasicInfoListOptions): WsRequest {
        const path = basicInfoList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getPersonalIdList(option: PersonalIdListOptions): WsRequest {
        const path = personalIdList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getWorkerDetailList(option: WorkerDetailListOptions): WsRequest {
        const path = workerDetailList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getWorkerDetailUpdate(originOption: WorkerDetailUpdateOptions): WsRequest {
        const path = workerDetailUpdate.operates.get(Operate.updates)[0];

        const { sid, work_type_id, province, city, street, detail, dist } = originOption;

        const address_form = omitBy({ province, city, street, detail, dist }, (value, key) => !value);

        const option = { sid };

        if (work_type_id) Object.assign(option, { worker_form: { work_type_id } });

        if (!isEmpty(address_form)) Object.assign(option, { address_form });

        return this.getFullParameter(path, option);
    }

    getHomeInfoList(option: HomeInfoListOptions): WsRequest {
        const path = homeInfoList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getHomeInfoUpdate(originOption: HomeInfoUpdateOptions): WsRequest {
        const path = homeInfoUpdate.operates.get(Operate.updates)[0];

        const {
			sid,
            emergency_contact_relation,
            emergency_contact_name,
            emergency_contact_tel,
            marriage,
            marryday,
            childnum,
            province,
            city,
            detail,
            dist,
            street,
		} = originOption;

        const option = {
            sid,
            home_info_form: {
                emergency_contact_relation,
                emergency_contact_name,
                emergency_contact_tel,
                marriage,
                marryday,
                childnum,
            },
            address_form: { province, city, detail, dist, street },
        };

        return this.getFullParameter(path, option);
    }

    getEducationList(option: EducationListOptions): WsRequest {
        const path = educationList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getEducationAdd(originOption: EducationAddOptions): WsRequest {
        const path = educationAdd.operates.get(Operate.addition)[0];

        const { sid, degree, finish_date, school__name, start_date, major } = originOption;

        const option = { sid, education_form: { degree, finish_date, school__name, start_date, major } };

        return this.getFullParameter(path, option);
    }

    getEducationDelete(option: EducationDeleteOptions): WsRequest {
        const path = educationDelete.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

    getEducationUpdate(originOption: EducationUpdateOptions): WsRequest {
        const path = educationUpdate.operates.get(Operate.updates)[0];

        const { sid, degree, finish_date, start_date, major, school__name, id } = originOption;

        const option = { sid, education_form: { degree, finish_date, start_date, major, school__name, id } };

        return this.getFullParameter(path, option);
    }

    getWorkExperienceList(option: WorkExperienceListOptions): WsRequest {
        const path = workExperienceList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getWorkExperienceAdd(originOption: WorkExperienceAddOptions): WsRequest {
        const path = workExperienceAdd.operates.get(Operate.addition)[0];

        const { sid, start, finish, company_name, job, project_name } = originOption;

        const option = { sid, work_exper_form: { start, finish, company_name, project_name, job } };

        return this.getFullParameter(path, option);
    }

    getWorkExperienceDelete(option: WorkExperienceDeleteOptions): WsRequest {
        const path = workExperienceDelete.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

    getWorkExperienceUpdate(originOption: WorkExperienceUpdateOptions): WsRequest {
        const path = workExperienceUpdate.operates.get(Operate.updates)[0];

        const { id, company_name, sid, project_name, start, finish, job } = originOption;

        const option = { sid, work_exper_form: { start, finish, job, company_name, project_name, id } };

        return this.getFullParameter(path, option);
    }

    getPlatformWorkExperienceList(option: PlatformWorkExperienceListOptions): WsRequest {
        const path = platformWorkExperienceList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Attendance machine API: getAttendanceMachineList
     */
    getAttendanceMachineList(option: AttendanceMachineListOptions): WsRequest {
        const path = attendanceMachineList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Attendance card API: getAttendanceCardList, getAttendanceCardAdd, getAttendanceCardDelete, getAttendanceCardUpdate
     */
    getAttendanceCardList(option: AttendanceCardListOptions): WsRequest {
        const path = attendanceCardList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getAttendanceCardAdd(initialOption: AttendanceCardAddOptions): WsRequest {
        const path = attendanceCardAdd.operates.get(Operate.addition)[0];

        const { sid, attendance_card_form } = initialOption;

        // This field may have extra filed named userName which is used for update store when server response success,
        // but it is not needed for requesting, so the request information is deconstructed here and recombination.
        const { ic_card_num, user_id } = attendance_card_form;

        const option = { sid, attendance_card_form: { ic_card_num, user_id } };

        return this.getFullParameter(path, option);
    }

    getAttendanceCardUpdate(initialOption: AttendanceCardUpdateOptions): WsRequest {
        const path = attendanceCardUpdate.operates.get(Operate.updates)[0];

        const { ic_card_num, user_id, sid } = initialOption;

        const option = { ic_card_num, user_id, sid };

        return this.getFullParameter(path, option);
    }

    getAttendanceCardDelete(option: AttendanceCardDeleteOptions): WsRequest {
        const path = attendanceCardDelete.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Location card API: getLocationCardList, getLocationCardAdd, getLocationCardUpdate, getLocationCardDelete
     */
    getLocationCardList(option: LocationCardListOptions): WsRequest {
        const path = locationCardList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getLocationCardAdd(option: LocationCardAddOptions): WsRequest {
        const path = locationCardAdd.operates.get(Operate.addition)[0];

        return this.getFullParameter(path, option);
    }

    getLocationCardUpdate(initialOption: LocationCardUpdateOptions): WsRequest {
        const path = locationCardUpdate.operates.get(Operate.updates)[0];

        const option = omit(initialOption, ['userName']);

        return this.getFullParameter(path, option);
    }

    getLocationCardDelete(option: LocationCardDeleteOptions): WsRequest {
        const path = locationCardDelete.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Location related api: getHistoryLocationList, getProjectAreaList
     */
    getHistoryLocationList(option: HistoryLocationListOptions): WsRequest {
        const path = historyLocationList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getProjectAreaList(option: ProjectAreaListOptions): WsRequest {
        const path = projectAreaList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Bank no related api: getBankInfo, getWorkerBankNoList, getWorkerBankNoAdd, getWorkerBankNoDelete;
     */
    getBankInfo(option: BankInfoOptions): WsRequest {
        const path = bankInfo.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getWorkerBankNoList(option: WorkerBankNoListOptions): WsRequest {
        const path = workerBankNoList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getWorkerBankNoAdd(option: WorkerBankNoAddOptions): WsRequest {
        const path = workerBankNoAdd.operates.get(Operate.addition)[0];

        return this.getFullParameter(path, option);
    }

    getWorkerBankNoDelete(option: WorkerBankNoDeleteOptions): WsRequest {
        const path = workerBankNoDelete.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

    getSetBankNoMaster(option: SetBankNoMasterOptions): WsRequest {
        const path = setBankNoMaster.operates.get(Operate.updates)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description logout api
     */
    getLogout(option: LogoutOptions): WsRequest {
        const path = logout.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description qr login api 
     */
    getQRLogin(option: QRLoginOptions): WsRequest {
        const path = QRLogin.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description certificate related api: getCertificateList, getCertificateAdd, getCertificateDelete, getCertificateUpdate
     */
    getCertificateList(option: CertificateListOptions): WsRequest {
        const path = certificateList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getCertificateAdd(originOption: CertificateAddOptions): WsRequest {
        const path = certificateAdd.operates.get(Operate.addition)[0];

        const {
			sid,
            worktype_id,
            num,
            usefinish_date,
            usestart_date,
            firstget_date,
            education,
            mechanism,
		} = originOption;

        const option = {
            sid,
            work_certificate_form: {
                worktype_id,
                num,
                usefinish_date,
                usestart_date,
                firstget_date,
                education,
                mechanism,
            },
        };

        return this.getFullParameter(path, option);
    }

    getCertificateDelete(option: CertificateDeleteOptions): WsRequest {
        const path = certificateDelete.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

    getCertificateUpdate(originOption: CertificateUpdateOptions): WsRequest {
        const path = certificateUpdate.operates.get(Operate.updates)[0];

        const {
			sid,
            id,
            worktype_id,
            num,
            usefinish_date,
            usestart_date,
            firstget_date,
            education,
            mechanism,
		} = originOption;

        const option = {
            sid,
            work_certificate_form: {
                id,
                worktype_id,
                num,
                usefinish_date,
                usestart_date,
                firstget_date,
                education,
                mechanism,
            },
        };

        return this.getFullParameter(path, option);
    }

    getCertificateImageUpload(option: UploadCertificateImageOptions): UploadCertificateImageOptions {
        const command = uploadCertificateImage.operates.get(Operate.updates)[0];

        return { ...option, command };
    }

	/**
     * @description message related api: getMessageList, getMessageContent, getUnreadMessageCount, getMessageDelete;
     */
    getMessageList(option: MessageListOptions): WsRequest {
        const path = messageList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getMessageContent(option: MessageContentOptions): WsRequest {
        const path = messageContent.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getMessageDelete(option: MessageDeleteOptions): WsRequest {
        const path = messageDelete.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

    getUnreadMessageCount(option: UnreadMessageCountOptions): WsRequest {
        const path = unreadMessageCount.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Work flow relates api: getWorkFlowList, getProjectPayBillFlowList, getMultiTaskUpdate;
     */
    getWorkFlowList(option: WorkFlowListOptions): WsRequest {
        const path = workFlowList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getProjectPayBillFlowList(option: ProjectPayBillFlowListOptions): WsRequest {
        const path = projectPayBillFlowList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getMultiTaskUpdate(option: MultiTaskUpdateOptions): WsRequest {
        const path = multiTaskUpdate.operates.get(Operate.updates)[0];

        const { sid, comment, id, approve } = option;

        return this.getFullParameter(path, { sid, task: { comment, id, approve } });
    }

    getTaskUpdate(option: TaskUpdateOptions): WsRequest {
        const path = taskUpdate.operates.get(Operate.updates)[0];

        const { sid, comment, id, approve } = option;

        return this.getFullParameter(path, { sid, task: { comment, id, approve } });
    }

	/**
     * @description Leave relate api: getLeaveRecordList;
     */
    getLeaveRecordList(option: LeaveRecordListOptions): WsRequest {
        const path = leaveRecordList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description Attendance modify related api: getAttendanceModifyRecordList
     */
    getAttendanceModifyRecordList(option: AttendanceModifyRecordListOptions): WsRequest {
        const path = attendanceModifyRecordList.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

	/**
     * @description launch related api: getProcessCreate, getDeleteImages, getWorkerTimeDuty, getWorkerContractEdit ...
     */
    getWorkerContractEdit(option: WorkerContractEditOptions): WsRequest {
        const path = workerContractEdit.operates.get(Operate.updates)[0];

        return this.getFullParameter(path, option);
    }

    getDeleteImages(option: DeleteImagesOptions): WsRequest {
        const path = deleteImages.operates.get(Operate.deletion)[0];

        return this.getFullParameter(path, option);
    }

    getCreateWorkerContract(originOption: CreateWorkerContractOptions): WsRequest {
        const path = multiProcessCreate.operates.get(Operate.addition)[0];

        let { worker_contract } = originOption;

        const { work_piece_pay, work_time_pay, sid } = originOption;

        const { formType } = worker_contract;

        worker_contract = omit(worker_contract, ['attach', 'formType']);

        if (formType === WorkerContractFormType.timePayType) {
            return this.getFullParameter(path, {
                sid,
                worker_contract,
                flow_name: ProcessIdOptions.workerContract,
                work_time_pay,
            });
        } else {
            return this.getFullParameter(path, {
                sid,
                worker_contract,
                flow_name: ProcessIdOptions.workerContract,
                work_piece_pay,
            });
        }
    }

    getCreateWorkerContractModify(originOption: CreateWorkerContractModifyOptions): WsRequest {
        const path = processCreate.operates.get(Operate.addition)[0];

        let { contract_time_change_flow } = originOption;

        const { sid } = originOption;

        contract_time_change_flow = omit(contract_time_change_flow, ['attach']);

        const option = { sid, contract_time_change_flow, flow_name: ProcessIdOptions.workerContractExpire };

        return this.getFullParameter(path, option);
    }

    getCreateLeave(originOption: CreateLeaveOptions): WsRequest {
        const path = processCreate.operates.get(Operate.addition)[0];

        let { leave } = originOption;

        const { sid } = originOption;

        leave = omit(leave, ['attach']);

        const option = { sid, leave, flow_name: ProcessIdOptions.leave };

        return this.getFullParameter(path, option);
    }

    getCreateOvertime(originOption: CreateOvertimeOptions): WsRequest {
        const path = processCreate.operates.get(Operate.addition)[0];

        let { work_over_time } = originOption;

        const { sid } = originOption;

        work_over_time = omit(work_over_time, ['attach']);

        const option = { sid, work_over_time, flow_name: ProcessIdOptions.overtime };

        return this.getFullParameter(path, option);
    }

    getCreatePieceAudit(originOption: CreatePieceAuditOptions): WsRequest {
        const path = processCreate.operates.get(Operate.addition)[0];

        let { work_piece_finish_flow } = originOption;

        const { sid } = originOption;

        work_piece_finish_flow = omit(work_piece_finish_flow, ['attach']);

        const option = { sid, work_piece_finish_flow, flow_name: ProcessIdOptions.pieceAudit };

        return this.getFullParameter(path, option);
    }

    getCreateAttendanceModify(originOption: CreateAttendanceModifyOptions): WsRequest {
        const path = multiProcessCreate.operates.get(Operate.addition)[0];

        let { attend_amend } = originOption;

        const { sid } = originOption;

        attend_amend = omit(attend_amend, ['attach']);

        const option = { sid, attend_amend, flow_name: ProcessIdOptions.attendanceModify };

        return this.getFullParameter(path, option);
    }

    getSearchWorker(option: SearchWorkerOptions): WsRequest {
        const path = searchWorker.operates.get(Operate.querying)[0];

        return this.getFullParameter(path, option);
    }

    getUploadWorkerContractAttach(option: UploadWorkerContractAttachOptions): UploadWorkerContractAttachOptions {
        const command = uploadWorkerContractAttach.operates.get(Operate.updates)[0];

        return { ...option, command };
    }

    getUploadAttendanceModifyAttach(option: UploadAttendanceModifyAttachOptions): UploadAttendanceModifyAttachOptions {
        const command = uploadAttendanceModifyAttach.operates.get(Operate.updates)[0];

        return { ...option, command };
    }

    getUploadLeaveAttach(option: UploadLeaveAttachOptions): UploadLeaveAttachOptions {
        const command = uploadLeaveAttach.operates.get(Operate.updates)[0];

        return { ...option, command };
    }

    getUploadOvertimeAttach(option: UploadOvertimeAttachOptions): UploadOvertimeAttachOptions {
        const command = uploadOvertimeAttach.operates.get(Operate.updates)[0];

        return { ...option, command };
    }

    getUploadPieceAuditAttach(option: UploadPieceAuditAttachOptions): UploadPieceAuditAttachOptions {
        const command = uploadPieceAuditAttach.operates.get(Operate.updates)[0];

        return { ...option, command };
    }

    getUploadWorkerContractModifyAttach(option: UploadWorkerContractModifyAttachOptions): UploadWorkerContractModifyAttachOptions {
        const command = uploadWorkerContractModifyAttach.operates.get(Operate.updates)[0];

        return { ...option, command };
    }

    getRealTimeStatistics(option: WorkTypeRealTimeStatisticsOptions | TeamMembersRealTimeStatisticsOptions): WsRequest {
        const command = realTimeStatistics.operates.get(Operate.querying)[0];

        return this.getFullParameter(command, option);
    }

    /* ==========================================================Api unit reference api====================================================== */

	/**
     * @description API unit interfaces for http methods;
     */

    get uploadCertificateImage(): string {
        return uploadCertificateImage.operates.get(Operate.updates)[0];
    }

	/**
     * @description API unit interfaces for websocket methods;
     */
    get projectList() {
        return projectList;
    }

    get workerContractList() {
        return workerContractList;
    }

    get teamList() {
        return teamList;
    }

    get attendanceList() {
        return attendanceList;
    }

    get attendanceInstantList() {
        return attendanceInstantList;
    }

    get payBillList() {
        return payBillList;
    }

    get workPieceList() {
        return workPieceList;
    }

    get workOvertimeRecordList() {
        return workOvertimeRecordList;
    }

    get attendanceResultTeamStatList() {
        return attendanceResultTeamStatList;
    }

    get workFlowStatistics() {
        return workFlowStatistics;
    }

    get payProcessList() {
        return payProcessList;
    }

    get projectPayBillList() {
        return projectPayBillList;
    }

    get projectPayProcessList() {
        return projectPayProcessList;
    }

    get teamAdd() {
        return teamAdd;
    }

    get teamUpdate() {
        return teamUpdate;
    }

    get teamDelete() {
        return teamDelete;
    }

    get companyUserList() {
        return companyUserList;
    }

    get basicInfoList() {
        return basicInfoList;
    }

    get attendanceMachineList() {
        return attendanceMachineList;
    }

    get attendanceCardList() {
        return attendanceCardList;
    }

    get attendanceCardAdd() {
        return attendanceCardAdd;
    }

    get attendanceCardUpdate() {
        return attendanceCardUpdate;
    }

    get attendanceCardDelete() {
        return attendanceCardDelete;
    }

    get locationCardList() {
        return locationCardList;
    }

    get locationCardAdd() {
        return locationCardAdd;
    }

    get locationCardUpdate() {
        return locationCardUpdate;
    }

    get locationCardDelete() {
        return locationCardDelete;
    }

    get historyLocationList() {
        return historyLocationList;
    }

    get projectAreaList() {
        return projectAreaList;
    }

    get personalIdList() {
        return personalIdList;
    }

    get workerDetailList() {
        return workerDetailList;
    }

    get workerDetailUpdate() {
        return workerDetailUpdate;
    }

    get homeInfoList() {
        return homeInfoList;
    }

    get homeInfoUpdate() {
        return homeInfoUpdate;
    }

    get educationList() {
        return educationList;
    }

    get educationAdd() {
        return educationAdd;
    }

    get educationDelete() {
        return educationDelete;
    }

    get educationUpdate() {
        return educationUpdate;
    }

    get workExperienceList() {
        return workExperienceList;
    }

    get workExperienceAdd() {
        return workExperienceAdd;
    }

    get workExperienceUpdate() {
        return workExperienceUpdate;
    }

    get workExperienceDelete() {
        return workExperienceDelete;
    }

    get platformWorkExperienceList() {
        return platformWorkExperienceList;
    }

    get bankInfo() {
        return bankInfo;
    }

    get workerBankNoList() {
        return workerBankNoList;
    }

    get workerBankNoAdd() {
        return workerBankNoAdd;
    }

    get workerBankNoDelete() {
        return workerBankNoDelete;
    }

    get setBankNoMaster() {
        return setBankNoMaster;
    }

    get logout() {
        return logout;
    }

    get QRLogin() {
        return QRLogin;
    }

    get certificateList() {
        return certificateList;
    }

    get certificateAdd() {
        return certificateAdd;
    }

    get certificateDelete() {
        return certificateDelete;
    }

    get certificateUpdate() {
        return certificateUpdate;
    }

    get messageList() {
        return messageList;
    }

    get messageContent() {
        return messageContent;
    }

    get unreadMessageCount() {
        return unreadMessageCount;
    }

    get messageDelete() {
        return messageDelete;
    }

    get groupsList() {
        return groupsList;
    }

    get projectPayBillFlowList() {
        return projectPayBillFlowList;
    }

    get workFlowList() {
        return workFlowList;
    }

    get multiTasUpdate() {
        return multiTaskUpdate;
    }

    get taskUpdate() {
        return taskUpdate;
    }

    get attendanceResultConfirm() {
        return attendanceResultConfirm;
    }

    get leaveRecordList() {
        return leaveRecordList;
    }

    get attendanceModifyRecordList() {
        return attendanceModifyRecordList;
    }

    get multiProcessCreate() {
        return multiProcessCreate;
    }

    get deleteImages() {
        return deleteImages;
    }

    get processCreate() {
        return processCreate;
    }

    get workerContractEdit() {
        return workerContractEdit;
    }

    get searchWorker() {
        return searchWorker;
    }

    get realTimeStatistics() {
        return realTimeStatistics;
    }

    get checkPhone() {
        return checkPhone;
    }

    get checkPhoneVerify() {
        return checkPhoneVerify;
    }

    get changePhone() {
        return changePhone;
    }

    get changePhoneVerify() {
        return changePhoneVerify;
    }
}
