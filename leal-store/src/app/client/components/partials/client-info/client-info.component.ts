import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Client from 'src/app/client/models/Client';
import { ClientService } from 'src/app/client/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent implements OnInit {
  @Input() clientId: string;

  public client: Client;

  constructor(
    private router: Router,
    private readonly clientSertvice: ClientService,
    private readonly alertSertvice: AlertService,
    private readonly socketService: SocketService
  ) {
    this.socketService.onAddPointsSuccess.subscribe(({ message }) => {
      this.alertSertvice.notify(message);
      this.getClientData();
    });

    this.socketService.onExchangePointsSuccess.subscribe(({ message }) => {
      this.alertSertvice.notify(message);
      this.getClientData();
    });

    this.socketService.onExchangePointsError.subscribe(({ message }) => {
      this.alertSertvice.notifyError(message);
      this.getClientData();
    });
  }

  ngOnInit(): void {
    if (this.clientId) {
      this.getClientData();
    }
  }

  getClientData() {
    this.clientSertvice.getClient(this.clientId).subscribe(
      (client) => {
        this.client = client;
      },
      (err) => {
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      }
    );
  }
}
