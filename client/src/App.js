import React, { Component } from 'react';
import { render } from "react-dom";
import Particles from './Particles'
import logo from './img/logo.svg';
import earth from './img/earth.svg';
import rt from './img/rt.svg';
import upload from './img/upload.svg';
import like from './img/like.svg';
import buble from './img/buble.svg';

import './App.css';




class App extends Component {


  // states
  state = {
    response: "Today's Topic: Anything!",
    post: '',
    responseToPost: '',
    sender: '',
    charCountText: 0,
    charCountSender: 0
  };

  // reset the textboxes on subit
  resetTextBox() {

    this.setState({post: ""});
    this.setState({sender: ""});
    this.setState({charCountSender: 0});
    this.setState({charCountText: 0});
    

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
     
      

    const countColor = this.state.charCountSender + this.state.charCountText >= 280 ? 'red' : 'white'
    const opac = (this.state.charCountText <= 0  && this.state.post.trim() === "") ? .6:1

    return (


        <div className="App-page">
        
        <Particles/>

          <h1>weetweet. </h1>
          <p style = {{textAlign :'left'}} className="description">

             <img src={earth} alt="avatar" style= {{width:'35px', height:'35px', float: "left"}}/>
             <p style = {{margin: '0.5px 10px 1px', textAlign: "left", fontSize : '15px', float: "left", fontWeight: "bold"}}> @WeeTweet17 </p>
             <img src={logo} alt="avatar" style= {{width:'35px', height:'35px', float: "right", margin: '-5px 0px .5px'}}/>
             <p style={{margin: '50px 0px 10px', clear: 'both', fontSize: '23px', fontWeight: "bold"}}>The first twitter account that belongs to everyone. </p>
            <ol style={{margin: '.5px 40px 10px'}}>
              
              <li style={{opacity: '1'}}>Type what you want to tell the world</li>
              <li style={{opacity: '1'}}>Add your name/initials or be anonymous</li>
              <li style={{opacity: '1'}}>Press 'Tweet it!'</li>
              <li style={{opacity: '1'}}>View your tweet  <a
            className="App-link"
            href="https://twitter.com/WeeTweet17"
            target="_blank"
            rel="noopener noreferrer"> 
                     here
          </a></li>
          

            </ol>
            <img src={buble} alt="buble" style= {{width:'20px', height:'20px', float: "left", margin: '5px 20px 0px'}}/>
             <img src={rt} alt="rt" style= {{width:'20px', height:'20px', float: "left", margin: '5px 20px 0px'}}/>
             <img src={like} alt="like" style= {{width:'20px', height:'20px', float: "left", margin: '5px 20px 0px'}}/>
             <img src={upload} alt="mail" style= {{width:'20px', height:'20px', float: "left", margin: '5px 20px 0px'}}/>
             <p className="fakeTweetTxt" style = {{margin: '0.5px 10px 1px', textAlign: "left", fontSize : '15px', float: "right"}}> 19 May 2019 </p>

          </p>
          
        {/*<p className = "Text-twitter-blue">{this.state.response}</p>*/}
        <form onSubmit={this.handleSubmit}>
          <p >What do you want to tell the world?
          </p>

           <textarea className="Input-box-tweet" 
           rows="4" 
           cols="50" 
           placeholder="When the zombie apocalypse happens, you’ll be glad you bought a flamethrower. Works against hordes of the undead or your money back!"
           value={this.state.post} 
           onChange={e => this.setState({ post: e.target.value })}
           onInput={e => this.setState({charCountText: e.target.value.length})}>
          
          </textarea>
         
          <p >Name or Initials (optional)</p>
          <input
            className="Input-box-sender"
            type="text"
            value={this.state.sender}
            onChange={e => this.setState({ sender: e.target.value })}
            onInput={e => this.setState({charCountSender: e.target.value.length})}
            placeholder="Elon Musk"
            
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
          
        </div>
 





    );
  }
}

export default App;
