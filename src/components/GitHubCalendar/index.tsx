import React, { useState, useEffect, useCallback } from "react";
import { throttle, debounce } from "lodash";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import GitHubCalendarCell from "./GitHubCalendarCell";
import GitHubCalendarDetails from "./GitHubCalendarDetails";
import GitHubCalendarLegend from "./GitHubCalendarLegend";
import {
  GitHubCalendarProps,
  ContributionData,
  ContributionDetails,
  ThemeOption,
} from "./types";
import {
  getContributionLevel,
  getContributionLevelName,
  getDateRange,
  getWeeks,
  getDaysInWeek,
  getContributionForDate,
  getTotalContributions,
  getMonthLabels,
  getLastContributionDate,
  getStylesByColorScheme,
} from "./utils";
import {
  fetchGitHubContributions,
  fetchContributionDetails,
} from "../../utils/github";
import { lightThemes, darkThemes } from "./themes";

const DEFAULT_THEME = "classic";

const GitHubCalendar: React.FC<GitHubCalendarProps> = ({
  // Data props
  username,
  token,
  data,
  transformData,
  fetchData,

  // Appearance props
  blockMargin = 2,
  blockRadius = 2,
  blockSize = 12,
  fontSize = 14,

  // Theme props
  theme = DEFAULT_THEME,
  customTheme,
  themes: customThemes,
  colorScheme = "light",

  // Visibility props
  hideColorLegend = false,
  hideMonthLabels = false,
  hideWeekdayLabels = false,
  hideTotalCount = false,

  // Event and render props
  loading: isLoadingProp,
  renderLoading,
  onDayClick,
  renderDay,
  renderDetails,

  // Years
  years = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
    new Date().getFullYear() - 3,
  ],
  year,
  onYearChange,
}) => {
  // State variables
  const [contributions, setContributions] = useState<ContributionData[]>(
    data || []
  );
  const [isLoading, setIsLoading] = useState(isLoadingProp || !data);
  const [selectedYear, setSelectedYear] = useState<{
    startDate: Date;
    endDate: Date;
  }>(getDateRange(year));
  const [selectedButton, setSelectedButton] = useState<string>(
    year ? year.toString() : "lastYear"
  );
  const [selectedTheme, setSelectedTheme] = useState<string>(theme);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedDayDetails, setSelectedDayDetails] = useState<{
    date: string;
    formattedDate: string;
    contributionCount: number;
    details: ContributionDetails | null;
    isLoading: boolean;
  } | null>(null);

  // Get the appropriate theme colors based on color scheme
  const allThemes =
    colorScheme === "dark"
      ? { ...darkThemes, ...customThemes }
      : { ...lightThemes, ...customThemes };
  const currentTheme: ThemeOption =
    customTheme || allThemes[selectedTheme] || allThemes[DEFAULT_THEME];
  const styles = getStylesByColorScheme(colorScheme);

  // Fetch contributions data
  useEffect(() => {
    if (data) {
      setContributions(data);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // Reset all selections when year changes
    setSelectedLevel(null);
    setSelectedCell(null);
    setActiveTooltip(null);
    setSelectedDayDetails(null);

    const fetchContributionsData = async () => {
      try {
        let fetchedData;
        if (fetchData) {
          fetchedData = await fetchData(username, year);
        } else {
          try {
            // Try to fetch real data with the provided token if available
            fetchedData = await fetchGitHubContributions(
              username,
              token || "", // Use token if provided, otherwise empty string
              selectedYear.startDate,
              selectedYear.endDate
            );
          } catch (error) {
            console.log("Error fetching GitHub data:", error);
            console.log("Using sample data instead");
            // Generate sample data if the API call fails
            fetchedData = generateSampleData(
              selectedYear.startDate,
              selectedYear.endDate
            );
          }
        }

        if (transformData) {
          fetchedData = transformData(fetchedData);
        }

        setContributions(fetchedData);
      } catch (error) {
        console.error("Error fetching contributions:", error);
        // Generate sample data if real data fetch fails
        const sampleData = generateSampleData(
          selectedYear.startDate,
          selectedYear.endDate
        );
        setContributions(sampleData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributionsData();
  }, [data, fetchData, selectedYear, transformData, username, token, year]);

  // Generate sample contribution data if real data isn't available
  const generateSampleData = (start: Date, end: Date): ContributionData[] => {
    const weeks = getWeeks(start, end);
    const sampleData: ContributionData[] = [];

    weeks.forEach((week) => {
      const days = getDaysInWeek(week);
      days.forEach((day) => {
        // Generate random contribution count (weighted to have more zeros and low numbers)
        const rand = Math.random();
        let count = 0;

        if (rand > 0.65) count = 1;
        if (rand > 0.85) count = 2;
        if (rand > 0.92) count = 3;
        if (rand > 0.96) count = 5;
        if (rand > 0.985) count = 8;

        sampleData.push({
          date: format(day, "yyyy-MM-dd"),
          count: count,
        });
      });
    });

    return sampleData;
  };

  // Fetch details when a day is selected
  useEffect(() => {
    if (selectedDayDetails && selectedDayDetails.isLoading) {
      const fetchDetails = async () => {
        try {
          const details = await fetchContributionDetails(
            username,
            token || "",
            selectedDayDetails.date
          );
          setSelectedDayDetails((prev) =>
            prev
              ? {
                  ...prev,
                  details,
                  isLoading: false,
                }
              : null
          );
        } catch (error) {
          console.error("Error fetching contribution details:", error);
          // Generate sample details if real data fetch fails
          setSelectedDayDetails((prev) =>
            prev
              ? {
                  ...prev,
                  details: {
                    commits: Math.floor(Math.random() * 5),
                    pullRequests: Math.floor(Math.random() * 2),
                    mergeRequests: Math.floor(Math.random() * 2),
                    pushes: Math.floor(Math.random() * 3),
                    branchesContributed: Math.floor(Math.random() * 2),
                  },
                  isLoading: false,
                }
              : null
          );
        }
      };

      fetchDetails();
    }
  }, [selectedDayDetails, username, token]);

  // Handle year change
  const handleYearChange = (startDate: Date, endDate: Date) => {
    setSelectedYear({ startDate, endDate });
    if (onYearChange && startDate.getFullYear() === endDate.getFullYear()) {
      onYearChange(startDate.getFullYear());
    }
  };

  // Handle level click
  const handleLevelClick = (level: string) => {
    if (selectedLevel === level) {
      setSelectedLevel(null);
    } else {
      setSelectedLevel(level);
    }
    setSelectedCell(null);
    setActiveTooltip(null);
    setSelectedDayDetails(null);
  };

  // Throttled mouse handlers
  const throttledMouseEnter = useCallback(
    throttle((dateStr: string) => {
      if (!selectedCell) {
        setActiveTooltip(dateStr);
      }
    }, 100),
    [selectedCell]
  );

  const throttledMouseLeave = useCallback(
    throttle(() => {
      if (!selectedCell) {
        setActiveTooltip(null);
      }
    }, 100),
    [selectedCell]
  );

  // Debounced click handlers
  const debouncedCalendarCellClick = useCallback(
    debounce((dateStr: string, day: Date, count: number) => {
      if (selectedCell === dateStr) {
        setSelectedCell(null);
        setActiveTooltip(null);
        setSelectedDayDetails(null);
      } else {
        setSelectedCell(dateStr);
        setActiveTooltip(dateStr);

        if (onDayClick) {
          onDayClick({ date: dateStr, count });
        } else {
          setSelectedDayDetails({
            date: dateStr,
            formattedDate: format(day, "MMMM d, yyyy"),
            contributionCount: count,
            details: null,
            isLoading: true,
          });
        }
      }
      setSelectedLevel(null);
    }, 200),
    [onDayClick, selectedCell]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      throttledMouseEnter.cancel();
      throttledMouseLeave.cancel();
      debouncedCalendarCellClick.cancel();
    };
  }, [throttledMouseEnter, throttledMouseLeave, debouncedCalendarCellClick]);

  // Render loading state
  if (isLoading) {
    if (renderLoading) {
      return renderLoading();
    }

    return (
      <Card
        className="p-6 animate-fadeIn max-w-full overflow-hidden"
        style={{
          backgroundColor: styles.background,
          borderColor: styles.border,
        }}
      >
        <div className="space-y-6">
          {/* Header with year buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" style={{ color: styles.text }} />
              <h2
                className="text-lg font-semibold hidden sm:inline"
                style={{ color: styles.text }}
              >
                Contribution Calendar
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedButton === "lastYear" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const range = getDateRange();
                  handleYearChange(range.startDate, range.endDate);
                  setSelectedButton("lastYear");
                }}
              >
                Last Year
              </Button>

              {years.map((yearValue) => (
                <Button
                  key={yearValue}
                  variant={
                    selectedButton === yearValue.toString()
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    handleYearChange(
                      new Date(yearValue, 0, 1),
                      new Date(yearValue, 11, 31)
                    );
                    setSelectedButton(yearValue.toString());
                  }}
                >
                  {yearValue}
                </Button>
              ))}
            </div>

            <div>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="border rounded p-1"
                style={{
                  borderColor: styles.border,
                  color: styles.text,
                  backgroundColor: styles.background,
                }}
              >
                {Object.keys(allThemes).map((themeName) => (
                  <option key={themeName} value={themeName}>
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading message */}
          <div
            className="text-center text-lg font-semibold"
            style={{ color: styles.text }}
          >
            Loading contributions...
          </div>

          {/* Calendar grid skeleton */}
          <div className="space-y-2 overflow-x-auto">
            <div className="flex min-w-[1000px]">
              {/* Weekday labels */}
              {!hideWeekdayLabels && (
                <div className="w-10 pt-[22px]">
                  <div
                    className="grid grid-rows-7 text-xs"
                    style={{ color: styles.muted, gap: blockMargin }}
                  >
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                  </div>
                </div>
              )}

              <div className="flex-1">
                {/* Month labels skeleton */}
                {!hideMonthLabels && (
                  <div className="h-5 relative">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-xs animate-pulse"
                        style={{
                          left: `${(i / 12) * 100}%`,
                          backgroundColor: styles.dayBackground,
                          width: "20px",
                          height: "12px",
                          borderRadius: "2px",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Calendar cells skeleton */}
                <div
                  className="grid grid-flow-col"
                  style={{ gap: blockMargin }}
                >
                  {Array.from({ length: 53 }).map((_, weekIndex) => (
                    <div
                      key={weekIndex}
                      className="grid grid-rows-7"
                      style={{ gap: blockMargin }}
                    >
                      {Array.from({ length: 7 }).map((_, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          style={{
                            width: blockSize,
                            height: blockSize,
                            borderRadius: blockRadius,
                            backgroundColor: styles.dayBackground,
                            animation:
                              "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const weeks = getWeeks(selectedYear.startDate, selectedYear.endDate);
  const months = getMonthLabels(weeks);
  const totalContributions = getTotalContributions(contributions);

  return (
    <Card
      className="p-6 animate-fadeIn max-w-full overflow-hidden"
      style={{ backgroundColor: styles.background, borderColor: styles.border }}
    >
      <div className="space-y-6">
        {/* Header with year buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" style={{ color: styles.text }} />
            <h2
              className="text-lg font-semibold hidden sm:inline"
              style={{ color: styles.text }}
            >
              Contribution Calendar
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedButton === "lastYear" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const range = getDateRange();
                handleYearChange(range.startDate, range.endDate);
                setSelectedButton("lastYear");
              }}
            >
              Last Year
            </Button>

            {years.map((yearValue) => (
              <Button
                key={yearValue}
                variant={
                  selectedButton === yearValue.toString()
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  handleYearChange(
                    new Date(yearValue, 0, 1),
                    new Date(yearValue, 11, 31)
                  );
                  setSelectedButton(yearValue.toString());
                }}
              >
                {yearValue}
              </Button>
            ))}
          </div>

          <div>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="border rounded p-1"
              style={{
                borderColor: styles.border,
                color: styles.text,
                backgroundColor: styles.background,
              }}
            >
              {Object.keys(allThemes).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Total contributions count */}
        {!hideTotalCount && (
          <div
            className="text-center text-lg font-semibold"
            style={{ color: styles.text }}
          >
            {totalContributions} contributions in {selectedButton}
          </div>
        )}

        {/* Calendar grid */}
        <div className="space-y-2 overflow-x-auto">
          <div className="flex min-w-[1000px]">
            {/* Weekday labels */}
            {!hideWeekdayLabels && (
              <div className="w-10 pt-[22px]">
                <div
                  className="grid grid-rows-7 text-xs"
                  style={{ color: styles.muted, gap: blockMargin }}
                >
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
              </div>
            )}

            <div className="flex-1">
              {/* Month labels */}
              {!hideMonthLabels && (
                <div className="h-5 relative">
                  {months.map((month, i) => (
                    <div
                      key={i}
                      className="absolute text-xs"
                      style={{
                        left: `${(month.index / weeks.length) * 100}%`,
                        color: styles.muted,
                      }}
                    >
                      {month.label}
                    </div>
                  ))}
                </div>
              )}

              {/* Calendar cells */}
              <div className="relative contribution-grid">
                <div
                  className="grid grid-flow-col"
                  style={{ gap: blockMargin }}
                >
                  {weeks.map((week, weekIndex) => (
                    <div
                      key={weekIndex}
                      className="grid grid-rows-7"
                      style={{ gap: blockMargin }}
                    >
                      {getDaysInWeek(week).map((day, dayIndex) => {
                        const dateStr = format(day, "yyyy-MM-dd");
                        const contributionCount = getContributionForDate(
                          contributions,
                          day
                        );
                        const currentLevel =
                          getContributionLevelName(contributionCount);
                        const isLevelHighlighted =
                          selectedLevel === currentLevel;
                        const isCellHighlighted = selectedCell === dateStr;
                        const shouldFade =
                          (selectedLevel && !isLevelHighlighted) ||
                          (selectedCell && !isCellHighlighted);
                        const color = getContributionLevel(
                          contributionCount,
                          currentTheme
                        );

                        if (renderDay) {
                          const defaultCell = (
                            <GitHubCalendarCell
                              date={dateStr}
                              day={day}
                              count={contributionCount}
                              blockSize={blockSize}
                              blockRadius={blockRadius}
                              isHighlighted={
                                isCellHighlighted || activeTooltip === dateStr
                              }
                              onClick={() =>
                                debouncedCalendarCellClick(
                                  dateStr,
                                  day,
                                  contributionCount
                                )
                              }
                              onMouseEnter={() => throttledMouseEnter(dateStr)}
                              onMouseLeave={throttledMouseLeave}
                              color={color}
                              shouldFade={shouldFade}
                            />
                          );

                          return renderDay(
                            { date: dateStr, count: contributionCount },
                            defaultCell
                          );
                        }

                        return (
                          <GitHubCalendarCell
                            key={`${weekIndex}-${dayIndex}`}
                            date={dateStr}
                            day={day}
                            count={contributionCount}
                            blockSize={blockSize}
                            blockRadius={blockRadius}
                            isHighlighted={
                              isCellHighlighted || activeTooltip === dateStr
                            }
                            onClick={() =>
                              debouncedCalendarCellClick(
                                dateStr,
                                day,
                                contributionCount
                              )
                            }
                            onMouseEnter={() => throttledMouseEnter(dateStr)}
                            onMouseLeave={throttledMouseLeave}
                            color={color}
                            shouldFade={shouldFade}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected day details */}
        {selectedDayDetails && !renderDetails && (
          <GitHubCalendarDetails
            date={selectedDayDetails.date}
            formattedDate={selectedDayDetails.formattedDate}
            contributionCount={selectedDayDetails.contributionCount}
            details={selectedDayDetails.details}
            isLoading={selectedDayDetails.isLoading}
            fontSize={fontSize}
            colorScheme={colorScheme}
          />
        )}

        {/* Custom details renderer */}
        {selectedDayDetails &&
          renderDetails &&
          selectedDayDetails.details &&
          renderDetails(selectedDayDetails.details, selectedDayDetails.date)}

        {/* Footer with last contribution and legend */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div
            className="text-center text-sm"
            style={{ color: styles.muted, fontSize: `${fontSize}px` }}
          >
            Last contributed on: {getLastContributionDate(contributions)}
          </div>

          {!hideColorLegend && (
            <GitHubCalendarLegend
              theme={currentTheme}
              colorScheme={colorScheme}
              onLevelClick={handleLevelClick}
              selectedLevel={selectedLevel}
              blockSize={blockSize}
              blockRadius={blockRadius}
              fontSize={fontSize}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default GitHubCalendar;
