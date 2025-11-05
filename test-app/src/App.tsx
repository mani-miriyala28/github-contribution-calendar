import React from "react";
// During local development we can import the component directly from the
// workspace source so we don't have to build the package for every change.
// This points to `src/index.ts` in the repo root which re-exports the
// `GitHubCalendar` component.
import { GitHubCalendar } from "../../src";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>GitHub Contribution Calendar Test</h1>
      <GitHubCalendar
        username="mani-miriyala28"
        token={process.env.VITE_GITHUB_TOKEN || ''}  // Set this in your .env file
        colorScheme="light"
        fontSize={12}
        blockSize={12}
        blockMargin={4}
        onYearChange={(year: number) => console.log("Year changed:", year)}
        onDayClick={(day: { date: string; count: number }) =>
          console.log("Day clicked:", day)
        }
        loading={false}
        renderLoading={() => <div>Loading...</div>}
      />
    </div>
  );
};

export default App;
