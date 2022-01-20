import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  presentAlert(header, message, cancelText, acceptText) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve(false);
            },
          },
          {
            text: acceptText,
            handler: (ok) => {
              resolve(true);
            },
          },
        ],
      });
      alert.present();
    });
  }
}
