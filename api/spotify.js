const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const { generateRandomString } = require("./helpers");
const bodyParser = require("body-parser");

const spotifyRouter = express.Router();

spotifyRouter.use((req, res, next) => {
  next();
});

spotifyRouter.use(bodyParser());
spotifyRouter.use(cookieParser());

spotifyRouter.get("/auth", (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email user-top-read user-library-modify user-library-read user-modify-playback-state";

  res.cookie(process.env.SPOTIFY_STATE_KEY, state);
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: state,
        show_dialog: true
      })
  );
});


spotifyRouter.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[process.env.SPOTIFY_STATE_KEY] : null;
  console.log(storedState);

  if (state === null || state !== storedState) {
    return res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  }

  res.clearCookie(process.env.SPOTIFY_STATE_KEY);

  try {
    const tokenReq = await axios.post("https://accounts.spotify.com/api/token",
    {
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: "authorization_code",
    },
    {
      headers: {
        "content-type": 'application/x-www-form-urlencoded',
        Authorization:
          "Basic " +
          new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
      },
    });

    if (tokenReq.status !== 200) {
      return res.redirect('/#' +
      querystring.stringify({
        error: 'invalid_token'
      }));
    }
  
    const { access_token } = tokenReq.data;
    res.cookie('spotify_access_token', access_token);
    console.log(access_token)

    return res.redirect('/spotify-redirect-internal');
  } catch (e) {
    console.error(e);
  }
});


spotifyRouter.get("/recommendations", async (req, res) => {
  const storedAccessToken = req.cookies ? req.cookies['spotify_access_token'] : null;

  if (!storedAccessToken) {
    return res.status(500).json({ error: "No access token! You may need to reauthenticate." });
  }

  const topTracks = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks",
    { headers: { Authorization: "Bearer " + storedAccessToken } }
  );

  const topTrackSeeds = [];
  const topArtistSeeds = [];
  for (let i = 0; i < 5; i++) {
    const track = topTracks.data.items[i].id;
    const artist = topTracks.data.items[i].artists[0].id;
    if (!topTrackSeeds.includes(track) && topTrackSeeds.length < 3) topTrackSeeds.push(track);
    if (!topArtistSeeds.includes(artist) && topArtistSeeds.length < 2) topArtistSeeds.push(artist);
  }

  const recommendReq = await axios.get(
    `https://api.spotify.com/v1/recommendations?market=US&seed_tracks=${topTrackSeeds.join(',')}&seed_artists=${topArtistSeeds.join(',')}`,
    { headers: { Authorization: "Bearer " + storedAccessToken } }
  );

  return res.json(recommendReq.data);
});

spotifyRouter.put("/favorite/:id", async (req, res) => {
  const storedAccessToken = req.cookies ? req.cookies['spotify_access_token'] : null;

  if (!storedAccessToken) {
    return res.status(500).json({ error: "No access token! You may need to reauthenticate." });
  }

  try {
    await axios.put("https://api.spotify.com/v1/me/tracks", { ids: [req.params.id] }, { headers: { Authorization: "Bearer " + storedAccessToken } });
    return res.status(200).json({ message: "Successfully saved song to library." });
  } catch (e) {
    return res.status(500).json({ error: "Oops! Something went wrong saving this song to your library. Please try again." });
  }
});

spotifyRouter.put("/play", async (req, res) => {
  const storedAccessToken = req.cookies ? req.cookies['spotify_access_token'] : null;

  if (!storedAccessToken) {
    return res.status(500).json({ error: "No access token! You may need to reauthenticate." });
  }

  try {
    axios.put("https://api.spotify.com/v1/me/player/play", { uris: [req.body.songURI] }, { headers: { Authorization: "Bearer " + storedAccessToken } }).catch(console.error)
    return res.status(200).json({ message: "Successfully started playback." });
  } catch (e) {
    return res.status(500).json({ error: "Oops! Something went wrong playing this song. Please try again." });
  }
});

spotifyRouter.put("/pause", async (req, res) => {
  const storedAccessToken = req.cookies ? req.cookies['spotify_access_token'] : null;

  if (!storedAccessToken) {
    return res.status(500).json({ error: "No access token! You may need to reauthenticate." });
  }

  try {
    axios.put("https://api.spotify.com/v1/me/player/pause", {}, { headers: { Authorization: "Bearer " + storedAccessToken } })
      .catch(console.error);
    return res.status(200).json({ message: "Successfully stopped playback." });
  } catch (e) {
    return res.status(500).json({ error: "Oops! Something went wrong playing this song. Please try again." });
  }
});

module.exports = {
  spotifyRouter,
};
