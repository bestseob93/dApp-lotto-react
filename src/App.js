import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lotto from './lotto';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manager: ''
    };
  }

  async componentDidMount() {
    try {
      const manager = await lotto.methods.manager().call();
      this.setState({
        manager
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
      </div>
    );
  }
}

export default App;
