import { LocationWeather } from './location-weather';
import { Notification } from './notification';

export interface User {
  id: string;
  email: string;
  password: string;
  favorites: LocationWeather[];
  notifications: Notification[];
}
