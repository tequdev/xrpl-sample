import { Client, Wallet, xrpToDrops } from "xrpl";

const client = new Client("wss://sidechain-net1.devnet.rippletest.net:51233");
const lockWallet = Wallet.fromSecret("snXzk7Y78C4Xa3Ktwumb9AmbjqCxH");
const main = async () => {
  await client.connect();
  const response = await client.submitAndWait(
    {
      Account: lockWallet.address,
      TransactionType: "XChainCommit",
      Amount: xrpToDrops(100),
      XChainClaimID:  '1ae'.padStart(16,'0').toUpperCase(),
      XChainBridge: {
        IssuingChainDoor: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
        IssuingChainIssue: {
          currency: "XRP",
        },
        LockingChainDoor: "rMAXACCrp3Y8PpswXcg3bKggHX76V3F8M4",
        LockingChainIssue: {
          currency: "XRP",
        },
      },
    },
    { wallet: lockWallet }
  );
  console.log(response.result)
};

main();
