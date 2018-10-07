import React, { Component } from 'react'
import { crypto } from '@liquality/chainabstractionlayer'

class InitiateSwapForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      recipientAddress: '',
      refundAddress: '',
      secretHash: '',
      expiration: '',
      transactionHash: ''
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  async handleSubmit (event) {
    const { value, recipientAddress, refundAddress, secretHash, expiration } = this.state

    event.preventDefault()

    const transactionHash = await this.props.chain.initiateSwap(value, recipientAddress, refundAddress, secretHash, expiration)

    this.setState({ transactionHash })
  }

  render () {
    return (
      <div>
      <h3>Initiate Swap:</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <label htmlFor='value'>Value</label>
            <input name='value' id='value' type='text' value={this.state.value} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
            <br />
            <label htmlFor='recipientAddress'>recipientAddress</label>
            <input name='recipientAddress' id='recipientAddress' type='text' value={this.state.recipientAddress} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
            <br />
            <label htmlFor='refundAddress'>refundAddress</label>
            <input name='refundAddress' id='refundAddress' type='text' value={this.state.refundAddress} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
            <br />
            <label htmlFor='secretHash'>secretHash</label>
            <input name='secretHash' id='secretHash' type='text' value={this.state.secretHash} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
            <br />
            <label htmlFor='expiration'>expiration</label>
            <input name='expiration' id='expiration' type='text' value={this.state.expiration} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />

            <button type='submit'>InitiateSwapForm</button>
          </fieldset>
        </form>

        <label htmlFor='transactionHash'>transactionHash</label>
        <input name='transactionHash' id='transactionHash' type='text' value={this.state.transactionHash} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
      </div>
    )
  }
}

export default InitiateSwapForm
