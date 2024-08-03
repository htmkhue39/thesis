// mockApi.js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const API_URL = "http://127.0.0.1:8080";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8080", // Replace with your API's base URL
  timeout: 5000, // You can set a timeout if needed
});

const mock = new MockAdapter(axiosClient, { delayResponse: 500 });

const accounts = [
  {
    id: "1",
    address: "0x12345d7dE385beF55F8447C0afC704f7057e1234",
    pubkey: "0x12345d7dE385beF55F8447C0afC704f7057e1234",
    passcode: "password123",
    mnemonic: [
      "brush",
      "swing",
      "cram",
      "width",
      "spoon",
      "visual",
      "typical",
      "recipe",
      "obvious",
      "damp",
      "smart",
      "depend",
    ],
    connectedNodeAddress: "",
    connected: false,
  },
  {
    id: "2",
    address: "0x76721d7dE385beF55F8447C0afC704f7057e9aBE",
    pubkey: "0x76721d7dE385beF55F8447C0afC704f7057e9aBE",
    passcode: "passwordSub1",
    mnemonic: [
      "moon",
      "galaxy",
      "star",
      "planet",
      "comet",
      "orbit",
      "solar",
      "lunar",
      "space",
      "alien",
      "rocket",
      "satellite",
    ],
    connectedNodeAddress: "",
    connected: false,
    balances: {},
    transactions: [],
  },
];

const channels = [
  {
    id: "1",
    multsig: "0x12345d7dE385beF55F8447C0afC704f7057e1234",
    address_a: "0x12345d7dE385beF55F8447C0afC704f7057e1234",
    address_b: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    denom: "ETH/USDC",
    a_init_fund: 5,
    b_init_fund: 2500,
    timelock: 5000,
    balances: {
      ETH: 5,
      USDC: 2500,
    },
    transactions: [],
    liquidityPositions: [
      {
        poolId: "1",
        tokenA: "ETH",
        tokenB: "USDC",
        amountA: "5",
        amountB: "2500",
        liquidityToken: "UNI-V2",
        poolShare: "0.5%",
        totalPoolTokens: "10",
      },
      {
        poolId: "2",
        tokenA: "BTC",
        tokenB: "BNB",
        amountA: "2",
        amountB: "5000",
        liquidityToken: "UNI-V2",
        poolShare: "0.3%",
        totalPoolTokens: "8",
      },
      {
        poolId: "3",
        tokenA: "ETH",
        tokenB: "BTC",
        amountA: "3",
        amountB: "3000",
        liquidityToken: "UNI-V2",
        poolShare: "0.22%",
        totalPoolTokens: "9",
      },
    ],
  },
  {
    id: "2",
    multsig: "0x76721d7dE385beF55F8447C0afC704f7057e9aBE",
    address_a: "0x76721d7dE385beF55F8447C0afC704f7057e9aBE",
    address_b: "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
    denom: "BTC/BNB",
    a_init_fund: 2,
    b_init_fund: 5000,
    timelock: 6000,
    balances: {
      BTC: 2,
      BNB: 5000,
    },
    transactions: [],
    liquidityPositions: [],
  },
];

const commitments = [
  {
    channel_id: "1",
    denom: "ETH/USDC",
    a_init_fund: 5,
    b_init_fund: 2500,
    balance_a: 2.5,
    balance_b: 1250,
    hashcode_a: "hashA",
    hashcode_b: "hashB",
    secret_a: "secretA",
    secret_b: "secretB",
    str_sig_a: "sigA",
    str_sig_b: "sigB",
    tx_byte_for_broadcast: "txByte",
    timelock: 5000,
    nonce: 1,
  },
  {
    channel_id: "2",
    denom: "BTC/BNB",
    a_init_fund: 2,
    b_init_fund: 5000,
    balance_a: 1,
    balance_b: 2500,
    hashcode_a: "hashA2",
    hashcode_b: "hashB2",
    secret_a: "secretA2",
    secret_b: "secretB2",
    str_sig_a: "sigA2",
    str_sig_b: "sigB2",
    tx_byte_for_broadcast: "txByte2",
    timelock: 6000,
    nonce: 2,
  },
];

const orders = [
  {
    id: "1",
    type: "buy",
    status: "open",
    account: "0x12345d7dE385beF55F8447C0afC704f7057e1234",
    referece_id: "ref1",
    denom: "ETH/USDC",
    amount: 5,
    price: 2500,
  },
  {
    id: "2",
    type: "sell",
    status: "closed",
    account: "0x76721d7dE385beF55F8447C0afC704f7057e9aBE",
    referece_id: "ref2",
    denom: "BTC/BNB",
    amount: 2,
    price: 5000,
  },
];

const mnemonics = [
  [
    "brush",
    "swing",
    "cram",
    "width",
    "spoon",
    "visual",
    "typical",
    "recipe",
    "obvious",
    "damp",
    "smart",
    "depend",
  ],
  [
    "moon",
    "galaxy",
    "star",
    "planet",
    "comet",
    "orbit",
    "solar",
    "lunar",
    "space",
    "alien",
    "rocket",
    "satellite",
  ],
];

const nodes = [
  {
    id: "1",
    address: "cosmos164xgenflr89l5q3q20e342z4ezpvyutlygaayf",
    tokens: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        logo: "/coin/bitcoin.png",
        price: "$63.95k",
        change1h: "0.61",
        change24h: "-2.57",
        change7d: "-4.32",
        volume24h: "$20.22B",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/coin/ethereum.png",
        price: "$3.5k",
        change1h: "1.1",
        change24h: "-1.94",
        change7d: "-0.08",
        volume24h: "$13.27B",
      },
      {
        id: "3",
        name: "Tether",
        symbol: "USDT",
        logo: "/coin/cardano.png",
        price: "$0.998",
        change1h: "0.03",
        change24h: "-0.08",
        change7d: "-0.06",
        volume24h: "$34.04B",
      },
      {
        id: "4",
        name: "BNB",
        symbol: "BNB",
        logo: "/coin/binance.png",
        price: "$585.21",
        change1h: "0.68",
        change24h: "-2.7",
        change7d: "-3.65",
        volume24h: "$923.73M",
      },
      {
        id: "5",
        name: "Solana",
        symbol: "SOL",
        logo: "/coin/solana.png",
        price: "$132.16",
        change1h: "0.85",
        change24h: "-3.85",
        change7d: "-10.55",
        volume24h: "$1.98B",
      },
      {
        id: "6",
        name: "Lido Staked Ether",
        symbol: "STETH",
        logo: "/coin/shiba-inu.png",
        price: "$3.5k",
        change1h: "1.01",
        change24h: "-1.99",
        change7d: "-0.15",
        volume24h: "$61.87M",
      },
      {
        id: "7",
        name: "USD Coin",
        symbol: "USDC",
        logo: "/coin/usdc.png",
        price: "$0.999",
        change1h: "-0.06",
        change24h: "-0.04",
        change7d: "-0.04",
        volume24h: "$4.37B",
      },
      {
        id: "8",
        name: "XRP",
        symbol: "XRP",
        logo: "/coin/ripple.png",
        price: "$0.488",
        change1h: "0.33",
        change24h: "-1.29",
        change7d: "2.58",
        volume24h: "$827.27M",
      },
      {
        id: "9",
        name: "Dogecoin",
        symbol: "DOGE",
        logo: "/coin/dogecoin.png",
        price: "$0.124",
        change1h: "1.21",
        change24h: "-0.8",
        change7d: "-12.61",
        volume24h: "$615.12M",
      },
      {
        id: "10",
        name: "Toncoin",
        symbol: "TON",
        logo: "/coin/usdt.png",
        price: "$7.12",
        change1h: "1.13",
        change24h: "-0.84",
        change7d: "-10.44",
        volume24h: "$374.47M",
      },
    ],
    liquidityPools: [
      {
        id: "1",
        tokenA: "ETH",
        tokenB: "USDC",
        totalLiquidityTokenA: "1000",
        totalLiquidityTokenB: "4000",
        totalLiquidityTokens: "5000",
        transactions: "331.2K",
        tvl: "$292.2M",
        dayVolume: "$6.2M",
        weekVolume: "$149.1M",
        apr: "0.006%",
        liquidityProviderPositions: [
          {
            accountId: "1",
            amountA: "5",
            amountB: "2500",
            liquidityToken: "UNI-V2",
          },
        ],
      },
      {
        id: "2",
        tokenA: "BTC",
        tokenB: "BNB",
        totalLiquidityTokenA: "500",
        totalLiquidityTokenB: "25000",
        totalLiquidityTokens: "3000",
        transactions: "79.0K",
        tvl: "$198.0M",
        dayVolume: "$764.70",
        weekVolume: "$79.9K",
        apr: "0.000%",
        liquidityProviderPositions: [
          {
            accountId: "1",
            amountA: "2",
            amountB: "5000",
            liquidityToken: "UNI-V2",
          },
        ],
      },
      {
        id: "3",
        tokenA: "ETH",
        tokenB: "BTC",
        totalLiquidityTokenA: "300",
        totalLiquidityTokenB: "15000",
        totalLiquidityTokens: "2000",
        transactions: "74.5K",
        tvl: "$165.3M",
        dayVolume: "$1.9M",
        weekVolume: "$48.4M",
        apr: "0.003%",
        liquidityProviderPositions: [
          {
            accountId: "1",
            amountA: "3",
            amountB: "3000",
            liquidityToken: "UNI-V2",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    address: "0x53d284357ec70ce289d6d64134dfac8e511c8a3d",
    tokens: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        logo: "/coin/bitcoin.png",
        price: "$63.95k",
        change1h: "0.61",
        change24h: "-2.57",
        change7d: "-4.32",
        volume24h: "$20.22B",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/coin/ethereum.png",
        price: "$3.5k",
        change1h: "1.1",
        change24h: "-1.94",
        change7d: "-0.08",
        volume24h: "$13.27B",
      },
      {
        id: "3",
        name: "Tether",
        symbol: "USDT",
        logo: "/coin/cardano.png",
        price: "$0.998",
        change1h: "0.03",
        change24h: "-0.08",
        change7d: "-0.06",
        volume24h: "$34.04B",
      },
      {
        id: "4",
        name: "BNB",
        symbol: "BNB",
        logo: "/coin/binance.png",
        price: "$585.21",
        change1h: "0.68",
        change24h: "-2.7",
        change7d: "-3.65",
        volume24h: "$923.73M",
      },
      {
        id: "5",
        name: "Solana",
        symbol: "SOL",
        logo: "/coin/solana.png",
        price: "$132.16",
        change1h: "0.85",
        change24h: "-3.85",
        change7d: "-10.55",
        volume24h: "$1.98B",
      },
      {
        id: "6",
        name: "Lido Staked Ether",
        symbol: "STETH",
        logo: "/coin/shiba-inu.png",
        price: "$3.5k",
        change1h: "1.01",
        change24h: "-1.99",
        change7d: "-0.15",
        volume24h: "$61.87M",
      },
      {
        id: "7",
        name: "USD Coin",
        symbol: "USDC",
        logo: "/coin/usdc.png",
        price: "$0.999",
        change1h: "-0.06",
        change24h: "-0.04",
        change7d: "-0.04",
        volume24h: "$4.37B",
      },
      {
        id: "8",
        name: "XRP",
        symbol: "XRP",
        logo: "/coin/ripple.png",
        price: "$0.488",
        change1h: "0.33",
        change24h: "-1.29",
        change7d: "2.58",
        volume24h: "$827.27M",
      },
    ],
    liquidityPools: [],
  },
  {
    id: "3",
    address: "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
    tokens: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        logo: "/coin/bitcoin.png",
        price: "$63.95k",
        change1h: "0.61",
        change24h: "-2.57",
        change7d: "-4.32",
        volume24h: "$20.22B",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/coin/ethereum.png",
        price: "$3.5k",
        change1h: "1.1",
        change24h: "-1.94",
        change7d: "-0.08",
        volume24h: "$13.27B",
      },
      {
        id: "3",
        name: "Tether",
        symbol: "USDT",
        logo: "/coin/cardano.png",
        price: "$0.998",
        change1h: "0.03",
        change24h: "-0.08",
        change7d: "-0.06",
        volume24h: "$34.04B",
      },
      {
        id: "4",
        name: "BNB",
        symbol: "BNB",
        logo: "/coin/binance.png",
        price: "$585.21",
        change1h: "0.68",
        change24h: "-2.7",
        change7d: "-3.65",
        volume24h: "$923.73M",
      },
      {
        id: "5",
        name: "Solana",
        symbol: "SOL",
        logo: "/coin/solana.png",
        price: "$132.16",
        change1h: "0.85",
        change24h: "-3.85",
        change7d: "-10.55",
        volume24h: "$1.98B",
      },
      {
        id: "6",
        name: "Lido Staked Ether",
        symbol: "STETH",
        logo: "/coin/shiba-inu.png",
        price: "$3.5k",
        change1h: "1.01",
        change24h: "-1.99",
        change7d: "-0.15",
        volume24h: "$61.87M",
      },
      {
        id: "7",
        name: "USD Coin",
        symbol: "USDC",
        logo: "/coin/usdc.png",
        price: "$0.999",
        change1h: "-0.06",
        change24h: "-0.04",
        change7d: "-0.04",
        volume24h: "$4.37B",
      },
      {
        id: "8",
        name: "XRP",
        symbol: "XRP",
        logo: "/coin/ripple.png",
        price: "$0.488",
        change1h: "0.33",
        change24h: "-1.29",
        change7d: "2.58",
        volume24h: "$827.27M",
      },
      {
        id: "9",
        name: "Dogecoin",
        symbol: "DOGE",
        logo: "/coin/dogecoin.png",
        price: "$0.124",
        change1h: "1.21",
        change24h: "-0.8",
        change7d: "-12.61",
        volume24h: "$615.12M",
      },
      {
        id: "10",
        name: "Toncoin",
        symbol: "TON",
        logo: "/coin/usdt.png",
        price: "$7.12",
        change1h: "1.13",
        change24h: "-0.84",
        change7d: "-10.44",
        volume24h: "$374.47M",
      },
    ],
    liquidityPools: [],
  },
  {
    id: "4",
    address: "0xdc76cd25977e0a5ae17155770273ad58648900d3",
    tokens: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        logo: "/coin/bitcoin.png",
        price: "$63.95k",
        change1h: "0.61",
        change24h: "-2.57",
        change7d: "-4.32",
        volume24h: "$20.22B",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/coin/ethereum.png",
        price: "$3.5k",
        change1h: "1.1",
        change24h: "-1.94",
        change7d: "-0.08",
        volume24h: "$13.27B",
      },
      {
        id: "3",
        name: "Tether",
        symbol: "USDT",
        logo: "/coin/cardano.png",
        price: "$0.998",
        change1h: "0.03",
        change24h: "-0.08",
        change7d: "-0.06",
        volume24h: "$34.04B",
      },
      {
        id: "4",
        name: "BNB",
        symbol: "BNB",
        logo: "/coin/binance.png",
        price: "$585.21",
        change1h: "0.68",
        change24h: "-2.7",
        change7d: "-3.65",
        volume24h: "$923.73M",
      },
      {
        id: "5",
        name: "Solana",
        symbol: "SOL",
        logo: "/coin/solana.png",
        price: "$132.16",
        change1h: "0.85",
        change24h: "-3.85",
        change7d: "-10.55",
        volume24h: "$1.98B",
      },
    ],
    liquidityPools: [],
  },
  {
    id: "5",
    address: "0x61edcdf5bb737adffb0c940e9c3f76c82b008a47",
    tokens: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        logo: "/coin/bitcoin.png",
        price: "$63.95k",
        change1h: "0.61",
        change24h: "-2.57",
        change7d: "-4.32",
        volume24h: "$20.22B",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/coin/ethereum.png",
        price: "$3.5k",
        change1h: "1.1",
        change24h: "-1.94",
        change7d: "-0.08",
        volume24h: "$13.27B",
      },
      {
        id: "3",
        name: "Tether",
        symbol: "USDT",
        logo: "/coin/cardano.png",
        price: "$0.998",
        change1h: "0.03",
        change24h: "-0.08",
        change7d: "-0.06",
        volume24h: "$34.04B",
      },
    ],
    liquidityPools: [],
  },
  {
    id: "6",
    address: "0xdc24316b9ae028f1497c275eb9192a3ea0f67022",
    tokens: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        logo: "/coin/bitcoin.png",
        price: "$63.95k",
        change1h: "0.61",
        change24h: "-2.57",
        change7d: "-4.32",
        volume24h: "$20.22B",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/coin/ethereum.png",
        price: "$3.5k",
        change1h: "1.1",
        change24h: "-1.94",
        change7d: "-0.08",
        volume24h: "$13.27B",
      },
      {
        id: "3",
        name: "Tether",
        symbol: "USDT",
        logo: "/coin/cardano.png",
        price: "$0.998",
        change1h: "0.03",
        change24h: "-0.08",
        change7d: "-0.06",
        volume24h: "$34.04B",
      },
      {
        id: "4",
        name: "BNB",
        symbol: "BNB",
        logo: "/coin/binance.png",
        price: "$585.21",
        change1h: "0.68",
        change24h: "-2.7",
        change7d: "-3.65",
        volume24h: "$923.73M",
      },
    ],
  },
  {
    id: "7",
    address: "0x5a52e96bacdabb82fd05763e25335261b270efcb",
    tokens: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        logo: "/coin/bitcoin.png",
        price: "$63.95k",
        change1h: "0.61",
        change24h: "-2.57",
        change7d: "-4.32",
        volume24h: "$20.22B",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/coin/ethereum.png",
        price: "$3.5k",
        change1h: "1.1",
        change24h: "-1.94",
        change7d: "-0.08",
        volume24h: "$13.27B",
      },
      {
        id: "3",
        name: "Tether",
        symbol: "USDT",
        logo: "/coin/cardano.png",
        price: "$0.998",
        change1h: "0.03",
        change24h: "-0.08",
        change7d: "-0.06",
        volume24h: "$34.04B",
      },
      {
        id: "4",
        name: "BNB",
        symbol: "BNB",
        logo: "/coin/binance.png",
        price: "$585.21",
        change1h: "0.68",
        change24h: "-2.7",
        change7d: "-3.65",
        volume24h: "$923.73M",
      },
    ],
  },
  {
    id: "8",
    address: "0x742d35Cc3333C0532925a3b844Bc454e4438f44e",
    tokens: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        logo: "/coin/bitcoin.png",
        price: "$63.95k",
        change1h: "0.61",
        change24h: "-2.57",
        change7d: "-4.32",
        volume24h: "$20.22B",
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        logo: "/coin/ethereum.png",
        price: "$3.5k",
        change1h: "1.1",
        change24h: "-1.94",
        change7d: "-0.08",
        volume24h: "$13.27B",
      },
    ],
  },
];

const orderBooks = [
  {
    id: "1",
    tokenA: "ETH",
    tokenB: "USDC",
    bidsA: [
      { quantity: "5.123", price: "0.124958" },
      { quantity: "10.234", price: "0.124957" },
      { quantity: "15.345", price: "0.124956" },
    ],
    asksA: [
      { quantity: "20.456", price: "0.124959" },
      { quantity: "25.567", price: "0.124960" },
      { quantity: "30.678", price: "0.124961" },
    ],
    tradeHistoryA: [
      { price: "0.124958", amount: "5.123", time: "2023-06-21T10:05:31Z" },
      { price: "0.124957", amount: "10.234", time: "2023-06-21T10:07:45Z" },
      { price: "0.124956", amount: "15.345", time: "2023-06-21T10:10:12Z" },
    ],
    bidsB: [
      { quantity: "25.802", price: "0.024949" },
      { quantity: "0.534", price: "0.024948" },
      { quantity: "1.041", price: "0.024946" },
      { quantity: "254.00", price: "0.024945" },
      { quantity: "12.345", price: "0.024944" },
      { quantity: "43.567", price: "0.024943" },
      { quantity: "7.890", price: "0.024942" },
      { quantity: "98.765", price: "0.024941" },
      { quantity: "54.321", price: "0.024940" },
      { quantity: "6.789", price: "0.024939" },
      { quantity: "1.234", price: "0.024938" },
      { quantity: "3.456", price: "0.024937" },
    ],
    asksB: [
      { quantity: "25.362", price: "0.024953" },
      { quantity: "0.893", price: "0.024955" },
      { quantity: "10.897", price: "0.024960" },
      { quantity: "2.168", price: "0.024961" },
      { quantity: "4.321", price: "0.024962" },
      { quantity: "7.654", price: "0.024963" },
      { quantity: "8.765", price: "0.024964" },
      { quantity: "5.432", price: "0.024965" },
      { quantity: "1.678", price: "0.024966" },
      { quantity: "2.345", price: "0.024967" },
      { quantity: "4.567", price: "0.024968" },
      { quantity: "6.789", price: "0.024969" },
    ],
    tradeHistoryB: [
      { price: "0.024945", amount: "25.802", time: "2023-06-21T10:05:31Z" },
      { price: "0.024946", amount: "1.041", time: "2023-06-21T10:07:45Z" },
      { price: "0.024953", amount: "25.362", time: "2023-06-21T10:10:12Z" },
      { price: "0.024955", amount: "0.893", time: "2023-06-21T10:11:22Z" },
      { price: "0.024946", amount: "3.567", time: "2023-06-21T10:13:45Z" },
      { price: "0.024947", amount: "4.321", time: "2023-06-21T10:15:12Z" },
      { price: "0.024948", amount: "5.432", time: "2023-06-21T10:17:22Z" },
      { price: "0.024949", amount: "6.789", time: "2023-06-21T10:19:31Z" },
      { price: "0.024950", amount: "7.890", time: "2023-06-21T10:21:45Z" },
    ],
  },
];

const tokens = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/coin/bitcoin.png",
    price: "$63.95k",
    change1h: "0.61",
    change24h: "-2.57",
    change7d: "-4.32",
    volume24h: "$20.22B",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    logo: "/coin/ethereum.png",
    price: "$3.5k",
    change1h: "1.1",
    change24h: "-1.94",
    change7d: "-0.08",
    volume24h: "$13.27B",
  },
  {
    id: "3",
    name: "Tether",
    symbol: "USDT",
    logo: "/coin/cardano.png",
    price: "$0.998",
    change1h: "0.03",
    change24h: "-0.08",
    change7d: "-0.06",
    volume24h: "$34.04B",
  },
  {
    id: "4",
    name: "BNB",
    symbol: "BNB",
    logo: "/coin/binance.png",
    price: "$585.21",
    change1h: "0.68",
    change24h: "-2.7",
    change7d: "-3.65",
    volume24h: "$923.73M",
  },
  {
    id: "5",
    name: "Solana",
    symbol: "SOL",
    logo: "/coin/solana.png",
    price: "$132.16",
    change1h: "0.85",
    change24h: "-3.85",
    change7d: "-10.55",
    volume24h: "$1.98B",
  },
  {
    id: "6",
    name: "Lido Staked Ether",
    symbol: "STETH",
    logo: "/coin/shiba-inu.png",
    price: "$3.5k",
    change1h: "1.01",
    change24h: "-1.99",
    change7d: "-0.15",
    volume24h: "$61.87M",
  },
  {
    id: "7",
    name: "USD Coin",
    symbol: "USDC",
    logo: "/coin/usdc.png",
    price: "$0.999",
    change1h: "-0.06",
    change24h: "-0.04",
    change7d: "-0.04",
    volume24h: "$4.37B",
  },
  {
    id: "8",
    name: "XRP",
    symbol: "XRP",
    logo: "/coin/ripple.png",
    price: "$0.488",
    change1h: "0.33",
    change24h: "-1.29",
    change7d: "2.58",
    volume24h: "$827.27M",
  },
  {
    id: "9",
    name: "Dogecoin",
    symbol: "DOGE",
    logo: "/coin/dogecoin.png",
    price: "$0.124",
    change1h: "1.21",
    change24h: "-0.8",
    change7d: "-12.61",
    volume24h: "$615.12M",
  },
  {
    id: "10",
    name: "Toncoin",
    symbol: "TON",
    logo: "/coin/usdt.png",
    price: "$7.12",
    change1h: "1.13",
    change24h: "-0.84",
    change7d: "-10.44",
    volume24h: "$374.47M",
  },
];

mock.onGet(`${API_URL}/accounts`).reply(200, accounts);
mock.onPost(`${API_URL}/mnemonics`).reply(200, mnemonics);
mock.onGet(`${API_URL}/tokens`).reply(200, tokens);
mock.onGet(`${API_URL}/exchangeRate`).reply(200, { rate: 3037.73 });
mock.onGet(`${API_URL}/fees`).reply(200, { fee: 0.25 });
mock.onGet(`${API_URL}/orderBooks`).reply(200, orderBooks);

mock.onGet(new RegExp(`${API_URL}/nodes`)).reply((config) => {
  const { address } = config.params || {};
  if (address) {
    const filteredNodes = nodes.filter((node) =>
      node.address.toLowerCase().includes(address.toLowerCase()),
    );
    return [200, filteredNodes];
  }
  return [200, nodes];
});

mock.onGet(new RegExp(`${API_URL}/accounts`)).reply((config) => {
  const { address } = config.params || {};
  if (address) {
    const account = accounts.find((acc) => acc.address === address);
    return [200, account ? [account] : []];
  }
  return [200, accounts];
});

mock.onGet(new RegExp(`${API_URL}/accounts/*`)).reply((config) => {
  const accountId = config.url.split("/").pop();
  const account = accounts.find((acc) => acc.id === accountId);
  return [200, account || null];
});

mock.onPut(new RegExp(`${API_URL}/accounts/*`)).reply((config) => {
  const updatedAccount = JSON.parse(config.data);
  const index = accounts.findIndex(
    (account) => account.id === updatedAccount.id,
  );
  if (index !== -1) {
    accounts[index] = updatedAccount;
  }
  return [200, updatedAccount];
});

mock.onPost(`${API_URL}/accounts`).reply((config) => {
  const newAccount = JSON.parse(config.data);
  newAccount.id = (accounts.length + 1).toString();
  accounts.push(newAccount);
  return [201, newAccount];
});

mock.onPost(`${API_URL}/channels`).reply((config) => {
  const newChannel = JSON.parse(config.data);
  newChannel.id = (channels.length + 1).toString();
  channels.push(newChannel);
  return [201, newChannel];
});

mock.onPost(`${API_URL}/checkAccount`).reply((config) => {
  const { mnemonic, password } = JSON.parse(config.data);
  const account = accounts.find(
    (acc) =>
      JSON.stringify(acc.mnemonic) === JSON.stringify(mnemonic) &&
      acc.passcode === password,
  );
  return account ? [200, account] : [404, { message: "Account not found" }];
});

mock.onPost(`${API_URL}/checkNodeConnection`).reply((config) => {
  const { accountAddress, nodeAddress } = JSON.parse(config.data);
  const channel = channels.find(
    (channel) =>
      (channel.address_a === accountAddress &&
        channel.address_b === nodeAddress) ||
      (channel.address_a === nodeAddress &&
        channel.address_b === accountAddress),
  );
  return channel ? [200, { connected: true }] : [200, { connected: false }];
});

mock.onPost(`${API_URL}/transactions`).reply((config) => {
  const newTransaction = JSON.parse(config.data);
  const accountIndex = accounts.findIndex(
    (account) => account.address === newTransaction.address,
  );

  if (accountIndex !== -1) {
    accounts[accountIndex].transactions =
      accounts[accountIndex].transactions || [];
    accounts[accountIndex].transactions.push(newTransaction);
    return [201, newTransaction];
  }

  return [404, { message: "Account not found" }];
});

mock.onPost(`${API_URL}/checkPool`).reply((config) => {
  const { nodeAddress, fromToken, toToken } = JSON.parse(config.data);
  const node = nodes.find((n) => n.address === nodeAddress);
  if (node) {
    const pool = node.liquidityPools.find(
      (p) =>
        (p.tokenA === fromToken && p.tokenB === toToken) ||
        (p.tokenA === toToken && p.tokenB === fromToken),
    );
    if (pool) {
      const priceFromTo = (
        pool.totalLiquidityTokenA / pool.totalLiquidityTokenB
      ).toFixed(4);
      const priceToFrom = (
        pool.totalLiquidityTokenB / pool.totalLiquidityTokenA
      ).toFixed(4);
      const poolShare =
        (
          ((pool.totalLiquidityTokenA + pool.totalLiquidityTokenB) /
            pool.totalLiquidityTokens) *
          100
        ).toFixed(2) + "%";
      return [200, { poolExists: true, priceFromTo, priceToFrom, poolShare }];
    }
    return [200, { poolExists: false }];
  }
  return [404, { message: "Node not found" }];
});

mock.onPost(`${API_URL}/initialLiquidity`).reply((config) => {
  const {
    accountId,
    nodeAddress,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    fee,
  } = JSON.parse(config.data);

  let node = nodes.find((node) => node.address === nodeAddress);
  if (!node) return [404, { message: "Node not found" }];

  const newPool = {
    id: Date.now().toString(),
    tokenA: fromToken,
    tokenB: toToken,
    totalLiquidityTokenA: parseFloat(fromAmount),
    totalLiquidityTokenB: parseFloat(toAmount),
    totalLiquidityTokens: (
      parseFloat(fromAmount) + parseFloat(toAmount)
    ).toString(),
    transactions: 0,
    tvl: (parseFloat(fromAmount) + parseFloat(toAmount)).toString(),
    dayVolume: 0,
    weekVolume: 0,
    apr: fee,
    liquidityProviderPositions: [
      {
        accountId,
        amountA: fromAmount,
        amountB: toAmount,
        liquidityToken: "UNI-V2",
      },
    ],
  };

  node.liquidityPools.push(newPool);
  return [
    201,
    {
      success: true,
      priceFromTo: (fromAmount / toAmount).toFixed(4),
      priceToFrom: (toAmount / fromAmount).toFixed(4),
      poolShare: "100%",
    },
  ];
});

mock.onPost(`${API_URL}/liquidity`).reply((config) => {
  const { accountId, nodeAddress, fromToken, toToken, fromAmount, toAmount } =
    JSON.parse(config.data);

  let node = nodes.find((node) => node.address === nodeAddress);
  if (!node) return [404, { message: "Node not found" }];

  let pool = node.liquidityPools.find(
    (pool) =>
      (pool.tokenA === fromToken && pool.tokenB === toToken) ||
      (pool.tokenA === toToken && pool.tokenB === fromToken),
  );

  if (!pool) return [404, { message: "Pool not found" }];

  pool.totalLiquidityTokenA += parseFloat(fromAmount);
  pool.totalLiquidityTokenB += parseFloat(toAmount);
  pool.totalLiquidityTokens = (
    parseFloat(pool.totalLiquidityTokens) +
    parseFloat(fromAmount) +
    parseFloat(toAmount)
  ).toString();
  pool.tvl = (
    parseFloat(pool.tvl) +
    parseFloat(fromAmount) +
    parseFloat(toAmount)
  ).toString();

  let providerPosition = pool.liquidityProviderPositions.find(
    (position) => position.accountId === accountId,
  );
  if (providerPosition) {
    providerPosition.amountA = (
      parseFloat(providerPosition.amountA) + parseFloat(fromAmount)
    ).toString();
    providerPosition.amountB = (
      parseFloat(providerPosition.amountB) + parseFloat(toAmount)
    ).toString();
  } else {
    pool.liquidityProviderPositions.push({
      accountId,
      amountA: fromAmount,
      amountB: toAmount,
      liquidityToken: "UNI-V2",
    });
  }

  const priceFromTo = (
    pool.totalLiquidityTokenA / pool.totalLiquidityTokenB
  ).toFixed(4);
  const priceToFrom = (
    pool.totalLiquidityTokenB / pool.totalLiquidityTokenA
  ).toFixed(4);
  const poolShare =
    (
      ((parseFloat(fromAmount) + parseFloat(toAmount)) /
        parseFloat(pool.totalLiquidityTokens)) *
      100
    ).toFixed(2) + "%";

  return [201, { success: true, priceFromTo, priceToFrom, poolShare }];
});

mock.onGet(new RegExp(`${API_URL}/channels`)).reply((config) => {
  const { accountAddress, nodeAddress } = config.params || {};
  const channel = channels.find(
    (channel) =>
      (channel.address_a === accountAddress &&
        channel.address_b === nodeAddress) ||
      (channel.address_a === nodeAddress &&
        channel.address_b === accountAddress),
  );
  return [200, channel || {}];
});

mock.onGet(new RegExp(`${API_URL}/orderBook`)).reply((config) => {
  const { orderBookId, token } = config.params || {};
  const orderBook = orderBooks.find((ob) => ob.id === orderBookId);
  if (!orderBook) {
    return [404, { message: "Order book not found" }];
  }

  const bids = token === "A" ? orderBook.bidsA : orderBook.bidsB;
  const asks = token === "A" ? orderBook.asksA : orderBook.asksB;
  const tradeHistory =
    token === "A" ? orderBook.tradeHistoryA : orderBook.tradeHistoryB;

  return [200, { ...orderBook, bids, asks, tradeHistory }];
});

mock.onGet(`${API_URL}/searchOrderBooks`).reply((config) => {
  const { searchQuery } = config.params || {};
  let filteredOrderBooks = orderBooks;

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredOrderBooks = orderBooks.filter(
      (ob) =>
        ob.tokenA.toLowerCase().includes(query) ||
        ob.tokenB.toLowerCase().includes(query),
    );
  }

  return [200, filteredOrderBooks];
});

mock.onPost(`${API_URL}/orders`).reply((config) => {
  const { orderBookId, type, token, price, amount } = JSON.parse(config.data);
  const orderBook = orderBooks[orderBookId];
  if (!orderBook) {
    return [404, { message: "Order book not found" }];
  }

  const newOrder = { quantity: amount, price };
  if (type === "buy") {
    orderBook[`bids${token}`].push(newOrder);
  } else {
    orderBook[`asks${token}`].push(newOrder);
  }
  return [201, { success: true }];
});

// API functions
export const generateMnemonic = async () => {
  try {
    const response = await axiosClient.post(`${API_URL}/mnemonics`);
    return response.data;
  } catch (error) {
    console.error("Error generate mnemonic:", error);
    throw error;
  }
};

export const getAccounts = async () => {
  try {
    const response = await axiosClient.get(`${API_URL}/accounts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await axiosClient.get(`${API_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account by id:", error);
    throw error;
  }
};

export const getAccountByAddress = async (address) => {
  try {
    const response = await axiosClient.get(`${API_URL}/accounts`, {
      params: { address },
    });
    return response.data[0];
  } catch (error) {
    console.error("Error fetching account by address:", error);
    throw error;
  }
};

export const getNodes = async (accountId) => {
  try {
    const response = await axiosClient.get(`${API_URL}/nodes`, {
      params: { accountId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching nodes:", error);
    throw error;
  }
};

export const getTokens = async () => {
  try {
    const response = await axiosClient.get(`${API_URL}/tokens`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
};

export const getExchangeRate = async () => {
  try {
    const response = await axiosClient.get(`${API_URL}/exchangeRate`);
    return response.data.rate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
};

export const getFees = async () => {
  try {
    const response = await axiosClient.get(`${API_URL}/fees`);
    return response.data.fee;
  } catch (error) {
    console.error("Error fetching fees:", error);
    throw error;
  }
};

export const getTransactions = async (accountAddress, nodeAddress) => {
  try {
    const channel = channels.find(
      (channel) =>
        (channel.address_a === accountAddress &&
          channel.address_b === nodeAddress) ||
        (channel.address_a === nodeAddress &&
          channel.address_b === accountAddress),
    );
    return channel ? channel.transactions : [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getBalances = async (accountAddress, nodeAddress) => {
  try {
    const channel = channels.find(
      (channel) =>
        (channel.address_a === accountAddress &&
          channel.address_b === nodeAddress) ||
        (channel.address_a === nodeAddress &&
          channel.address_b === accountAddress),
    );
    return channel ? channel.balances : {};
  } catch (error) {
    console.error("Error fetching balances:", error);
    throw error;
  }
};

export const getPools = async (nodeAddress) => {
  try {
    const node = nodes.find((n) => n.address === nodeAddress);
    return node ? node.liquidityPools : [];
  } catch (error) {
    console.error("Error fetching pools:", error);
    throw error;
  }
};

export const getPoolsFromChannel = async (accountAddress, nodeAddress) => {
  try {
    return channels[0].liquidityPositions;
  } catch (error) {
    console.error("Error fetching pools from channel:", error);
    throw error;
  }
};

export const connectNode = async (accountAddress, nodeAddress) => {
  try {
    const existingChannel = channels.find(
      (channel) =>
        (channel.address_a === accountAddress &&
          channel.address_b === nodeAddress) ||
        (channel.address_a === nodeAddress &&
          channel.address_b === accountAddress),
    );

    if (!existingChannel) {
      const newChannel = {
        multsig: "some_multisig_address",
        address_a: accountAddress,
        address_b: nodeAddress,
        denom: "default_denom",
        a_init_fund: 0,
        b_init_fund: 0,
        timelock: 0,
      };
      await axiosClient.post(`${API_URL}/channels`, newChannel);
    }

    const accountIndex = accounts.findIndex(
      (account) => account.address === accountAddress,
    );
    if (accountIndex !== -1) {
      accounts[accountIndex].connectedNodeAddress = nodeAddress;
      accounts[accountIndex].connected = true;
      await axiosClient.put(
        `${API_URL}/accounts/${accounts[accountIndex].id}`,
        accounts[accountIndex],
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Error connecting node:", error);
    throw error;
  }
};

export const checkNodeConnection = async (accountAddress, nodeAddress) => {
  try {
    const response = await axiosClient.post(`${API_URL}/checkNodeConnection`, {
      accountAddress,
      nodeAddress,
    });
    return response.data.connected;
  } catch (error) {
    console.error("Error checking node connection:", error);
    throw error;
  }
};

export const searchNodes = async (query) => {
  try {
    const response = await axiosClient.get(`${API_URL}/nodes`, {
      params: { address: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching nodes:", error);
    throw error;
  }
};

export const clearConnectedNodeAddress = async (accountId) => {
  try {
    const accountIndex = accounts.findIndex(
      (account) => account.id === accountId,
    );
    if (accountIndex !== -1) {
      accounts[accountIndex].connectedNodeAddress = "";
      accounts[accountIndex].connected = false;
      await axiosClient.put(
        `${API_URL}/accounts/${accountId}`,
        accounts[accountIndex],
      );
    }
    return { success: true };
  } catch (error) {
    console.error("Error clearing connected node address:", error);
    throw error;
  }
};

export const createAccount = async (newAccount) => {
  try {
    const response = await axiosClient.post(`${API_URL}/accounts`, newAccount);
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const updateAccount = async (account) => {
  try {
    const response = await axiosClient.put(
      `${API_URL}/accounts/${account.id}`,
      account,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};

export const checkAccount = async (mnemonic, password) => {
  try {
    const response = await axiosClient.post(`${API_URL}/checkAccount`, {
      mnemonic,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error checking account:", error);
    throw error;
  }
};

export const createTransaction = async (transaction) => {
  try {
    const response = await axiosClient.post(
      `${API_URL}/transactions`,
      transaction,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const addInitialLiquidity = async (data) => {
  try {
    const response = await axiosClient.post(
      `${API_URL}/initialLiquidity`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error adding initial liquidity:", error);
    throw error;
  }
};

export const addLiquidity = async (data) => {
  try {
    const response = await axiosClient.post(`${API_URL}/liquidity`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding liquidity:", error);
    throw error;
  }
};

export const checkPool = async (data) => {
  try {
    const response = await axiosClient.post(`${API_URL}/checkPool`, data);
    return response.data;
  } catch (error) {
    console.error("Error checking pool:", error);
    throw error;
  }
};

export const getOrderBook = async (orderBookId, token) => {
  try {
    const response = await axiosClient.get(`${API_URL}/orderBook`, {
      params: { orderBookId, token },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order book:", error);
    throw error;
  }
};

export const submitOrder = async (data) => {
  try {
    const response = await axiosClient.post(`${API_URL}/orders`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrderBooks = async () => {
  try {
    const response = await axiosClient.get(`${API_URL}/orderBooks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order books:", error);
    throw error;
  }
};

export const searchOrderBooks = async (searchQuery) => {
  try {
    const response = await axiosClient.get(`${API_URL}/searchOrderBooks`, {
      params: { searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching order books:", error);
    throw error;
  }
};

export default mock;
