import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { ClientRoutingModule } from './client-routing.module';
import { BuyComponent } from './components/buy/buy.component';
import { RedemptionComponent } from './components/redemption/redemption.component';
import { ClientInfoComponent } from './components/partials/client-info/client-info.component';
import { ProductModule } from '../product/product.module';
import { GiftModule } from '../gift/gift.module';

@NgModule({
  declarations: [
    ListClientsComponent,
    BuyComponent,
    RedemptionComponent,
    ClientInfoComponent,
  ],
  imports: [CommonModule, ClientRoutingModule, ProductModule, GiftModule],
  exports: [ListClientsComponent],
})
export class ClientModule {}
