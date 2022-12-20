import { ProductEntity } from '../../domain/product/entity';
import { ProductRepository } from '../../domain/product/repository';
import { MessageBrokerRepository } from '../../domain/messageBroker/repository';
import { Queues } from '../../infraestructure/repository/messageBroker/rabbitMQ/queues';
import { ProductInfo } from '../../types';

export class ProductUseCase {
  private readonly productRepository: ProductRepository;
  private readonly messageBroker: MessageBrokerRepository;
  constructor({ productRepository, messageBroker }) {
    this.productRepository = productRepository;
    this.messageBroker = messageBroker;
  }

  async findProductById(uuid: string): Promise<ProductEntity> {
    return this.productRepository.findProductById(uuid);
  }
  async registerProduct(product: ProductInfo): Promise<ProductEntity> {
    return this.productRepository.registerProduct(product);
  }
  async listProduct(): Promise<ProductEntity[]> {
    return this.productRepository.listProduct();
  }

  async buy(productId: string, clientId: string, socketId: string): Promise<void> {
    const product = await this.findProductById(productId);
    this.messageBroker.emitMessage('client', Queues.add_points, {
      points: product.points,
      clientId,
      socketId,
    });
    await this.productRepository.buy(productId, clientId);
  }
}
