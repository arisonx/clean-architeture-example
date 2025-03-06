/**
 * Cliente Prisma singleton para toda a aplicação
 * Este módulo exporta uma única instância do cliente Prisma
 */
import { PrismaClient } from '@prisma/client';

export const prismCliente = new PrismaClient();
