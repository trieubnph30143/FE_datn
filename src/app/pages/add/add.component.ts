import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength]],
    price: [0, [Validators.required]]
  })
  constructor(private productSerivce: ProductService, private router: Router, private fb: FormBuilder) {

  }
  onHandleSubmit() {
    if (this.form.invalid) return;
    this.productSerivce.addProduct(this.form.value).subscribe({
      next: (product) => {
        // alert('Thêm sản phẩm thành công, sau 2s sẽ chuyển về trang list');
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 2000)
      },
      error: (errors) => {
        console.log(errors)
      }
    })
  }
}
