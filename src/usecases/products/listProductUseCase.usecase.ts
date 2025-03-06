/**
 * Caso de uso para listagem de produtos
 * Implementa a lógica para recuperar todos os produtos
 * Converte entidades de domínio em DTOs para exposição externa
 */

import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { UseCase } from "../usecase";

/**
 * DTO para resposta da listagem de produtos
 * Evita expor entidades de domínio diretamente
 */
type ListProductOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

/**
 * Implementação do caso de uso de listagem de produtos
 */
export class ListProductUseCase
  implements UseCase<void, ListProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  /**
   * Método de fábrica para criar uma instância do caso de uso
   * @param productGateway - Implementação do gateway de produtos
   * @returns Instância configurada do caso de uso
   */
  public static create(productGateway: ProductGateway): ListProductUseCase {
    return new ListProductUseCase(productGateway);
  }

  /**
   * Executa o caso de uso para listar todos os produtos
   * @returns DTO com a lista de produtos
   */
  public async execute(): Promise<ListProductOutputDto> {
    const products = await this.productGateway.listProducts();

    const output = this.presentOutput(products);
    return output;
  }

  /**
   * Converte lista de entidades de produto para o formato de saída
   * Aplica o padrão Presenter
   * @param products - Lista de entidades de produto
   * @returns DTO formatado para resposta
   */
  private presentOutput(products: Product[]): ListProductOutputDto {
    const output: ListProductOutputDto = {
      products: products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        };
      }),
    };
    return output;
  }
}
