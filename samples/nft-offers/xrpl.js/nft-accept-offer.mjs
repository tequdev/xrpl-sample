import { Client, Wallet } from "xrpl";

const client = new Client("wss://testnet.xrpl-labs.com");
const wallet = Wallet.fromSeed("s....");

await client.connect();
const response = await client.submitAndWait(
  {
    TransactionType: "NFTokenAccecptOffer",
    Account: "rs8jBmmfpwgmrSPgwMsh7CvKRmRt1JTVSX",
    NFTokenSellOffer:
      "68CD1F6F906494EA08C9CB5CAFA64DFA90D4E834B7151899B73231DE5A0C3B77",
  },
  { wallet }
);
console.log(response.result);
