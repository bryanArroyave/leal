import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Client from '../../models/Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent implements OnInit {
  public clients$: Observable<Client[]> | null = null;

  constructor(private readonly clientService: ClientService) {}

  ngOnInit(): void {
    this.clients$ = this.clientService.getClients();
  }
}
