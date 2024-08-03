import { authClient } from "./client";

export const checkPool = async (
  nodeAddress,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
) => {
  try {
    const req = {
      tokenA: fromToken,
      tokenB: toToken,
      amountA: fromAmount,
      amountB: toAmount,
    };

    const response = await authClient.post(
      `nodes/${nodeAddress}/pools/check`,
      req,
    );
    const res = response.data;

    return {
      existed: res.existed,
      feeTier: res.feeTier,
      priceFromTo: res.priceAToB,
      priceToFrom: res.priceBToA,
    };
  } catch (error) {
    console.error("Error checking pool:", error);
    throw error;
  }
};

export const simulateProvideInitialLiquidity = async (
  nodeAddress,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  fee,
) => {
  try {
    const req = {
      tokenA: fromToken,
      tokenB: toToken,
      amountA: fromAmount,
      amountB: toAmount,
      fee: fee,
    };

    const response = await authClient.post(
      `nodes/${nodeAddress}/pools/provide_initial`,
      req,
    );
    const res = response.data;

    return {
      poolId: res.poolId,
      lpTokens: res.lpTokens,
      poolShare: res.poolShare,
    };
  } catch (error) {
    console.error("Error simulate provide initial liquidity: ", error);
    throw error;
  }
};

export const simulateProvideLiquidity = async (
  nodeAddress,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
) => {
  try {
    const req = {
      tokenA: fromToken,
      tokenB: toToken,
      amountA: fromAmount,
      amountB: toAmount,
    };

    const response = await authClient.post(
      `nodes/${nodeAddress}/pools/provide`,
      req,
    );
    const res = response.data;

    return {
      poolId: res.poolId,
      lpTokens: res.lpTokens,
      poolShare: res.poolShare,
    };
  } catch (error) {
    console.error("Error simulate provide initial liquidity: ", error);
    throw error;
  }
};

export const confirmProvideLiquidity = async (
  nodeAddress,
  poolIndex,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
) => {
  try {
    const req = {
      poolId: poolIndex,
      tokenA: fromToken,
      tokenB: toToken,
      amountA: fromAmount,
      amountB: toAmount,
    };

    const response = await authClient.post(
      `nodes/${nodeAddress}/pools/confirm_provide`,
      req,
    );
    const res = response.data;

    return {
      lpTokens: res.lpTokens,
      poolShare: res.poolShare,
    };
  } catch (error) {
    console.error("Error simulate provide initial liquidity: ", error);
    throw error;
  }
};

export const simulateTrade = async (
  nodeAddress,
  fromToken,
  toToken,
  forwardDirection,
  amount,
) => {
  try {
    const req = {
      fromToken: fromToken,
      toToken: toToken,
      forwardDirection: forwardDirection,
      amount: amount,
    };

    const response = await authClient.post(
      `nodes/${nodeAddress}/pools/trade`,
      req,
    );
    const res = response.data;

    return {
      poolIndex: res.poolId,
      otherAmount: res.otherAmount,
      fee: res.fee,
    };
  } catch (error) {
    console.error("Error simulate trade: ", error);
    throw error;
  }
};

export const confirmTrade = async (
  nodeAddress,
  poolId,
  fromToken,
  toToken,
  fromAmount,
) => {
  try {
    const req = {
      poolId: poolId,
      fromToken: fromToken,
      toToken: toToken,
      fromAmount: fromAmount,
    };

    const response = await authClient.post(
      `nodes/${nodeAddress}/pools/confirm_trade`,
      req,
    );
    const res = response.data;

    return {
      poolIndex: res.poolId,
      otherAmount: res.otherAmount,
      fee: res.fee,
    };
  } catch (error) {
    console.error("Error confirming trade: ", error);
    throw error;
  }
};
