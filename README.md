# GitHub Repos App

A React Native application to browse GitHub repositories using Expo and Redux.

## Features

- View a list of GitHub repositories
- See detailed information about a specific repository
- Responsive design with light and dark mode support

## Technologies Used

- React Native
- Expo
- Redux Toolkit
- React Navigation
- Axios

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the Expo development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Use the Expo Go app on your mobile device or an emulator to run the application.

## Project Structure

- `app/`: Main application code
  - `features/`: Feature-specific components and logic
  - `services/`: API services
  - `store.ts`: Redux store configuration
- `components/`: Reusable UI components
- `constants/`: App-wide constants
- `hooks/`: Custom React hooks

## Testing

Run tests using:
```
npm test
```
or
```
yarn test
