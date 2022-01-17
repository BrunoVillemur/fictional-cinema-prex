import { User } from './../../interfaces/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from './../../services/local-storage.service';
import { ModalForgotPassPage } from './../modal-forgot-pass/modal-forgot-pass.page';
import { CustomToastService } from './../../services/custom-toast.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


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

  loginForm = this.formBuilder.group({
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),

      ],
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ],
    ],
    
  });

  constructor(private formBuilder: FormBuilder,
              public Toast:CustomToastService, 
              private modalCtrl: ModalController,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
  }

  onClick(){
    const email = this.loginForm.get("email")["value"];
    const password = this.loginForm.get("password")["value"]
    
    // console.log("Intentar iniciar seción")
    // this.Toast.presentToast('User or Password Invalid','danger','top');
    this.localStorageService.getUser(email).then((user)=>{
      if(user === false){
        this.Toast.presentToast('Email no válido','danger','top');
      }else{
        if(user.password === password){
          this.router.navigate(["movies"])
        }else{
          this.Toast.presentToast('Contraseña Incorrecta','danger','top');
        }
      }
    })
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

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ModalForgotPassPage,
      cssClass: "my-custom-class",
      componentProps: {
        nombre: "Bruno",
        pais: "Argentina",
      },
    });
    await modal.present();
  }
  
  
}
