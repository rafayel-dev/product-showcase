export const interpolatePrice = (price: number, discountPercentage: number = 0): number => {
  if (discountPercentage <= 0) return price;
  return Math.round(price - (price * discountPercentage) / 100);
};

export const formatCurrency = (amount: number): string => {
  return `৳ ${Number(amount).toLocaleString("en-BD")}`;
};
