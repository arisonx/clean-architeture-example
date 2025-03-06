/**
 * Testes para a rota de listagem de produtos
 */
import { Request, Response } from 'express';
import { ListProductUseCase } from '../../../../../../src/usecases/products/listProductUseCase.usecase';
import { ListProductRoute } from '../../../../../../src/infra/api/express/routes/product/list-product.express.route';

describe('ListProductRoute', () => {
  let listProductUseCaseMock: jest.Mocked<ListProductUseCase>;
  let listProductRoute: ListProductRoute;
  let req: Partial<Request>;
  let res: Partial<Response>;
  
  beforeEach(() => {
    listProductUseCaseMock = {
      execute: jest.fn()
    } as any;
    
    listProductRoute = ListProductRoute.create(listProductUseCaseMock) as ListProductRoute;
    
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  
  it('should return status 200 and products list', async () => {
    // Arrange
    const products = {
      products: [
        { id: 'test-id-1', name: 'Product 1', price: 10.5, quantity: 5 },
        { id: 'test-id-2', name: 'Product 2', price: 20.5, quantity: 10 }
      ]
    };
    
    listProductUseCaseMock.execute.mockResolvedValue(products);
    
    // Act
    const handler = listProductRoute.getHandler();
    await handler(req as Request, res as Response);
    
    // Assert
    expect(listProductUseCaseMock.execute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      products: [
        { id: 'test-id-1', name: 'Product 1', price: 10.5 },
        { id: 'test-id-2', name: 'Product 2', price: 20.5 }
      ]
    });
  });

  it('should return correct path and HTTP method', () => {
    // Act & Assert
    expect(listProductRoute.getPath()).toBe('/products');
    expect(listProductRoute.getMethod()).toBe('get');
  });
});
