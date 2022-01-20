import { AlertService } from './../../services/alert.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces/interfaces';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  image: string= '/assets/img/Placeholder_img_login.png'
  flag: boolean = false;
  movies: Movie[]=[];
  

  constructor(private modalCtrl: ModalController,
              private localStorageService: LocalStorageService,
              private router: Router,
              private alertService: AlertService) {
               }

  ngOnInit() {
    this.ionViewWillEnter()
  }


  ionViewWillEnter() {
    //I load all the movies that the user has in session
    this.localStorageService.getEmailUserSession().then((emailSession)=>{
      if(emailSession){
        this.localStorageService.getUserMovies(emailSession).then((movies)=>{
          this.movies = movies;
          this.localStorageService.getUser(emailSession).then((usar)=>{
            this.image = usar.img
            this.flag = true;
          })
        });
      }else{
        this.router.navigate(["login"]);
      }
    })
  }

  //I show the detail of the movie
  onClick(Movie:Movie){
    let navigationExtras: NavigationExtras = {
      state: { movie:Movie },
    };
    this.router.navigate(["modal-view-movie"], navigationExtras);
  }
  buttonLogOut(){
    this.alertService.presentAlert("Estás seguro que deseas salir?","","Cancelar","Aceptar").then((data)=>{
      if(data){
        this.localStorageService.deleteSession();
        this.router.navigate(["login"]);
      }
    })
  }
  buttonUser(){
    this.router.navigate(["user"]);
  }

}
