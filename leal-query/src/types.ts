import { ClientEntity } from './domain/client/entity';
import events from 'events';

export type ClientInfo = Pick<ClientEntity, 'name' | 'email'>;
export type Connection = events.EventEmitter;
export type IError = Error & { status?: number };
