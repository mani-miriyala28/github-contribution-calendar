
import { format } from "date-fns";
import { ContributionData, ContributionDetails } from "./types";

/**
 * Fetches GitHub contributions for a user over a specified date range.
 *
 * @param username - GitHub username
 * @param token - GitHub API token
 * @param startDate - Start date for contributions
 * @param endDate - End date for contributions
 * @returns Promise with array of contributions
 */
export const fetchGitHubData = async (
  username: string,
  token: string,
  startDate: Date,
  endDate: Date
): Promise<ContributionData[]> => {
  const formattedStartDate = format(startDate, "yyyy-MM-dd'T'00:00:00'Z'");
  const formattedEndDate = format(endDate, "yyyy-MM-dd'T'23:59:59'Z'");
  
  const query = `
    query ($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    if (!token || !username) {
      console.error("Missing GitHub token or username");
      return [];
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: formattedStartDate,
          to: formattedEndDate,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub API Errors:", data.errors);
      throw new Error(data.errors[0]?.message || "GitHub API Error");
    }
    
    if (!data.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
      console.error("Invalid response structure:", data);
      return [];
    }

    const contributions: ContributionData[] = [];

    data.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
      (week: {
        contributionDays: Array<{ date: string; contributionCount: number }>;
      }) => {
        week.contributionDays.forEach((day) => {
          contributions.push({
            date: format(new Date(day.date), "yyyy-MM-dd"),
            count: day.contributionCount,
          });
        });
      }
    );

    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw new Error(
      `Failed to fetch GitHub contributions: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Fetches detailed contribution information for a specific date.
 * 
 * @param username - GitHub username
 * @param token - GitHub API token
 * @param date - Date string in yyyy-MM-dd format
 * @returns Promise with contribution details
 */
export const fetchDayDetails = async (
  username: string,
  token: string,
  date: string
): Promise<ContributionDetails> => {
  try {
    if (!token || !username) {
      console.error("Missing GitHub token or username");
      return {
        commits: 0,
        pullRequests: 0,
        mergeRequests: 0,
        pushes: 0,
        branchesContributed: 0,
      };
    }

    // This is a simplified example - a real implementation would fetch
    // actual data from GitHub API for the specific date
    const contributionCount = parseInt(date.split('-')[2]) % 10;
    
    return {
      commits: contributionCount || 0,
      pullRequests: Math.max(0, Math.floor(contributionCount / 3)),
      mergeRequests: Math.max(0, Math.floor(contributionCount / 4)),
      pushes: Math.max(0, contributionCount - 1),
      branchesContributed: Math.max(0, Math.floor(contributionCount / 2)),
    };
  } catch (error) {
    console.error("Error fetching contribution details:", error);
    return {
      commits: 0,
      pullRequests: 0,
      mergeRequests: 0,
      pushes: 0,
      branchesContributed: 0,
    };
  }
};
