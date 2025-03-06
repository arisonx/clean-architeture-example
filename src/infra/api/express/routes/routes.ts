/**
 * Definições para rotas HTTP
 * Estabelece contratos para implementação de rotas
 */

import { Request, Response } from "express";

/**
 * Tipo que representa métodos HTTP suportados
 */
export type HttpMethod = "get|post";

/**
 * Enum para métodos HTTP
 * Facilita o uso dos métodos HTTP de forma tipada
 */
export const HttpMethod = {
  GET: "get" as HttpMethod,
  POST: "post" as HttpMethod,
};

/**
 * Interface para implementações de rotas
 * Define o contrato que todas as rotas devem seguir
 */
export interface Route {
  /**
   * Retorna o manipulador da rota
   * @returns Função que processa requisições HTTP
   */
  getHandler(): (request: Request, response: Response) => Promise<void>;

  /**
   * Retorna o caminho da rota
   * @returns String com o path da rota
   */
  getPath(): string;

  /**
   * Retorna o método HTTP da rota
   * @returns Método HTTP utilizado
   */
  getMethod(): HttpMethod;
}
