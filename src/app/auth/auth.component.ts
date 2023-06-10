import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true
  authForm: FormGroup
  constructor(private fB: FormBuilder) { }

  ngOnInit(): void {
    this.authForm = this.fB.group({
      email:new FormControl("", [Validators.required, Validators.minLength(6)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }
  get f(){
    return this.authForm
  }
  get fKeys(){
    return this.authForm.controls
  }
  onSubmit(){
    console.log(this.f);
  }
}
