const currencyFormatter = (value: number): string => {
  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value) / 100);

  const amountBRL = amount.split('.');
  amountBRL[0] = amountBRL[0].replace(',', '.');

  const result = amountBRL.join(',');

  return result;
};

export { currencyFormatter };
