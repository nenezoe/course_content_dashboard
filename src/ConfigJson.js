import * as nearAPI from "near-api-js";
const { keyStores } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

const ConfigJson = {
  networkId: "mainnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org"
};

export default ConfigJson;
