import { Xumm } from "xumm";
const xumm = new Xumm("api-key", "api-secret");

const payload = await xumm.payload.create({
  TransactionType: "NFTokenAccecptOffer",
  Account: "rs8jBmmfpwgmrSPgwMsh7CvKRmRt1JTVSX",
  NFTokenSellOffer:
    "68CD1F6F906494EA08C9CB5CAFA64DFA90D4E834B7151899B73231DE5A0C3B77",
});
console.log(payload.next.always);
