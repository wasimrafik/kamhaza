# Modern React Application

This is a modern React application built with Vite, featuring PrimeReact components and Tailwind CSS for styling. The project includes Redux for state management and React Router for navigation.

## Features

- ⚡️ Vite for fast development and building
- 🎨 PrimeReact components
- 🎯 Tailwind CSS for utility-first styling
- 📦 Redux Toolkit for state management
- 🚦 React Router for navigation
- 🔄 Axios for API requests
- 📱 Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── api/          # API configuration and services
├── app/          # Redux store configuration
├── assets/       # Static assets
├── components/   # Reusable components
├── features/     # Feature-based modules
├── hooks/        # Custom React hooks
├── layouts/      # Layout components
├── pages/        # Page components
├── routes/       # Route configuration
├── services/     # Business logic services
├── styles/       # Global styles
└── utils/        # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url_here
```

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [PrimeReact Documentation](https://primereact.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
