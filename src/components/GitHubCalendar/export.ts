
// Main component
export { default as GitHubCalendar } from './index';

// Subcomponents
export { default as GitHubCalendarCell } from './GitHubCalendarCell';
export { default as GitHubCalendarDetails } from './GitHubCalendarDetails';
export { default as GitHubCalendarLegend } from './GitHubCalendarLegend';

// Utils
export { lightThemes, darkThemes } from './themes';
export { 
  getContributionLevel,
  getContributionLevelName,
  getDateRange,
  getWeeks,
  getDaysInWeek,
  getContributionForDate,
  getTotalContributions,
  getMonthLabels,
  getLastContributionDate
} from './utils';

// API
export { fetchGitHubData, fetchDayDetails } from './api';

// Types
export * from './types';
