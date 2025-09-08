// routes/auth.js
import express from 'express';
import { login, callback, topTracks, topArtists, profile, topGenres, moodInsights } from '../controllers/spotifyController.js';

const router = express.Router();

router.get('/login', login);
router.get('/callback', callback);
router.get('/top-tracks', topTracks);
router.get('/top-artists', topArtists);
router.get('/profile', profile);
router.get('/top-genres', topGenres);
router.get('/mood-insights', moodInsights);

export default router;
