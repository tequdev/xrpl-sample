import { Client, Wallet, xrpToDrops } from 'xrpl'

const secret = 'sEd7NDqodzbvLxtZHaWTsHB7yJQniHu' // rGNNciFFFiyV4ZuAUk4QizcaYyY4T9Yzft

const wallet = Wallet.fromSecret(secret)
const client = new Client('wss://testnet.xrpl-labs.com')

const createOffer = async () => {
  await client.submitAndWait({
    TransactionType: 'OfferCreate',
    Account: wallet.address,
    TakerGets: xrpToDrops(100),
    TakerPays: {
      currency: "TST",
      issuer: "r3De1gWJjUQhU7jKpjFaTZFVTX8qWQUWnX",
      value: "100",
    }
  }, { wallet })
}

const getOrderBook = async () => {
  const response = await client.request({
    command: 'book_offers',
    taker_gets: {
      currency: "XRP"
    },
    taker_pays: {
      currency: "TST",
      issuer: "r3De1gWJjUQhU7jKpjFaTZFVTX8qWQUWnX",
    },
  })
  console.log(response.result.offers)
}

const cancelOffer = async () => {
  await client.submitAndWait({
    TransactionType: 'OfferCancel',
    Account: wallet.address,
    OfferSequence: 35104587
  }, { wallet })
}

const main = async () => {
  await client.connect()
  // await createOffer()
  await getOrderBook()
  // await cancelOffer()
}

main()
