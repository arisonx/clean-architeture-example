/**
 * Testes para a rota de criação de produto
 */
import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../../../../src/usecases/products/crateProduct.usecase';
import { CreateProductRoute } from '../../../../../../src/infra/api/express/routes/product/create-product.express.route';

describe('CreateProductRoute', () => {
  let createProductUseCaseMock: jest.Mocked<CreateProductUseCase>;
  let createProductRoute: CreateProductRoute;
  let req: Partial<Request>;
  let res: Partial<Response>;
  
  beforeEach(() => {
    createProductUseCaseMock = {
      execute: jest.fn()
    } as any;
    
    createProductRoute = CreateProductRoute.create(createProductUseCaseMock) as CreateProductRoute;
    
    req = {
      body: {
        name: 'Test Product',
        price: 10.5
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  
  it('should return status 201 and product id when product is created', async () => {
    // Arrange
    createProductUseCaseMock.execute.mockResolvedValue({ id: 'test-id' });
    
    // Act
    const handler = createProductRoute.getHandler();
    await handler(req as Request, res as Response);
    
    // Assert
    expect(createProductUseCaseMock.execute).toHaveBeenCalledWith({
      name: 'Test Product',
      price: 10.5
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'test-id' });
  });

  it('should return correct path and HTTP method', () => {
    // Act & Assert
    expect(createProductRoute.getPath()).toBe('/products');
    expect(createProductRoute.getMethod()).toBe('post');
  });
});
