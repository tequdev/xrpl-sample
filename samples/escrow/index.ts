import {
  Client,
  EscrowCreate,
  EscrowFinish,
  isoTimeToRippleTime,
  Wallet,
  xrpToDrops,
} from "xrpl";
const cc = require('five-bells-condition')
import crypto from 'crypto'


const client = new Client("wss://testnet.xrpl-labs.com");

const preimageData = crypto.randomBytes(32)
const myFulfillment = new cc.PreimageSha256()
myFulfillment.setPreimage(preimageData)

const condition = myFulfillment.getConditionBinary().toString('hex').toUpperCase()
console.log('Condition:', condition)

const fulfillment = myFulfillment.serializeBinary().toString('hex').toUpperCase()
console.log('Fulfillment:', fulfillment)

const senderWallet = Wallet.fromSeed("sEd7YTXBPGznwig7HDccWuCJniBcJJa");
// raLKKuLCZPsZuPZCEy6LhtRH3UamQ6kaHK

const receiverWallet = Wallet.fromSeed("sEdSjhhqsFcwvJbcTKXjCDHFCScxwnp");
// rGFJLzA7J7HouwYPfQb88EX61AAi2BYPjo

async function escrow() {
  await client.connect();

  const escrowCreate: EscrowCreate = {
    TransactionType: "EscrowCreate",
    Account: "raLKKuLCZPsZuPZCEy6LhtRH3UamQ6kaHK",
    Destination: "rGFJLzA7J7HouwYPfQb88EX61AAi2BYPjo",
    Amount: xrpToDrops(100),
    CancelAfter: isoTimeToRippleTime("2023-04-01T00:00:00Z"),
    Condition: condition,
  };

  const responseCreate = await client.submitAndWait(escrowCreate, {
    wallet: senderWallet,
  });

  console.log("Created escrow:", responseCreate.result.hash);

  const txResponse = await client.request({
    command: "tx",
    transaction: responseCreate.result.hash,
  });

  const escrowFinish: EscrowFinish = {
    TransactionType: "EscrowFinish",
    Account: "rGFJLzA7J7HouwYPfQb88EX61AAi2BYPjo",
    Owner: "raLKKuLCZPsZuPZCEy6LhtRH3UamQ6kaHK",
    OfferSequence: txResponse.result.Sequence!,
    Condition: condition,
    Fulfillment: fulfillment,
    Fee: '500'
  };
  const responseFinish = await client.submitAndWait(escrowFinish, {
    wallet: receiverWallet,
  });

  console.log("Finished escrow:", responseFinish.result.hash);

  await client.disconnect();
}

escrow();
