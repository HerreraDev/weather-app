import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  subscription!: Promise<void>;
  loginForm!: FormGroup;
  isSignUp: boolean = false;
  title = 'Sign In';
  submitMessage = 'Login';

  error_msg = {
    email: [
      {
        type: 'required',
        message: 'Email is required.',
      },
      {
        type: 'pattern',
        message: 'Invalid email.',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.',
      },
      {
        type: 'minlength',
        message: 'Minimun of 6 characters.',
      },
    ],
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    authService.userSettedEvent.subscribe((isLogged) =>
      this.isLogged(isLogged)
    );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ),
    });
  }

  formSubmit(value: any): void {
    this.loading = true;

    if (this.isSignUp) {
      this.authService.createUser(value).then(
        (response) => {},
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.subscription = this.authService
        .signinUser(value)
        .then((response: any) => {});
    }
  }

  changeFormState() {
    this.loading = true;
    setTimeout(() => {
      this.isSignUp = !this.isSignUp;
      this.title === 'Sign In'
        ? (this.title = 'Sing Up')
        : (this.title = 'Sign In');
      this.title === 'Sign In'
        ? (this.submitMessage = 'Login')
        : (this.submitMessage = 'Register');
      this.loading = false;
    }, 500);
  }

  test() {
    this.loginForm.setValue({
      email: 'martin@hotmail.com',
      password: '123456',
    });
  }

  isLogged(isLogged: boolean) {
    this.loading = false;
    if (isLogged) {
      this.router.navigateByUrl('weather');
    }
  }
}
