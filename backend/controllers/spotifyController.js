// controllers/spotifyController.js
import axios from 'axios';
import { getTopTracks } from '../services/spotifyService.js';

let cachedAccessToken = '';

export const login = (req, res) => {
  // ... login logic
};

export const callback = async (req, res) => {
  // ... callback logic
};

export const topTracks = async (req, res) => {
  // ... top tracks logic
};

export const profile = async (req, res) => {
  // ... profile logic
};
