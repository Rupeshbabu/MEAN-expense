import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  signinForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  resetForm() {
    this.signinForm.reset();
  }

  onSubmit() {
    try {
      if (this.signinForm.valid) {
        this.auth.signIn(this.signinForm.value).subscribe(
          (result: any) => {
            if (result.status === 'success') {
              this.auth.setToken(result.token);
              sessionStorage.setItem('isLoggedIn', 'true');
              this.router.navigate(['dashboard']);
            } else {
              this.toast.showError(result.message, 'User Login');
              this.router.navigate(['sign-in']);
            }
          },
          (error) => {
            if (error.status === 400) {
              this.toast.showError(error.error.message, 'User Login');
              this.router.navigate(['sign-in']);
            }
          }
        );
      }
    } catch (error: any) {
      this.toast.showError(error, 'Error');
      console.error(error);
    }
  }
}
