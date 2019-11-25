import { Product } from './../../../shared/models/product';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ProductService } from 'shared/services/product.service';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {

  dataTable: any; 
  products: any[];

 
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  temp: any[] = [];
  itemCount: number;
  
  constructor(private productService: ProductService, private database: AngularFireDatabase) {
   this.subscription=  productService.getAll().subscribe(items => {
      this.filteredProducts=this.products = items;
      this.initializeTable(this.products);
     
    });
    
  }
  private initializeTable(products: Product[]){
    this.tableResource = new DataTableResource(this.products);


    this.tableResource.query({offset: 0})
      .then(items => this.temp = items);
    this.tableResource.count()
      .then(count => this.itemCount= count);
  }


  reloadItems(params){

    if(!this.tableResource) return;
    this.tableResource.query(params)
    .then(items => this.temp = items);
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;

    this.initializeTable(this.filteredProducts)

  }
  ngOnDestroy(){
      this.subscription.unsubscribe();
  }

  ngOnInit(){
   
  }
}





