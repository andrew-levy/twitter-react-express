
var Twit = require('twit')
var args = process.argv

var T = new Twit({

  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  
})

var finalTweet = "";
parseArgs();
tweetText(finalTweet);


function parseArgs() {

	if (args.length >= 3) {

		for (var i = 2; i < args.length; i++) {

			if (i == args.length){
				finalTweet = finalTweet + args[i];
			} else {
				finalTweet = finalTweet + args[i] + " ";
			}
			
		}

	} else {	
		console.log('Not a valid tweet');
	}


}

function tweetText(text) {
		

		var tweet = { 
			status:  text
		}

		T.post('statuses/update', tweet, tweeted);


		function tweeted (err, data, response) {
			if(err){
				console.log('Tweet could not be sent');
			}
		  	else{
		  		console.log('Tweet sent');
		  	}
		}
		
}














