/**
 * Testes para o caso de uso ListProductUseCase
 */
import { Product } from '../../../src/domain/product/entity/product';
import { ListProductUseCase } from '../../../src/usecases/products/listProductUseCase.usecase';
import { ProductGatewayMock } from '../../mocks/product.gateway.mock';

describe('ListProductUseCase', () => {
  let productGatewayMock: ProductGatewayMock;
  let listProductUseCase: ListProductUseCase;

  beforeEach(() => {
    productGatewayMock = new ProductGatewayMock();
    listProductUseCase = ListProductUseCase.create(productGatewayMock);
  });

  it('should return an empty list when no products exist', async () => {
    // Act
    const result = await listProductUseCase.execute();

    // Assert
    expect(result.products).toHaveLength(0);
  });

  it('should return all products', async () => {
    // Arrange
    const product1 = Product.with({
      id: 'test-id-1',
      name: 'Product 1',
      price: 10.5,
      quantity: 5
    });
    const product2 = Product.with({
      id: 'test-id-2',
      name: 'Product 2',
      price: 20.5,
      quantity: 10
    });

    productGatewayMock.addTestProduct(product1);
    productGatewayMock.addTestProduct(product2);

    // Act
    const result = await listProductUseCase.execute();

    // Assert
    expect(result.products).toHaveLength(2);
    expect(result.products[0]).toEqual({
      id: 'test-id-1',
      name: 'Product 1',
      price: 10.5,
      quantity: 5
    });
    expect(result.products[1]).toEqual({
      id: 'test-id-2',
      name: 'Product 2',
      price: 20.5,
      quantity: 10
    });
  });
});
