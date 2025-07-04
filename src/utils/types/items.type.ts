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
  tamanho: string;
  pesoReal: string;
}

export interface ListActiveItemsByIdInterface {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  image: string;
  disponivel: EnumStatusItem;
  tamanho: string;
}
