import { Movie, User } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _storage: Storage | null = null;
  private users: User[]=[];
  private movies: Movie[] =[];

  
  constructor(private storage: Storage) {
    this.init();
    this.getUsers();
    this.getMovies();
   }
  
   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

   async saveUser(user:User){
      const exist = this.users.find(item => item.email === user.email)
      if(exist){
        return false;
      }else{
        this.users = [user, ...this.users];
        this.storage.set('UsersCinema',this.users);
        return true;
      }
   }

   async getUsers() {
    const users = await this.storage.get("UsersCinema");
    
    if (users) {
      this.users = users;
    }
  }
  async getUser(email:string){
    const exist = this.users.find(item => item.email === email);
    if(exist){
      return exist;
    }else{
      return false;
    }
  }

  async saveMovie(movie:Movie){
      movie.id = this.movies.length; //Asigno ID
      this.movies = [...this.movies, movie,];
      this.storage.set('MovieCinema',this.movies);
 }

 async getMovies() {
  const movies = await this.storage.get("MovieCinema");
  
  if (movies) {
    this.movies = movies;
  }
}
  async returnMovies(){
    return await this.storage.get("MovieCinema");
  }

  async deleteMovie(movieDelete:Movie){
    this.movies = this.movies.filter((movie) => movie.id != movieDelete.id);
    this.storage.set("MovieCinema", this.movies);
  }

  async editMovie(movie:Movie){
    this.movies[movie.id]=movie;
    this.storage.set("MovieCinema", this.movies);
    return this.movies[movie.id];
  }

  //Cargar The Avengers, solo muestra

  avengerMovies(){
    for (let index = 0; index < 8; index++) {
      let movie: Movie={
        id: null,
        Titulo: 'The Avengers',
        Descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id neque dolore odio tempora sequi. Debitis alias quod.',
        image: '/assets/img/poster.jpg',
        valoration: [0,0,0,0],
      }
    this.saveMovie(movie);  
    }
  }
}
