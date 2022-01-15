import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerImg: String = '/assets/img/register-img.png'
  loginForm = this.formBuilder.group({
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$"),

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

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginForm.get("user")["value"])
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
