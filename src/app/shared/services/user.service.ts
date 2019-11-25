import { AppUser } from '../models/app-user';
import { AngularFireDatabaseModule, AngularFireDatabase,AngularFireObject  } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }


  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }), { merge: true }
  }


  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
