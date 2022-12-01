import { LocationWeather } from './location-weather';

export interface User {
  id: string;
  email: string;
  password: string;
  favorites: LocationWeather[];
}
