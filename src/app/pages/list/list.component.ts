import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/types/Product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  products!: IProduct[]
  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {

      }
    })
  }
  removeItem(id: any) {
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa không?');
    if (!confirm) return;
    this.productService.removeProduct(id).subscribe({
      next: () => {
        console.log('Xóa thành công')
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
