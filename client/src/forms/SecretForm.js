import React, { Component } from 'react'
import { crypto } from '@liquality/chainabstractionlayer'

class SecretForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      swapParams: '',
      secret: '',
      secretHash: ''
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  async handleSubmit (event) {
    event.preventDefault()

    const secret = await this.props.chain.generateSecret(this.state.swapParams)
    const secretHash = crypto.sha256(secret)

    this.setState({ secret, secretHash })
  }

  render () {
    return (
      <div>
      <h3>Generate secret:</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <label htmlFor='swapParams'>Swap params</label>
            <input name='swapParams' id='swapParams' type='text' value={this.state.swapParams} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='<currency1><value1><currency2><value2>' />
            <br />

            <button type='submit'>Generate Secret</button>
          </fieldset>
        </form>
        <label htmlFor='secret'>Secret</label>
        <input name='secret' id='secret' type='text' value={this.state.secret} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
        <label htmlFor='secretHash'>Swap Hash</label>
        <input name='secretHash' id='secretHash' type='text' value={this.state.secretHash} style={{color: 'black', width: '21em'}} onChange={this.onChange} placeholder='' />
      </div>
    )
  }
}

export default SecretForm
