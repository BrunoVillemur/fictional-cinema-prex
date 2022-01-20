import { User } from './../../interfaces/interfaces';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  image = ['/assets/img/avatars/monster1.png', '/assets/img/avatars/monster2.png',
           '/assets/img/avatars/monster3.png', '/assets/img/avatars/monster4.png',
           '/assets/img/avatars/monster5.png', '/assets/img/avatars/monster6.png',
           '/assets/img/avatars/monster7.png', '/assets/img/avatars/monster8.png',
           '/assets/img/avatars/monster9.png', '/assets/img/avatars/monster10.png',
           '/assets/img/avatars/monster11.png','/assets/img/avatars/monster12.png',]
  user = {
    email: null,
    userName: null,
    img: null,
  };
  flag: boolean = false;

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
  ) {  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.localStorageService.getEmailUserSession().then((emailSession)=>{
      if(emailSession){
        this.flag=true;
        this.localStorageService.getUser(emailSession).then((user)=>{
          this.user.email = user.email;
          this.user.img = user.img;
          this.user.userName = user.userName;
        })
      }else{this.router.navigate(["login"]);}
    })
  }

  buttonBack(){
    this.router.navigate(["movies"]);
  }

  //change profile picture in session
  onClick(image){
    this.localStorageService.getEmailUserSession().then((emailSession)=>{
      this.localStorageService.changeUserPicture(emailSession,image).then(()=>{
        this.user.img=image;
      })
    })
  }

}
