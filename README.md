# Device Management Application

A React application for managing devices, built with TypeScript, React Query, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository

```bash
git clone [your-repo-url]
cd [your-repo-name]
```

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
- Filter devices by type (Windows, Mac, Linux)
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

#### `/src/hooks`
- `useDevices`: React Query hooks for device CRUD operations

#### `/src/services`
- API integration and data fetching logic

#### `/src/types`
- TypeScript type definitions

## Technologies Used
- React
- TypeScript
- TanStack Query (React Query)
- Tailwind CSS
- Vite

## Project Structure
```
src/
├── components/
│   ├── UILibrary/    # Reusable UI components
│   └── Modals/       # Modal components
├── hooks/            # Custom hooks
├── services/         # API services
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Contributing
[Add contribution guidelines if applicable]

## License
[Add license information]
