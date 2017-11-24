import { Action } from '@ngrx/store';

export interface WsResponse {
  code: number;
  command: { path: string };
  data: any;
  msg: string;
  isError: boolean
  detail?: any;
}

export class ResponseAction implements Action {
  readonly type: string;

  constructor(public payload: any) { }
}

//custom field
export interface ErrorMessage {
  errorMessage: string;
}

/*==================================Data model before enter into app=============================================*/

//login
export interface LoginResponse {
  auth_pass: boolean;
  captcha: boolean;
  face_image: string;
  groups_list: string[];
  realname: string;
  sid: string;
  user_id: number;
  errorMessage?: string;
}

//search company
export interface Company {
  name: string;
  id: number;
}

//phone verification code
export interface PhoneVerCodeResponse {
  captcha?: boolean;
  errorMessage?: string;
}

//register
export interface RegisterResponse {
  user_id: number;
  errorMessage?: string;
}

//reset password
export interface ResetPasswordResponse {
  user_id: number;
  errorMessage?: string;
}

//certificate
export interface CertificateResponse {
  auth_pass: boolean;
  errorMessage?: string;
}

/*=================================================Team model======================================================*/

export interface Team {
  id: number;
  leader__employee__realname: string;
  leader_id: string;
  leader_username: string;
  name: string;
  project_id: number;
  project_name: string;
  quality_manage__employee__realname: string;
  quality_manage__username: string;
  quality_manage_id: number;
  selected?: boolean;
}

//teamList
export interface TeamListResponse {
  teams: Team[];
  errorMessage?: string;
}

/*===============================================Project model======================================================*/

export interface AttendanceMachine {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
}

export interface Project {
  address__city: string;
  address__detail: string;
  address__dist: string;
  address__province: string;
  address__street: string;
  approvals_id: number[];
  attendance_machines: AttendanceMachine[];
  content: string;
  fund_rource: string;
  id: number;
  manager__employee__realname: string;
  manager__username: string;
  manager_id: number;
  name: string;
  prime_contract__first_contracting__name: string;
  prime_contract__first_contracting_id: number;
  prime_contract__owner__name: string;
  prime_contract__owner_id: number;
  prime_contract__plan_finish_day: string;
  prime_contract__plan_start_day: string;
  prime_contract__prime_total_price: number;
  range: string;
  status: string;
  sub_contract__contracting__name: string;
  sub_contract__contracting_id: number;
  sub_contract__labour_manager__employee__realname: string;
  sub_contract__labour_manager__username: string;
  sub_contract__labour_manager_id: number;
  sub_contract__sub_total_price: number;
}

//projectList
export interface ProjectListResponse {
  count: number;
  projects: Project[];
  errorMessage?: string;
}

/*===========================================Worker contract model======================================================*/

export interface TimePay {
  content: string;
  contract_id: number;
  overtime_pay_mount: number;
  pay_mount: number;
  probation_pay_mount: number;
  time_unit: string;
}

export interface WorkerContract {
  additional_content: string;
  afternoon_time_off_duty: string;
  afternoon_time_on_duty: string;
  finish_day: string;
  id: number;
  morning_time_off_duty: string;
  morning_time_on_duty: string;
  pay_day: number;
  probation_month: string;
  request__status: string;
  request_files: any[];
  request_id: number;
  start_day: string;
  team__leader__employee__realname: string;
  team__leader__username: string;
  team__name: string;
  team__project__name: string;
  team__project__sub_contract__contracting__name: string;
  team__project__sub_contract__contracting__phone: string;
  team__project__sub_contract__contracting__user_name: string;
  team__project_id: number;
  team__quality_manage__employee__realname: string;
  team__quality_manage__username: string;
  team_id: number;
  type: string;
  work_time_pay: TimePay[];
  worker__employee__personalIdNum: string;
  worker__employee__realname: string;
  worker__username: string;
  worker_id: number;
  worktype__name: string;
  worktype_id: number;
  year_bonus_day: string;
}

//workerContractList
export interface WorkerContractListResponse {
  count: number;
  worker_contract: WorkerContract[];
  errorMessage?: string;
}

/*===========================================Work type model======================================================*/

export interface WorkType {
  id: number;
  danger: number;
  name: string;
}

//workTypeList
export interface WorkTypeListResponse {
  information: WorkType[];
  errorMessage?: string;
}


/*===========================================Attendance model=================================================*/

export interface AmendAttendanceResult {
  id: number;
  off_duty: string;
  on_duty: string;
  reason: string;
  request_id: number;
  result__status: string;
  result_id: number;
}

export interface AttendanceResult {
  attend_amend: AmendAttendanceResult[];
  availability_work_hour: number;
  confirm: number;
  contract__team__name: string;
  contract__team_id: number;
  contract__worker__employee__realname: string;
  contract__worker__username: string;
  contract__worker_id: number;
  contract_id: number;
  day: string;
  id: number;
  selected?: boolean;
  total_area_hour: number;
  total_gps_area_hour: number;
}

//attendResultList
export interface AttendanceResultListResponse {
  count: number;
  attendance_results: AttendanceResult[];
  errorMessage?: string;
}

export interface AttendanceInstant {
  attendance_machine__name: string;
  attendance_machine__type: string;
  attendance_machine_id: number;
  capture_image: string;
  day: string;
  id: number;
  screen_image: string;
  similarity: number;
  time: string;
  type: number;
  user__employee__realname: string;
  user_id: number;
}

export enum AttendanceInstantType {
  CAN_NOT_READ,
  IN,
  OUT
}

// attendanceInstantList
export interface AttendanceInstantListResponse {
  count: number;
  attendance_instants: AttendanceInstant[];
  errorMessage?: string;
}

//TODO: unused;
//attendResultList
export interface AttendanceResultConfirmResponse {
  information: string; 
  errorMessage?: string;
}

/*===========================================PayBill model======================================================*/

export interface PayBill {
  amount_1: number;
  amount_2: number;
  amount_3: number;
  amount_4: number;
  amount_5: number;
  amount_6: number;
  contract__team__name: string;
  contract__team_id: number;
  contract__worker__employee__realname: string;
  hour_1: number;
  hour_2: number;
  hour_3: number;
  hour_4: number;
  hour_5: number;
  hour_6: number;
  id: number;
  pay_type: string;
  project_bill__month: string;
  project_bill__project__name: string;
  project_bill__project_id: number;
  project_bill_id: number;
  user_id: number;
}

// payBillList 个人工资对帐单
export interface PayBillListResponse {
  count: number;
  pay_bill: PayBill[];
  errorMessage?: string;
}

export interface ProjectPayBill {
  bill_status: string;
  create_time: string;
  id: number;
  modify_time: string;
  month: string;
  pay_bill__amount_1__sum: number;
  pay_bill__amount_2__sum: number;
  pay_bill__amount_3__sum: number;
  pay_bill__amount_4__sum: number;
  pay_bill__amount_5__sum: number;
  pay_bill__amount_6__sum: number;
  pay_bill__amount__sum: number;
  pay_bill__amount_all__sum: number;
  pay_bill__hour_1__sum: number;
  pay_bill__hour_2__sum: number;
  pay_bill__hour_3__sum: number;
  pay_bill__hour_4__sum: number;
  pay_bill__hour_5__sum: number;
  pay_bill__hour_6__sum: number;
  project__name: string;
  project_id: number;
}

//projectPayBillList 工程工资对帐单
export interface ProjectPayBillListResponse {
  project_pay_bill: ProjectPayBill[];
  errorMessage?: string;
}

export interface PayProcess {
  amount: number;
  bank_name: string;
  bank_no: string;
  create_time: string;
  id: number;
  modify_time: string;
  name: string;
  pay_bill__contract__team__name: string;
  pay_bill__contract__worker__employee__realname: string;
  pay_bill__contract__worker__username: string;
  pay_bill__contract__worker_id: number;
  project_pay__project_bill__month: string;
  project_pay__project_bill__project__name: string;
  project_pay__project_bill__project_id: number;
  project_pay_id: number;
  response_code: null;
  response_msg: null;
  status: string;
  tran_id: string;
  tran_time: null;
}

//payProcessList 个人工资发放单
export interface PayProcessListResponse {
  count: number;
  pay_process: PayProcess[]
  errorMessage?: string;
}

export enum PayProcessStatus {
  grantIn = '发放中',
  pendingRelease= "待发放",
  alreadyIssued= "已发放"
}

export interface ProjectPayProcess {
  amount: number;
  amount_paid: number;
  amount_paying: number;
  bankno__num: null;
  create_time: string;
  id: number;
  modify_time: string;
  project_bill__month: string;
  project_bill__project__name: string;
  project_bill__project_id: number;
  project_bill_id: number;
  status: string;
}

//projectPayProcessList 工程工资发放单 
export interface ProjectPayProcessListResponse {
  project_pay_process: ProjectPayProcess[]
  count: number;
  errorMessage?: string;
}

/*==========================================Over time model====================================================*/

export interface WorkerContract {
  worker__employee__realname: string;
  id: number;
  team__name: string;
}

export interface Overtime {
  attachment: string;
  contracts: WorkerContract[];
  day: string;
  finish: string;
  id: number;
  reason: string;
  request__status: string;
  request_id: number;
  start: string;
  type: string;
}

// WorkOvertimeRecordList
export interface WorkOvertimeRecordListResponse {
  count: number;
  work_overtimes: Overtime[];
  errorMessage?: string;
}

/*==========================================Work Piece model====================================================*/

export interface WorkPieceFinish {
  comment: string;
  finish_date: string;
  id: number;
  num: number;
  quality_percent: number;
  request_id: number;
  workpieces__contract__worker__employee__realname: string;
  workpieces__contract__worker_id: number;
  workpieces_id: number;
}

export interface WorkPiece {
  contract__worker__employee__realname: string;
  contract__worker_id: number;
  contract_id: number;
  id: number;
  location: string;
  name: string;
  num: number;
  pay_mount: number;
  standard: string;
}

// WorkPieceList
export interface WorkPieceListResponse {
  work_piece_finish_flow: WorkPieceFinish[];
  work_piece_pay: WorkPiece[];
  errorMessage?: string;
}

/*============================================Launch model==================================================*/

export interface ProcessCreateResponse {
  
}

export interface MultiProcessCreateResponse {

}

export interface TaskUpdateResponse {

}

/*=================================================Statistics model==================================================*/

export interface AttendanceStatus {
  amend_count: number;
  confirm_count: number;
  unconfirm_count: number;
}

export interface AttendanceConfirmStatus {
  [date: string]: AttendanceStatus;
}

export interface AttendanceStatistics {
  confirm_status: AttendanceConfirmStatus;
  team_id: number;
  team_name: string;
}

//attendResultTeamStatList
export interface AttendanceResultTeamStatListResponse {
  attend_result_team_stat_list: AttendanceStatistics[];
  errorMessage?: string;
} 

export interface WorkFlowAggregation {
  process_id__count: number;
  process_id: string;
}

//requestAggregation
export interface RequestAggregationResponse {
  request_aggregation: WorkFlowAggregation[];
  errorMessage?: string;
}

/*========================================================================================================*/


//search worker
export interface WorkerResponse {
  age: number;
  cer_status: number;
  code: number;
  company__name: string;
  curraddr__city: string;
  curraddr__dist: string;
  curraddr__province: string;
  realname: string;
  sex: string;
  user__username: string;
  user_id: number;
  userpersonal_idnum: string;
}

export type ErrorResponse = LoginResponse
  | PhoneVerCodeResponse
  | RegisterResponse
  | ResetPasswordResponse
  | CertificateResponse
  | TeamListResponse
  | ProjectListResponse
  | WorkerContractListResponse
  | WorkTypeListResponse
  | AttendanceResultListResponse
  | AttendanceInstantListResponse
  | PayBillListResponse
  | WorkOvertimeRecordListResponse
  | WorkPieceListResponse
  | RequestAggregationResponse
  | AttendanceResultTeamStatListResponse
  | ProcessCreateResponse
  | MultiProcessCreateResponse
  | TaskUpdateResponse;
