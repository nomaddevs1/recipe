import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { throwError } from "rxjs";
;
import { catchError } from "rxjs/operators";

interface Auth{
    kind: string;
    idToken:string;
    email:string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}


@Injectable({providedIn: 'root'})
export default class AuthService implements OnInit{
    constructor(private http: HttpClient){}
    ngOnInit(){}
    signUp(email: string, password: string){
      return this.http.post<Auth>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCU7YeKapZ5vMzvs7BFbbLfV7wDq1A7iuI', {
            email:email,
            password:password,
            returnSecureToken: true
        }).pipe(catchError((err)=>{
            let errorMessage = "An unknown error occurred"
            if(!err.error || !err.error.error){
                return throwError(errorMessage)
            }
            switch(err.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email address already exists'
            }
        }))
    }
};
