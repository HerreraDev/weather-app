import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationWeather } from 'src/app/interfaces/location-weather';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Notification } from 'src/app/interfaces/notification';

@Component({
  selector: 'app-create-notification-modal',
  templateUrl: './create-notification-modal.component.html',
  styleUrls: ['./create-notification-modal.component.css'],
})
export class CreateNotificationModalComponent implements OnInit {
  location!: LocationWeather;
  notificationForm!: FormGroup;

  error_msg = {
    condition: [
      {
        type: 'required',
        message: 'Condition is required.',
      },
    ],
    temp: [
      {
        type: 'required',
        message: 'Temp is required.',
      },
      {
        type: 'minLength',
        message: 'Please enter a valid temperature.',
      },
    ],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<CreateNotificationModalComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.location = data.location;
  }

  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
      condition: new FormControl('', Validators.compose([Validators.required])),
      temp: new FormControl(
        '',
        Validators.compose([Validators.minLength(1), Validators.required])
      ),
    });
  }

  close() {
    this.dialogRef.close();
  }

  confirm(formValue: any) {
    let notification = {} as Notification;
    notification.condition = formValue.condition;
    notification.temp = formValue.temp;
    notification.city = this.location.name;
    notification.id = Math.random();
    this.userService.addNewNotification(
      this.authService.userLoggedIn,
      notification
    );
    this.close();
  }
}
