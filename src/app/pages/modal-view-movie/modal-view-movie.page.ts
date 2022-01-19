import { LocalStorageService } from './../../services/local-storage.service';
import { Movie } from 'src/app/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-view-movie',
  templateUrl: './modal-view-movie.page.html',
  styleUrls: ['./modal-view-movie.page.scss'],
})
export class ModalViewMoviePage implements OnInit {

  movie:Movie;
  edit:boolean =false;
  titleChange:String;
  descriptionChange:String;


  constructor(private router: Router,
              private localStorageService: LocalStorageService) { 
      this.movie = this.router.getCurrentNavigation().extras.state.movie;
  }

  ngOnInit() {
    this.titleChange=this.movie.Titulo;
    this.descriptionChange = this.movie.Descripcion;
  }

  buttonBack(){
    this.router.navigate(["movies"]);
  }

  buttonDelete(){
    this.localStorageService.deleteMovie(this.movie).then(()=>{
      this.router.navigate(["movies"]);
    })
  }
  buttonEdit(){
    if(this.edit === false){
      this.edit = true;
    }else{
      this.edit = false;
      const movie: Movie ={
        id: this.movie.id,
        Titulo: this.titleChange,
        Descripcion: this.descriptionChange,
        image: this.movie.image,
        valoration: this.movie.valoration,
      }
      this.localStorageService.editMovie(movie).then((data)=>{
        this.movie = data;
      })
    }
  }

}
