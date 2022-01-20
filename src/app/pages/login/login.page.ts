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
              private router: Router) {
                }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    //session
    this.localStorageService.getEmailUserSession().then((emailSession)=>{
      if(emailSession){
        this.router.navigate(["movies"])
      }
    })
  }


  onClick(){
    const email = this.loginForm.get("email")["value"];
    const password = this.loginForm.get("password")["value"]
    
    // login
    this.localStorageService.getUser(email).then((user)=>{
      if(user === undefined){
        this.Toast.presentToast('Email no válido','danger','top');
      }else{
        if(user.password === password){
          this.localStorageService.session(user);
          this.router.navigate(["movies"])
        }else{
          this.Toast.presentToast('Contraseña Incorrecta','danger','top');
        }
      }
    })
  }

  togglePasswordMode() {
    //change input type
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    //get input
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    //get the index of the current text position in the input
    const inputSelection = nativeEl.selectionStart;
    //I execute the focus to the input
    nativeEl.focus();
    //wait a millisecond and update the position of the text index
    setTimeout(() => {
       nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

  // modal ForgotPass
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ModalForgotPassPage,
      cssClass: "my-custom-class",
      componentProps: {
      },
    });
    await modal.present();
  }
  
  
}
