export interface LocationWeather {
  id: number;
  weather: Weather;
  main: Main;
  sys: Sys;
  name: string;
  coord: Coord;
}

interface Weather {
  main: string;
  description: string;
}

interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
}

interface Sys {
  country: string;
}

interface Coord {
  lat: number;
  lon: number;
}
