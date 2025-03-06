/**
 * Configuração global para testes
 * Este arquivo é executado antes de cada teste
 */

// Mock para crypto.randomUUID() que é usado na entidade Product
if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: () => 'test-uuid'
    }
  });
}

// Limpar todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});
