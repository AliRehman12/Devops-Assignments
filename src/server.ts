
import express from 'express';
import path from 'path';
import { startInstrumentation } from './instrumentation/otelSetup';
import { telemetryMiddleware } from './middleware/telemetryMiddleware';

// Initialize OpenTelemetry
startInstrumentation();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Apply telemetry middleware
app.use(telemetryMiddleware);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), version: process.env.VERSION || 'unknown' });
});

// The "catchall" handler: for any request that doesn't match the ones above,
// send back the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Version: ${process.env.VERSION || 'development'}`);
});

export default app;
