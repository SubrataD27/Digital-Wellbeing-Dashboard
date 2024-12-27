import React from 'react';
import Dashboard from './components/Dashboard';
import { AuthForm } from './components/AuthForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-red-600 text-center">
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthForm />;
}

export default App;