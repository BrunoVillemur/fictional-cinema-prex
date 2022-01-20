import { AlertService } from './../../services/alert.service';
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
  movie: Movie;
  edit: boolean = false;
  titleChange: String;
  descriptionChange: String;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private alertService: AlertService
  ) {
    // I load the last movie from the movies page
    this.movie = this.router.getCurrentNavigation().extras.state.movie;
  }

  ngOnInit() {
    this.movie = this.router.getCurrentNavigation().extras.state.movie;
    if (this.movie) {
      this.titleChange = this.movie.Titulo;
      this.descriptionChange = this.movie.Descripcion;
    } else {
      this.router.navigate(['login']);
    }
  }

  buttonBack() {
    this.router.navigate(['movies']);
  }

  buttonDelete() {
    this.localStorageService.getEmailUserSession().then((email) => {
      this.localStorageService.deleteUserMovie(email, this.movie);
      this.router.navigate(['movies']);
    });
  }
  buttonEdit() {
    if (this.edit === false) {
      this.edit = true;
    } else {
      this.edit = false;
      const movie: Movie = {
        id: this.movie.id,
        Titulo: this.titleChange,
        Descripcion: this.descriptionChange,
        image: this.movie.image,
        valoration: this.movie.valoration,
      };
      this.localStorageService.getEmailUserSession().then((email) => {
        this.localStorageService.editUserMovie(email, movie).then((movie) => {
          this.movie = movie;
        });
      });
    }
  }

  calification(StarPosition) {
    const movie: Movie = {
      id: this.movie.id,
      Titulo: this.titleChange,
      Descripcion: this.descriptionChange,
      image: this.movie.image,
      valoration: this.movie.valoration,
    };

    switch (StarPosition) {
      case 0:
        this.alertService
          .presentAlert(
            'Valoraras la pelicula con 1 estrellas',
            '',
            'Cancelar',
            'Aceptar'
          )
          .then((data) => {
            if (data) {
              movie.valoration = [1, 0, 0, 0, 0];
              this.localStorageService.getEmailUserSession().then((email) => {
                this.localStorageService
                  .editUserMovie(email, movie)
                  .then((movie) => {
                    this.movie = movie;
                  });
              });
            }
          });
        break;
      case 1:
        this.alertService
          .presentAlert(
            'Valoraras la pelicula con 2 estrellas',
            '',
            'Cancelar',
            'Aceptar'
          )
          .then((data) => {
            if (data) {
              movie.valoration = [1, 1, 0, 0, 0];
              this.localStorageService.getEmailUserSession().then((email) => {
                this.localStorageService
                  .editUserMovie(email, movie)
                  .then((movie) => {
                    this.movie = movie;
                  });
              });
            }
          });
        break;
      case 2:
        this.alertService
          .presentAlert(
            'Valoraras la pelicula con 3 estrellas',
            '',
            'Cancelar',
            'Aceptar'
          )
          .then((data) => {
            if (data) {
              movie.valoration = [1, 1, 1, 0, 0];
              this.localStorageService.getEmailUserSession().then((email) => {
                this.localStorageService
                  .editUserMovie(email, movie)
                  .then((movie) => {
                    this.movie = movie;
                  });
              });
            }
          });
        break;
      case 3:
        this.alertService
          .presentAlert(
            'Valoraras la pelicula con 4 estrellas',
            '',
            'Cancelar',
            'Aceptar'
          )
          .then((data) => {
            if (data) {
              movie.valoration = [1, 1, 1, 1, 0];
              this.localStorageService.getEmailUserSession().then((email) => {
                this.localStorageService
                  .editUserMovie(email, movie)
                  .then((movie) => {
                    this.movie = movie;
                  });
              });
            }
          });
        console.log(this.movie.valoration[StarPosition]);
        break;
      case 4:
        this.alertService
          .presentAlert(
            'Valoraras la pelicula con 5 estrellas',
            '',
            'Cancelar',
            'Aceptar'
          )
          .then((data) => {
            if (data) {
              movie.valoration = [1, 1, 1, 1, 1];
              this.localStorageService.getEmailUserSession().then((email) => {
                this.localStorageService
                  .editUserMovie(email, movie)
                  .then((movie) => {
                    this.movie = movie;
                  });
              });
            }
          });
        break;
    }
  }
}
