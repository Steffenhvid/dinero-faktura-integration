// src/middleware/setupMiddleware.ts
import express from 'express';
import cors from 'cors';

export const setupMiddleware = (app: express.Application) => {
  app.use(
    cors({
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());
};

