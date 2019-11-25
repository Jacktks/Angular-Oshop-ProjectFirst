import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: any[];
  product = {};
  id;
  constructor(
    private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private database: AngularFireDatabase, 
    private productService: ProductService,
    private router: Router) {
    database.list('/categories').valueChanges()   // returns observable
    .subscribe(list=> {
    this.categories = list;
 });
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe
    (p => this.product = p);

}
  save(product){
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);

    
    this.router.navigate(['/admin/admin-products']);
  }
  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;
    {

      this.productService.delete(this.id);
      this.router.navigate(['/admin/admin-products']);
    }
  }

  ngOnInit() {
  } 

}
