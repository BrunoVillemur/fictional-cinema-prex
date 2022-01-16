import { User } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _storage: Storage | null = null;
  private users: User[]=[];

  
  constructor(private storage: Storage) {
    this.init();
    this.getUsers();
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
}
