import { analyzeVideo } from '../server/analyzerService.js';

/**
 * Vercel Serverless Function handler for POST /api/analyze
 */
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Please send a POST request.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const targetUrl = body?.url;
    if (!targetUrl) {
      return res.status(400).json({ error: 'Please provide a valid YouTube video URL.' });
    }

    const data = await analyzeVideo(targetUrl);
    return res.status(200).json(data);
  } catch (err) {
    console.error('Vercel API /api/analyze error:', err.message);
    return res.status(500).json({
      error: err.message || 'Failed to analyze YouTube video. Please verify the URL.',
    });
  }
}
