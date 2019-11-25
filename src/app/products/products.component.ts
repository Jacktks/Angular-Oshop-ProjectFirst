import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../shared/services/category.service';
import { Subscription, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductService } from '../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCartComponent } from '../shopping/components/shopping-cart/shopping-cart.component';
import { ShoppingCart } from '../shared/models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {
  products: any[] = [];
  subscription: Subscription;
  filteredProducts: any[] = []; 
  categories: any[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private database: AngularFireDatabase, 
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService,
      
      ) {
       


  

   }

  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart();
    this.populateProduct();
  }


  private populateProduct(){

    this.subscription =  this.database.list('/products').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).pipe(switchMap(products =>{
         this.products = products
         return this.route.queryParamMap;
      }))
      .subscribe(params =>{
             this.category = params.get('category');
              this.applyFilter();
            });
  }


  private applyFilter(){
    
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) :
    this.products;
  }

 
}



