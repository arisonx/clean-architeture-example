/**
 * Módulo que define a entidade de domínio Product
 * Esta é a classe principal do domínio, representando o produto do negócio
 * Segue o padrão de Entity do DDD (Domain-Driven Design)
 */

/**
 * Interface que define as propriedades de um produto
 */
export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

/**
 * Classe Product: representa um produto no sistema
 * Esta classe encapsula os dados e comportamentos relacionados a produtos
 * O construtor é privado para garantir que a criação ocorra apenas pelos métodos estáticos
 */
export class Product {
  private constructor(private readonly props: ProductProps) {
    // validate
    /*  this.validate(); */
  }

  /**
   * Método de fábrica para criar uma nova instância de produto
   * Gera um ID único usando crypto.randomUUID() e inicializa a quantidade como zero
   * @param name - Nome do produto
   * @param price - Preço do produto
   * @returns Nova instância de Product
   */
  public static create(name: string, price: number): Product {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
      quantity: 0,
    });
  }

  /**
   * Método de fábrica para criar uma instância a partir de dados existentes (ex: banco de dados)
   * @param props - Propriedades do produto
   * @returns Instância de Product com as propriedades fornecidas
   */
  public static with(props: ProductProps): Product {
    return new Product(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get price(): number {
    return this.props.price;
  }

  public get quantity(): number {
    return this.props.quantity;
  }

  /**
   * Aumenta a quantidade do produto em estoque
   * @param quantity - Quantidade a ser adicionada
   */
  public increaseQuantity(quantity: number): void {
    //TODO: validate quantity
    this.props.quantity += quantity;
  }

  /**
   * Diminui a quantidade do produto em estoque
   * @param quantity - Quantidade a ser subtraída
   */
  public decreaseQuantity(quantity: number): void {
    //TODO: validate quantity
    this.props.quantity -= quantity;
  }

  // validate
  // this method is called in the constructor
  /*   private validate() {
    if (this.props.quantity < 0) {
      throw new Error("product quantity cannot be negative");
    }
  } */
}
