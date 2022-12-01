import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocationWeather } from '../interfaces/location-weather';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersFirebase!: AngularFirestoreCollection<User>;
  usersObservable!: Observable<User[]>;
  usersList!: User[];

  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  async uploadClient(formValue: any) {
    let user = { ...formValue };
    let newId = this.firestore.createId();
    user.id = newId;
    user.favorites = new Array<LocationWeather>();
    await this.firestore.collection('users').doc(newId).set(user);
  }

  createUsersObserver(user: User) {
    this.usersFirebase = this.firestore.collection<User>('users', (ref) => {
      return ref.where('id', '==', user.id);
    });
    this.usersObservable = this.usersFirebase.valueChanges();
    return this.usersObservable;
  }

  async getUsers() {
    let result: User;
    this.usersList = new Array<User>();
    let resRef = this.firestore.collection('users').ref;

    await resRef.get().then((res) =>
      res.forEach((resDoc) => {
        result = resDoc.data() as User;
        this.usersList.push(result);
      })
    );
  }

  getUserByMail(email: string) {
    return this.firestore
      .collection('users', (ref) => ref.where('email', '==', email))
      .snapshotChanges();
  }

  addNewFavorite(user: User, locationWeather: LocationWeather) {
    let alreadyAdded = user.favorites.findIndex(
      (location) => location.id === locationWeather.id
    );
    if (alreadyAdded < 0) {
      user.favorites.push(locationWeather);
      let userToUpdate = this.firestore.collection('users').doc(user.id);
      userToUpdate
        .update({
          favorites: user.favorites,
        })
        .then(() => {
          this.toastr.success(
            `${locationWeather.name} was added to favorites`,
            'Nice!'
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.toastr.error(
        `${locationWeather.name} is already in your favorites!`,
        'Error!'
      );
    }
  }

  delteFavorite(user: User, locationWeather: LocationWeather) {
    let index = user.favorites.findIndex(
      (location) => location.id === locationWeather.id
    );

    if (index > -1) {
      user.favorites.splice(index, 1);
      let userToUpdate = this.firestore.collection('users').doc(user.id);
      userToUpdate
        .update({
          favorites: user.favorites,
        })
        .then(() => {
          this.toastr.success(
            `${locationWeather.name} was deleted of your favorites`,
            'Nice!'
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.toastr.error(
        `${locationWeather.name} is not in your favorites!`,
        'Error!'
      );
    }
  }
}
