
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Metrics {
  requestRate: number;
  errorRate: number;
  p95Latency: number;
  p99Latency: number;
}

const ObservabilityDashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    requestRate: 0,
    errorRate: 0,
    p95Latency: 0,
    p99Latency: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // In a real app, we would fetch this from our metrics API
        // Currently mocking the data
        setMetrics({
          requestRate: Math.floor(Math.random() * 100),
          errorRate: Math.floor(Math.random() * 10),
          p95Latency: Math.floor(Math.random() * 200),
          p99Latency: Math.floor(Math.random() * 500),
        });
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };

    fetchMetrics();
    const intervalId = setInterval(fetchMetrics, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getErrorRateColor = (rate: number) => {
    if (rate < 5) return "bg-green-500";
    if (rate < 10) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return "bg-green-500";
    if (latency < 300) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold">Application Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Request Rate</h3>
          <p className="text-3xl font-bold">{metrics.requestRate} req/s</p>
          <Progress value={metrics.requestRate} className="mt-4" />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Error Rate</h3>
          <p className="text-3xl font-bold">{metrics.errorRate}%</p>
          <Progress value={metrics.errorRate * 10} className={`mt-4 ${getErrorRateColor(metrics.errorRate)}`} />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">p95 Latency</h3>
          <p className="text-3xl font-bold">{metrics.p95Latency} ms</p>
          <Progress value={(metrics.p95Latency / 500) * 100} className={`mt-4 ${getLatencyColor(metrics.p95Latency)}`} />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">p99 Latency</h3>
          <p className="text-3xl font-bold">{metrics.p99Latency} ms</p>
          <Progress value={(metrics.p99Latency / 1000) * 100} className={`mt-4 ${getLatencyColor(metrics.p99Latency)}`} />
        </Card>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Data refreshes every 5 seconds. In production, metrics would be fetched from Prometheus.</p>
      </div>
    </div>
  );
};

export default ObservabilityDashboard;
