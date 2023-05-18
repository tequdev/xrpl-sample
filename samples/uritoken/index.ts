// @ts-nocheck
import { AccountObjectsResponse, AccountObjectsRequest, Client, Wallet, convertStringToHex, xrpToDrops, URITokenMintFlags } from '@transia/xrpl'

const client = new Client('wss://hooks-testnet-v3.xrpl-labs.com')
const wallet1 = Wallet.fromSeed('ssc6uMnPfzMGXAVX2vVMwJbVrxdxD')
const wallet2 = Wallet.fromSeed('saDHbKb8CBSgvAVuk5Bgayimq7vwn')

const main = async () => {
  await client.connect()
  console.log(`wallet1: ${wallet1.address}`)
  console.log(`wallet2: ${wallet2.address}`)

  const networkId = await client.getNetworkID()

  await client.submitAndWait({
    TransactionType: 'URITokenMint',
    Account: wallet1.address,
    URI: convertStringToHex('https://example.com'),
    Flags: URITokenMintFlags.tfBurnable,
    NetworkID: networkId,
  }, { wallet: wallet1 })

  const accountObjectsResponse = await client.request<AccountObjectsRequest, AccountObjectsResponse>({
    command: 'account_objects',
    account: wallet1.address,
    ledger_index: 'validated',
  })
  const objects = accountObjectsResponse.result.account_objects.filter((obj) => {
    return obj.LedgerEntryType === 'URIToken'
  })
  const uriTokenId = objects[0].index
  await client.submitAndWait({
    TransactionType: 'URITokenCreateSellOffer',
    Account: wallet1.address,
    URITokenID: uriTokenId,
    Amount: xrpToDrops(10),
    NetworkID: networkId,
  }, { wallet: wallet1 })

  await client.submitAndWait({
    TransactionType: 'URITokenBuy',
    Account: wallet2.address,
    Amount: xrpToDrops(11),
    URITokenID: uriTokenId,
    NetworkID: networkId,
  }, { wallet: wallet2 })

  await client.submitAndWait({
    TransactionType: "URITokenBurn",
    Account: wallet1.address,
    URITokenID: uriTokenId,
    NetworkID: networkId,
  }, { wallet: wallet1 })
}

main()
