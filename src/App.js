import React, { useEffect } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Player } from './components/Player';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './dataLayer/DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  //const [token, setToken] = useState(null);

  const [{ user, token }, dispatch] = useDataLayerValue();
  //const [dataLayer, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      //setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        console.log(user);
        dispatch({
          type: 'SET_USER',
          user: user
        })
      });

      spotify.getPlaylist("b58b02950a8044f28e9d0ba50607df04").then(response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      })

      spotify.getUserPlaylists().then((playlists) => {
        //spotify.getPlaylist().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        })
      })
    }
    console.log("token_", token)
    console.log("token", token)
  }, [])

  console.log("user", user);

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify} />
        ) : (
            <Login />
          )
      }
      {/*Spotify logo*/}
    </div>
  );
}

export default App;


//Client ID b58b02950a8044f28e9d0ba50607df04