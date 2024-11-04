// src/services/tokenService.ts
import axios from 'axios';
import qs from 'qs';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export const getToken = async (): Promise<string> => {
  const currentTime = Date.now();

  if (cachedToken && tokenExpiry && currentTime < tokenExpiry) {
    return cachedToken;
  }

  const { CLIENT_ID, CLIENT_SECRET, API_KEY, SCOPE, TOKEN_URL } = process.env;

  if (!CLIENT_ID || !CLIENT_SECRET || !API_KEY || !SCOPE || !TOKEN_URL) {
    throw new Error('Server configuration error');
  }

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const headers = {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = qs.stringify({
    grant_type: 'password',
    username: API_KEY,
    password: API_KEY,
    scope: SCOPE,
  });

  try {
    const response = await axios.post(TOKEN_URL, data, { headers });
    const { access_token, expires_in } = response.data;

    cachedToken = access_token as string;
    tokenExpiry = currentTime + expires_in * 1000 - 60 * 1000;

    return cachedToken;
  } catch (error: any) {
    console.error('Error fetching token:', error.response?.data || error.message);
    throw new Error('Failed to fetch token');
  }
};

