import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Gift from '../../models/Gift';
import { GiftService } from '../../services/gift.service';

@Component({
  selector: 'app-list-gift',
  templateUrl: './list-gift.component.html',
  styleUrls: ['./list-gift.component.scss'],
})
export class ListGiftComponent implements OnInit {
  @Input() clientId: string;
  public gifts$: Observable<Gift[]>;

  constructor(private readonly giftService: GiftService) {}

  ngOnInit(): void {
    this.gifts$ = this.giftService.getGifts();
  }

  exchange(giftId: string) {
    this.giftService.exchange(giftId, { clientId: this.clientId }).subscribe();
  }
}
