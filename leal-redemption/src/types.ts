import { GiftEntity } from './domain/gift/entity';
import events from 'events';

export type GiftInfo = Omit<GiftEntity, 'uuid'>;
export type Connection = events.EventEmitter;
