/**
 * Caso de uso para criação de produto
 * Implementa a lógica de negócio para criar um novo produto
 * Utiliza o padrão de DTOs para entrada e saída de dados
 */

import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { UseCase } from "../usecase";

/**
 * DTO para dados de entrada do caso de uso
 */
export type CreateProductInputDto = {
  name: string;
  price: number;
};

/**
 * DTO para dados de saída do caso de uso
 */
export type CreateProductOutputDto = {
  id: string;
};

/**
 * Implementação do caso de uso de criação de produto
 * Segue o padrão de injeção de dependência para o gateway
 */
export class CreateProductUseCase
  implements UseCase<CreateProductInputDto, CreateProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  /**
   * Método de fábrica para criar uma instância do caso de uso
   * @param productGateway - Implementação do gateway de produtos
   * @returns Instância configurada do caso de uso
   */
  public static create(productGateway: ProductGateway): CreateProductUseCase {
    return new CreateProductUseCase(productGateway);
  }

  /**
   * Executa o caso de uso de criação de produto
   * @param input - Dados do produto a ser criado
   * @returns DTO com o ID do produto criado
   */
  public async execute(
    input: CreateProductInputDto
  ): Promise<CreateProductOutputDto> {
    // TODO: add flux validations: example: check if the product already exists and more...

    // create a new product
    const product = Product.create(input.name, input.price);

    // save the product in the database
    await this.productGateway.createProduct(product);

    const output = this.presentOutput(product);
    return output;
  }

  /**
   * Converte a entidade de produto para o formato de saída
   * Aplica o padrão Presenter
   * @param product - Entidade de produto
   * @returns DTO formatado para resposta
   */
  private presentOutput(product: Product): CreateProductOutputDto {
    const output: CreateProductOutputDto = {
      id: product.id,
    };
    return output;
  }
}
