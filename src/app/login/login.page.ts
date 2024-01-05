import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthService 
  ) {}

  onLoginButtonClick() {
    
    this.loginFailed = false;


    const payload = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(payload.username, payload.password).subscribe(
      (response) => {
        if (response.success) {
          
          this.authService.setAuthenticationStatus(true); 
          this.router.navigate(['/home']);
        } else {
          this.loginFailed = true;
          console.error('Authentication failed');
        }
      },
      (error: any) => {
    
        this.loginFailed = true;
        console.error('Error during authentication:', error);
      }
    );

  }
}
