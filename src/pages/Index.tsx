import React from "react";
import GitHubCalendar from "../components/GitHubCalendar";
import { Card } from "../components/ui/card";

const Index = () => {
  // Hardcode your GitHub username and token here
  const username = "mani-miriyala28"; // Replace with your actual GitHub username
  const token =
    "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"; // Replace with your actual GitHub token

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        GitHub Contribution Calendar
      </h1>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Your GitHub Contributions
        </h2>
        <GitHubCalendar
          username={username}
          token={token}
          colorScheme="light"
          blockSize={14}
          blockMargin={2}
          fontSize={13}
        />
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Dark Theme</h2>
        <GitHubCalendar
          username={username}
          token={token}
          colorScheme="dark"
          theme="galaxy"
          blockSize={14}
          blockMargin={2}
          fontSize={13}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Testing Different Themes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Forest Theme</h4>
            <GitHubCalendar
              username={username}
              token={token}
              theme="nature"
              blockSize={10}
              blockMargin={2}
            />
          </div>
          <div>
            <h4 className="font-medium mb-2">Halloween Theme</h4>
            <GitHubCalendar
              username={username}
              token={token}
              theme="halloween"
              blockSize={10}
              blockMargin={2}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
