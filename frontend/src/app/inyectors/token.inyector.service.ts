import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor  implements HttpInterceptor{
    constructor(private auth :AuthService){
    }

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<any>{
        const token = this.auth.token;
        const reqClone = req.clone({
            setHeaders:{
                'Authorization': token
            }
        });
        return next.handle(reqClone);
    }
}