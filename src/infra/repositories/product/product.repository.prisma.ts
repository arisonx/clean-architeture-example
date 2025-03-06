/**
 * Implementação do repositório de produtos usando Prisma
 * Esta classe é um adaptador que implementa a interface ProductGateway
 * Responsável pela persistência de dados dos produtos
 */

import { PrismaClient } from "@prisma/client";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Product } from "../../../domain/product/entity/product";

export class ProductRepositoryPrisma implements ProductGateway {
  // TODO: |implements the dependency injection pattern with|
  // TODO: |the dependency inversion principle              |
  private constructor(private readonly prisma: PrismaClient) {}

  /**
   * Método de fábrica para criar uma instância do repositório
   * @param prisma - Cliente Prisma para acesso ao banco de dados
   * @returns Instância configurada do repositório
   */
  public static create(prisma: PrismaClient) {
    return new ProductRepositoryPrisma(prisma);
  }

  /**
   * Persiste um produto no banco de dados
   * Converte a entidade de domínio para o formato do banco
   * @param product - Entidade de produto a ser persistida
   */
  public async createProduct(product: Product): Promise<void> {
    // entity to database entity
    await this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        id: product.id,
      },
    });
  }

  /**
   * Recupera todos os produtos do banco de dados
   * Converte os registros do banco em entidades de domínio
   * @returns Lista de entidades de produto
   */
  async listProducts(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    // convert the database entity to the domain entity
    const productList = products.map((product) => {
      return Product.with(product);
    });

    // return the domain entity
    return productList;
  }
}
