import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  async uploadClient(formValue: any) {
    let user = { ...formValue };
    let newId = this.firestore.createId();
    await this.firestore.collection('users').doc(newId).set(user);
  }
}
