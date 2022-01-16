import { CustomToastService } from './../../services/custom-toast.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  imglogin: string = '/assets/img/Placeholder_img_login.png';

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';

  constructor(public Toast:CustomToastService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onClick(){
    console.log("Intentar iniciar seción")
    this.Toast.presentToast('User or Password Invalid','danger','top');
  }

  togglePasswordMode() {
    //cambiar tipo input
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    //obtener el input
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    //obtener el indice de la posición del texto actual en el input
    const inputSelection = nativeEl.selectionStart;
    //ejecuto el focus al input
    nativeEl.focus();
    //espero un milisegundo y actualizo la posición del indice del texto
    setTimeout(() => {
       nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

  
  
}
