import { authClient } from "./client";

export const checkPool = async (nodeAddress, fromToken, toToken, fromAmount, toAmount) => {
    try {
        const req = {
            tokenA: fromToken,
            tokenB: toToken,
            amountA: fromAmount,
            amountB: toAmount,
        }

        const response = await authClient.post(`nodes/${nodeAddress}/pools/check`, req);
        const res = response.data

        return {
            existed: res.existed,
            priceFromTo: res.priceAToB,
            priceToFrom: res.priceBToA,
        }
    } catch (error) {
        console.error('Error checking pool:', error);
        throw error;
    }
};

export const simulateProvideInitialLiquidity = async (nodeAddress, fromToken, toToken, fromAmount, toAmount, fee) => {
    try {
        const req = {
            tokenA: fromToken,
            tokenB: toToken,
            amountA: fromAmount,
            amountB: toAmount,
            fee: fee,
        }

        const response = await authClient.post(`nodes/${nodeAddress}/pools/provide_initial`, req)
        const res = response.data

        return {
            poolId: res.poolId,
            lpTokens: res.lpTokens,
            poolShare: res.poolShare,
        }
    } catch (error) {
        console.error('Error simulate provide initial liquidity: ', error)
        throw error
    }
}

export const simulateProvideLiquidity = async (nodeAddress, fromToken, toToken, fromAmount, toAmount) => {
    try {
        const req = {
            tokenA: fromToken,
            tokenB: toToken,
            amountA: fromAmount,
            amountB: toAmount,
        }

        const response = await authClient.post(`nodes/${nodeAddress}/pools/provide`, req)
        const res = response.data

        return {
            poolId: res.poolId,
            lpTokens: res.lpTokens,
            poolShare: res.poolShare,
        }
    } catch (error) {
        console.error('Error simulate provide initial liquidity: ', error)
        throw error
    }
}

export const confirmProvideLiquidity = async (nodeAddress, poolIndex, fromToken, toToken, fromAmount, toAmount) => {
    try {
        const req = {
            poolId: poolIndex,
            tokenA: fromToken,
            tokenB: toToken,
            amountA: fromAmount,
            amountB: toAmount,
        }

        const response = await authClient.post(`nodes/${nodeAddress}/pools/confirm_provide`, req)
        const res = response.data

        return {
            lpTokens: res.lpTokens,
            poolShare: res.poolShare,
        }
    } catch (error) {
        console.error('Error simulate provide initial liquidity: ', error)
        throw error
    }
}