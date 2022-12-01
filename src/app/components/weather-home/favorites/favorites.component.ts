import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocationInformation } from 'src/app/interfaces/country-information';
import { LocationWeather } from 'src/app/interfaces/location-weather';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { CreateNotificationModalComponent } from '../../weather-notifications/create-notification-modal/create-notification-modal.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  subscription: any;
  userFavorites!: any;
  user!: any;
  @Input() visible!: boolean;
  @Output() checkCurrentEvent = new EventEmitter<LocationInformation>();

  constructor(
    private usersService: UserService,
    private authService: AuthService,
    private matDialog: MatDialog
  ) {
    this.generateInitialData();
  }

  checkFavorites(): void {
    this.subscription = this.usersService
      .createUsersObserver(this.authService.userLoggedIn)
      .subscribe({
        next: (arr) => {
          this.generateInitialData();
          let aux;
          aux = arr.map(function (esp, index) {
            return esp;
          });
          aux[0].favorites.forEach((fav) => {
            this.user.favorites.push(fav);
          });
          this.deleteRepetadFavorites();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  stopSubscription() {
    if (this.subscription !== null && this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  generateInitialData() {
    this.user = {};
    this.user.favorites = new Array<any>();
    this.user.favorites.push({
      name: '',
      sys: {
        country: '',
      },
    });
  }

  deleteRepetadFavorites() {
    this.user.favorites = this.user.favorites.filter((fav: any) => {
      if (fav.name !== '') {
        return fav;
      }
    });
    this.user.favorites = this.user.favorites.filter(
      (value: any, index: number, self: any) =>
        index === self.findIndex((fav: any) => fav.id === value.id)
    );
  }

  checkCurrentWeather(location: any) {
    let locationInformation = {
      lat: 0,
      lon: 0,
    } as LocationInformation;
    locationInformation.lat = location.coord.lat;
    locationInformation.lon = location.coord.lon;

    this.checkCurrentEvent.emit(locationInformation);
  }

  delete(location: LocationWeather) {
    this.usersService.delteFavorite(this.authService.userLoggedIn, location);
  }

  openCreateCheckModal(location: LocationWeather) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      location: location,
    };

    this.matDialog.open(CreateNotificationModalComponent, dialogConfig);
  }
}
