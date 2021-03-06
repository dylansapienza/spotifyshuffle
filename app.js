/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'ee9126ecf55b4ee6be9cb1a72bc46c92'; // Your client id
var client_secret = '6b2c3411eaa84cb086a3d3e71385e5f4'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser())
   .use(express.json());

app.get('/testAPI', function(req, res){
  res.send("API proxy worked!")
})

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative  playlist-modify-private playlist-modify-public';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me/',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(301,'http://localhost:3000/accountinfo?' +
          querystring.stringify({
            access_token: access_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.post('/api/getUserInfo', function(req, res){
  console.log(req.body.access_token)
  var access_token = req.body.access_token

  var options = {
    url: 'https://api.spotify.com/v1/me/',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

      // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body) {
    res.send(body)
  });
});

app.post('/api/shuffle', function(req, res){
  const access_token = req.body.access_token
  const playlist_id = req.body.playlist_id
  const playlist_name = req.body.playlist_name
  const user_id = req.body.user_id
  const playlist_description = "Playlist Shuffled by Spotify Shuffler"
  console.log(access_token)
  console.log(playlist_id)
  console.log(user_id)
  console.log(playlist_name)

  //Create New Playlist

  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  };

  // var dataString =
  //   '{"name":"' +
  //   playlist_name +
  //   ' 🔀","description":"' +
  //   playlist_description +
  //   '","public":true}';

  // var options = {
  //   url:
  //     "https://api.spotify.com/v1/users/" +
  //     user_id +
  //     "/playlists",
  //   method: "POST",
  //   headers: headers,
  //   body: dataString,
  // };

  // async function callback(error, response, body) {
  //   if (!error && response.statusCode == 201) {
  //     var plist_data = JSON.parse(body);
  //     console.log(plist_data)

  //     //Get Original Playlist Tracks
  //     //Copy Playlist Items

  //   } else {
  //     console.log(error)
  //   }
  // }

  // request(options, callback);

  //Copy Playlist Items

  var options2 = {
    url:
  "https://api.spotify.com/v1/playlists/" +
  playlist_id +
  "/tracks?market=US&fields=items(track(uri))&limit=100&offset=0",
    headers: headers,
    json: true
  }

  async function callback2(error, response, body){
    if (!error && response.statusCode == 201) {
      console.log("RESPONSE BELOW")
      console.log(response)
      var song_data = JSON.parse(body);
      console.log(song_data)
  }
  else{
    console.log("RESPONSE BELOW")
    console.log(error)
  }

}

  request.get(options2, callback2);



  //Shuffle Playlist Items

  //Return Success


});


app.post('/api/getUserPlaylists', function(req, res){
  console.log(req.body.access_token)
  var access_token = req.body.access_token
  var offset = req.body.offset
  var options = {
    url: 'https://api.spotify.com/v1/me/playlists?limit=50&offset='+ offset,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

      // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body) {
    res.send(body)
  });
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
