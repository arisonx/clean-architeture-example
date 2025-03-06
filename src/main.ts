/**
 * Ponto de entrada da aplicação
 * Configura e inicializa todos os componentes
 * Aplica o conceito de composição de dependências (wiring)
 */

import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.express.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product.express.route";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma";
import { prismCliente } from "./package/prisma/prismaCliente";
import { CreateProductUseCase } from "./usecases/products/crateProduct.usecase";
import { ListProductUseCase } from "./usecases/products/listProductUseCase.usecase";

/**
 * Ponto de entrada principal da aplicação que inicializa e inicia o servidor API.
 *
 * Esta função segue o padrão de arquitetura limpa ao:
 * - Criar um repositório de produtos com o cliente Prisma
 * - Criar casos de uso que dependem do repositório
 * - Criar rotas que dependem dos casos de uso
 * - Inicializar e iniciar o servidor API Express na porta especificada
 *
 * @remarks
 * Este é o ponto de composição raiz onde todas as dependências são conectadas.
 *
 */
function main() {
  const apiRepository = ProductRepositoryPrisma.create(prismCliente);

  const createProductUseCase = CreateProductUseCase.create(apiRepository);
  const listProductUseCase = ListProductUseCase.create(apiRepository);

  const createProductRoute = CreateProductRoute.create(createProductUseCase);
  const listProductRoute = ListProductRoute.create(listProductUseCase);

  const port = 3000;

  const api = ApiExpress.create([createProductRoute, listProductRoute]);

  api.start(port);
}

main();
