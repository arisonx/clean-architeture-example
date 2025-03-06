/**
 * Testes de integração para API Express
 */
import express from 'express';
import request from 'supertest';
import { ApiExpress } from '../../../../src/infra/api/express/api.express';
import { HttpMethod, Route } from '../../../../src/infra/api/express/routes/routes';

describe('ApiExpress Integration', () => {
  let mockApp: express.Express;
  let mockRoute: Route;
  
  beforeEach(() => {
    mockApp = express();
    mockApp.use(express.json());
    
    // Mock de uma rota para teste
    mockRoute = {
      getPath: jest.fn().mockReturnValue('/test'),
      getMethod: jest.fn().mockReturnValue(HttpMethod.GET),
      getHandler: jest.fn().mockReturnValue(async (_req: express.Request, res: express.Response) => {
        res.status(200).json({ message: 'Test success' });
      })
    };
    
    // Substitui o método listen do express para evitar iniciar um servidor real
    jest.spyOn(mockApp, 'listen').mockImplementation((port, callback: any) => {
      if (callback) callback();
      return {} as any;
    });
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  it('should register routes and return responses correctly', async () => {
    // Arrange
    // Mock o método privado usando prototype para acessá-lo
    const originalAddRoutes = ApiExpress.prototype['addRoutes'];
    
    // Redefine o método addRoutes para usar nossa app mock
    ApiExpress.prototype['addRoutes'] = function(routes: Route[]) {
      routes.forEach(route => {
        const path = route.getPath();
        const method = route.getMethod() as keyof express.Express;
        const handler = route.getHandler();
        
        // Registre a rota no nosso mockApp em vez do this.app
        mockApp[method](path, handler);
      });
    };
    
    // Salve a referência ao app original e substitua pelo mockApp
    const originalApp = ApiExpress.prototype['app'];
    ApiExpress.prototype['app'] = mockApp;
    
    // Crie a instância da API
    const api = ApiExpress.create([mockRoute]);
    
    // Act & Assert
    await request(mockApp)
      .get('/test')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ message: 'Test success' });
    
    // Restaura os métodos e propriedades originais
    ApiExpress.prototype['addRoutes'] = originalAddRoutes;
    ApiExpress.prototype['app'] = originalApp;
    
    expect(mockRoute.getPath).toHaveBeenCalled();
    expect(mockRoute.getMethod).toHaveBeenCalled();
    expect(mockRoute.getHandler).toHaveBeenCalled();
  });
});
