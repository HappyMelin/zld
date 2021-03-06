import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { PayBillService } from './../../services/business/pay-bill-service';
import { ChartService, ChartType } from './../../services/utils/chart-service';

export interface Salary {
    systemAttendanceAmount: number;
    manualAttendanceAmount: number;
    systemOvertimeAmount: number;
    manualOvertimeAmount: number;
    pieceAmount: number;
    attendanceAmount: number;
    overtimeAmount: number;
}

@IonicPage()
@Component({
    selector: 'page-salary-detail',
    templateUrl: 'salary-detail.html',
})
export class SalaryDetailPage implements BusinessPageModel {
    @ViewChild('salaryDetail') salaryDetail: ElementRef;

    yearMonth: string;

    totalAmount: number;

    subscriptions: Subscription[] = [];

    salary: Observable<Salary>;

    constructor(
        private navParams: NavParams,
        private payBill: PayBillService,
        private chart: ChartService,
        private translate: TranslateService
    ) {
        this.yearMonth = this.navParams.get('month');
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.salary = this.getSalary();
    }

    launch(): void {
        this.subscriptions = [
            this.getPayBillChart(),
            this.payBill.getPayBillList(Observable.of({ month: this.yearMonth })),
            this.payBill.handleError(),
        ];
    }

    getSalary(): Observable<Salary> {
        return this.payBill.getPayBillOfMonth().map(bill => {
            const systemAttendanceAmount = this.payBill.countSystemAttendanceAmount(bill);

            const manualAttendanceAmount = this.payBill.countManualAttendanceAmount(bill);

            const systemOvertimeAmount = this.payBill.countSystemOvertimeAmount(bill);

            const manualOvertimeAmount = this.payBill.countManualOvertimeAmount(bill);

            const pieceAmount = this.payBill.countPieceTotalAmount(bill);

            const attendanceAmount = systemAttendanceAmount + manualAttendanceAmount;

            const overtimeAmount = systemOvertimeAmount + manualOvertimeAmount;

            return { systemAttendanceAmount, manualAttendanceAmount, systemOvertimeAmount, manualOvertimeAmount, pieceAmount, attendanceAmount, overtimeAmount };
        });
    }

    getPayBillChart(): Subscription {
        return this.salary
            .withLatestFrom(
            this.translate.get(['SYSTEM_ATTENDANCE_SALARY', 'MANUAL_ATTENDANCE_SALARY', 'SYSTEM_OVERTIME_SALARY', 'MANUAL_OVERTIME_SALARY', 'WORK_PIECE_SALARY'])
                .map(res => [res.SYSTEM_ATTENDANCE_SALARY, res.MANUAL_ATTENDANCE_SALARY, res.SYSTEM_OVERTIME_SALARY, res.MANUAL_OVERTIME_SALARY, res.WORK_PIECE_SALARY])
            )
            .map(([salary, labels]) => {
                const { systemAttendanceAmount, manualAttendanceAmount, systemOvertimeAmount, manualOvertimeAmount, pieceAmount } = salary;

                const data = [systemAttendanceAmount, manualAttendanceAmount, systemOvertimeAmount, manualOvertimeAmount, pieceAmount];

                this.totalAmount = data.reduce((acc, cur) => acc + cur, 0);

                return this.chart.getPieChartData({ labels, data });
            })
            .subscribe(data => this.chart.getChart(this.salaryDetail.nativeElement, ChartType.pie, data));
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

}
