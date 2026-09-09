import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { analyzeVideo } from './server/analyzerService.js'

/**
 * Built-in local backend middleware for /api/analyze.
 * Allows analyzing real YouTube videos without any paid API keys or external services.
 */
function youtubeAnalyzerPlugin() {
  return {
    name: 'youtube-analyzer-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/analyze') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const targetUrl = parsed.url;
              if (!targetUrl) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Please provide a valid YouTube video URL.' }));
              }

              const analysis = await analyzeVideo(targetUrl);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(analysis));
            } catch (err) {
              console.error('API /api/analyze error:', err.message);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                error: err.message || 'Failed to analyze YouTube video. Please verify the URL.',
              }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    youtubeAnalyzerPlugin(),
  ],
})
