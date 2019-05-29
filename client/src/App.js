import React, { Component } from 'react';

import logo from './logo.svg';
//import earth from './earth.svg';

import './App.css';




class App extends Component {
  state = {
    response: "Today's Topic: Anything!",
    post: '',
    responseToPost: '',
    sender: '',
  };


  resetTextBox() {

    this.setState({post: ""});
    this.setState({sender: ""});

  }

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
    this.resetTextBox();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post: this.state.post + " -" + this.state.sender}),
    });

    const body = await response.text();

    this.setState({ responseToPost: body });
    
  };



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p><strong style = {{color : "black"}}> WeeTweet</strong></p>
          <p style ={{color : "black"}} >
            Hello! Welcome to WeeTweet, the first twitter account that belongs to everyone. 
          </p>
           <p style ={{color : "black"}} >
            
          </p>
          <a
            className="App-link"
            href="https://twitter.com/WeeTweet17"
            target="_blank"
            rel="noopener noreferrer"
          >
            WeeTweet Account
          </a>
        
        <p className = "Text-twitter-blue">{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p style = {{color : "black"}}>What do you want to tell the world?
          </p>
          <input
            className="Input-box-tweet"
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          /> 
          <p style = {{color : "black"}}>Name or Initials (optional)</p>
          <input
            className="Input-box-sender"
            type="text"
            value={this.state.sender}
            onChange={e => this.setState({ sender: e.target.value })}
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
