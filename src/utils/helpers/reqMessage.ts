export const getSafeErrorMessage = (message: string) => {
  if (!message) {
    return 'Erro inesperado entre em contato com o suporte!'
  }

  return message
}
