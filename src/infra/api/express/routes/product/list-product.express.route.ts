/**
 * Implementação da rota para listagem de produtos
 * Adapta a interface HTTP para o caso de uso de listagem de produtos
 */

import { Request, Response } from "express";
import { ListProductUseCase } from "../../../../../usecases/products/listProductUseCase.usecase";
import { HttpMethod, Route } from "../routes";

/**
 * DTO para resposta da listagem de produtos
 */
export type ListProductResponseDto = {
  products: {
    id: string;
    name: string;
    price: number;
  }[];
};

/**
 * Implementação da rota de listagem de produtos
 * Segue o padrão de injeção de dependências
 */
export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUseCase
  ) {}

  /**
   * Retorna o manipulador da rota
   * @returns Função que processa a requisição HTTP para listar produtos
   */
  getHandler(): (request: Request, response: Response) => Promise<void> {
    return async (_request: Request, response: Response) => {
      const products = await this.listProductService.execute();

      const responseBody = this.present(products);

      response.status(200).json(responseBody);
    };
  }

  /**
   * Método de fábrica para criar uma instância da rota
   * @param listProductService - Caso de uso para listagem de produtos
   * @returns Instância configurada da rota
   */
  public static create(listProductService: ListProductUseCase): Route {
    return new ListProductRoute(
      "/products",
      HttpMethod.GET,
      listProductService
    );
  }

  /**
   * Formata a resposta para o cliente
   * @param input - DTO de resposta do caso de uso
   * @returns DTO formatado para resposta HTTP
   */
  private present(input: ListProductResponseDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
    return response;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  getPath(): string {
    return this.path;
  }
}
