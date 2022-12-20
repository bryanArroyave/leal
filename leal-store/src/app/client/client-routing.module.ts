import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { RedemptionComponent } from './components/redemption/redemption.component';

const routes: Routes = [
  {
    path: ':clientId/buy',
    component: BuyComponent,
  },
  {
    path: ':clientId/exchange',
    component: RedemptionComponent,
  },
  {
    path: '',
    component: ListClientsComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
