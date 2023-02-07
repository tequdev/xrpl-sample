import { Client, PathFindCreateRequest, xrpToDrops } from 'xrpl'

const client = new Client('wss://xrpl.ws')

const main = async () => {
  await client.connect()
  
  client.on('path_find', (stream) => {
    console.log(JSON.stringify(stream, null, '  '))
  })

  client.request<PathFindCreateRequest,any>({
    command: 'path_find',
    subcommand: 'create',
    source_account: 'rQQQrUdN1cLdNmxH4dHfKgmX5P4kf3ZrM',
    destination_account: 'rQQQrUdN1cLdNmxH4dHfKgmX5P4kf3ZrM',
    destination_amount: xrpToDrops(10),
    // send_max?: Amount,
    // paths?: Path[]
  })
}

main()
