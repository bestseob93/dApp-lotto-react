import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lotto from './lotto';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  }

  async componentDidMount() {
    try {
      const manager = await lotto.methods.manager().call();
      const players = await lotto.methods.getPlayer().call();
      const balance = await web3.eth.getBalance(lotto.options.address);

      this.setState({
        manager,
        players,
        balance
      });

    } catch (e) {
      if(e) throw e;
    }
  }

  onSubmit = async (ev) => {
    ev.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: 'Waiting on Transaction success...'
    });
    
    await lotto.methods.enter().send({
      from: accounts[0],
      value:  web3.utils.toWei(this.state.value, 'ether');
    });

    this.setState({
      message: 'You have been entered!!'
    });
  }

  render() {
    console.log(web3.eth.getAccounts().then(results => {console.log(results)}));
    return (
      <div className="App">
        <h2>Lotto Contract</h2>
        <p>this contract is managed by</p>
        <p>{this.state.manager}</p>
        <p>there are currently {this.state.players.length} people</p>
        <p>competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>
        
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              type="text"
              onChange={ev => this.setState({ value: ev.target.value })}
              value={this.state.value}
            />
            <button>Enter</button>
          </div>
        </form>

        <hr />

        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
