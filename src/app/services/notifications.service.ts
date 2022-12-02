import { Injectable } from '@angular/core';
import { interval, mergeMap } from 'rxjs';
import { AuthService } from './auth.service';
import { WeatherService } from './weather.service';
import { Notification } from '../interfaces/notification';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  auxNotification!: Notification;
  monitorization!: any;
  constructor(
    private weatherService: WeatherService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  startMonitorization() {
    let data = {
      main: {
        temp: 0,
      },
    };
    this.monitorization = interval(60 * 500).subscribe(() => {
      this.authService.userLoggedIn.notifications.forEach(
        (notif: Notification) => {
          this.weatherService
            .getWeatherByLatLon(notif.lat, notif.lon)
            .subscribe({
              next: (res: any) => {
                data = res;
                this.auxNotification = notif;
                this.checkNotification(data);
              },
              error: (error) => {
                console.log(error);
              },
            });
        }
      );
    });
  }

  getCondition(auxNotif: Notification) {
    let condition = -1;
    if (auxNotif.condition === 'more') {
      condition = 1;
    } else if (auxNotif.condition === 'equal') {
      condition = 0;
    }
    return condition;
  }

  transformDegrees(degreeKelvin: number) {
    let degreeF = 0;
    degreeF = parseFloat(((degreeKelvin - 273.15) * 1.8 + 32).toFixed(2));
    return degreeF;
  }

  stopMonitorization() {
    if (this.monitorization !== null && this.monitorization !== undefined) {
      this.monitorization.unsubscribe();
    }
  }

  checkNotification(data: any) {
    let condition = this.getCondition(this.auxNotification);
    let degreesF = this.transformDegrees(data.main.temp);
    switch (condition) {
      case -1:
        if (degreesF < this.auxNotification.temp) {
          this.showToastNotification();
        } else {
          console.log('');
        }
        break;
      case 0:
        if (this.auxNotification.temp === degreesF) {
          this.showToastNotification();
        }
        break;
      case 1:
        if (degreesF > this.auxNotification.temp) {
          this.showToastNotification();
        }
        break;
    }
  }

  showToastNotification() {
    this.toastr.info(
      `Right now ${this.auxNotification.city} is ${this.auxNotification.condition} than ${this.auxNotification.temp} ºF degrees`,
      '¡¡ALERT 🔔⚠️!!'
    );
  }
}
