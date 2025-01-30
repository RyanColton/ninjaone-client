# Device Management Application

A React application for managing devices, built with TypeScript, React Query, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm
- the provided local node server from ninja one up and running on localhost:3000

### Installation
1. Download the repository

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

### Device Management
- View all devices in a list format
- Filter devices by type (Windows, Mac, Linux) multiple selection is supported
- Sort devices by name or HDD capacity
- Search devices by system name
- Add new devices
- Edit existing devices
- Delete devices

### Key Components

#### `/src/components`
- `DeviceList`: Main component for displaying devices
- `DeviceCard`: Individual device display
- `DeviceFilters`: Search, sort, and filter controls
- `Modals/`: Add, Edit, and Delete device modals

#### `/src/apiCalls`
- hooks for mutating data from the server powered by react query

#### `/src/types`
- some basic types for the device object

### Testing
- Tests can be run with `npm test`
- Tests are only stubs with a few basic logic tests and some UI tests around the modals
- Data fetching is mocked, so the tests are not fully integration tests
- The tests are not fully comprehensive, but they are a good starting point

## Technologies Used
- React
- TypeScript
- TanStack Query (React Query)
- Tailwind CSS
- Vite
- Vitest
- React Testing Library

## Project Structure
```
src/
├── components/
│   ├── UILibrary/    # Reusable UI components built with tailwind
│   └── Modals/       # Modal components built with UI library modal (similar to react-modal)
├── apiCalls/         # API custom hooks
├── types/           # TypeScript types
└── utils/           # Utility functions
```