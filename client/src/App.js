import React, { Component } from 'react';

import logo from './logo.svg';
//import earth from './earth.svg';

import './App.css';




class App extends Component {


  // states
  state = {
    response: "Today's Topic: Anything!",
    post: '',
    responseToPost: '',
    sender: '',
    charCountText: 0,
    charCountSender: 0,
    goodToSubmit : false
  };

  // reset the textboxes on subit
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

    var finalTweet = this.state.post

    if (this.state.charCountSender > 0) {
      finalTweet +=  " -" + this.state.sender;
    }

    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post: finalTweet}),
    });


    const body = await response.text();
      
    this.setState({ responseToPost: body });

  };



  render() {

    const countColor = this.state.charCountSender + this.state.charCountText >= 280 ? 'red' : 'black'
    const opac = this.state.charCountText <= 0 ? .6:1
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>weetweet. </h1>
          <p style ={{color : "black"}} >
            The first twitter account that belongs to everyone. 
          </p>
        <p className = "Text-twitter-blue">{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p style = {{color : "black"}}>What do you want to tell the world?
          </p>

           <textarea className="Input-box-tweet" 
           rows="4" 
           cols="50" 
           value={this.state.post} 
           onChange={e => this.setState({ post: e.target.value })}
          onInput={e => this.setState({charCountText: e.target.value.length})}>
          </textarea>
         
          <p style = {{color : "black"}}>Name or Initials (optional)</p>
          <input
            className="Input-box-sender"
            type="text"
            value={this.state.sender}
            onChange={e => this.setState({ sender: e.target.value })}
            onInput={e => this.setState({charCountSender: e.target.value.length})}
          /> 
        
          <p style = {{color: countColor}} className="count"> Count: {this.state.charCountText + this.state.charCountSender}</p>
          <button disabled = {this.state.charCountText <= 0 ? true:false} 
          className= "Tweet-btn" type="submit" 
          style = {{opacity: opac}}>
            Tweet it!
          </button>
        </form>
        
        <p>{this.state.responseToPost}</p>

          <a
            className="App-link"
            href="https://twitter.com/WeeTweet17"
            target="_blank"
            rel="noopener noreferrer"> 
                     <p>See your tweet on Twitter</p>
          </a>

        </header>
      </div> 

    );
  }
}

export default App;
