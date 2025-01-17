import React from 'react';

const LoginBtnSpotify = () => {
  const clientId = 'your_client_id'; // Replace with your Spotify client ID
  const redirectUri = 'https://sinestiphy.vercel.app/quiz/1';
  const scopes = [
    'user-read-private',
    'user-read-email', 
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ];

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scopes.join(' '))}`;
    
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleLogin} style={{ padding: '10px 20px', background: '#1DB954', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
      Login with Spotify
    </button>
  );
};

export default LoginBtnSpotify;
