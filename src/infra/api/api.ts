/**
 * Interface para implementações de API
 * Definida como interface para possibilitar diferentes implementações
 * Segue o princípio de inversão de dependência
 */
export interface Api {
  /**
   * Inicializa o servidor na porta especificada
   * @param port - Porta para iniciar o servidor
   */
  start(port: 3000): void;
}
