// SIBAQ KUTTIKKATTUR — Standalone Server Entry Point
import app from './app.mjs';

const PORT = Number(process.env.PORT || 3001);

app.listen(PORT, () => {
  console.log(`[server] SIBAQ server listening on http://localhost:${PORT}`);
});
