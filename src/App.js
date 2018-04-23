import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lotto from './lotto';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: ''
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
  render() {
    console.log(web3.eth.getAccounts().then(results => {console.log(results)}));
    return (
      <div className="App">
        <h2>Lotto Contract</h2>
        <p>this contract is managed by</p>
        <p>{this.state.manager}</p>
        <p>there are currently {this.state.players.length} people</p>
        <p>competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>
      </div>
    );
  }
}

export default App;
