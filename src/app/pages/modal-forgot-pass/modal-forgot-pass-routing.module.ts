import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalForgotPassPage } from './modal-forgot-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ModalForgotPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalForgotPassPageRoutingModule {}
