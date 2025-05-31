import React from "react";
import { GitHubCalendarLegendProps, ThemeOption } from "./types";
import { getStylesByColorScheme } from "./utils";

const GitHubCalendarLegend: React.FC<GitHubCalendarLegendProps> = ({
  theme,
  colorScheme = "light",
  onLevelClick,
  selectedLevel,
  blockSize = 14,
  blockRadius = 2,
  fontSize = 13,
}) => {
  const styles = getStylesByColorScheme(colorScheme);
  const levels = [
    "noContributions",
    "low",
    "moderate",
    "high",
    "veryHigh",
  ] as const;
  type Level = (typeof levels)[number];

  return (
    <div
      className="flex items-center justify-end space-x-2 text-sm"
      style={{ fontSize: `${fontSize}px` }}
    >
      <span style={{ color: styles.muted }}>Less</span>
      <div className="flex space-x-1">
        {levels.map((level) => (
          <div
            key={level}
            className="cursor-pointer transition-all duration-200"
            style={{
              width: blockSize,
              height: blockSize,
              borderRadius: blockRadius,
              backgroundColor: theme[level as keyof ThemeOption],
              transform: selectedLevel === level ? "scale(1.1)" : "scale(1)",
              opacity: selectedLevel && selectedLevel !== level ? 0.3 : 1,
              boxShadow:
                selectedLevel === level ? "0 0 0 2px rgba(0,0,0,0.1)" : "none",
            }}
            onClick={() => onLevelClick(level)}
          />
        ))}
      </div>
      <span style={{ color: styles.muted }}>More</span>
    </div>
  );
};

export default GitHubCalendarLegend;
