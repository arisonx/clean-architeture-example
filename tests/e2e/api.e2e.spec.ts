/**
 * Testes end-to-end para a API completa
 */
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import express from 'express';
import { ApiExpress } from '../../src/infra/api/express/api.express';
import { CreateProductRoute } from '../../src/infra/api/express/routes/product/create-product.express.route';
import { ListProductRoute } from '../../src/infra/api/express/routes/product/list-product.express.route';
import { ProductRepositoryPrisma } from '../../src/infra/repositories/product/product.repository.prisma';
import { CreateProductUseCase } from '../../src/usecases/products/crateProduct.usecase';
import { ListProductUseCase } from '../../src/usecases/products/listProductUseCase.usecase';

/**
 * Este teste usa um banco de dados em memória para simular o fluxo E2E
 * completo sem depender de um banco de dados real.
 */
describe('API E2E Tests', () => {
  let app: express.Express;
  let prisma: PrismaClient;
  
  beforeAll(() => {
    // Substitui o método listen do express para evitar iniciar um servidor real
    jest.spyOn(express.application, 'listen').mockImplementation(function(this: any, port, callback) {
      if (callback) callback();
      return this;
    });
    
    // Cria um cliente Prisma mock
    prisma = {
      product: {
        create: jest.fn(),
        findMany: jest.fn().mockResolvedValue([
          { id: 'test-id-1', name: 'Produto de Teste 1', price: 10.5, quantity: 5 },
          { id: 'test-id-2', name: 'Produto de Teste 2', price: 20.5, quantity: 10 }
        ])
      }
    } as unknown as PrismaClient;
    
    // Configura a aplicação
    const productRepository = ProductRepositoryPrisma.create(prisma);
    const createProductUseCase = CreateProductUseCase.create(productRepository);
    const listProductUseCase = ListProductUseCase.create(productRepository);
    
    const createProductRoute = CreateProductRoute.create(createProductUseCase);
    const listProductRoute = ListProductRoute.create(listProductUseCase);
    
    const api = ApiExpress.create([createProductRoute, listProductRoute]);
    
    // Acessa a instância do Express diretamente
    const apiAny = api as any;
    app = apiAny.app;
  });
  
  afterAll(() => {
    jest.restoreAllMocks();
  });
  
  it('should list products', async () => {
    const response = await request(app)
      .get('/products')
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(response.body).toEqual({
      products: [
        { id: 'test-id-1', name: 'Produto de Teste 1', price: 10.5 },
        { id: 'test-id-2', name: 'Produto de Teste 2', price: 20.5 }
      ]
    });
  });
  
  it('should create a product', async () => {
    // Mock para a chamada de create
    (prisma.product.create as jest.Mock).mockResolvedValue({
      id: 'new-product-id',
      name: 'Novo Produto',
      price: 15.99,
      quantity: 0
    });
    
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Novo Produto',
        price: 15.99
      })
      .expect(201)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('id');
    expect(prisma.product.create).toHaveBeenCalled();
  });
});
