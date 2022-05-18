export type Category = {
  key: string;
  name: string;
  color: string;
  icon: string;
};

export const categories: Array<Category> = [
  { key: 'gym', name: 'Academia', icon: 'life-buoy', color: '#3867d6' },
  { key: 'food', name: 'Alimentação', icon: 'coffee', color: '#FF872C' },
  { key: 'car', name: 'Carro', icon: 'crosshair', color: '#fed330' },
  { key: 'purchases', name: 'Compras', icon: 'shopping-bag', color: '#5636D3' },
  { key: 'studies', name: 'Estudos', icon: 'book', color: '#9C001A' },
  { key: 'salary', name: 'Salário', icon: 'dollar-sign', color: '#12A454' },
  { key: 'leisure', name: 'Lazer', icon: 'heart', color: '#eb3b5a' },
  { key: 'night', name: 'Noitada', icon: 'moon', color: '#2c2c54' },
  { key: 'others', name: 'Outros', icon: 'globe', color: '#2980b9' },
];
