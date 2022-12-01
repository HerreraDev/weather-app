import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  userLoggedIn!: User | any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private toast: ToastrService
  ) {}

  createUser(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            this.toast.success('Account successfully created!.', 'Welcome!', {
              positionClass: 'toast-top-center',
            });
            this.isLoggedIn = true;
            this.router.navigateByUrl('weather');
            this.userService.uploadClient(value);
            this.setLoggedInUser(value.email);
          },
          (err) => reject(err)
        );
    });
  }

  signinUser(value: any) {
    return this.fireAuth
      .signInWithEmailAndPassword(value.email, value.password)
      .then((result) => {
        this.isLoggedIn = true;
        this.router.navigateByUrl('weather');
        this.setLoggedInUser(value.email);
      })
      .catch((error) => {
        this.toast.error('Incorrect email or password, try again.', 'ERROR', {
          positionClass: 'toast-top-center',
        });
      });
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      this.angularFireAuth
        .signOut()
        .then(() => {
          this.router.navigateByUrl('login');
          this.isLoggedIn = false;
          this.userLoggedIn = {};
        })
        .catch(() => {
          reject();
        });
    });
  }

  userDetails() {
    return this.angularFireAuth.user;
  }

  setLoggedInUser(email: string) {
    this.userService.getUsers().then(() => {
      this.userService.usersList.forEach((user) => {
        if (user.email === email) {
          this.userLoggedIn = user;
        }
      });

      console.log(this.userLoggedIn);
    });
  }
}
