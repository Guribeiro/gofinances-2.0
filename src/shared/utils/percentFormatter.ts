const percentFormatter = (value: number): string => {
  const percent = value.toFixed(0);

  return `${percent}%`;
};

export { percentFormatter };
