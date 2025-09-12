// controllers/spotifyController.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let cachedAccessToken = "";

// 1️⃣ Login: redirect user to Spotify authorization page
export const login = (req, res) => {
  const scope = "user-top-read user-read-email user-read-private";
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const client_id = process.env.SPOTIFY_CLIENT_ID;

  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`
  );
};

// 2️⃣ Callback: exchange code for access token
export const callback = async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.status(400).json({ error: "No code provided" });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    cachedAccessToken = response.data.access_token; // save for API requests

    // send token info back or redirect frontend
    res.redirect(`http://127.0.0.1:4200/callback?access_token=${response.data.access_token}`);
  } catch (err) {
    console.error("Spotify error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to authenticate", details: err.response?.data || err.message });
  }
};

// 3️⃣ Profile: fetch Spotify profile
export const profile = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: { status: 400, message: "Only valid bearer authentication supported" } });
  }
  const accessToken = authHeader.split(" ")[1];

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// 4️⃣ Top Tracks: fetch user's top tracks
export const topTracks = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: { status: 400, message: "Only valid bearer authentication supported" } });
  }
  const accessToken = authHeader.split(" ")[1];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term", // last 4 weeks
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(response.data.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
};

// 5️⃣ Top Artists: fetch user's top artists
export const topArtists = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: { status: 400, message: "Only valid bearer authentication supported" } });
  }
  const accessToken = authHeader.split(" ")[1];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term", // last 4 weeks
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(response.data.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch top artists" });
  }
};

// 6️⃣ Top Genres: fetch user's top genres
export const topGenres = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: { status: 400, message: "Only valid bearer authentication supported" } });
  }
  const accessToken = authHeader.split(" ")[1];

  try {
    const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=20", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const artists = response.data.items;
    const genreCount = {};
    artists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });
    const sortedGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .map(([genre]) => genre);
    res.json(sortedGenres.slice(0, 5)); // Top 5 genres
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch top genres" });
  }
};

// 7️⃣ Mood Insights: analyze user's mood based on top tracks
export const moodInsights = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: { status: 400, message: "Only valid bearer authentication supported" } });
  }
  const accessToken = authHeader.split(" ")[1];

  try {
    const tracksResponse = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const trackIdsArr = tracksResponse.data.items.map(track => track.id);
    console.log('tracksResponse:', tracksResponse.data);
    console.log('trackIdsArr:', trackIdsArr);
    if (trackIdsArr.length === 0) {
      return res.json({ moodSummary: "Not enough data", moodEmoji: "😐" });
    }
    const trackIds = trackIdsArr.join(',');
    const featuresResponse = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('featuresResponse:', featuresResponse.data);
    const features = featuresResponse.data.audio_features;
    const avgValence = features.reduce((sum, f) => sum + f.valence, 0) / features.length;
    let moodSummary = "Mostly neutral";
    let moodEmoji = "😐";
    if (avgValence > 0.7) {
      moodSummary = "Mostly energetic and positive!";
      moodEmoji = "😊";
    } else if (avgValence < 0.4) {
      moodSummary = "Mostly calm or somber.";
      moodEmoji = "😔";
    }
    res.json({ moodSummary, moodEmoji });
  } catch (err) {
    console.error('Spotify moodInsights error:', err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch mood insights" });
  }
};
