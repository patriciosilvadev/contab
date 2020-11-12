export const isEmpty = (object: any): boolean => {
  return !object || Object.entries(object).length === 0
}

export const parseCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  return formatter.format(value)
}
