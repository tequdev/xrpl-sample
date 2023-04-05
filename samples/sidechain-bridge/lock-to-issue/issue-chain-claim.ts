import { Client, Wallet, xrpToDrops } from "xrpl";

const client = new Client("wss://sidechain-net2.devnet.rippletest.net:51233");
const issueWallet = Wallet.fromSecret("shecVzCqMcxLvpAqHjiuGQcYw3eW1");
const main = async () => {
  await client.connect();
  const response = await client.submitAndWait(
    {
      Account: issueWallet.address,
      TransactionType: "XChainClaim",
      Amount: xrpToDrops(100),
      Destination: issueWallet.address,
      XChainClaimID: "1ae".padStart(16, "0").toUpperCase(),
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
    { wallet: issueWallet }
  );
  console.log(response.result);
};

main();
