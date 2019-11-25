import { AngularFireDatabase } from '@angular/fire/database';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent{
  order: any[];

  constructor(private orderService: OrderService, private database: AngularFireDatabase) {
    database.list('/orders').valueChanges()   // returns observable
    .subscribe(list=> {
    this.order = list; });
   }

}
