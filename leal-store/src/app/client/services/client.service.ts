import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Consumer from '../../interfaces/Consumer';
import Client from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends Consumer {
  constructor(http: HttpClient) {
    super(http);
  }
  getClients(): Observable<Client[]> {
    return this.get(`${environment.LEAL_QUERY_URL}/client`).pipe(
      map((res: any) => {
        return res.payload.map((el: any) => Client.createClient(el));
      })
    );
  }

  getClient(clientId: string): Observable<Client> {
    console.log(`${environment.LEAL_QUERY_URL}/client/${clientId}`);
    return this.get(`${environment.LEAL_QUERY_URL}/client/${clientId}`).pipe(
      map((res: any) => {
        return Client.createClient(res.payload);
      })
    );
  }
}
