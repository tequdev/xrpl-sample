import { AccountInfoRequest, AccountInfoResponse, AccountLinesRequest, AccountLinesResponse, AccountSetAsfFlags, Client, Wallet } from 'xrpl'
import { AccountRootFlags } from 'xrpl/dist/npm/models/ledger'

const issuerSecret = 'sEdVSTh4fySCRL9rhjU434pJeycofFp' // r3De1gWJjUQhU7jKpjFaTZFVTX8qWQUWnX
const secret = 'sEd7NDqodzbvLxtZHaWTsHB7yJQniHu' // rGNNciFFFiyV4ZuAUk4QizcaYyY4T9Yzft

const issuerWallet = Wallet.fromSecret(issuerSecret)
const wallet = Wallet.fromSecret(secret)
const client = new Client('wss://testnet.xrpl-labs.com')

const SetDefaultRipple = async () => {
  await client.submitAndWait({
    TransactionType: 'AccountSet',
    Account: issuerWallet.address,
    SetFlag: AccountSetAsfFlags.asfDefaultRipple
  }, { wallet: issuerWallet })
}

const checkDefaultRipple = async () => {
  const response = await client.request<AccountInfoRequest, AccountInfoResponse>({
    command: 'account_info',
    account: issuerWallet.address
  })
  const flag = response.result.account_data.Flags
  console.log('DefaultRippled Flag: ' + ((flag & AccountRootFlags.lsfDefaultRipple) > 0))
}

const setTrustLine = async () => {
  await client.submitAndWait({
    TransactionType: 'TrustSet',
    Account: wallet.address,
    LimitAmount: {
      issuer: issuerWallet.address,
      currency: 'TST',
      value: '10000'
    }
  }, { wallet })
}

const sendToken = async () => {
  await client.submitAndWait({
    TransactionType: 'Payment',
    Account: issuerWallet.address,
    Destination: wallet.address,
    Amount: {
      issuer: issuerWallet.address,
      currency: 'TST',
      value: '5000'
    }
  }, { wallet: issuerWallet })
}

const checkHolder = async () => {
  const response = await client.request<AccountLinesRequest, AccountLinesResponse>({
    command: 'account_lines',
    account: issuerWallet.address,
  })
  const lines = response.result.lines
  console.log(lines)
}

const main = async () => {
  await client.connect()
  await SetDefaultRipple()
  await checkDefaultRipple()
  await setTrustLine()
  await sendToken()
  await checkHolder()
}

main()
