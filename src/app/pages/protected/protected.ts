import { Component } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [AuthService],
  templateUrl: './protected.html',
})
export class ProtectedComponent {
  message = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getSecret() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'Nenhum token encontrado. Faça login.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>('http://localhost:8080/admin/secret', { headers })
      .subscribe({
        next: (res) => {
          this.message = res.message || JSON.stringify(res);
        },
        error: (err) => {
          console.log(err);
          this.message = err.error?.message || 'Erro ao acessar o recurso';
        },
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
