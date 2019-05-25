
var Twit = require('twit')
var args = process.argv

var T = new Twit({

  consumer_key:         'Qu2IjLLOmjQuA3hF8Lh8bkHFL',
  consumer_secret:      'yDgvzl7uvjY7lG8qCxvDslKb4kpBqOsLrCwlR9VMpXOn1HOR9y',
  access_token:         '1131194121836814337-QaDcJYCXaaMuueIej4i1urnz5f2jgY',
  access_token_secret:  's1Wabivuq0I6VCdT0L48fEW1R0rm3zQ3oP76zuJr5kHjz',
  
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














