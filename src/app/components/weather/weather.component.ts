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
export class WeatherComponent implements OnInit {
  isSearchingByName = true;
  searchForm!: FormGroup;
  loading: boolean = false;
  subscription!: Promise<void>;
  results!: any;

  error_msg = {
    name: [
      {
        type: 'required',
        message: 'Name of location is required.',
      },
      {
        type: 'minLength',
        message: 'Please enter at least 2 characters.',
      },
    ],
    zipAndCountry: [
      {
        type: 'required',
        message: 'Zip code and country code separated by coma are required.',
      },
      {
        type: 'minLength',
        message: 'Please enter at least 2 characters.',
      },
    ],
  };

  constructor(
    private authService: AuthService,
    private weatherService: WeatherService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      zipAndCountry: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
    });

    this.switchValidationInputs();
  }

  switchSearchState(searchByName: boolean) {
    if (searchByName) {
      this.isSearchingByName = true;
    } else {
      this.isSearchingByName = false;
    }
    this.switchValidationInputs();
  }

  switchValidationInputs() {
    if (this.isSearchingByName) {
      this.searchForm.get('zipAndCountry')!.setErrors(null);
      this.searchForm.get('zipAndCountry')!.clearValidators();
      this.searchForm.get('zipAndCountry')!.updateValueAndValidity();

      this.searchForm
        .get('name')!
        .addValidators([Validators.required, Validators.minLength(2)]);
      this.searchForm.get('name')!.updateValueAndValidity();
    } else {
      this.searchForm.get('name')!.setErrors(null);
      this.searchForm.get('name')!.clearValidators();
      this.searchForm.get('name')!.updateValueAndValidity();

      this.searchForm
        .get('zipAndCountry')!
        .addValidators([Validators.required, Validators.minLength(2)]);
      this.searchForm.get('zipAndCountry')!.updateValueAndValidity();
    }
  }

  logout() {
    this.authService.signoutUser();
  }

  formSubmit(value: any): void {
    this.loading = true;

    if (this.isSearchingByName) {
      this.weatherService.getLatLonByName(value.name).subscribe({
        next: (res) => {
          this.results = res;
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      let values = value.zipAndCountry.split(',');
      this.weatherService.getLatLonByZipCode(values[0], values[1]).subscribe({
        next: (res) => {
          this.results = res;
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
    this.searchForm.reset();
  }
}
