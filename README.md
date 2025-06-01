# React GitHub Contribution Calendar

A beautiful and customizable GitHub contribution calendar component for React applications.

## Features

- 🎨 Multiple themes and color schemes
- 📱 Responsive design
- 🔍 Interactive tooltips
- 📊 Detailed contribution information
- 🎯 Customizable appearance
- 🌙 Dark mode support
- 🔄 Real-time data fetching
- 📦 TypeScript support

## Installation

```bash
npm install react-gh-contribution-calendar
# or
yarn add react-gh-contribution-calendar
```

## Usage

```tsx
import { GitHubCalendar } from "react-gh-contribution-calendar";

function App() {
  return (
    <GitHubCalendar
      username="your-github-username"
      token="your-github-token" // Optional
      theme="classic" // Optional
      colorScheme="light" // Optional
      blockSize={12} // Optional
      blockMargin={2} // Optional
      fontSize={14} // Optional
    />
  );
}
```

## Props

| Prop              | Type              | Default                        | Description                                         |
| ----------------- | ----------------- | ------------------------------ | --------------------------------------------------- |
| username          | string            | required                       | GitHub username to fetch contributions for          |
| token             | string            | -                              | GitHub personal access token (optional)             |
| theme             | string            | 'classic'                      | Theme name ('classic', 'nature', 'halloween', etc.) |
| colorScheme       | 'light' \| 'dark' | 'light'                        | Color scheme preference                             |
| blockSize         | number            | 12                             | Size of contribution blocks in pixels               |
| blockMargin       | number            | 2                              | Margin between blocks in pixels                     |
| fontSize          | number            | 14                             | Font size for labels                                |
| hideColorLegend   | boolean           | false                          | Hide the color legend                               |
| hideMonthLabels   | boolean           | false                          | Hide month labels                                   |
| hideWeekdayLabels | boolean           | false                          | Hide weekday labels                                 |
| hideTotalCount    | boolean           | false                          | Hide total contribution count                       |
| years             | number[]          | [current year, last year, ...] | Years to display                                    |
| onDayClick        | function          | -                              | Callback when a day is clicked                      |
| renderDay         | function          | -                              | Custom render function for days                     |
| renderDetails     | function          | -                              | Custom render function for details                  |

## Themes

The component comes with several built-in themes:

- classic
- nature
- halloween
- galaxy
- and more...

You can also create custom themes by providing a theme object.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
