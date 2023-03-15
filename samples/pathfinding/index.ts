import { Client, xrpToDrops } from 'xrpl'

const client = new Client('wss://xrpl.ws')

const main = async () => {
  await client.connect()
  
  client.on('path_find', (stream) => {
    console.log(JSON.stringify(stream.alternatives, null, '  '))
  })

  client.request({
    command: 'path_find',
    subcommand: 'create',
    source_account: 'rQQQrUdN1cLdNmxH4dHfKgmX5P4kf3ZrM',
    destination_account: 'rQQQrUdN1cLdNmxH4dHfKgmX5P4kf3ZrM',
    destination_amount: xrpToDrops(10),
  })
}

main()
