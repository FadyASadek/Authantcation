import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  formBuilder = inject(FormBuilder);
  issubmiting = false;
  AuthServices = inject(AuthService);
  routerr =inject(Router)
  toastr = inject(ToastrService)
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword?.setErrors({ passwordMisMatch: true });
      return { passwordMisMatch: true };
    } else {
      if (confirmPassword?.hasError('passwordMisMatch')) {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  };

  form: FormGroup = this.formBuilder.group(
    {
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern(/(?=.*[^a-zA-Z0-9])(?=.*[A-Z])/) , Validators.minLength(6)]],
      confirmPassword: [''],
    },
    { validators: this.passwordMatchValidator } // إضافة Validator على مستوى المجموعة
  );

  onSubmit() {
    this.issubmiting = true;

    console.log('Form Values Before Submit:', this.form.value);

    if (this.form.valid) {
      const { confirmPassword, ...dataToSend } = this.form.value; // إزالة الحقول غير الضرورية
      console.log('Data to be sent:', dataToSend);

      this.AuthServices.createAccount(dataToSend).subscribe({
        next: (res) => {
          this.issubmiting = false;
          this.form.reset();
          this.toastr.success(
            "New User Created , Sign in Now!",
            "Registration Successful",
            {
              positionClass: 'toast-center', // إضافة كلاس مخصص للموقع
              timeOut: 3000, // التحكم في وقت الإشعار
            }
          );

                    console.log('Server Response:', res);
            this.routerr.navigateByUrl("/signin")
        },
        error: (err) => {
          console.error('Error Details:', err);

          // التحقق من الأخطاء القادمة من الخادم
          if (err.status === 400 && Array.isArray(err.error?.errors)) {
            const errors = err.error.errors;

            errors.forEach((apiError: any) => {
              if (apiError.code === 'DuplicateEmail') {
                this.form.controls['email'].setErrors({ emailTaken: true });
              }
              if (apiError.code === 'DuplicateUserName') {
                this.form.controls['fullname'].setErrors({ usernameTaken: true });
              }
            });
          }
        },
      });
    } else {
      console.log('Form Invalid:', this.form.errors);
      console.log('Form Controls:', this.form.controls);

      // تحديث القيم وصلاحية الحقول
      Object.values(this.form.controls).forEach(control => {
        control.updateValueAndValidity();
      });
    }
  }





  dispalyError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.issubmiting || Boolean(control?.touched));
  }
}
