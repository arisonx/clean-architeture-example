/**
 * Mock do PrismaClient para testes
 */
export class PrismaClientMock {
  product = {
    create: jest.fn(),
    findMany: jest.fn()
  };
}
