import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',

})
export class LoginComponent {
  busy: Subscription;

  username: string;
  password: string;
  errormsg: string = '';
  response: Access_Token;
  userdetails: UserDetails;

  constructor(private router: Router){}
  ngOnInit(){
  }
  login(){
    this.router.navigate(['/Dashboard']);  
  }
}

interface Access_Token{
  access_token: string;
  status: string;
}
interface UserDetails{
  Name: string;
  roleid: string;
}