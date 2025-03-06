# 🏗️ Clean Architecture Example

Um projeto de demonstração implementando os princípios da Clean Architecture em uma aplicação Node.js com TypeScript.

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

## 📚 Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de demonstrar a implementação prática dos princípios da Clean Architecture proposta por Robert C. Martin (Uncle Bob). A aplicação é uma API simples para gerenciamento de produtos, permitindo a criação e listagem de produtos.

### 🎯 Objetivos de Aprendizado

- Entender os conceitos fundamentais da Clean Architecture
- Implementar a separação de responsabilidades entre camadas
- Aplicar princípios SOLID
- Demonstrar o uso de padrões de projeto como Dependency Inversion e Adapter
- Criar uma estrutura testável e flexível

## 🧩 Princípios da Clean Architecture Aplicados

### 1. Independência de Frameworks

O núcleo da aplicação (entidades e casos de uso) não depende de bibliotecas externas ou frameworks.

### 2. Testabilidade

Todas as camadas são facilmente testáveis de forma isolada.

### 3. Independência da UI

A lógica de negócios não conhece a interface pela qual está sendo acessada (API REST).

### 4. Independência de Banco de Dados

O domínio não conhece o mecanismo de persistência (Prisma/SQLite).

### 5. Independência de Agentes Externos

O núcleo da aplicação não depende de nada externo.

## 🏛️ Estrutura do Projeto

```
src/
├── domain/                 # Camada de Domínio (regras de negócio da empresa)
│   └── product/
│       ├── entity/         # Entidades do domínio
│       └── gateway/        # Interfaces para repositórios (portas)
│
├── usecases/               # Camada de Aplicação (casos de uso)
│   └── products/
│
├── infra/                  # Camada de Infraestrutura
│   ├── api/                # Implementação da API (Express)
│   │   └── express/
│   │       └── routes/
│   └── repositories/       # Implementação dos repositórios
│       └── product/
│
├── package/                # Bibliotecas e configurações externas
│   └── prisma/
│
└── main.ts                 # Ponto de entrada e composição das dependências
```

## 🔄 Fluxo de Dependências

```
API Controllers → Use Cases → Domain Entities
     ↑               ↑             ↑
     |               |             |
  Adapters        Interfaces     Models
```

As dependências sempre apontam para dentro, em direção às entidades de domínio.

## 📱 Casos de Uso Implementados

1. **Criar Produto** - Permite cadastrar um novo produto com nome e preço
2. **Listar Produtos** - Retorna todos os produtos cadastrados

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/clean-architeture-example.git

# Entre no diretório
cd clean-architeture-example

# Instale as dependências
npm install

# Configure o banco de dados
npx prisma migrate dev

# Execute o projeto
npm start
```

A API estará disponível em `http://localhost:3000`

## 🔍 Endpoints da API

- **POST /products** - Criar um novo produto
  ```json
  {
    "name": "Produto Exemplo",
    "price": 29.99
  }
  ```

- **GET /products** - Listar todos os produtos

## 🧪 Testes

O projeto inclui testes unitários, de integração e end-to-end:

```bash
# Executar todos os testes
npm test

# Executar testes com watch mode
npm run test:watch

# Verificar cobertura de testes
npm run test:coverage
```

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Express** - Framework web
- **Prisma** - ORM para acesso ao banco de dados
- **SQLite** - Banco de dados
- **Jest** - Framework de testes
- **Supertest** - Testes de API

## 📊 Padrões de Projeto Implementados

- **Factory Method** - Para criação de objetos
- **Dependency Injection** - Para inversão de dependências
- **Repository** - Para abstração de persistência
- **Adapter** - Para adaptação de interfaces
- **Presenter** - Para formatação de respostas

## 📐 Camadas da Clean Architecture

### 1. Entidades (Domain)

Encapsulam as regras de negócio mais gerais e críticas. No projeto, são representadas pela classe `Product`.

### 2. Casos de Uso (Use Cases)

Contêm regras de negócio específicas da aplicação, como `CreateProductUseCase` e `ListProductUseCase`.

### 3. Adaptadores de Interface (Interface Adapters)

Convertem dados entre o formato mais conveniente para casos de uso e entidades para o formato mais conveniente para elementos externos. Inclui os controllers, presenters e gateways.

### 4. Frameworks e Drivers (Infrastructure)

Camada mais externa, composta por frameworks e ferramentas como Express, Prisma, etc.

## 🎓 Aprendizados e Benefícios

- **Manutenibilidade** - Código mais fácil de manter e evoluir
- **Testabilidade** - Facilidade para escrever testes unitários
- **Flexibilidade** - Mudanças em uma camada não afetam outras
- **Independência** - Possibilidade de trocar tecnologias com mínimo impacto
```
