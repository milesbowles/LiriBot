var keys = require('./keys.js');
var Spotify = require('spotify');
var Twitter = require('twitter');
var request = require('request');

var getTweets = function () {

    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'CompSciHomework'};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets[0].text);
            // console.log(tweets.length);
            for(var i=0; i<tweets.length; i++) {
                console.log('-------------------------------------');
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log('-------------------------------------');
            }
        }
    });
};

var getArtistNames = function (artist) {
    return artist.name;
};

var getSpotify = function (songName) {

    var spotify = new Spotify(keys.spotifyKeys);

    spotify.search({type: 'track', query: 'dancing in the moonlight'}, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data);
        var songs = data.tracks.items;
        for(var i=0; i=songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].names);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('_______________________________________');
        }
    });
};


var getMovie = function (movieName) {

    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r+json', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);

            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imdbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL)
        }
    })
};

var readFileData = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            options(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            options(dataArr[0]);
        }
    });
};

var options = function (option, data) {
    switch(option) {
        case 'my-tweets' :
            console.log('Here are your recent tweets');
            getTweets();
            break;
        case 'spotify-this-song':
            getSpotify(data);
            break;
        case 'movie-this':
            getMovie(data);
        default:
        console.log('Not sure what you want...')
    }
};

var getArgs = function (argOne, argTwo) {
    options(argOne, argTwo);
};

getArgs(process.argv[2], process.argv[3]);

