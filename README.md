# GitHub Contribution Calendar

A beautiful and customizable GitHub contribution calendar component built with React, TypeScript, and Tailwind CSS. This component allows you to display GitHub contribution data in a visually appealing calendar format with various themes and customization options.

![Classic Theme](src/assets/Classic.png)
![Dark Theme](src/assets/Dark.png)
![Nature Theme](src/assets/Nature.png)
![Winter Theme](src/assets/Winter.png)
![Halloween Theme](src/assets/Halloween.png)
![Monotune Theme](src/assets/Monotune.png)
![Pastel Theme](src/assets/Pastel.png)
![Galaxy Theme](src/assets/Galaxy.png)
![Prism Theme](src/assets/Prism.png)
![Solar Theme](src/assets/Solar.png)
![Velvet Theme](src/assets/Velvet.png)
![Aurora Theme](src/assets/Aurora.png)

## Features

- 🎨 Multiple beautiful themes (Classic, Dark, Nature, Winter, Halloween, and more)
- 🌓 Light/Dark mode support
- 📱 Responsive design
- 🔍 Detailed contribution information on hover/click
- 🎯 Customizable appearance (block size, colors, spacing)
- 🔄 Year selection
- 📊 Contribution level highlighting
- 🔑 GitHub token support for private repositories
- ⚡ Optimized performance with throttling and debouncing
- 🎯 TypeScript support
- 🎨 Tailwind CSS styling

## Prerequisites

Before using this component, you need to:

1. Create a GitHub Personal Access Token:

   - Go to GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic)
   - Click "Generate new token"
   - Select the following scopes:
     - `repo` (Full control of private repositories)
     - `read:user` (Read user profile data)
   - Copy the generated token immediately (you won't be able to see it again)

2. Keep your token secure:
   - Never commit your token to version control
   - Use environment variables to store your token
   - Consider using a token with limited permissions

## Installation

```bash
# Using npm
npm install github-contribution-calendar

# Using yarn
yarn add github-contribution-calendar

# Using pnpm
pnpm add github-contribution-calendar
```

## Basic Usage

```tsx
import { GitHubCalendar } from "github-contribution-calendar";

function App() {
  return (
    <GitHubCalendar
      username="your-github-username"
      token="your-github-token" // Required for accessing contribution data
    />
  );
}
```

### Using Environment Variables

```tsx
import { GitHubCalendar } from "github-contribution-calendar";

function App() {
  return (
    <GitHubCalendar
      username="your-github-username"
      token={process.env.GITHUB_TOKEN} // Store token in environment variables
    />
  );
}
```

## Advanced Usage

### Custom Theme

```tsx
<GitHubCalendar
  username="your-github-username"
  token="your-github-token"
  theme="dark" // or any other theme name
  colorScheme="dark" // 'light' or 'dark'
/>
```

### Custom Appearance

```tsx
<GitHubCalendar
  username="your-github-username"
  token="your-github-token"
  blockSize={12}
  blockMargin={2}
  blockRadius={2}
  fontSize={14}
/>
```

### Year Selection

```tsx
<GitHubCalendar
  username="your-github-username"
  token="your-github-token"
  years={[2024, 2023, 2022]} // Custom years to display
  year={2024} // Default selected year
  onYearChange={(year) => console.log("Selected year:", year)}
/>
```

### Custom Event Handlers

```tsx
<GitHubCalendar
  username="your-github-username"
  token="your-github-token"
  onDayClick={({ date, count }) => {
    console.log(`Clicked on ${date} with ${count} contributions`);
  }}
/>
```

### Custom Rendering

```tsx
<GitHubCalendar
  username="your-github-username"
  token="your-github-token"
  renderDay={({ date, count }, defaultCell) => {
    // Custom day cell rendering
    return <div>{defaultCell}</div>;
  }}
  renderDetails={(details, date) => {
    // Custom details rendering
    return <div>{/* Your custom details component */}</div>;
  }}
/>
```

## Props

| Prop              | Type               | Default                      | Description                             |
| ----------------- | ------------------ | ---------------------------- | --------------------------------------- |
| username          | string             | required                     | GitHub username                         |
| token             | string             | required                     | GitHub personal access token            |
| data              | ContributionData[] | -                            | Pre-fetched contribution data           |
| transformData     | function           | -                            | Function to transform contribution data |
| fetchData         | function           | -                            | Custom data fetching function           |
| blockMargin       | number             | 2                            | Margin between blocks                   |
| blockRadius       | number             | 2                            | Border radius of blocks                 |
| blockSize         | number             | 12                           | Size of contribution blocks             |
| fontSize          | number             | 14                           | Base font size                          |
| theme             | string             | 'classic'                    | Theme name                              |
| customTheme       | object             | -                            | Custom theme colors                     |
| themes            | object             | -                            | Custom themes object                    |
| colorScheme       | 'light' \| 'dark'  | 'light'                      | Color scheme                            |
| hideColorLegend   | boolean            | false                        | Hide color legend                       |
| hideMonthLabels   | boolean            | false                        | Hide month labels                       |
| hideWeekdayLabels | boolean            | false                        | Hide weekday labels                     |
| hideTotalCount    | boolean            | false                        | Hide total contribution count           |
| loading           | boolean            | -                            | Loading state                           |
| renderLoading     | function           | -                            | Custom loading renderer                 |
| onDayClick        | function           | -                            | Day click handler                       |
| renderDay         | function           | -                            | Custom day cell renderer                |
| renderDetails     | function           | -                            | Custom details renderer                 |
| years             | number[]           | [current year, last 3 years] | Years to display                        |
| year              | number             | -                            | Default selected year                   |
| onYearChange      | function           | -                            | Year change handler                     |

## Error Handling

The component provides clear error messages for various scenarios:

- Invalid username: When the provided GitHub username doesn't exist
- Invalid token: When the token is invalid, expired, or doesn't have required permissions
- API rate limiting: When GitHub API rate limit is exceeded
- Network errors: When there are connectivity issues

## Security Best Practices

1. **Token Security**:

   - Never expose your token in client-side code
   - Use environment variables or secure backend storage
   - Regularly rotate your tokens
   - Use tokens with minimal required permissions

2. **Environment Setup**:

   ```env
   # .env.local
   GITHUB_TOKEN=your_token_here
   ```

3. **Production Deployment**:
   - Set up environment variables in your hosting platform
   - Use secure methods to inject tokens in production
   - Consider using a backend proxy for API calls

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]
