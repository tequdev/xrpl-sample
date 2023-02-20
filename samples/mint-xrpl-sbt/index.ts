import { parseNFTokenID } from 'xrpl'
import { XummSdk } from 'xumm-sdk'

const APIKey = '********-****-****-****-************'
const APISecret = '********-****-****-****-************'

const main = async () => {
  const sdk = new XummSdk(APIKey, APISecret)
  const payload = await sdk.payload.create({
    TransactionType: 'NFTokenMint',
    NFTokenTaxon: 1,
    URI: Buffer.from('https://user-images.githubusercontent.com/69445828/220017141-5855f188-85a9-4b59-8ce5-102ead4e0cf1.png', 'utf8').toString('hex').toUpperCase()
  })
  
  console.log(payload)
}


const parseNFTId = () => {
  const info = parseNFTokenID('00000000A74B88525756FBD02364E757BAD8FFCE10868C370000099A00000000')
  console.log(info)
}

main()
// parseNFTId()
