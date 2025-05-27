
# React GitHub Contribution Calendar

A customizable, beautiful GitHub-style contribution calendar component for React applications.

## Features

- 📊 Displays GitHub-style contribution calendar
- 🎨 Multiple themes (Classic, Halloween, GitHub Dark, etc.)
- 🔄 Year selection
- 📱 Responsive design
- 🖱️ Interactive cells with tooltips
- 📋 Detailed contribution information
- 🧩 Highly customizable

## Installation

```bash
npm install react-github-contribution-calendar
# or
yarn add react-github-contribution-calendar
```

## Basic Usage

```jsx
import React from 'react';
import GitHubCalendar from 'react-github-contribution-calendar';

function App() {
  return (
    <div className="App">
      <GitHubCalendar username="yourusername" />
    </div>
  );
}

export default App;
```

## Local Development Setup

To set up this project locally for development:

1. Create a new folder for your project:
   ```bash
   mkdir github-calendar-test
   cd github-calendar-test
   ```

2. Initialize a new React project with TypeScript:
   ```bash
   npx create-react-app . --template typescript
   # or
   npm create vite@latest . -- --template react-ts
   ```

3. Install dependencies:
   ```bash
   npm install date-fns@^2.29.3 lodash@^4.17.21
   npm install --save-dev @types/lodash@^4.14.184
   ```

4. If using Tailwind CSS and shadcn/ui components (recommended):
   ```bash
   npm install tailwindcss postcss autoprefixer @radix-ui/react-tooltip
   npx tailwindcss init -p
   ```

5. Copy the component files from `src/components/GitHubCalendar` to your project's `src/components` directory

6. Import and use the component in your app:
   ```jsx
   import GitHubCalendar from './components/GitHubCalendar';
   
   function App() {
     return (
       <div className="App p-4">
         <h1 className="text-2xl font-bold mb-4">GitHub Contribution Calendar</h1>
         <GitHubCalendar username="yourusername" />
       </div>
     );
   }
   ```

7. Start the development server:
   ```bash
   npm run dev
   # or
   npm start
   ```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| username | string | - | GitHub username |
| data | ContributionData[] | null | Custom contribution data |
| transformData | function | null | Function to transform fetched data |
| fetchData | function | null | Custom function to fetch contribution data |
| blockMargin | number | 2 | Margin between blocks |
| blockRadius | number | 2 | Border radius of blocks |
| blockSize | number | 12 | Size of contribution blocks |
| fontSize | number | 14 | Font size for labels |
| theme | string | "classic" | Theme name from available themes |
| customTheme | ThemeOption | null | Custom theme object |
| themes | object | null | Custom themes object |
| colorScheme | "light" \| "dark" | "light" | Color scheme |
| hideColorLegend | boolean | false | Hide color legend |
| hideMonthLabels | boolean | false | Hide month labels |
| hideWeekdayLabels | boolean | false | Hide weekday labels |
| hideTotalCount | boolean | false | Hide total contribution count |
| loading | boolean | - | Loading state |
| renderLoading | function | null | Custom loading renderer |
| onDayClick | function | null | Callback when a day is clicked |
| renderDay | function | null | Custom day cell renderer |
| renderDetails | function | null | Custom details renderer |
| years | number[] | [currentYear, currentYear-1, currentYear-2, currentYear-3] | Years to display in buttons |
| year | number | null | Selected year |
| onYearChange | function | null | Callback when year changes |

## License

MIT
