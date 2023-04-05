import { Client } from "xrpl";

const lockClient = new Client(
  "wss://sidechain-net1.devnet.rippletest.net:51233"
);
const issueClient = new Client(
  "wss://sidechain-net2.devnet.rippletest.net:51233"
);

const main = async () => {
  await lockClient.connect();
  const res1 = await lockClient.request({
    command: "ledger_entry",
    bridge_account: "rMAXACCrp3Y8PpswXcg3bKggHX76V3F8M4",
  });
  console.log(res1.result.node);

  await issueClient.connect();
  const res2 = await issueClient.request({
    command: "ledger_entry",
    bridge_account: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
  });
  console.log(res2.result.node);
};

main();
