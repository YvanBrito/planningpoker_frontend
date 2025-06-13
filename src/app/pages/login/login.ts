import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  username = '';
  password = '';
  token = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const body = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>('http://localhost:8080/auth/login', body).subscribe({
      next: (res) => {
        this.token = res.token;
        this.errorMessage = '';
        localStorage.setItem('token', this.token);
        this.router.navigate(['/poker']);
      },
      error: (err) => {
        this.token = '';
        this.errorMessage = err.error?.message || 'Erro ao fazer login';
      },
    });
  }
}
