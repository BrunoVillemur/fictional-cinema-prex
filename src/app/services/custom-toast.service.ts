import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CustomToastService {
  constructor(public toastController: ToastController) {}

  async presentToast(message, color, position) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000,
      position: position,
    });
    toast.present();
  }
}
