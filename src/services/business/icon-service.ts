//region
import { Observable } from 'rxjs/Observable';
import { IconState } from '../../reducers/reducer/icons-reducer';
import { AppState, getIconsState } from '../../reducers/index-reducer';
import { createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AddIconsBarAction, AddBadgeAction } from '../../actions/action/icons-action';
import { Subscription } from 'rxjs/Subscription';
import { PermissionService } from '../config/permission-service';
import { CW, EME, LM, MM, PA, PM, PME, QW, SW, TL, UW } from '../config/character';
import * as pages from '../../pages/pages';
import { IconItem } from '../../interfaces/icon-interface';
//endregion

/**
 * @description These constants are icon names used in application.
 */
export const attendanceIcon = 'attendance';
export const payrollIcon = 'payroll';
export const organizationIcon = 'organization';
export const workerManagerIcon = 'worker-manager';
export const workPieceIcon = 'work-piece';
export const locationIcon = 'location';
export const trajectoryIcon = 'trajectory';
export const attendanceMachineIcon = 'attendance-machine';
export const locationCardIcon = 'location-card';
export const attendanceCardIcon = 'attendance-card';
export const attendanceConfirmIcon = 'attendance-confirm';
export const payrollAuditIcon = 'payroll-audit';
export const leaveIcon = 'leave';
export const overtimeIcon = 'overtime';
export const pieceAuditIcon = 'piece-audit';
export const modifyAttendanceIcon = 'modify-attendance';
export const workContractIcon = 'work-contract';
export const primeContractIcon = 'prime-contract';
export const subContractIcon = 'sub-contract';
export const modifyDutyIcon = 'modify-duty';
export const workContractModifyIcon = 'work-contract-modify';
export const myAuditedIcon = 'my-audited';
export const myLaunchIcon = 'my-launch';
export const myAttendanceIcon = 'my-attendance';
export const salaryIcon = 'salary';
export const bankCardIcon = 'bank-card';
export const certificateIcon = 'certificate';
export const applyIcon = 'apply';
export const personalInfoIcon = 'personal-info';
export const familyInfoIcon = 'family-info';
export const workInfoIcon = 'work-info';
export const educationInfoIcon = 'education-info';

/**
 * @description Icon badge's statistics field mapper.
 */
export const workFlowMap = new Map([
  [payrollAuditIcon, 'project_payflow_apply'],
  [leaveIcon, 'leave_apply'],
  [overtimeIcon, 'workovertime_apply'],
  [pieceAuditIcon, 'workpiece_finish'],
  [modifyAttendanceIcon, 'amend_worker_attend'],
  [workContractIcon, 'sign_worker_contract'],
  [primeContractIcon, 'prime_contract_time_change'],
  [subContractIcon, 'sub_contract_time_change'],
  [modifyDutyIcon, 'timeduty_apply'],
  [workContractModifyIcon, 'worker_contract_time_change']
]);

/* ================================================================Icon model START================================================================ */

//region
export const attendance: IconItem = {
  text: 'ATTENDANCE_CHAR',
  icon: attendanceIcon,
  color: 'primary',
  permission: {
    view: [PME, PM, LM],
    opt: [TL]
  },
  page: pages.attendancePage
};

export const payroll: IconItem = {
  text: 'PAYROLL',
  icon: payrollIcon,
  color: 'economics',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  },
  page: pages.projectBillPage
};

export const organization: IconItem = {
  text: 'ORGANIZATION',
  icon: organizationIcon,
  color: 'advanced',
  permission: {
    view: [PME, EME, MM, LM, TL, QW],
    opt: [PM]
  },
  page: pages.organizationPage
};

export const workerManager: IconItem = {
  text: 'WORKER_MANAGER',
  icon: workerManagerIcon,
  color: 'advanced',
  permission: {
    view: [PME, EME, MM, PM, CW, QW],
    opt: [LM, TL]
  },
  page: pages.membersPage
};

export const workPiece: IconItem = {
  text: 'WORK_PIECE',
  icon: workPieceIcon,
  color: 'piece',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW],
    opt: []
  },
  page: pages.workPiecePage
};

export const location: IconItem = {
  text: 'WORKER_LOCATION',
  icon: locationIcon,
  color: 'location',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  },
  page: ''
};

export const trajectory: IconItem = {
  text: 'WORKER_TRAJECTORY',
  icon: trajectoryIcon,
  color: 'location',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW],
    opt: []
  },
  page: ''
};

export const attendanceMachine: IconItem = {
  text: 'ATTENDANCE_MACHINE',
  icon: attendanceMachineIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, QW],
    opt: []
  },
  page: pages.attendanceMachinePage
};

export const locationCard: IconItem = {
  text: 'IC_LOCATION_CARD',
  icon: locationCardIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, LM, TL],
    opt: [PM]
  },
  page: pages.locationCardPage
};

export const attendanceCard: IconItem = {
  text: 'ATTENDANCE_CARD',
  icon: attendanceCardIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM]
  },
  page: pages.attendanceCardPage
};

export const attendanceConfirm: IconItem = {
  text: 'ATTENDANCE_CONFIRM',
  icon: attendanceConfirmIcon,
  color: 'primary',
  permission: {
    view: [PME, EME],
    opt: [TL]
  },
  page: pages.attendanceConfirmPage
};
export const payrollAudit: IconItem = {
  text: 'PAYROLL_AUDIT',
  icon: payrollAuditIcon,
  color: 'economics',
  permission: {
    view: [PME, EME, MM],
    opt: [PM, LM, TL]
  },
  page: ''
};
export const leave: IconItem = {
  text: 'LEAVE_APPLY',
  icon: leaveIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM],
    opt: [PM, LM]
  },
  page: ''
};
export const overtime: IconItem = {
  text: 'LEAVE_APPLY',
  icon: overtimeIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM]
  },
  page: ''
};
export const pieceAudit: IconItem = {
  text: 'PIECE_AUDIT',
  icon: pieceAuditIcon,
  color: 'piece',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM, QW]
  },
  page: ''
};
export const modifyAttendance: IconItem = {
  text: 'MODIFY_ATTENDANCE',
  icon: modifyAttendanceIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM, LM]
  },
  page: ''
};

export const workContract: IconItem = {
  text: 'WORK_CONTRACT',
  icon: workContractIcon,
  color: 'contract',
  permission: {
    view: [],
    opt: [PM, LM, TL, SW, UW]
  },
  page: ''
};

export const primeContract: IconItem = {
  text: 'PRIME_CONTRACT',
  icon: primeContractIcon,
  color: 'contract',
  permission: {
    view: [],
    opt: [PME, MM, PM]
  },
  page: ''
};

export const subContract: IconItem = {
  text: 'SUB_CONTRACT',
  icon: subContractIcon,
  color: 'contract',
  permission: {
    view: [],
    opt: [PME, MM, PM]
  },
  page: ''
};

export const modifyDuty: IconItem = {
  text: 'MODIFY_DUTY',
  icon: modifyDutyIcon,
  color: 'primary',
  permission: {
    view: [],
    opt: [PM, TL]
  },
  page: ''
};

export const workContractModify: IconItem = {
  text: 'MODIFY_WORK_CONTRACT',
  icon: workContractModifyIcon,
  color: 'contract',
  permission: {
    view: [],
    opt: [PM, LM]
  },
  page: ''
};

export const myAudited: IconItem = {
  text: 'MY_AUDIT',
  icon: myAuditedIcon,
  color: 'related',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW, SW, UW],
    opt: []
  },
  page: ''
};

export const myLaunch: IconItem = {
  text: 'MY_APPLY',
  icon: myLaunchIcon,
  color: 'related',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW],
    opt: []
  },
  page: ''
};

export const myAttendance: IconItem = {
  text: 'MY_ATTENDANCE',
  icon: myAttendanceIcon,
  color: 'primary',
  permission: {
    view: [SW],
    opt: []
  },
  page: pages.personalAttendancePage
};
export const salary: IconItem = {
  text: 'MY_SALARY',
  icon: salaryIcon,
  color: 'economics',
  permission: {
    view: [SW, UW],
    opt: []
  },
  page: pages.salaryPage 
};
export const bankCard: IconItem = {
  text: 'MY_BANK_CARD',
  icon: bankCardIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: []
  },
  page: ''
};
export const certificate: IconItem = {
  text: 'MY_CERTIFICATE',
  icon: certificateIcon,
  color: 'contract',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: []
  },
  page: ''
};

export const apply: IconItem = {
  text: 'LAUNCH_APPLY',
  icon: applyIcon,
  color: 'secondary',
  permission: {
    view: [],
    opt: [TL, PM]
  },
  page: ''
};

export const personalInfo: IconItem = {
  text: 'PERSONAL_INFO',
  icon: personalInfoIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: ''
};

export const familyInfo: IconItem = {
  text: 'FAMILY_INFO',
  icon: familyInfoIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: ''
};

export const workInfo: IconItem = {
  text: 'WORK_EXPERIENCE',
  icon: workInfoIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: ''
};

export const educationInfo: IconItem = {
  text: 'EDUCATION_EXPERIENCE',
  icon: educationInfoIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: ''
};
//endregion

/* ================================================================Icon model EDN================================================================= */

@Injectable()
export class IconService {

  subscriptions: Subscription[] = [];

  id: number;
  constructor(
    public store: Store<AppState>,
    public permission: PermissionService
  ) {
    this.id = Math.random();
  }

  getIcons(name: string, icons: IconItem[]): Observable<IconState[]> {
    const icons$ = Observable.from(icons);

    const permissionIcons$ = this.addPermissionToIcons(icons$);

    const subscription = this.addIcons(name, permissionIcons$);

    this.subscriptions.push(subscription);

    return this.selectIcons(name);
  }

  selectIcons(rootName: string): Observable<IconState[]> {
    return this.store.select(createSelector(getIconsState, this.select(rootName)))
  }

  getIcon(rootName: string, iconName: string): Observable<IconState> {
    return this.selectIcons(rootName)
      .mergeMap(icons => Observable.from(icons).filter(item => item.icon === iconName));
  }

  needBadge(icon: IconState): boolean {
    const { view, opt } = icon.permission;

    return opt || view;
  }

  addBadge(badge: Observable<number>, path: string[]): void {
    const subscription = badge.subscribe(count => {
      this.store.dispatch(new AddBadgeAction({ count, path }));
    });

    this.subscriptions.push(subscription);
  }

  private addPermissionToIcons(icons: Observable<IconItem>): Observable<IconState[]> {
    return this.permission
      .functionalPermissionValidate(icons.map(icon => icon.permission))
      .zip(icons, (permission, item) => {
        const { text, icon, color, page } = item;
        return { text, icon, color, page, permission };
      })
      .map(item => {
        const { view, opt } = item.permission;
        if (!view && !opt) item.color = '';
        return item;
      })
      .reduce((acc, cur) => {
        acc.push(cur);
        return acc;
      }, []);
  }

  private addIcons(name: string, icons: Observable<IconState[]>): Subscription {
    return icons.subscribe(icons => {
      const target = {};

      target[name] = icons;

      this.store.dispatch(new AddIconsBarAction(target));
    });
  }

  private select(name: string) {
    return state => state[name];
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
