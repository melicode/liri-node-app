//junk I need to start
require("dotenv").config();
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


// import keys
var fs = require('fs');
var keys = require('./keys.js');

//user instructions

console.log("Type one of the following my-tweets , spotify-this-song , movie-this , or do-what-it-says");

//process.argv
var userInput = process.argv[2];
var userInputTwo = process.argv[3];

function switchCase(){

	switch(userInput){

		case 'my-tweets':
		tweet();
		break;

		case 'spotify-this-song':
		SpotifyFunc();
		break;

		case 'movie-this':
		OMDBFunc();
		break;
		
	}
};
//twitter first
function tweet(){
	console.log("Twitter");
	var client = new twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	//twitter username and amount of tweets
	var parameters = {
		screen_name: 'meliscode',
		count: 20
	};

//retrieving twitter info
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	            console.log("-------------------------");
	        }
	    };
	});
};

//spotify second
function SpotifyFunc(){
	console.log("Spotify");


// if statement
	var searchTrack;
	if(userInputTwo === undefined){
		searchTrack = "What's My Age Again?";
	}

	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error ' + err);
	        return;
	    }else{

	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
	    }
	});
};

//spotify third
function OMDBFunc(){
	console.log("Netflix");
	var searchMovie;
	if(userInputTwo === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = userInputTwo;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
	});
};
