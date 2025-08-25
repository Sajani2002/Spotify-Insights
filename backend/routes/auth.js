// routes/auth.js
import express from 'express';
import { login, callback, topTracks, profile } from '../controllers/spotifyController.js';

const router = express.Router();

router.get('/login', login);
router.get('/callback', callback);
router.get('/top-tracks', topTracks);
router.get('/profile', profile);

export default router;
