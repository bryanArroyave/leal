import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClientModule } from './client/client.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ProductModule } from './product/product.module';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
  url: environment.SOCKET_URL,
  options: {
    transports: ['polling'],
    path: environment.SOCKET_PATH,
  },
};

@Injectable()
export class LealSocket extends Socket {
  constructor() {
    super(config);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    ProductModule,
    ClientModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [LealSocket],
})
export class AppModule {}
