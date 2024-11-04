// src/controllers/tokenController.ts
import { Request, Response } from 'express';
import { getToken } from '../services/tokenService';

export const getTokenController = async (req: Request, res: Response) => {
  try {
    const token = await getToken();
    res.json({ access_token: token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

