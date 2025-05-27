import { ReactNode } from "react";

export type ContributionData = {
  date: string;
  count: number;
};

export type ContributionDetails = {
  commits: number;
  pullRequests: number;
  mergeRequests: number;
  pushes: number;
  branchesContributed: number;
};

export type ThemeOption = {
  noContributions: string;
  low: string;
  moderate: string;
  high: string;
  veryHigh: string;
};

export type ThemeColors = Record<string, ThemeOption>;

export type ColorScheme = "light" | "dark" | "system";

export interface GitHubCalendarProps {
  // Data
  username: string;
  token?: string;
  data?: ContributionData[];
  transformData?: (data: any) => ContributionData[];
  fetchData?: (username: string, year?: number) => Promise<ContributionData[]>;
  
  // Appearance
  blockMargin?: number;
  blockRadius?: number; 
  blockSize?: number;
  fontSize?: number;
  
  // Theme options
  theme?: string;
  customTheme?: ThemeOption;
  themes?: ThemeColors;
  colorScheme?: ColorScheme;
  
  // Labels and visibility
  hideColorLegend?: boolean;
  hideMonthLabels?: boolean;
  hideWeekdayLabels?: boolean;
  hideTotalCount?: boolean;
  
  // Events and rendering
  loading?: boolean;
  renderLoading?: () => ReactNode;
  onDayClick?: (day: ContributionData, details?: ContributionDetails) => void;
  renderDay?: (day: ContributionData, defaultRender: ReactNode) => ReactNode;
  renderDetails?: (details: ContributionDetails, date: string) => ReactNode;
  
  // Years
  years?: number[];
  year?: number;
  onYearChange?: (year: number) => void;
}

export interface GitHubCalendarDetailProps {
  date: string;
  formattedDate: string;
  contributionCount: number;
  details: ContributionDetails | null;
  isLoading: boolean;
  fontSize?: number;
  colorScheme?: ColorScheme;
}

export interface GitHubCalendarCellProps {
  date: string;
  day: Date;
  count: number;
  blockSize?: number;
  blockRadius?: number;
  isHighlighted: boolean;
  onClick: () => void;
  onMouseEnter: () => void; 
  onMouseLeave: () => void;
  color: string;
  shouldFade: boolean;
}

export interface GitHubCalendarLegendProps {
  theme: ThemeOption;
  colorScheme?: ColorScheme;
  onLevelClick: (level: string) => void;
  selectedLevel: string | null;
  blockSize?: number;
  blockRadius?: number;
  fontSize?: number;
}
