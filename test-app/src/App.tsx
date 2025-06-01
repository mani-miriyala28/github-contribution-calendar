import React from "react";
import { GitHubCalendar } from "react-gh-contribution-calendar";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>GitHub Contribution Calendar Test</h1>
      <GitHubCalendar
        username="torvalds"
        colorScheme="light"
        fontSize={12}
        blockSize={12}
        blockMargin={4}
        onYearChange={(year) => console.log("Year changed:", year)}
        onDayClick={(day) => console.log("Day clicked:", day)}
        loading={false}
        renderLoading={() => <div>Loading...</div>}
      />
    </div>
  );
};

export default App;
