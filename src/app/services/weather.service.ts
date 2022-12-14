import { Injectable } from '@angular/core';
import { WEATHER_API_KEY } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = WEATHER_API_KEY;
  private geoCodingURIByName = `https://api.openweathermap.org/geo/1.0/direct?appid=${this.apiKey}&limit=4`;
  private geoCodingURIByZipCode = `https://api.openweathermap.org/geo/1.0/zip?appid=${this.apiKey}`;
  private weatherURI = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}`;

  constructor(private httpClient: HttpClient) {}

  getLatLonByName(name: string) {
    return this.httpClient.get(`${this.geoCodingURIByName}&q=${name}`);
  }

  getLatLonByZipCode(zipCode: string, countryCode: string) {
    return this.httpClient.get(
      `${this.geoCodingURIByZipCode}&zip=${zipCode},${countryCode}`
    );
  }

  getWeatherByLatLon(lat: number, lon: number) {
    return this.httpClient.get(
      `${this.weatherURI}&lat=${lat.toString()}&lon=${lon.toString()}`
    );
  }
}
