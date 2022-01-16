import { CustomToastService } from './../../services/custom-toast.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { User } from './../../interfaces/interfaces';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerImg: String = '/assets/img/register-img.png'
  
  registerForm = this.formBuilder.group({
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
    user: [
      "",
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.maxLength(50),
        Validators.minLength(3),
      ],
    ],
  });

  


  constructor(private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService,
              private customToastService: CustomToastService,
              private router: Router
             ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return false;
    } else {
      const userRegister:User = {
        email: this.registerForm.get("email")["value"],
        userName: this.registerForm.get("user")["value"],
        password: this.registerForm.get("password")["value"],
        img: '/assets/img/Placeholder_img_login.png',
      };
      this.localStorageService.saveUser(userRegister).then((data)=>{
        if(data){
          this.router.navigate(["login"])
        }else{
          this.customToastService.presentToast("El Email ya está Registrado","danger","top");
        }
      });
    }
  }
  
}
