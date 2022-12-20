import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Consumer from 'src/app/interfaces/Consumer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SocketService } from 'src/app/services/socket.service';
import Gift from '../models/Gift';
@Injectable({
  providedIn: 'root',
})
export class GiftService extends Consumer {
  private socketId: string;
  constructor(http: HttpClient, private readonly socketService: SocketService) {
    super(http);
    this.socketService.socketId.subscribe((socketId) => {
      this.socketId = socketId;
    });
  }
  getGifts(): Observable<Gift[]> {
    return this.get(`${environment.LEAL_REDEMPTION_URL}/gift`).pipe(
      map((res: any) => {
        return res.payload.map((el: any) => Gift.createGift(el));
      })
    );
  }

  exchange(uuid: string, body: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        socketId: this.socketId,
      }),
    };

    return this.post(
      `${environment.LEAL_REDEMPTION_URL}/gift/${uuid}/exchange`,
      body,
      options
    ).pipe(
      map((res: any) => {
        return res.payload;
      })
    );
  }
}
