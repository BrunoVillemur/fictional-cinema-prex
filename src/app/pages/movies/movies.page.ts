import { LocalStorageService } from './../../services/local-storage.service';
import { ModalAddMoviePage } from './../modal-add-movie/modal-add-movie.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  image: string='/assets/img/poster.jpg'
  movies:Movie[]=[];

  constructor(private modalCtrl: ModalController,
              private localStorageService: LocalStorageService) {
               }

  ngOnInit() {
    this.localStorageService.returnMovies().then((movies)=>{
      console.log(movies)
      this.movies = movies;
    });
  }

  ionViewDidEnter() {
    this.localStorageService.returnMovies().then((movies)=>{
      console.log(movies)
      this.movies = movies;
    });
  }

  onClick(){

  }

}
