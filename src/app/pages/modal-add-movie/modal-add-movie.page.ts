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
  flag:boolean = false;

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
    // Active user validation
    this.localStorageService.getEmailUserSession().then((emailSession)=>{
      if(emailSession){this.flag = true;}else{this.router.navigate(["login"])}
    });
  }

  onClick(){
    const movie: Movie={
      id: null,
      Titulo: this.addMovieForm.get("title")["value"],
      Descripcion: this.addMovieForm.get("description")["value"],
      image: 'https://dummyimage.com/400x540/fff/aaa', //Se podría configurar un servicio y traerlo desde una api
      valoration: [0,0,0,0,0],
    };

    this.localStorageService.getEmailUserSession().then((email)=>{
      this.localStorageService.addUserMovie(email,movie);
      this.router.navigate(["movies"])
    })
  }

  buttonBack(){
    this.router.navigate(["movies"])
  }

}
