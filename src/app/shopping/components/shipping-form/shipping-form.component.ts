import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {}; 
  userSubcription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    
    private orderService: OrderService,
    private authService: AuthService) {

     }

  ngOnInit() {
    this.userSubcription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
    });
  }
  ngOnDestroy(){
    this.userSubcription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
  
    this.router.navigate(['/order-success', result.key])

  }    

}
