import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent, 
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
