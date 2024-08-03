export const getCoinLogo = (symbol) => {
  switch (symbol) {
    case "BTC":
      return "/coin/bitcoin.png";
    case "ETH":
      return "/coin/ethereum.png";
    case "USDT":
      return "/coin/cardano.png";
    case "BNB":
      return "/coin/binance.png";
    case "SOL":
      return "/coin/solana.png";
    case "STETH":
      return "/coin/shiba-inu.png";
    case "USDC":
      return "/coin/usdc.png";
    case "XRP":
      return "/coin/ripple.png";
    case "DOGE":
      return "/coin/dogecoin.png";
    case "TON":
      return "/coin/usdt.png";
    default:
      return "/coin/usdc.png";
  }
};
