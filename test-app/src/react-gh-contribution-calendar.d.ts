declare module "react-gh-contribution-calendar" {
  export interface ContributionData {
    date: string;
    count: number;
  }

  export interface GitHubCalendarProps {
    username: string;
    token?: string;
    data?: ContributionData[];
    transformData?: (data: any) => ContributionData[];
    fetchData?: (
      username: string,
      year?: number
    ) => Promise<ContributionData[]>;
    blockMargin?: number;
    blockRadius?: number;
    blockSize?: number;
    fontSize?: number;
    theme?: string;
    customTheme?: any;
    themes?: any;
    colorScheme?: "light" | "dark" | "system";
    hideColorLegend?: boolean;
    hideMonthLabels?: boolean;
    hideWeekdayLabels?: boolean;
    hideTotalCount?: boolean;
    loading?: boolean;
    renderLoading?: () => React.ReactNode;
    onDayClick?: (day: ContributionData, details?: any) => void;
    renderDay?: (
      day: ContributionData,
      defaultRender: React.ReactNode
    ) => React.ReactNode;
    renderDetails?: (details: any, date: string) => React.ReactNode;
    years?: number[];
    year?: number;
    onYearChange?: (year: number) => void;
  }

  export const GitHubCalendar: React.FC<GitHubCalendarProps>;
}
