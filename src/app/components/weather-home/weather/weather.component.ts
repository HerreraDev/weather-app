import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WeatherService } from 'src/app/services/weather.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocationInformation } from 'src/app/interfaces/country-information';
import { FavoritesComponent } from '../favorites/favorites.component';
import { NotificationsComponent } from '../../weather-notifications/notifications/notifications.component';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  loading: boolean = false;
  subscription!: Promise<void>;
  results!: any;
  searchState = '¡Try searching something!';
  locationInformation!: LocationInformation | undefined;
  @ViewChild(FavoritesComponent) favoritesComponent!: FavoritesComponent;
  @ViewChild(NotificationsComponent)
  notificationComponent!: NotificationsComponent;

  showFavorites = false;
  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.results = new Array<any>();
  }

  check() {
    this.favoritesComponent.checkFavorites();
    this.showFavorites = !this.showFavorites;
  }

  logout() {
    this.authService.signoutUser();
    this.favoritesComponent.stopSubscription();
    this.notificationComponent.stopSubscription();
    this.notificationsService.stopMonitorization();
  }

  itemSelected(value: LocationInformation) {
    this.locationInformation = value;
  }

  searchAgain(value: undefined) {
    this.locationInformation = value;
  }

  searchResult(value: LocationInformation[]) {
    this.results = [...value];
    this.locationInformation = undefined;
  }

  searchStateChanged(state: string) {
    this.searchState = state;
  }

  searchFavoriteAgain(value: LocationInformation) {
    this.locationInformation = value;
  }
}
