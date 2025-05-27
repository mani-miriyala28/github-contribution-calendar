
import { format } from "date-fns";

export type Contribution = {
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

export const fetchGitHubContributions = async (
  username: string,
  token: string,
  startDate: Date,
  endDate: Date
): Promise<Contribution[]> => {
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
    if (!username) {
      console.error("Missing GitHub username");
      return [];
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authorization header only if token is provided
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
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
    if (
      !data.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    ) {
      console.error("Invalid response structure:", data);
      return [];
    }

    const contributions: Contribution[] = [];

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

export const fetchContributionDetails = async (
  username: string,
  token: string,
  date: string
): Promise<ContributionDetails> => {
  try {
    if (!username) {
      console.error("Missing GitHub username");
      return {
        commits: 0,
        pullRequests: 0,
        mergeRequests: 0,
        pushes: 0,
        branchesContributed: 0,
      };
    }
    
    // For a real implementation, we would fetch detailed data from GitHub API
    // But GitHub's GraphQL API doesn't provide a simple way to get contribution details per day
    // So for now, we generate sample data but use the token parameter for future implementation
    
    // Use the day of month for some random variation
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
