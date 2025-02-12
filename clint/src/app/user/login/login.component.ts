import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formbulder = inject(FormBuilder);
  service = inject(AuthService);
  toaster = inject(ToastrService)
  issubmiting : boolean = false;
  form : FormGroup = this.formbulder.group({
    email: [,Validators.required],
    password: [,Validators.required],
  });

  onSubmit(){
  this.issubmiting=true;
  console.log(this.form.value);
  if (this.form.valid) {
    this.service.signin(this.form.value).subscribe({
      next:(res:any)=>{
        localStorage.setItem('token' , res.token)
      },error:(err)=>{
        if (err.status==400) {
this.toaster.error(
  "Invalid Email or Password",
  "Failed Login",
  {
    positionClass: 'toast-center', // إضافة كلاس مخصص للموقع
    timeOut: 3000, // التحكم في وقت الإشعار
  }
);
        }
      }
    })
  }
  }


  dispalyError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.issubmiting || Boolean(control?.touched));
  }
}
