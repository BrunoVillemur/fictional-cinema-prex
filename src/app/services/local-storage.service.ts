import { Movie, User } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _storage: Storage | null = null;
  private users: User[] = [];

  constructor(private storage: Storage) {
    this.init();
    this.getUsers();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //session

  session(user: User) {
    this.storage.set('UserSession', user.email);
  }

  deleteSession() {
    this.storage.remove('UserSession');
  }
  async getEmailUserSession() {
    const email: string = await this.storage.get('UserSession');
    return email;
  }

  // users

  async saveUser(user: User) {
    const exist = this.users.find((item) => item.email === user.email); // get the users with the specified email
    if (exist) {
      // already registered
      return false;
    } else {
      this.users = [user, ...this.users];
      this.storage.set('UsersCinema', this.users);
      return true;
    }
  }

  async getUsers() {
    const users = await this.storage.get('UsersCinema');

    if (users) {
      this.users = users;
    }
  }

  async getUser(email: string) {
    const exist = this.users.find((item) => item.email === email);
    if (exist) {
      const user: User = exist;
      return user;
    } else {
      console.log(exist);
      return exist;
    }
  }

  async changeUserPicture(email: string, image: string) {
    const user = this.users.find((item) => item.email === email);
    user.img = image;
    this.storage.set('UsersCinema', this.users);
  }

  // Movies

  async getUserMovies(email: string) {
    const user = this.users.find((item) => item.email === email);
    const movies: Movie[] = user.movies;
    return movies;
  }

  async editUserMovie(email: string, movie: Movie) {
    const user = this.users.find((item) => item.email === email);
    user.movies[movie.id] = movie;
    this.storage.set('UsersCinema', this.users);
    return movie;
  }
  async deleteUserMovie(email: string, movieDelete: Movie) {
    const user = this.users.find((item) => item.email === email);
    const movies: Movie[] = user.movies.filter(
      (movie) => movie.id != movieDelete.id
    );
    for (let index = 0; index < movies.length; index++) {
      movies[index].id = index;
    }
    user.movies = movies;
    this.storage.set('UsersCinema', this.users);
  }
  async addUserMovie(email: string, movieAdd: Movie) {
    const user = this.users.find((item) => item.email === email);
    movieAdd.id = user.movies.length;
    user.movies = [...user.movies, movieAdd];
    this.storage.set('UsersCinema', this.users);
  }

  // Charge Avengers, illustrative

  avengerMovies() {
    const movies: Movie[] = [];
    for (let index = 0; index < 8; index++) {
      let movie: Movie = {
        id: index,
        Titulo: 'The Avengers',
        Descripcion:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id neque dolore odio tempora sequi. Debitis alias quod.',
        image: '/assets/img/poster.jpg',
        valoration: [0, 0, 0, 0, 0],
      };
      movies.push(movie);
    }
    return movies;
  }
}
