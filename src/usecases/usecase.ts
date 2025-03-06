/**
 * Interface genérica para todos os casos de uso da aplicação
 * Implementa o padrão Command e segue o princípio de responsabilidade única (SRP)
 * Define um contrato comum para a execução de casos de uso
 * InputDto: tipo de dados de entrada
 * OutputDto: tipo de dados de saída
 */
export interface UseCase<InputDto, OutputDto> {
  /**
   * Executa o caso de uso
   * @param inputDto - Dados de entrada para o caso de uso
   * @returns Promise com os dados de saída
   */
  execute(inputDto: InputDto): Promise<OutputDto>;
}
