import BigNumber from 'bignumber.js';
import { BookOffer, Client, SubscribeRequest } from 'xrpl'
import { BaseResponse } from 'xrpl/dist/npm/models/methods/baseMethod';

const client = new Client('wss://xrpl.ws');

interface BothOrderBookResponse extends BaseResponse {
  result: {
    asks: BookOffer[]
    bids: BookOffer[]
  }
}

const main = async () => {
  await client.connect();
  const response = await client.request<SubscribeRequest,BothOrderBookResponse>({
    command: 'subscribe',
    books: [
      {
        taker_pays: { currency: 'XRP' },
        taker_gets: { issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B', currency: 'USD' },
        snapshot: true,
        both: true,
      } as any,
    ],
  });
  
  // client.on('transaction', message => {
  //   console.log(message)
  // })
  
  const asks = response.result.asks.map((ask) => {
    return {
      price: BigNumber(ask.quality!).multipliedBy(1000000).toString(),
      amount: BigNumber(ask.TakerGets as string).dividedBy(1000000).toString()
    }
  })
  
  const bids = response.result.bids.map((ask) => {
    return {
      price: BigNumber(1).dividedBy(BigNumber(ask.quality!)).multipliedBy(1000000).toString(),
      amount: BigNumber(ask.TakerPays as string).dividedBy(1000000).toString()
    }
  })
  
  asks.reverse().forEach(ask => {
    console.log(((ask.amount + Array(25).join(' ')).slice(0, 24)) + (ask.price + Array(20).join(' ')).slice(0, 20))
  })
  console.log('===========================================================')
  bids.forEach(bid => {
    console.log(Array(25).join(' ') + (bid.price + Array(20).join(' ')).slice(0, 20) + bid.amount)
  })
  
};

main();
