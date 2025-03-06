/**
 * Testes para o caso de uso CreateProductUseCase
 */
import { CreateProductUseCase } from '../../../src/usecases/products/crateProduct.usecase';
import { ProductGatewayMock } from '../../mocks/product.gateway.mock';

describe('CreateProductUseCase', () => {
  let productGatewayMock: ProductGatewayMock;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    productGatewayMock = new ProductGatewayMock();
    createProductUseCase = CreateProductUseCase.create(productGatewayMock);
  });

  it('should create a product and return its id', async () => {
    // Arrange
    const input = {
      name: 'Test Product',
      price: 10.5
    };

    // Act
    const output = await createProductUseCase.execute(input);

    // Assert
    expect(output).toHaveProperty('id');
    expect(output.id).toBeTruthy();
    expect(productGatewayMock.getProductsCount()).toBe(1);
  });

  it('should create products with different ids', async () => {
    // Arrange
    const input1 = { name: 'Product 1', price: 10.5 };
    const input2 = { name: 'Product 2', price: 20.5 };
    
    // Mock para garantir IDs diferentes para cada produto
    jest.spyOn(crypto, 'randomUUID')
      .mockReturnValueOnce('id-1')
      .mockReturnValueOnce('id-2');

    // Act
    const output1 = await createProductUseCase.execute(input1);
    const output2 = await createProductUseCase.execute(input2);

    // Assert
    expect(output1.id).toBe('id-1');
    expect(output2.id).toBe('id-2');
    expect(productGatewayMock.getProductsCount()).toBe(2);
  });
});
