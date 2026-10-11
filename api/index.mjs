// Vercel Serverless Function entry point
import app from '../server/app.mjs';

export default function handler(req, res) {
  // Normalize URL to /api prefix if Vercel strips it in rewrite
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  return app(req, res);
}
