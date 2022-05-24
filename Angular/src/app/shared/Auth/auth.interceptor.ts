import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserService } from 'src/app/shared/services/User/user.service'
import { Toast, ToastrService } from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService : UserService,private router : Router, private toastr: ToastrService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.toastr.error('Not Authorized','Error'); 
                            this.router.navigateByUrl('user/login');
                             
                        }
                    })
            );
        }
    }
}