import { TimelineComponent, TimelineItemComponent, TimelineTimeComponent } from './timeline/timeline';
//region
import { SharedModule } from '../app/shared.modules';
import { NgModule } from '@angular/core';
import { ImageVerificationComponent } from './image-verification/image-verification';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CutDownComponent } from './cut-down/cut-down';
import { IonicModule } from 'ionic-angular';
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search';
import { TakePhotoComponent } from './take-photo/take-photo';
import { IconBarComponent } from './icon-bar/icon-bar';
import { ProjectListComponent } from './project-list/project-list';
import { CalendarComponent } from './calendar/calendar';
import { AttendanceTimeChartComponent } from './attendance-time-chart/attendance-time-chart';
import { AddTeamComponent } from './add-team/add-team';
import { BasicInformationComponent } from './basic-information/basic-information';
import { FamilyInformationComponent } from './family-information/family-information';
import { WorkExperienceComponent } from './work-experience/work-experience';
import { PlatformWorkExperienceComponent } from './platform-work-experience/platform-work-experience';
import { CertificationComponent } from './certification/certification';
import { PersonalIdComponent } from './personal-id/personal-id';
import { EducationComponent } from './education/education';
import { FaceImageComponent } from './face-image/face-image';
import { WorkPieceAxisComponent } from './work-piece-axis/work-piece-axis';
import { PieceCompleteChartComponent } from './piece-complete-chart/piece-complete-chart';
import { AddAttendanceCardComponent } from './add-attendance-card/add-attendance-card';
//endregion

@NgModule({
  declarations: [
    ImageVerificationComponent,
    CutDownComponent,
    FuzzySearchComponent,
    TakePhotoComponent,
    IconBarComponent,
    ProjectListComponent,
    CalendarComponent,
    AttendanceTimeChartComponent,
    AddTeamComponent,
    BasicInformationComponent,
    FamilyInformationComponent,
    WorkExperienceComponent,
    PlatformWorkExperienceComponent,
    CertificationComponent,
    PersonalIdComponent,
    EducationComponent,
    FaceImageComponent,
    WorkPieceAxisComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    PieceCompleteChartComponent,
    AddAttendanceCardComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    SharedModule,
  ],
  exports: [
    ImageVerificationComponent,
    CutDownComponent,
    FuzzySearchComponent,
    TakePhotoComponent,
    IconBarComponent,
    ProjectListComponent,
    CalendarComponent,
    AttendanceTimeChartComponent,
    AddTeamComponent,
    BasicInformationComponent,
    FamilyInformationComponent,
    WorkExperienceComponent,
    PlatformWorkExperienceComponent,
    CertificationComponent,
    PersonalIdComponent,
    EducationComponent,
    FaceImageComponent,
    WorkPieceAxisComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    PieceCompleteChartComponent,
    AddAttendanceCardComponent,
  ]
})
export class ComponentsModule {
}
