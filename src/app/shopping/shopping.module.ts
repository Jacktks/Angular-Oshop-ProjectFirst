import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from 'app/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccesComponent } from './components/order-succes/order-succes.component';
import { MyOdersComponent } from './components/my-oders/my-oders.component';
import { ProductFilterComponent } from 'app/products/product-filter/product-filter.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccesComponent,
    MyOdersComponent,
    ProductFilterComponent,
    
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
     

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id',component: OrderSuccesComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOdersComponent, canActivate: [AuthGuard]},
    ])
  ]
})
export class ShoppingModule { }
