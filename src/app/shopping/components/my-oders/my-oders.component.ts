import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap } from 'rxjs/operators';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-oders',
  templateUrl: './my-oders.component.html',
  styleUrls: ['./my-oders.component.css']
})
export class MyOdersComponent implements OnInit {
  order$: Observable<any>;
  userId: string;
  constructor(private authService: AuthService,
    private orderService: OrderService,
    private database: AngularFireDatabase) 
    {



      this.order$ = authService.user$.pipe(switchMap( (u: firebase.User)=>
        {
        if(u) return orderService.getOrdersByUser(u.uid);
        // if(u) orderService.getOrdersByUser(u.uid)));
      })) 
    }

  ngOnInit() {
  }

}
