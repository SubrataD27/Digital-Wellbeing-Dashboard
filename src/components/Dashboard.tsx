import React, { useEffect } from 'react';
import { Activity, Brain, Coffee, Moon, Sun, Timer, LogOut } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useMetricStore } from '../stores/metricStore';
import { LoadingSpinner } from './LoadingSpinner';
import { signOut } from '../lib/auth';

export default function Dashboard() {
  const { metrics, loading, error, fetchTodayMetrics, updateMetrics, subscribeToUpdates } = useMetricStore();

  useEffect(() => {
    fetchTodayMetrics();
    const unsubscribe = subscribeToUpdates();
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const currentMetrics = metrics[0] || {
    focusTime: 0,
    screenBreaks: 0,
    activityScore: 0,
    sleepQuality: 'Good',
    mindfulMinutes: 0,
    daylightExposure: 0,
  };

  const incrementMetric = (key: keyof typeof currentMetrics) => {
    if (typeof currentMetrics[key] === 'number') {
      updateMetrics({ [key]: (currentMetrics[key] as number) + 1 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="mb-4 text-4xl font-bold text-white">Digital Wellbeing Dashboard</h1>
            <p className="text-gray-300">Monitor and improve your daily balance</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Focus Time"
            value={`${currentMetrics.focusTime}h`}
            icon={<Brain size={24} />}
            color="bg-purple-600"
            onClick={() => incrementMetric('focusTime')}
          />
          <MetricCard
            title="Screen Breaks"
            value={`${currentMetrics.screenBreaks} today`}
            icon={<Coffee size={24} />}
            color="bg-blue-600"
            onClick={() => incrementMetric('screenBreaks')}
          />
          <MetricCard
            title="Activity Score"
            value={`${currentMetrics.activityScore}%`}
            icon={<Activity size={24} />}
            color="bg-green-600"
            onClick={() => incrementMetric('activityScore')}
          />
          <MetricCard
            title="Sleep Quality"
            value={currentMetrics.sleepQuality}
            icon={<Moon size={24} />}
            color="bg-indigo-600"
          />
          <MetricCard
            title="Mindful Minutes"
            value={`${currentMetrics.mindfulMinutes}m`}
            icon={<Timer size={24} />}
            color="bg-red-600"
            onClick={() => incrementMetric('mindfulMinutes')}
          />
          <MetricCard
            title="Daylight Exposure"
            value={`${currentMetrics.daylightExposure}h`}
            icon={<Sun size={24} />}
            color="bg-yellow-600"
            onClick={() => incrementMetric('daylightExposure')}
          />
        </div>
      </div>
    </div>
  );
}