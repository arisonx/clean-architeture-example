/**
 * Implementação da API usando o framework Express
 * Responsável por configurar o servidor web e registrar as rotas
 */

import express, { Express } from "express";
import { Api } from "../api";
import { Route } from "./routes/routes";

export class ApiExpress implements Api {
  private constructor(routes: Route[]) {
    // create express app instance
    this.app = express();
    // add json middleware
    this.app.use(express.json());
    // add routes
    this.addRoutes(routes);
  }

  /**
   * Express app - instância do servidor Express
   */
  private app: Express;

  /**
   * Método de fábrica para criar uma instância da API Express
   * @param routes - Lista de rotas a serem registradas
   * @returns Instância configurada da API Express
   */
  public static create(routes: Route[]): ApiExpress {
    return new ApiExpress(routes);
  }

  /**
   * Registra as rotas fornecidas na aplicação Express
   * @param routes - Lista de rotas a serem registradas
   */
  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod() as keyof Express;
      const handler = route.getHandler();

      // this inject the route into the express app
      this.app[method](path, handler);
    });
  }

  /**
   * Inicia o servidor Express na porta especificada
   * @param port - Porta para iniciar o servidor
   */
  public async start(port: number): Promise<void> {
    // start the express app
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      this.listRoutes();
    });
  }

  /**
   * Lista todas as rotas registradas na aplicação
   */
  private listRoutes() {
    const routes = this.app._router.stack;

    routes
      .filter((route: any) => route.route)
      .forEach((route: any) => {
        console.log(
          `Route: ${route.route.path} - Method: ${route.route.stack[0].method}`
        );
      });
  }
}
