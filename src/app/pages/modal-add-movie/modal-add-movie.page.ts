import { CustomToastService } from './../../services/custom-toast.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-add-movie',
  templateUrl: './modal-add-movie.page.html',
  styleUrls: ['./modal-add-movie.page.scss'],
})
export class ModalAddMoviePage implements OnInit {

  imageMovies: string = '/assets/img/movieAdd.png'

  addMovieForm = this.formBuilder.group({
    title: [
      "",
      [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(1),
      ],
    ],
    description: [
      "",
      [
        Validators.required,
        Validators.maxLength(90),
        Validators.minLength(3),
      ],
    ],
    
  });
  constructor(private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService,
              private router: Router,
              private customToastService: CustomToastService,) { }

  ngOnInit() {
  }

  onClick(){
    const movie: Movie={
      id: null,
      Titulo: this.addMovieForm.get("title")["value"],
      Descripcion: this.addMovieForm.get("description")["value"],
      image: 'https://dummyimage.com/400x540/fff/aaa', //Se podría configurar un servicio y traerlo desde una api
      valoration: 5,
    };
    this.localStorageService.saveMovie(movie).then(()=>{
        this.router.navigate(["movies"])
    });

  }

}
