export const formatCurrency = (amount) => {
  if (!amount) return null;
  return parseFloat(amount).toFixed(6);
};
