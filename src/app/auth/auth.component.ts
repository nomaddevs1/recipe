import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import AuthService, { Auth } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authForm: FormGroup;
  constructor(private fB: FormBuilder, private authServices: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = this.fB.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  get f() {
    return this.authForm;
  }
  get fKeys() {
    return this.authForm.controls;
  }
  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    let email = this.fKeys['email'].value;
    let password = this.fKeys['password'].value;
    this.isLoading = true;

    let authObs: Observable<Auth>;
    
    if (this.isLoginMode) {
      authObs =this.authServices.login(email, password)
    } else {
      authObs =this.authServices.signUp(email, password)
    }
    authObs.subscribe(
      (data) => {
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (err) => {
        this.error = err;
        this.isLoading = false;
        setTimeout(() => {
          this.error = null;
        }, 1000);
      }
    );
    this.authForm.reset();
  }
}
