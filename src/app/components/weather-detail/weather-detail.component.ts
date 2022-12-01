import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { LocationInformation } from 'src/app/interfaces/country-information';
import { LocationWeather } from 'src/app/interfaces/location-weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css'],
})
export class WeatherDetailComponent implements OnChanges {
  @Input() locationInformation!: LocationInformation;
  @Output() searchAgainEvent = new EventEmitter<undefined>();

  locationWeather!: LocationWeather | any;

  constructor(private weatherService: WeatherService) {
    this.locationWeather = {
      weather: [
        {
          main: '',
          description: '',
        },
      ],
      main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
      },
      sys: {
        country: '',
      },
      name: '',
    };
  }

  ngOnChanges() {
    if (
      this.locationInformation !== undefined &&
      this.locationInformation !== null
    ) {
      this.weatherService
        .getWeatherByLatLon(
          this.locationInformation.lat,
          this.locationInformation.lon
        )
        .subscribe({
          next: (res) => {
            this.locationWeather = res;
            console.log(this.locationWeather);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  searchAgain() {
    this.searchAgainEvent.emit(undefined);
  }
}
