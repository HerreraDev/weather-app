import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WeatherService } from 'src/app/services/weather.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocationInformation } from 'src/app/interfaces/country-information';

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

  constructor(private authService: AuthService) {
    this.results = new Array<any>();
  }

  logout() {
    this.authService.signoutUser();
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
}
