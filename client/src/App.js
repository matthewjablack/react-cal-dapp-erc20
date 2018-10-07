import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import ERC20SwapProvider from "./utils/ERC20SwapProvider";
import truffleContract from "truffle-contract";

import SecretForm from './forms/SecretForm';
import InitiateSwapForm from './forms/InitiateSwapForm';
import ClaimSwapForm from './forms/ClaimSwapForm';

import { Client, providers, Provider, networks } from 'chainabstractionlayer'

import "./App.css";

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      web3: null,
      accounts: null,
      bitcoin: null,
      erc20: null
    }
  }

  async componentDidMount() {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const bitcoin = new Client()
      bitcoin.addProvider(new providers.bitcoin.BitcoinRPCProvider('http://localhost:8000', 'bitcoin', 'local321', { network: networks.bitcoin_testnet }))
      bitcoin.addProvider(new providers.bitcoin.BitcoinRPCWalletProvider('http://localhost:8000', 'bitcoin', 'local321', { network: networks.bitcoin_testnet }))
      bitcoin.addProvider(new providers.bitcoin.BitcoinJsLibSwapProvider({ network: networks.bitcoin_testnet }, 'cVuHNLamShn9pJEVQLy76fdzLPZxgfhenVdK7wo1vBweue4x2dHv', 'cTYiTKhEujcjM4xqgzRHbpCc9Mbtpvqd8VpsRUB6aXygBgg5JsYp'))


      const erc20 = new Client()
      erc20.addProvider(new providers.ethereum.EthereumRPCProvider('http://localhost:8545'))
      erc20.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider))
      erc20.addProvider(new ERC20SwapProvider('0x506cb2c94d5fda23508f5a4462cb02ca553657c8', web3))

      this.setState({ web3, accounts, bitcoin, erc20 });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <table width="100%">
          <thead>
            <td><strong>Bitcoin</strong></td>
            <td><strong>ERC20</strong></td>
          </thead>
          <tr>
            <td>
              <SecretForm chain={this.state.bitcoin} />
              <InitiateSwapForm chain={this.state.bitcoin} />
              <ClaimSwapForm chain={this.state.bitcoin} />
            </td>
            <td>
              <SecretForm chain={this.state.erc20} />
              <InitiateSwapForm chain={this.state.erc20} />
              <ClaimSwapForm chain={this.state.erc20} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
