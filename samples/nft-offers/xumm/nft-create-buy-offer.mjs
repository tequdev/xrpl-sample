import { Xumm } from "xumm"
const xumm = new Xumm("api-key", "api-secret")

const payload = await xumm.payload.create({
  TransactionType: "NFTokenCreateOffer",
  Account: "rs8jBmmfpwgmrSPgwMsh7CvKRmRt1JTVSX",
  NFTokenID: "000100001E962F495F07A990F4ED55ACCFEEF365DBAA76B6A048C0A200000007",
  Amount: "1000000",
  Destination: "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
})
console.log(payload.next.always)
