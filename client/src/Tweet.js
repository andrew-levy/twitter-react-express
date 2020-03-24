import React from 'react';

const Tweet = (props) => {
    return (
        <div className="description">
            <img src={props.assets.earth} alt="avatar" className="avatar"/>
            <p className="handle"> @WeeTweet17 </p>
            <img src={props.assets.logo} alt="avatar" className="twitter-logo" />
            <p className="tweet-text">The first twitter account that belongs to everyone. </p>
            <ol className="tweet-list">
                <li>Type what you want to tell the world</li>
                <li>Add your name/initials or be anonymous</li>
                <li>Press 'Tweet it!'</li>
                <li>View your tweet at @WeeTweet17</li>
            </ol>
            <div className="twitter-buttons">
                <img src={props.assets.bubble} alt="buble" />
                <img src={props.assets.rt} alt="rt" />
                <img src={props.assets.like} alt="like" />
                <img src={props.assets.upload} alt="mail" />
                <p className="fakeTweetTxt" className="date"> 19 May 2019 </p>
            </div>
          </div>
    );
}
export default Tweet;
