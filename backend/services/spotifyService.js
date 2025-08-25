import axios from 'axios';

export const getTopTracks = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // Return only the data you need for chart
    return response.data.items.map(track => ({
      name: track.name,
      popularity: track.popularity,
      artist: track.artists.map(a => a.name).join(', ')
    }));
  } catch (err) {
    throw new Error(err.response?.data?.error?.message || err.message);
  }
};
