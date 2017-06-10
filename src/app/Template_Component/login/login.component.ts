import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';

import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent {
  busy: Subscription;

  username: string;
  password: string;
  errormsg: string;

  constructor(private router: Router, private loginService: LoginService){}
  ngOnInit(){}
  
  login(){
    this.busy = this.loginService.getLogin(this.username, this.password).subscribe(res => {
      if(res == 'NULL')
      {
        this.errormsg = 'Username and Password are incorrect.'
        setTimeout(() => {
          this.errormsg = '';
        }, 4000);
      }
      else
      {
        localStorage.setItem('UserName',this.username);
        this.router.navigate(['/Dashboard']);
      }
    });     
  }
}