declare module "react-gh-contribution-calendar" {
  import { FC } from "react";

  export interface GitHubCalendarProps {
    username: string;
    token?: string;
    theme?: string;
    colorScheme?: "light" | "dark";
    blockSize?: number;
    blockMargin?: number;
    fontSize?: number;
    hideColorLegend?: boolean;
    hideMonthLabels?: boolean;
    hideWeekdayLabels?: boolean;
    hideTotalCount?: boolean;
    years?: number[];
    onDayClick?: (data: { date: string; count: number }) => void;
    renderDay?: (
      data: { date: string; count: number },
      defaultCell: React.ReactNode
    ) => React.ReactNode;
    renderDetails?: (details: any, date: string) => React.ReactNode;
  }

  export const GitHubCalendar: FC<GitHubCalendarProps>;
}
