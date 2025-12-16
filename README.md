# Campaign Management CRUD Demo

A modern, responsive web application for managing advertising campaigns with a beautiful UI built using React, TypeScript, and Vite.

## 📋 Project Description

This is a full-featured CRUD (Create, Read, Update, Delete) demo application for managing advertising campaigns. The application provides an intuitive interface for creating and managing campaigns with various properties including keywords, location targeting, budget management, and campaign status tracking. It features a clean, modern design with responsive layouts and smooth animations.

## ✨ Features

### Campaign Management
- **Create Campaigns**: Add new campaigns with detailed configuration
- **Edit Campaigns**: Update existing campaign details inline
- **Delete Campaigns**: Remove campaigns with a single click
- **View Campaigns**: Display campaigns in a clean, organized card layout

### Campaign Properties
- **Campaign Name**: Customizable campaign identifier
- **Keywords**: Add and manage multiple keywords per campaign with smart suggestions
- **Bid Amount**: Set the bid amount for the campaign
- **Campaign Fund**: Define the total budget allocated to the campaign
- **Status**: Toggle between Active/Inactive states
- **Location Targeting**: Select from predefined towns/cities
- **Radius**: Define the geographical radius in kilometers

### User Interface Features
- **Balance Tracking**: Real-time balance calculation across all active campaigns
- **Responsive Design**: Adapts seamlessly to different screen sizes (desktop and mobile)
- **Keyword Suggestions**: Predefined keyword suggestions for quick campaign setup
- **Form Validation**: Input validation for all campaign fields
- **Modern Aesthetics**: Clean design with smooth animations and transitions
- **Inline Editing**: Edit campaigns directly in the card view without navigating to separate pages

## 🛠️ Tech Stack

- **React 19.2** - UI library
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Styled Components** - CSS-in-JS for component styling
- **Zustand** - Lightweight state management
- **ESLint** - Code quality and consistency

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or your preferred package manager

### Install Dependencies

```bash
npm install
```

> **Alternative**: If you prefer to use [Bun](https://bun.sh/), you can install it from their official website and run:
> ```bash
> bun install
> ```

## 💻 How to Launch

### Development Mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

**Alternative with Bun:**
```bash
bun run dev
```

The application will be available at `http://localhost:5173/` by default.

### Build for Production

Compile TypeScript and build the production bundle:

```bash
npm run build
```

**Alternative with Bun:**
```bash
bun run build
```

The optimized files will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

**Alternative with Bun:**
```bash
bun run preview
```

### Lint Code

Run ESLint to check code quality:

```bash
npm run lint
```

**Alternative with Bun:**
```bash
bun run lint
```

## 📁 Project Structure

```
crud/
├── src/                          # Source code directory
│   ├── components/               # React components
│   │   ├── Balance.tsx          # Displays total balance from active campaigns
│   │   ├── Card.tsx             # Campaign card component (display mode)
│   │   ├── FormCard.tsx         # Campaign form component (edit/create mode)
│   │   ├── List.tsx             # Campaign list container
│   │   ├── Menu.tsx             # Top menu with action buttons
│   │   └── Wrapper.tsx          # Main application wrapper
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useCampaignForm.ts   # Form state management hook
│   │
│   ├── lib/                      # Utility libraries
│   │   ├── constants.ts         # Application constants (keywords, towns, placeholders)
│   │   ├── field-config.ts      # Field configuration for form rendering
│   │   ├── GlobalStyles.ts      # Global styled-components styles
│   │   ├── mock-campaigns.ts    # Mock campaign data for initial state
│   │   └── utils.ts             # Utility functions (balance calculation, keyword parsing)
│   │
│   ├── services/                 # Business logic services
│   │   └── campaignService.ts   # Campaign CRUD operations
│   │
│   ├── stores/                   # State management
│   │   └── useCampaignStore.ts  # Zustand store for campaign state
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts             # Campaign and Field type definitions
│   │
│   ├── App.tsx                   # Root application component
│   └── main.tsx                  # Application entry point
│
├── index.html                    # HTML template
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json            # TypeScript app-specific config
├── tsconfig.node.json           # TypeScript Node-specific config
├── vite.config.ts               # Vite configuration
├── eslint.config.js             # ESLint configuration
└── README.md                     # This file
```

### Key Architecture Decisions

- **Component Organization**: Components are split into presentational (Card, Balance) and container components (Wrapper, List)
- **State Management**: Zustand provides centralized state management with a simple, intuitive API
- **Type Safety**: TypeScript ensures type safety across the application with centralized type definitions
- **Utilities**: Common logic like balance calculation and keyword parsing is extracted into reusable utilities
- **Configuration**: Field configurations are centralized for easy maintenance and consistency
- **Services Layer**: Business logic is separated from UI components for better maintainability
- **Custom Hooks**: Form logic is encapsulated in custom hooks for reusability

## 🎨 Features in Detail

### Balance Component
Calculates and displays the total balance from all active campaigns. The balance is the sum of all campaign funds for campaigns with "Active" status.

### Campaign Cards
- **Display Mode**: Shows campaign details with edit and delete buttons
- **Edit Mode**: Inline editing with a form interface
- **Responsive**: Cards adapt to different screen sizes

### Form Validation
- Campaign Name: Required field
- Keywords: Supports comma-separated input and smart suggestions
- Bid Amount & Campaign Fund: Numeric validation
- Town: Dropdown selection from predefined options
- Radius: Numeric input with unit (km)

### State Persistence
Campaign data is stored in Zustand state, allowing for:
- Real-time updates across all components
- Efficient re-rendering
- Easy state debugging

## 📝 License

This is a demo project for educational purposes.
