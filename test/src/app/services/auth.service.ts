import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private serverUrl = 'http://localhost:3000'; 

  constructor(private httpClient: HttpClient) {}


  login(username: string, password: string): Observable<{ success: boolean }> {
    const payload = { username, password };
    return this.httpClient.post<{ success: boolean }>(`${this.serverUrl}/api/authenticate`, payload);
  }

  logout(): void {
    this.isAuthenticated = false;
  }


  isAuthenticatedState(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticationStatus(status: boolean): void {
    this.isAuthenticated = status;
  }
}
