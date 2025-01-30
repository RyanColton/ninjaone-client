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

## Notes
- I decided to use vite because it is a great modern build tool for react, instead of using a full fledged framework like next.js or remix to keep the scope of the project manageable. In a full production application, I would consider using a framework to handle the routing and server side rendering.

- I chose to use react query for the api calls because it is a lightweight addition to your project that makes data fetching and mutation easier to handle. The built in cache invalidation is a great abstraction that makes the api calls more reliable and easier to handle. If we were using a framework like next.js or remix, I would probably stick to using the framework's built in data fetching and mutation tools.

- I chose to use Tailwind CSS mostly due to its time efficency with getting an application up and running. If implemented well, it can be a great way to standardize styling across a large application or microfrontends.

- There is minimal state management in the project, the only state is the device list which is fetched from the server and stored in the react query cache. There is not need for a state management library like redux due to the simplicity of the requirements we are mostly just reading and writing to a single list stored on the backend. I do find that the use case for a library like redux is more rare than most developers think, but it is still a good tool to have in your toolbox if the needs of your application require it.

- All the form inputs are controlled components, I didnt choose to bring in a library like formik or react hook form because I think the modal forms were simple enough to be handled with the native input fields. If more complex forms are needed, I would consider bringing in a library.

- The input fields are validated on the client side, with simple checks for non null values and a check for a number in the capacity field. Again if more complex validation is needed, I would consider bringing in a library like zod or yup

- I chose not to bring in a UI component library like shadcn or tailwindui because I just needed to build a few components and the design was simple enough to be handled with the native tailwind classes. React-modal would be a good addition to the library if more complex modals are needed. I tend to prefer styling raw html inputs when using tailwind, but css in js libraries are a good alternative if it is preferred to keep the html clean. There are performance concerns with css in js libraries, so it is good to be aware of that when considering using them.

-If this were a full production application and we wanted to continue to build our own UI library, I would recommend using a library like storybook to help with development and documentation.

- Some optimizations that could make the application more efficient if the data set was larger include: Implementing pagination or infinite scrolling for the device list, having the sorting searching and filtering be server side, and implementing a robust debounce for the search field. Having the initial render of the application be server side would also help with performance, if I would have gone with a framework like the app router in next.js that would have been built in. Server components are part of react 18 but would require more implementation time done outside a framework.

- Basic considerations for accessibility have been added to the project, but I would consider it a good idea to bring in a library like react-aria or react-a11y to help with accessibility.

- The application should be responsive, but I didnt spend a lot of time on it because the design was simple and the layout was mostly a single column.

- End to end testing would be a good addition to the project, I really have enjoyed working with playwrite and prefer it over cypress. I didnt include any end to end tests due to the scope of the project.