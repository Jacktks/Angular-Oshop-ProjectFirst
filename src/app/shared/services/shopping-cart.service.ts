import { Product } from '../models/product';
import {  map,take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { ShoppingCartComponent } from '../../shopping/components/shopping-cart/shopping-cart.component';
import { ShoppingCart } from '../models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private database: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.database.object('/shopping-carts/' + cartId).valueChanges().
      pipe(
        map((data: any) => {
          let items: any;
          if(data){
            items=data.items;
          }
          return new ShoppingCart(items);
        })
      )
  }
  async addToCart(product: Product) {
    this.updateItem(product,1);
  }

  async removeFromCart(product: Product) {
   this.updateItem(product,-1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.database.object('/shopping-carts/'+ cartId + '/items').remove();
  }

  private create(){
    return this.database.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }


  private getItem(cartId: string, productId: string){
    return  this.database.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  

 

  private async getOrCreateCartId(): Promise <string>{
    let cartID = localStorage.getItem('cartId');
    if (cartID) return cartID;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }
  
 

  // private async updateItem(product: Product,change: number){
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.key);

  //   item$.valueChanges()
  //   .pipe(take(1))
  //   .subscribe(item => {
  //     if (item) {
  //       item$.update({quantity: item['quantity'] + change});
  //     } else {
  //       item$.set({ product, quantity: 1 });
  //     }
  //   });
  // }
  // private async updateItem(product: Product,change: number){
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.key);

  //   item$.valueChanges()
  //   .pipe(take(1))
  //   .subscribe(item => {
  //     if (item) {
  //       item$.update({
  //         // product, 
  //         title: product.title,
  //         imageUrl: product.imageUrl,
  //         price: product.price,

  //         quantity: (item['quantity'] ||0) + change});
  //     } 
  //   });
  // }
  private async updateItem(product: Product,change: number)
  {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => 
    {  
      if(item)
      {
     
        let quantity = (item.quantity || 0) + change;
          if (quantity === 0) return item$.remove()
          // .then(result => console.log('deleted', result)).catch(err => console.log(err.message));
        {
          item$.update({
            
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          });
        }
      } 
      else item$.set
      ({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1
      });   
      });
  }
      // let cartId = await this.getOrCreateCartId();
    // let item$ = this.getItem(cartId, product.key);

    // item$.valueChanges()
    // .pipe(take(1))
    // .subscribe(item => {
    //   if (item) {
    //     item$.update({title: product.title,
    //       imageUrl: product.imageUrl,
    //       price: product.price,
    //       quantity: item['quantity'] + change});
    //   } else {
    //     item$.set({ product, quantity: 1 });
    //   }
    // });

}








