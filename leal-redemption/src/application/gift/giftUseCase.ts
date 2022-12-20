import { GiftEntity } from '../../domain/gift/entity';
import { GiftRepository } from '../../domain/gift/repository';
import { MessageBrokerRepository } from '../../domain/messageBroker/repository';
import { Queues } from '../../infraestructure/repository/messageBroker/rabbitMQ/queues';
import { GiftInfo } from '../../types';

export class GiftUseCase {
  private readonly giftRepository: GiftRepository;
  private readonly messageBroker: MessageBrokerRepository;
  constructor({ giftRepository, messageBroker }) {
    this.giftRepository = giftRepository;
    this.messageBroker = messageBroker;
  }

  async findGiftById(uuid: string): Promise<GiftEntity> {
    return this.giftRepository.findGiftById(uuid);
  }
  async registerGift(gift: GiftInfo): Promise<GiftEntity> {
    return this.giftRepository.registerGift(gift);
  }
  async listGift(): Promise<GiftEntity[]> {
    return this.giftRepository.listGift();
  }

  async exchange(giftId: string, clientId: string, socketId: string): Promise<void> {
    const gift = await this.findGiftById(giftId);
    this.messageBroker.emitMessage('client', Queues.exchange, {
      points: gift.points,
      clientId,
      socketId,
    });
  }
}
