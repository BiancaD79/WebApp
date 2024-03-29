import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnSameUrlNavigation } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: {[id:number]:number} = {1: 400, 3: 335, 4: 350} // object

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit{

  constructor(private cartService: CartService, private storeService: StoreService){}

  ngOnInit(): void{
    this.getProducts();
  }

  ngOnDestroy(): void {
      if(this.productsSubscription){
        this.productsSubscription.unsubscribe();
      }
  }

  getProducts():void{
    this.storeService.getAllProducts(this.count, this.sort,this.category).subscribe((_products) => {this.products = _products});
  }

  onAddToCart(product: Product) :void{
  this.cartService.addToCart(
    {
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    }
  );
  }

  cols: number = 3;
  category:string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  onColumnsCountChange(colsNumber:number):void{
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory:string):void{
    this.category = newCategory;
    this.getProducts();
  }

  onItemsCountChange(newCount: number): void{
    this.count = newCount.toString();
    this.getProducts
  }
  onSortChange(newSort: string):void{
    this.sort = newSort;
    this.getProducts();
  }
}
