import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/administrative/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherComponent } from './components/weather-home/weather/weather.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { LocationDetailComponent } from './components/weather-home/location-detail/location-detail.component';
import { SearchComponent } from './components/weather-home/search/search.component';
import { WeatherDetailComponent } from './components/weather-home/weather-detail/weather-detail.component';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { FavoritesComponent } from './components/weather-home/favorites/favorites.component';
import { NotificationsComponent } from './components/weather-notifications/notifications/notifications.component';
import { CreateNotificationModalComponent } from './components/weather-notifications/create-notification-modal/create-notification-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WeatherComponent,
    LocationDetailComponent,
    SearchComponent,
    WeatherDetailComponent,
    TemperaturePipe,
    FavoritesComponent,
    NotificationsComponent,
    CreateNotificationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
