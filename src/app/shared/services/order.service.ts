import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: any[];
  constructor(private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order)
  {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  getOrders(){
    return this.db.list('/orders').valueChanges()   // returns observable
    .subscribe(list=> {
    this.order = list; });
  }
  getOrdersByUser(userId: string): AngularFireList <any[]> {
    return this.db.list('/orders', ref => {
      return ref.orderByChild(userId).equalTo(userId)
      
    });
  }
}