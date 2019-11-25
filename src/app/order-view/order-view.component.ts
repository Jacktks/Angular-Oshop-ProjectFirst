import { OrderService } from '../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  orderId;
  order$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    // this.order$ = this.orderService.getOrdersByUser(this.orderId);
  }

}
