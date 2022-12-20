import { Connection } from 'mongoose';

export interface MessageBrokerRepository {
  connect(): Promise<Connection>;
  emitMessage(channel: any, queueName: string, message: Object): Promise<void>;
  commitMessage(channel: any, message: any): void;
}
