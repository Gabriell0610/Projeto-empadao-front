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
}
