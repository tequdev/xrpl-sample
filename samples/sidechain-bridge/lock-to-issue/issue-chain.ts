import { Client, Wallet } from "xrpl";

const client = new Client("wss://sidechain-net2.devnet.rippletest.net:51233");
const issueWallet = Wallet.fromSecret("shecVzCqMcxLvpAqHjiuGQcYw3eW1");
const lockWallet = Wallet.fromSecret("snXzk7Y78C4Xa3Ktwumb9AmbjqCxH");
const main = async () => {
  await client.connect();
  const response = await client.submitAndWait(
    {
      Account: issueWallet.address,
      TransactionType: "XChainCreateClaimID",
      OtherChainSource: lockWallet.address,
      SignatureReward: "100",
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
