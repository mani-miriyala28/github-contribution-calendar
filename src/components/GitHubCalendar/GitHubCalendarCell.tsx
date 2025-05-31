
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { format } from "date-fns";
import { GitHubCalendarCellProps } from "./types";

const GitHubCalendarCell: React.FC<GitHubCalendarCellProps> = ({
  date,
  day,
  count,
  blockSize = 14,
  blockRadius = 2,
  isHighlighted,
  onClick,
  onMouseEnter,
  onMouseLeave,
  color,
  shouldFade
}) => {
  return (
    <TooltipProvider>
      <Tooltip open={isHighlighted}>
        <TooltipTrigger onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div
            className="transition-all duration-200"
            style={{
              width: blockSize,
              height: blockSize,
              borderRadius: blockRadius,
              backgroundColor: color,
              opacity: shouldFade ? 0.3 : 1,
              transform: isHighlighted ? "scale(1.1)" : "scale(1)",
              // Apply border when cell is selected (clicked)
              border: isHighlighted && !onMouseEnter ? "2px solid black" : "none",
            }}
          />
        </TooltipTrigger>
        <TooltipContent side="top" className="z-[100]">
          <div className="text-sm">
            <div>{format(day, "MMMM d, yyyy")}</div>
            <div>
              {count} contribution{count !== 1 ? "s" : ""}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GitHubCalendarCell;
