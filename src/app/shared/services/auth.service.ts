import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService,
    private user: UserService,
    private database: AngularFireDatabase) { 
    this.user$ = afAuth.authState;
  }

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const data = await this.afAuth.auth.signInWithPopup(provider);
    this.user.save(data.user);
  }
  logout(){
    this.afAuth.auth.signOut()
  }

  
  get appUser$(): Observable<AppUser> {  
    return this.user$.pipe(
      switchMap(user => {
        if(user) return this.userService.get(user.uid)
        return of(null);
      })
    )
  }
  
}
