import React, { Component } from 'react'
import { crypto } from '@liquality/chainabstractionlayer'

class InitiateSwapForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transactionHash: '',
      recipientAddress: '',
      secret: '',
      secretHash: '',
      expiration: '',
      claimTxHash: ''
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  async handleSubmit (event) {
    const { transactionHash, recipientAddress, refundAddress, secret, expiration } = this.state

    event.preventDefault()

    const claimTxHash = await this.props.chain.claimSwap(transactionHash.substring(2), recipientAddress, refundAddress, secret, expiration)

    debugger
    // const secret = await this.props.chain.generateSecret(this.state.swapParams)
    // const secretHash = crypto.sha256(secret)

    // this.setState({ secret, secretHash })

    this.setState({ claimTxHash })
  }

  render () {
    return (
      <div>
      <h3>Claim Swap:</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <label htmlFor='transactionHash'>transactionHash</label>
            <input name='transactionHash' id='transactionHash' type='text' value={this.state.transactionHash} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
            <br />
            <label htmlFor='recipientAddress'>recipientAddress</label>
            <input name='recipientAddress' id='recipientAddress' type='text' value={this.state.recipientAddress} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
            <br />
            <label htmlFor='refundAddress'>refundAddress</label>
            <input name='refundAddress' id='refundAddress' type='text' value={this.state.refundAddress} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
            <br />
            <label htmlFor='secret'>secret</label>
            <input name='secret' id='secret' type='text' value={this.state.secret} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
            <br />
            <label htmlFor='expiration'>expiration</label>
            <input name='expiration' id='expiration' type='text' value={this.state.expiration} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />

            <button type='submit'>ClaimSwapForm</button>
          </fieldset>
        </form>

        <label htmlFor='transactionHash'>transactionHash</label>
        <input name='transactionHash' id='transactionHash' type='text' value={this.state.claimTxHash} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
        
      </div>
    )
  }
}

export default InitiateSwapForm
