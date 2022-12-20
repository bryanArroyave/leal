import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGiftComponent } from './components/list-gift/list-gift.component';

@NgModule({
  declarations: [ListGiftComponent],
  imports: [CommonModule],
  exports: [ListGiftComponent],
})
export class GiftModule {}
