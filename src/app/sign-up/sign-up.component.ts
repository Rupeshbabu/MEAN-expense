import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  comparePassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      isCheck: [false, Validators.requiredTrue],
    });
  }

  resetForm() {
    this.signupForm.reset();
  }

  onSubmit() {
    if (this.signupForm.valid && this.comparePassword) {
      this.auth.signUp(this.signupForm.value).subscribe((result: any) => {
        if (result.status === 'success') {
          this.toast.showSuccess(result.message, 'Success');
          this.signupForm.reset();
          this.router.navigate(['/main/signin']);
        }
      });
    } else {
      Object.values(this.signupForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
