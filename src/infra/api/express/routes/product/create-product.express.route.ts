/**
 * Implementação da rota para criação de produtos
 * Adapta a interface HTTP para o caso de uso de criação de produtos
 */

import { Request, Response } from "express";
import { CreateProductUseCase } from "../../../../../usecases/products/crateProduct.usecase";
import { HttpMethod, Route } from "../routes";

/**
 * DTO para resposta da criação de produto
 */
export type CreateProductResponseDto = {
  id: string;
};

/**
 * DTO para requisição de criação de produto
 */
export type CreateProductRequestDto = {
  name: string;
  price: number;
};

/**
 * Implementação da rota de criação de produtos
 * Segue o padrão de injeção de dependências
 */
export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUseCase
  ) {}

  /**
   * Método de fábrica para criar uma instância da rota
   * @param createProductService - Caso de uso para criação de produtos
   * @returns Instância configurada da rota
   */
  public static create(createProductService: CreateProductUseCase): Route {
    return new CreateProductRoute(
      "/products",
      HttpMethod.POST,
      createProductService
    );
  }

  /**
   * Retorna o manipulador da rota
   * @returns Função que processa a requisição HTTP para criar produto
   */
  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price } = request.body as CreateProductRequestDto;

      const input = {
        name: name,
        price: price,
      };

      const output: CreateProductResponseDto =
        await this.createProductService.execute(input);

      const responseBody = this.present(output);

      response.status(201).json(responseBody);
    };
  }

  /**
   * Formata a resposta para o cliente
   * @param input - DTO de resposta do caso de uso
   * @returns DTO formatado para resposta HTTP
   */
  private present(input: CreateProductResponseDto): CreateProductResponseDto {
    const response: CreateProductResponseDto = {
      id: input.id,
    };
    return response;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }
}
