import container from '../../../../ioc';
import { Connection } from '../../../../types';
import channels from './channels';

export default class ChannelsConfig {
  private channels: any;
  private channelInstances: any[] = [];
  private readonly messageBrokerHandlers: any;
  constructor({ messageBrokerHandlers }) {
    this.messageBrokerHandlers = messageBrokerHandlers;
    this.channels = [];
  }

  getChannel(name: string) {
    const channels = this.listChannels;
    const channel = channels.find((channel) => channel.name === name);
    if (!channel) throw new Error(`Channel ${name} not found`);
    return channel;
  }

  getQueue(channel: any, queueName: string) {
    const queue = channel.queues.find((queue) => queue.name === queueName);

    if (!queue) throw new Error(`Queue ${queueName} not found in channel ${channel.name}`);

    return queue;
  }

  get listChannels() {
    return this.channels;
  }

  async config(connection: Connection, commitMessage: Function): Promise<void[]> {
    for (const channel of channels as any) {
      const instance = await this.getChannelInstance(connection, channel.name);
      const channelSearched = this.channels.find((el) => el.name === channel.name);
      if (channelSearched) {
        channelSearched.queues.push({
          name: channel.queue,
          type: channel.type,
          handle:
            channel.type === 'CONSUMER'
              ? this.messageBrokerHandlers[channel?.handleName || ''](commitMessage, instance, container)
              : undefined,
        });
      } else
        this.channels.push({
          name: channel.name,
          instance,
          queues: [
            {
              name: channel.queue,
              type: channel.type,
              handle:
                channel.type === 'CONSUMER'
                  ? this.messageBrokerHandlers[channel?.handleName || ''](commitMessage, instance, container)
                  : undefined,
            },
          ],
        });
    }

    return Promise.all(this.channels.map(this.assigQueue));
  }

  async getChannelInstance(connection: any, name: string) {
    let channel = this.channelInstances.find((el) => el.name === name);
    if (channel) return channel.instance;
    const instance = await connection.createChannel();
    this.channelInstances.push({ name, instance });
    return instance;
  }

  async assigQueue(channel: any): Promise<void> {
    for (const queue of channel.queues) {
      await channel.instance.assertQueue(queue.name);
    }
  }
}
