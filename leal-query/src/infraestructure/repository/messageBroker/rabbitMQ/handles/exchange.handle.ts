import { ClientUseCase } from '../../../../../application/client/clientUseCase';
import { MessageBrokerRepository } from '../../../../../domain/messageBroker/repository';
import Socket from '../../../../../socket';

export default (commitMessage: Function, channel: string, container: any) => {
  return async (message: any) => {
    const content = JSON.parse(message.content);
    const { points, clientId, socketId } = JSON.parse(content);
    const clientUseCase: ClientUseCase = container.resolve('clientUseCase');
    const socket: Socket = container.resolve('socket');
    try {
      await clientUseCase.removePoints(clientId, points);

      socket.emitOne(
        socketId,
        'exchange_points_success',
        JSON.stringify({
          message: 'Se ha actualizado correctamente los puntos',
          clientId,
        })
      );
    } catch ({ message, status = 500 }) {
      const socket: Socket = container.resolve('socket');
      socket.emitOne(
        socketId,
        'exchange_points_error',
        JSON.stringify({
          message: 'No es posible redimir esa cantidad de puntos',
          clientId,
        })
      );
    }
    return commitMessage(channel, message);
  };
};
