export const formatCurrency = (amount) => {
  if (!amount) return null;
  return amount.toFixed(6);
};
