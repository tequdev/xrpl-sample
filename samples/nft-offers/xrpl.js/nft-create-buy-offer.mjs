import { Client, Wallet } from "xrpl";

const client = new Client("wss://testnet.xrpl-labs.com");
const wallet = Wallet.fromSeed('s....');

await client.connect();
const response = await client.submitAndWait(
  {
    TransactionType: "NFTokenCreateOffer",
    Account: "rs8jBmmfpwgmrSPgwMsh7CvKRmRt1JTVSX",
    NFTokenID:
      "000100001E962F495F07A990F4ED55ACCFEEF365DBAA76B6A048C0A200000007",
    Amount: "1000000",
    Destination: "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
  },
  { wallet }
);
console.log(response.result);

