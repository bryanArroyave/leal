import container from './ioc';
import Server from './server';
import dotenv from 'dotenv';
import Socket from './socket';
import { DbConnection } from './domain/db/entity';

dotenv.config();

process.on('error', (err) => {
  console.error(err);
});

try {
  const connection: DbConnection = container.resolve('connection');
  const server: Server = container.resolve('server');
  const messageBroker: any = container.resolve('messageBroker');
  const socket: Socket = container.resolve('socket');

  const port = process.env.PORT;

  server
    .start(port)
    .then(async (response) => {
      socket.start(response);
      await messageBroker.connect();
      await messageBroker.config();
      await connection.connect();
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
