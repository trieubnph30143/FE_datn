import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/types/Product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  product!: IProduct;
  form = this.fb.group({
    name: [''],
    price: [0]
  })
  constructor(
    private fb: FormBuilder,
    private productSerivce: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productSerivce.getOneProduct(id).subscribe({
        next: (product) => {
          this.product = product
          this.form.patchValue(product)
        },
        error: (errors) => {

        }
      })
    })
  }
  onHandleSubmit() {
    console.log(this.form.value)
    if (this.form.invalid) return;
    this.productSerivce.updateProduct({
      id: this.product.id,
      ...this.form.value
    }).subscribe({
      next: (product) => {
        console.log('product', product);
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
