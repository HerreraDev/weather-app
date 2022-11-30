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

  constructor(
    private authService: AuthService,
    private weatherService: WeatherService
  ) {
    this.results = new Array<any>();
  }

  logout() {
    this.authService.signoutUser();
  }

  itemSelected(value: LocationInformation) {
    this.weatherService.getWeatherByLatLon(value.lat, value.lon).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  searchResult(value: LocationInformation[]) {
    this.results = [...value];
  }

  searchStateChanged(state: string) {
    this.searchState = state;
  }
}
