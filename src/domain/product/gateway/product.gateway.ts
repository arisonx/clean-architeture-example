/**
 * Interface do Gateway de Produto (Port na terminologia de Ports & Adapters)
 * Define o contrato para persistência e recuperação de produtos
 * Segue o Princípio de Inversão de Dependência do SOLID
 * A camada de domínio define interfaces que serão implementadas por camadas externas
 */

import { Product } from "../entity/product";

export interface ProductGateway {
  /**
   * Persiste um novo produto no armazenamento
   * @param product - Entidade de produto a ser criada
   */
  createProduct(product: Product): Promise<void>;
  
  /**
   * Recupera todos os produtos do armazenamento
   * @returns Lista de entidades de produto
   */
  listProducts(): Promise<Product[]>;
}
