import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LealSocket } from '../app.module';

@Injectable({ providedIn: 'root' })
export class SocketService {
  // eslint-disable-next-line no-undef
  currentDocument = this.lealSocket.fromEvent<Document>('document');
  private readonly _getSocket: BehaviorSubject<string> = new BehaviorSubject(
    null
  );

  @Output() onAddPointsSuccess: EventEmitter<any> = new EventEmitter();
  @Output() onExchangePointsSuccess: EventEmitter<any> = new EventEmitter();
  @Output() onExchangePointsError: EventEmitter<any> = new EventEmitter();

  constructor(private readonly lealSocket: LealSocket) {
    this.initFormSocket();
  }

  initFormSocket() {
    this.lealSocket.on('connect', () => {
      this._getSocket.next(this.lealSocket.ioSocket.id);
    });
    this.lealSocket.on('add_points_success', (data: any) => {
      const msg = this.getMessage(data);
      this.onAddPointsSuccess.emit(msg);
    });

    this.lealSocket.on('exchange_points_success', (data: any) => {
      const msg = this.getMessage(data);
      this.onExchangePointsSuccess.emit(msg);
    });

    this.lealSocket.on('exchange_points_error', (data: any) => {
      const msg = this.getMessage(data);
      this.onExchangePointsError.emit(msg);
    });
  }

  getMessage(data: any) {
    return typeof data === 'string'
      ? JSON.parse(data)
      : { message: 'Error en el servidor' };
  }

  get socketId() {
    return this._getSocket.asObservable();
  }
}
