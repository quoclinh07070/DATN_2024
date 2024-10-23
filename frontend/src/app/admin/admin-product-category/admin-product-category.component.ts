import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-product-category',
  templateUrl: './admin-product-category.component.html',
  styleUrls: ['./admin-product-category.component.css']
})
export class AdminProductCategoryComponent implements OnInit {

   // Dữ liệu sản phẩm giả lập
   categories = [
    { id: 1, name: 'Nội thất phòng ngủ', image: 'path_to_image_1' },
    { id: 2, name: 'Nội thất phòng khách', image: 'path_to_image_2' },
    { id: 3, name: 'Nội thất phòng bếp', image: 'path_to_image_3' },
    { id: 4, name: 'Nội thất văn phòng', image: 'path_to_image_4' }
  ];

  constructor(private router: Router) {}

  // Thêm sản phẩm
  addCategory() {
    this.router.navigate(['/admin-post/add']);
  }

  // Sửa sản phẩm
  editCategory(id: number) {
    this.router.navigate([`/admin-post/edit/${id}`]);
  }

  // Xóa sản phẩm
  deleteCategory(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      this.categories = this.categories.filter(category => category.id !== id);
    }
  }

  ngOnInit(): void {
  }
  
}

