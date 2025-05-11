
import { Request, Response, NextFunction } from 'express';
import { httpRequestCounter, httpErrorCounter, httpLatencyHistogram } from '../instrumentation/otelSetup';

// Express middleware for collecting telemetry data
export const telemetryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Record start time
  const startTime = Date.now();

  // Add response finish handler to record metrics
  res.on('finish', () => {
    // Calculate request duration
    const duration = Date.now() - startTime;
    
    const attributes = {
      method: req.method,
      route: req.path,
      statusCode: res.statusCode.toString(),
    };
    
    // Record request count with labels
    httpRequestCounter.add(1, attributes);
    
    // Record latency
    httpLatencyHistogram.record(duration, attributes);
    
    // Record error count if status code is 4xx or 5xx
    if (res.statusCode >= 400) {
      httpErrorCounter.add(1, {
        ...attributes,
        errorType: res.statusCode >= 500 ? 'server_error' : 'client_error',
      });
    }
  });

  next();
};
