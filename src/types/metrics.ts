export interface Metric {
  id: string;
  userId: string;
  focusTime: number;
  screenBreaks: number;
  activityScore: number;
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  mindfulMinutes: number;
  daylightExposure: number;
  date: string;
}

export interface MetricUpdate {
  focusTime?: number;
  screenBreaks?: number;
  activityScore?: number;
  sleepQuality?: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  mindfulMinutes?: number;
  daylightExposure?: number;
}