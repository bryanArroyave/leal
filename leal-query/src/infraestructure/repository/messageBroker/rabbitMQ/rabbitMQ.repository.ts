import amqp from 'amqplib';
import { Connection } from 'mongoose';
import { MessageBrokerRepository } from '../../../../domain/messageBroker/repository';
import ChannelsConfig from './channelsConfig';

export default class RabbitMQMessageBroker implements MessageBrokerRepository {
  private connection: Connection;
  private channelsConfig: ChannelsConfig;

  constructor({ channelsConfig }) {
    this.connection = null;
    this.channelsConfig = channelsConfig;
  }

  async config(): Promise<void> {
    if (!this.connection) throw new Error("Connection doesn't provider");
    await this.channelsConfig.config(this.connection, this.commitMessage);
  }

  async connect(): Promise<Connection> {
    const RabbitMQsetting: any = this.settings;
    RabbitMQsetting.authMechanism = RabbitMQsetting.authMechanism.split(',');
    this.connection = (await amqp.connect(RabbitMQsetting)) as unknown as Connection;
    return this.connection;
  }

  async consumeMessage(channel: any, queueName: string, cb: Function): Promise<void> {
    return channel.instance.consume(queueName, cb);
  }

  async emitMessage(channelName: any, queueName: string, messageObj: any): Promise<void> {
    const channel = this.channelsConfig.getChannel(channelName);
    const queue = this.channelsConfig.getQueue(channel, queueName);
    const message = JSON.stringify(messageObj);
    return channel.instance.sendToQueue(queue.name, Buffer.from(JSON.stringify(message)));
  }

  get settings() {
    return {
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOSTNAME,
      port: process.env.RABBITMQ_PORT,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: process.env.RABBITMQ_VHOST,
      authMechanism: process.env.RABBITMQ_AUTH_MECHANISM,
    };
  }

  commitMessage(channel: any, message: any) {
    channel.ack(message);
  }

  get _channelsConfig(): ChannelsConfig {
    return this.channelsConfig;
  }
}
