
import ObservabilityDashboard from '@/components/ObservabilityDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Cloud Watch Tower</h1>
          <p className="mt-2">Application Observability & Cloud Deployment</p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Observability Dashboard</h2>
          <ObservabilityDashboard />
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Test Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Health Check</h3>
              <p className="text-gray-600 mb-4">Test the API health endpoint</p>
              <a 
                href="/api/health" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Test Health Endpoint
              </a>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Error Simulator</h3>
              <p className="text-gray-600 mb-4">Randomly returns success or error responses</p>
              <a 
                href="/api/test-error" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Test Error Endpoint
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
