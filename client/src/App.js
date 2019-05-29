import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';




class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
    
  };



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello! Welcome to WeeTweet, the first twitter account that belongs to everyone. Tweet something below on behalf of the world.
          </p>
          <a
            className="App-link"
            href="https://twitter.com/WeeTweet17"
            target="_blank"
            rel="noopener noreferrer"
          >
            WeeTweet Account
          </a>
        
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>What do you want to tell the world?</strong>
          </p>
          <input
            className="Input-box"
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          /> 
  
          <button className= "Tweet-btn" type="submit">Tweet it!</button>
        </form>

        <p>{this.state.responseToPost}</p>
        </header>
      </div> 

    );
  }
}

export default App;
