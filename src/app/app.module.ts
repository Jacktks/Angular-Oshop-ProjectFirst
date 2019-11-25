
import {  AuthGuard } from './shared/services/auth-guard.service';
// import {MatTableModule} from '@angular/material/table';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, provideRoutes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccesComponent } from './shopping/components/order-succes/order-succes.component';
import { MyOdersComponent } from './shopping/components/my-oders/my-oders.component';

import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { ShoppingCartSummaryComponent } from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { ListOrderViewComponent } from './list-order-view/list-order-view.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { SharedModule } from 'shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { DataTableModule } from 'angular5-data-table';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccesComponent,
    MyOdersComponent,
   
    AdminProductsComponent,
    AdminOrdersComponent,
   
    ProductFormComponent,
    LoginComponent,
  
    ProductFilterComponent,
    
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ListOrderViewComponent,
    OrderViewComponent,
  ],
  imports: [
    
    // MatTableModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent },

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id',component: OrderSuccesComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOdersComponent, canActivate: [AuthGuard]},
      

      
      {path: 'admin/admin-products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/admin-products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/admin-products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      
      
    ]),
    NgbModule,
    AngularFontAwesomeModule,
    FontAwesomeModule
      
  ],
  providers: [
    AdminAuthGuard,
   
  ],
  exports: [
    // MatTableModule
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
