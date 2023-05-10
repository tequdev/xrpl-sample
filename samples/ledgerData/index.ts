const { Client } = require("xrpl")

// メインネットノードに接続(今回はサンプルのため公開ノードを使用)
const client = new Client("wss://xrplcluster.com")

const main = async () => {

  await client.connect()

  let fetchsize = 0
  let response
  let ledger_index = "validated"
  let marker

  do {
    response = await client.request({
      command: "ledger_data",
      ledger_index,
      limit: 10,
      marker,
    })
    // "validated"で取得したレジャー番号を次の取得時に使用する
    ledger_index = response.result.ledger_index
    marker = response.result.marker
    // レジャーの内容を表示
    console.log(response.result)
    fetchsize = + response.result.state.length
    console.log(fetchsize)
    if (fetchsize < 1000) {
      // テストコードのため、1000件以上取得したら終了とする
      break
    }
  } while (marker)

  client.disconnect()
}
main()
