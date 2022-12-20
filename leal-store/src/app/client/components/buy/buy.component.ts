import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent implements OnInit {
  public readonly clientId: string;
  constructor(private route: ActivatedRoute) {
    this.clientId = this.route.snapshot.paramMap.get('clientId') as string;
  }

  ngOnInit(): void {}
}
