
import React from "react";
import { GitBranch, GitCommit, GitMerge, GitPullRequest } from "lucide-react";
import { GitHubCalendarDetailProps } from "./types";
import { getStylesByColorScheme } from "./utils";

const GitHubCalendarDetails: React.FC<GitHubCalendarDetailProps> = ({
  formattedDate,
  contributionCount,
  details,
  isLoading,
  fontSize = 14,
  colorScheme = "light"
}) => {
  const styles = getStylesByColorScheme(colorScheme);
  
  return (
    <div
      className="p-4 rounded-md space-y-2"
      style={{ 
        backgroundColor: styles.accent,
        fontSize: `${fontSize}px`
      }}
    >
      <h3 className="font-medium text-lg" style={{ color: styles.text }}>{formattedDate}</h3>
      
      {isLoading ? (
        <div className="animate-pulse space-y-2 mt-2">
          <div className="h-4 rounded w-3/4" style={{ backgroundColor: styles.dayBackground }}></div>
          <div className="h-4 rounded w-1/2" style={{ backgroundColor: styles.dayBackground }}></div>
        </div>
      ) : contributionCount === 0 ? (
        <p style={{ color: styles.muted }}>No activity on this day</p>
      ) : (
        <div className="space-y-2 mt-2">
          <p className="font-medium" style={{ color: styles.text }}>
            {contributionCount} total contribution{contributionCount !== 1 ? 's' : ''}
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4" style={{ color: styles.text }} />
              <span style={{ color: styles.text }}>{details?.commits || 0} commits</span>
            </div>
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4" style={{ color: styles.text }} />
              <span style={{ color: styles.text }}>{details?.pullRequests || 0} pull requests</span>
            </div>
            <div className="flex items-center gap-2">
              <GitMerge className="h-4 w-4" style={{ color: styles.text }} />
              <span style={{ color: styles.text }}>{details?.mergeRequests || 0} merge requests</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" style={{ color: styles.text }} />
              <span style={{ color: styles.text }}>{details?.branchesContributed || 0} branches</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubCalendarDetails;
