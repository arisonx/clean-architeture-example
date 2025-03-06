/**
 * Testes para o repositório ProductRepositoryPrisma
 */
import { Product } from '../../../../src/domain/product/entity/product';
import { ProductRepositoryPrisma } from '../../../../src/infra/repositories/product/product.repository.prisma';
import { PrismaClientMock } from '../../../mocks/prisma.client.mock';

describe('ProductRepositoryPrisma', () => {
  let prismaClientMock: PrismaClientMock;
  let productRepository: ProductRepositoryPrisma;

  beforeEach(() => {
    prismaClientMock = new PrismaClientMock();
    productRepository = ProductRepositoryPrisma.create(prismaClientMock as any);
  });

  describe('createProduct', () => {
    it('should call prisma.product.create with correct data', async () => {
      // Arrange
      const product = Product.with({
        id: 'test-id',
        name: 'Test Product',
        price: 10.5,
        quantity: 0
      });

      // Act
      await productRepository.createProduct(product);

      // Assert
      expect(prismaClientMock.product.create).toHaveBeenCalledWith({
        data: {
          id: 'test-id',
          name: 'Test Product',
          price: 10.5,
          quantity: 0
        }
      });
    });
  });

  describe('listProducts', () => {
    it('should convert database entities to domain entities', async () => {
      // Arrange
      const dbProducts = [
        { id: 'test-id-1', name: 'Product 1', price: 10.5, quantity: 5 },
        { id: 'test-id-2', name: 'Product 2', price: 20.5, quantity: 10 }
      ];
      prismaClientMock.product.findMany.mockResolvedValue(dbProducts);

      // Act
      const products = await productRepository.listProducts();

      // Assert
      expect(products).toHaveLength(2);
      expect(products[0]).toBeInstanceOf(Product);
      expect(products[0].id).toBe('test-id-1');
      expect(products[0].name).toBe('Product 1');
      expect(products[0].price).toBe(10.5);
      expect(products[0].quantity).toBe(5);

      expect(products[1]).toBeInstanceOf(Product);
      expect(products[1].id).toBe('test-id-2');
      expect(products[1].name).toBe('Product 2');
      expect(products[1].price).toBe(20.5);
      expect(products[1].quantity).toBe(10);
    });
  });
});
