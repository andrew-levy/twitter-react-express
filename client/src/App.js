import React, { Component } from 'react';
import { render } from "react-dom";

import Particles from './Particles'
import Form from './Form'
import Tweet from './Tweet'

import logo from './img/logo.svg';
import earth from './img/earth.svg';
import rt from './img/rt.svg';
import upload from './img/upload.svg';
import like from './img/like.svg';
import bubble from './img/buble.svg';
import './App.css';

class App extends Component {

  state = {
    response: "Today's Topic: Anything!",
    post: '',
    responseToPost: '',
    sender: '',
    charCountText: 0,
    charCountSender: 0,
    img: null
  };

  resetAll() {
    this.setState({
      post: "", 
      sender: "",
      charCountSender: 0,
      charCountText: 0,
      img: null
    });
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

  // BEGIN EVENT HANDLERS
  fileChangedHandler = e => this.setState({ img: e.target.files[0] })
  handleChangeTextTweet = e => this.setState({ post: e.target.value })
  handleChangeTextSender = e => this.setState({ sender: e.target.value })
  handleInputTextTweet = e => this.setState({charCountText: e.target.value.length})
  handleInputTextSender = e => this.setState({charCountSender: e.target.value.length})
  
  handleSubmit = async e => {
    e.preventDefault();
    this.resetAll();
    let finalTweet = this.state.post

    if (this.state.charCountSender > 0) {
      finalTweet +=  " -" + this.state.sender;
    }

    let data = new FormData();
    data.append("text", finalTweet);
    const response = await fetch('/api/world', {
      method: 'POST',
      body: data
    });

    const body = await response.text();
    this.setState({ responseToPost: body });

  };
  // END EVENT HANDLERS

  render() {
     
    // BEGIN STYLE LOGIC 
    const countColor = this.state.charCountSender + this.state.charCountText >= 280 
      ? 'red' 
      : 'white'
    const opac = (this.state.charCountText <= 0  && this.state.post.trim() === "") 
      ? .6 
      : 1
    // END STYLE LOGIC 

    // BEGIN PROPS 
    const tweetAssetProps = {
      rt: rt,
      earth: earth,
      logo: logo,
      bubble: bubble,
      upload: upload,
      like: like
    }
    const formStyleProps = {
      opac: opac,
      countColor: countColor
    }
    const formHandlerProps = {
      handleSubmit: this.handleSubmit,
      fileChangedHandler: this.fileChangedHandler,
      handleChangeTextSender: this.handleChangeTextSender,
      handleChangeTextTweet: this.handleChangeTextTweet,
      handleInputTextSender: this.handleInputTextSender,
      handleInputTextTweet: this.handleInputTextTweet
    }
    const formValueProps = {
      post: this.state.post,
      sender: this.state.sender,
      charCountSender: this.state.charCountSender,
      charCountText: this.state.charCountText
    }
    // END PROPS 
    
    return (

        <div className="App-page">
          <Particles/>
          <h1>weetweet.</h1>
          <Tweet 
            assets = { tweetAssetProps }
          />
          <Form
            styles = { formStyleProps }
            handlers = { formHandlerProps }
            values = { formValueProps }
          />
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
