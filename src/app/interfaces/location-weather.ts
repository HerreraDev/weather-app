export interface LocationWeather {
  weather: Weather;
  main: Main;
  sys: Sys;
  name: string;
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
