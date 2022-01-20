import { CustomToastService } from './../../services/custom-toast.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-forgot-pass',
  templateUrl: './modal-forgot-pass.page.html',
  styleUrls: ['./modal-forgot-pass.page.scss'],
})
export class ModalForgotPassPage implements OnInit {
  imageMoster: String = '/assets/img/monster-forgot-pass.png';

  constructor(
    public Toast: CustomToastService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  onClick() {
    this.Toast.presentToast(
      'Se ha enviado el mail de recuperación',
      'medium',
      'bottom'
    );
    setTimeout(() => {
      this.dismissModal();
    }, 2000);
  }
}
