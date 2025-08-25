import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';

import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());

// session middleware (temporary store for codeVerifier)
app.use(
  session({
    secret: 'spotify-secret',
    resave: false,
    saveUninitialized: true
  })
);

// routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
