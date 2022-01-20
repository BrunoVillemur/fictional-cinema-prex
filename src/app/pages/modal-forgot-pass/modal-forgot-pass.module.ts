import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalForgotPassPageRoutingModule } from './modal-forgot-pass-routing.module';

import { ModalForgotPassPage } from './modal-forgot-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalForgotPassPageRoutingModule
  ],
  declarations: [ModalForgotPassPage]
})
export class ModalForgotPassPageModule {}
