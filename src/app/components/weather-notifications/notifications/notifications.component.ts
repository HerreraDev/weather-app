import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/interfaces/notification';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  userNotifications!: Notification[];
  subscription: any;
  user!: any;

  constructor(
    private authService: AuthService,
    private usersService: UserService
  ) {
    this.userNotifications = this.authService.userLoggedIn.notifications;
    this.createNotificationsSubcription();
  }

  createNotificationsSubcription() {
    this.subscription = this.usersService
      .createUsersObserver(this.authService.userLoggedIn)
      .subscribe({
        next: (arr) => {
          let aux;
          aux = arr.map(function (esp, index) {
            return esp;
          });
          aux[0].notifications.forEach((fav) => {
            this.userNotifications.push(fav);
          });
          this.deleteRepetadNotifications();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteRepetadNotifications() {
    this.userNotifications = this.userNotifications.filter(
      (value: any, index: number, self: any) =>
        index === self.findIndex((notif: any) => notif.id === value.id)
    );
  }

  stopSubscription() {
    if (this.subscription !== null && this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  deleteNotification(notification: Notification) {
    this.usersService.deleteNotification(
      this.authService.userLoggedIn,
      notification
    );
    let index = this.userNotifications.findIndex(
      (notif) => notif.id === notification.id
    );
    this.userNotifications.splice(index, 1);
  }

  ngOnInit(): void {
    console.log(this.userNotifications);
  }
}
