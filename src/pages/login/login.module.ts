import {LoginPage} from './login';
import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from '@ngx-translate/core';
import {LoginService} from '../../serveices/business/login-service';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {LoginEffect} from '../../effects/login-effect';
import {Command} from '../../serveices/api/command';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild(),
    EffectsModule.forRoot([LoginEffect]),
    ComponentsModule
  ],
  exports: [
    LoginPage
  ],
  providers: [
    LoginService,
    Command
  ]
})

export class LoginPageModule {
}
