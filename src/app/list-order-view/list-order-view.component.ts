import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-order-view',
  templateUrl: './list-order-view.component.html',
  styleUrls: ['./list-order-view.component.css']
})
export class ListOrderViewComponent implements OnInit {
  @Input('order$') order$: Observable<any[]>;
  // @Input('order$') order$: Observable<any[]>;
  constructor() { }

  ngOnInit() {
  }

}
