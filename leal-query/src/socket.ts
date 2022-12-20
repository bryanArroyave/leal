import { Server as SocketServer } from 'socket.io';

export default class Socket {
  private clients: any[] = [];
  public io: SocketServer | null = null;

  constructor() {
    this.clients = [];
  }
  start(server: any) {
    this.io = new SocketServer(server, {
      allowEIO3: true,
      cors: {
        credentials: true,
        origin: ['http://localhost:4200'],
      },
    });
    this.registerEvent('connect', this.onConnect.bind(this));
  }

  registerEvent(eventName: string, fn: any): void {
    this.io?.on(eventName, fn);
  }

  getClient(socketId: string) {
    return this.clients.find((client) => client.id === socketId);
  }

  async onConnect(socket: any) {
    socket.on('disconnect', this.onDisconnect.bind(this, socket));
    const exist = this.clients.indexOf((client) => client.handshake.auth.user.id === socket.handshake.auth.user.id);
    if (exist === -1) {
      this.clients.push(socket);
    } else {
      this.clients[exist] = socket;
    }
  }

  async onDisconnect(socket: any) {
    this.clients = this.clients.filter((client) => client.id !== socket.id);
  }

  emitOne(socketId: string, topic: string, data: string) {
    const socket = this.getClient(socketId);
    socket?.emit(topic, data);
  }

  emit(event: string, data: any) {
    this.io?.emit(event, data);
  }
}
