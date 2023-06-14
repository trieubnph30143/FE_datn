import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  error!: string;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: [0, [Validators.required, Validators.minLength(6)]]
  })
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

  }
  onHandleSubmit() {
    if (this.form.invalid) return;
    this.authService.signin(this.form.value).subscribe({
      next: (user) => {
        // alert('Thêm sản phẩm thành công, sau 2s sẽ chuyển về trang list');
        console.log(user)
      },
      error: ({ error }) => {
        this.error = error
      }
    })
  }
}
