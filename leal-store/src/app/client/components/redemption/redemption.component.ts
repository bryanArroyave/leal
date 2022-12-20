import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss'],
})
export class RedemptionComponent implements OnInit {
  public readonly clientId: string;

  constructor(private route: ActivatedRoute) {
    this.clientId = this.route.snapshot.paramMap.get('clientId') as string;
  }

  ngOnInit(): void {}
}
