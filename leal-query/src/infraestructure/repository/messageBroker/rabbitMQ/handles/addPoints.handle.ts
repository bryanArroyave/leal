import { ClientUseCase } from '../../../../../application/client/clientUseCase';
import Socket from '../../../../../socket';

export default (commitMessage: Function, channel: string, container: any) => {
  return async (message: any) => {
    const content = JSON.parse(message.content);
    const { points, clientId, socketId } = JSON.parse(content);
    const clientUseCase: ClientUseCase = container.resolve('clientUseCase');
    const socket: Socket = container.resolve('socket');
    await clientUseCase.addPoints(clientId, points);
    socket.emitOne(
      socketId,
      'add_points_success',
      JSON.stringify({
        message: 'Se ha actualizado correctamente los puntos',
        clientId,
      })
    );
    return commitMessage(channel, message);
  };
};
