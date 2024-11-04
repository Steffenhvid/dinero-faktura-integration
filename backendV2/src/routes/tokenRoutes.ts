// src/routes/tokenRoutes.ts
import express from 'express';
import { getTokenController } from '../controllers/tokenController';

const router = express.Router();

router.get('/token', getTokenController);

export default router;

