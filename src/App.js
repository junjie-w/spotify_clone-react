import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Player } from './components/Player';
import { getTokenFromUrl } from './spotify';

function App() {

  const [token, setToken] = useState(null)

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      setToken(_token)
    }
  }, [])
  return (
    <div className="app">
      {
        token ? (
          <Player />
        ) : (
            <Login />
          )
      }
      {/*Spotify logo*/}
      <Login />
    </div>
  );
}

export default App;


//Client ID b58b02950a8044f28e9d0ba50607df04