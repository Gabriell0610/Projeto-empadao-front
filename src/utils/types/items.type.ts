enum EnumStatusItem {
  ATIVO,
  INATIVO,
}

export interface ListActiveItemsInterface {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  image: string;
  disponivel: EnumStatusItem;
  pesoReal: string;
}

export interface ListActiveItemsByIdInterface {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  image: string;
  disponivel: string;
  tamanho: string;
  pesoReal: string;
}
