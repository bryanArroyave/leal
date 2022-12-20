import container from './ioc';
import Server from './server';
import dotenv from 'dotenv';
import { MessageBrokerRepository } from './domain/messageBroker/repository';

dotenv.config();

process.on('error', (err) => {
  console.log(err);
});

try {
  const server: Server = container.resolve('server');
  const messageBroker: any = container.resolve('messageBroker');

  const port = process.env.PORT;

  server
    .start(port)
    .then(async () => {
      await messageBroker.connect();
      await messageBroker.config();
      await consume();
    })
    .catch((err) => {
      console.error(err);
    });

  const consume = async () => {
    await Promise.all(
      messageBroker._channelsConfig.listChannels
        .map((channel) =>
          channel.queues.map((queue) => ({
            ...queue,
            channel: channel,
          }))
        )
        .flat()
        .filter((queue) => queue.type === 'CONSUMER')
        .map(({ channel, name, handle }) => {
          if (handle) {
            return messageBroker.consumeMessage(channel, name, handle);
          }
        })
    );
  };
} catch (error) {
  console.error(error);
}
