import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocationInformation } from 'src/app/interfaces/country-information';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css'],
})
export class LocationDetailComponent {
  @Input() locationInformation!: LocationInformation;
  @Output() newLocationInformationEvent =
    new EventEmitter<LocationInformation>();

  selectedItem(value: LocationInformation) {
    this.newLocationInformationEvent.emit(value);
  }
}
