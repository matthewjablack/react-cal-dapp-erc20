import ERC20Swap from "../contracts/ERC20Swap.json";
import ExampleCoin from "../contracts/ExampleCoin.json";
import truffleContract from "truffle-contract";

export default class ERC20SwapProvider {
  constructor (tokenAddress, web3) {
    this._tokenAddress = tokenAddress;
    this._web3 = web3
  }

  async initiateSwap (value, recipientAddress, refundAddress, secretHash, expiration) {
    const web3 = this._web3;

    const accounts = await web3.eth.getAccounts();

    const ERC20SwapContract = truffleContract(ERC20Swap);
    ERC20SwapContract.setProvider(web3.currentProvider);
    const ERC20SwapInstance = await ERC20SwapContract.new(
      value,
      `0x${secretHash}`,
      expiration,
      `${recipientAddress}`,
      this._tokenAddress,
      { 
        from: accounts[0] 
      }
    )

    const ExampleCoinContract = truffleContract(ExampleCoin);
    ExampleCoinContract.setProvider(web3.currentProvider);
    const ExampleCoinInstance = await ExampleCoinContract.deployed();

    await ExampleCoinInstance.transfer(ERC20SwapInstance.address, value, { from: accounts[0] })

    console.log(ERC20SwapInstance)

    return ERC20SwapInstance.transactionHash
  }

  async claimSwap (initiationTxHash, recipientAddress, refundAddress, secret, expiration) {
    const web3 = this._web3;

    const accounts = await web3.eth.getAccounts();

    const initiationTransaction = await this.getMethod('getTransactionReceipt')(initiationTxHash)

    const ERC20SwapContract = truffleContract(ERC20Swap);
    ERC20SwapContract.setProvider(web3.currentProvider);
    const ERC20SwapInstance = await ERC20SwapContract.at(`0x${initiationTransaction.contractAddress}`)

    const fundsLocked = await ERC20SwapInstance.fundsLocked.call()

    if (!fundsLocked) {
      new Error("Funds haven't been locked in the contract");
    }

    const claim = await ERC20SwapInstance.claim(`0x${secret}`, { from: accounts[0] })

    return claim.tx
  }

  setClient (client) {
    this.client = client
  }

  getMethod (method) {
    return this.client.getMethod(method, this).bind(this)
  }
}
