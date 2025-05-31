
import { 
  format, 
  subYears, 
  eachWeekOfInterval, 
  eachDayOfInterval, 
  addDays, 
} from "date-fns";
import { ContributionData, ThemeOption, ColorScheme } from "./types";

export const getContributionLevel = (count: number, theme: ThemeOption): string => {
  if (count === 0) return theme.noContributions;
  if (count <= 2) return theme.low;
  if (count <= 4) return theme.moderate;
  if (count <= 6) return theme.high;
  return theme.veryHigh;
};

export const getContributionLevelName = (count: number): string => {
  if (count === 0) return "noContributions";
  if (count <= 2) return "low";
  if (count <= 4) return "moderate";
  if (count <= 6) return "high";
  return "veryHigh";
};

export const getDateRange = (year?: number) => {
  const now = new Date();
  
  if (year) {
    return {
      startDate: new Date(year, 0, 1),
      endDate: new Date(year, 11, 31)
    };
  }
  
  return {
    startDate: subYears(now, 1),
    endDate: now
  };
};

export const getWeeks = (startDate: Date, endDate: Date) => {
  return eachWeekOfInterval({ start: startDate, end: endDate });
};

export const getDaysInWeek = (weekStart: Date) => {
  return eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });
};

export const getContributionForDate = (contributions: ContributionData[], date: Date): number => {
  const dateStr = format(date, "yyyy-MM-dd");
  return contributions.find(c => c.date === dateStr)?.count || 0;
};

export const getTotalContributions = (contributions: ContributionData[]): number => {
  return contributions.reduce((sum, day) => sum + day.count, 0);
};

export const getMonthLabels = (weeks: Date[]) => {
  if (weeks.length === 0) return [];
  
  const monthPositions: { label: string; index: number }[] = [];
  
  // For each week
  for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
    const week = weeks[weekIndex];
    const daysInWeek = getDaysInWeek(week);
    
    // For each day in the week
    for (let i = 0; i < daysInWeek.length; i++) {
      const day = daysInWeek[i];
      
      // If this is the first day of a month
      if (day.getDate() === 1) {
        // Check if we already have this month
        const monthName = format(day, "MMM");
        const exists = monthPositions.some(m => m.label === monthName);
        
        if (!exists) {
          monthPositions.push({
            label: monthName,
            index: weekIndex
          });
        }
      }
    }
  }
  
  return monthPositions.sort((a, b) => a.index - b.index);
};

export const formatDateWithSuffix = (dateString: string | null): string => {
  if (!dateString) return "No contributions found";
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = format(date, "MMM");
  const year = date.getFullYear();
  
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";
  
  return `${month} ${day}${suffix}, ${year}`;
};

export const getLastContributionDate = (contributions: ContributionData[]): string => {
  let lastContributionDate = null;
  
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      lastContributionDate = contributions[i].date;
      break;
    }
  }
  
  return formatDateWithSuffix(lastContributionDate);
};

export const defaultDarkThemeStyle = {
  background: '#0d1117',
  text: '#e6edf3',
  border: '#30363d',
  dayBackground: 'rgba(255, 255, 255, 0.05)',
  muted: '#8b949e',
  accent: '#161b22',
};

export const defaultLightThemeStyle = {
  background: '#ffffff',
  text: '#24292f',
  border: '#d0d7de',
  dayBackground: 'rgba(0, 0, 0, 0.05)',
  muted: '#57606a',
  accent: '#f6f8fa',
};

export const getStylesByColorScheme = (colorScheme: ColorScheme) => {
  if (colorScheme === 'dark') return defaultDarkThemeStyle;
  
  if (colorScheme === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return defaultDarkThemeStyle;
    }
    return defaultLightThemeStyle;
  }
  
  return defaultLightThemeStyle;
};
