import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.html',
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'USER';

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onRegister() {
    const body = {
      username: this.username,
      password: this.password,
      role: this.role,
    };

    this.http.post<any>('http://localhost:8080/auth/register', body).subscribe({
      next: () => {
        this.successMessage = 'Usuário cadastrado com sucesso!';
        this.errorMessage = '';
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error?.message || 'Erro ao cadastrar';
      },
    });
  }
}
