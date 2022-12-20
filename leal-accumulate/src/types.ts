import { ProductEntity } from './domain/product/entity';
import events from 'events';

export type ProductInfo = Omit<ProductEntity, 'uuid'>;
export type Connection = events.EventEmitter;
