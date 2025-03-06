/**
 * Mock do ProductGateway para testes
 */
import { Product } from '../../src/domain/product/entity/product';
import { ProductGateway } from '../../src/domain/product/gateway/product.gateway';

export class ProductGatewayMock implements ProductGateway {
  private products: Product[] = [];

  async createProduct(product: Product): Promise<void> {
    this.products.push(product);
  }

  async listProducts(): Promise<Product[]> {
    return this.products;
  }

  // Métodos auxiliares para testes
  getProductsCount(): number {
    return this.products.length;
  }

  clearProducts(): void {
    this.products = [];
  }

  addTestProduct(product: Product): void {
    this.products.push(product);
  }
}
