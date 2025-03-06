/**
 * Testes para a entidade Product
 */
import { Product } from '../../../../src/domain/product/entity/product';

describe('Product Entity', () => {
  describe('create', () => {
    it('should create a product with the given name and price', () => {
      // Arrange & Act
      const product = Product.create('Test Product', 10.5);
      
      // Assert
      expect(product.id).toBeDefined();
      expect(product.name).toBe('Test Product');
      expect(product.price).toBe(10.5);
      expect(product.quantity).toBe(0);
    });
  });
  
  describe('with', () => {
    it('should create a product from existing properties', () => {
      // Arrange
      const props = {
        id: 'test-id',
        name: 'Test Product',
        price: 10.5,
        quantity: 5
      };
      
      // Act
      const product = Product.with(props);
      
      // Assert
      expect(product.id).toBe('test-id');
      expect(product.name).toBe('Test Product');
      expect(product.price).toBe(10.5);
      expect(product.quantity).toBe(5);
    });
  });
  
  describe('increaseQuantity', () => {
    it('should increase the product quantity', () => {
      // Arrange
      const product = Product.create('Test Product', 10.5);
      
      // Act
      product.increaseQuantity(5);
      
      // Assert
      expect(product.quantity).toBe(5);
    });
  });
  
  describe('decreaseQuantity', () => {
    it('should decrease the product quantity', () => {
      // Arrange
      const props = {
        id: 'test-id',
        name: 'Test Product',
        price: 10.5,
        quantity: 10
      };
      const product = Product.with(props);
      
      // Act
      product.decreaseQuantity(3);
      
      // Assert
      expect(product.quantity).toBe(7);
    });
  });
});
