import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Consumer from 'src/app/interfaces/Consumer';
import { environment } from 'src/environments/environment';
import Product from '../models/Product';
import { map } from 'rxjs/operators';
import { SocketService } from 'src/app/services/socket.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService extends Consumer {
  private socketId: string;
  constructor(http: HttpClient, private readonly socketService: SocketService) {
    super(http);
    this.socketService.socketId.subscribe((socketId) => {
      this.socketId = socketId;
    });
  }
  getProducts(): Observable<Product[]> {
    return this.get(`${environment.LEAL_ACCUMALE_URL}/product`).pipe(
      map((res: any) => {
        return res.payload.map((el: any) => Product.createProduct(el));
      })
    );
  }

  buy(uuid: string, body: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        socketId: this.socketId,
      }),
    };

    return this.post(
      `${environment.LEAL_ACCUMALE_URL}/product/${uuid}/buy`,
      body,
      options
    ).pipe(
      map((res: any) => {
        return res.payload;
      })
    );
  }
}
