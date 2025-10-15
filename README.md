 run bbild# VSD Network - The Currency for the Creator Economy

This is a Next.js project bootstrapped with Firebase and Genkit for the VSD Network, the official financial ecosystem for the Independent Media Group (IMG).

## Overview

The VSD Network is a decentralized financial platform designed to empower creators, artists, and developers by providing access to powerful AI-driven tools and services. It leverages a user-centric ad-revenue model and its native utility token, VSD, to create a self-sustaining economy.

This repository contains the main web application for the VSD Network, including the user-facing marketing site, the token presale interface, the user dashboard, the admin panel, and the backend API services.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Backend**: Firebase (Authentication, Firestore)
- **AI**: Google Genkit (powered by Gemini)
- **Deployment**: Firebase App Hosting

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the necessary Firebase and API keys. The `INTERNAL_API_KEY` is used to secure the internal API routes.

   ```env
   # .env

   # A secret key for securing internal API endpoints.
   # Generate a secure random string for this value.
   INTERNAL_API_KEY="your-super-secret-key"

   # Your Firebase project configuration (can be obtained from the Firebase console)
   # Note: In a deployed Firebase App Hosting environment, these are often configured automatically.
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
   NEXT_PUBLIC_FIREBASE_API_KEY="..."
   ```

   You can get your Firebase configuration from your project settings in the [Firebase Console](https://console.firebase.google.com/).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The application should now be running at `http://localhost:9002`.

## Project Structure

- `src/app/`: Contains all the pages and routes for the application, following the Next.js App Router convention.
- `src/components/`: Shared React components used across the application (e.g., UI elements, layout components).
- `src/ai/`: Includes all Genkit-related code, such as AI flows for image generation.
- `src/firebase/`: Houses all Firebase configuration, providers, and custom hooks (`useUser`, `useCollection`, etc.).
- `src/config/`: Site-wide configuration, such as navigation links.
- `src/lib/`: Utility functions.
- `docs/`: Contains project documentation, including the `backend.json` file which defines the data schema.
- `firestore.rules`: Security rules for the Firestore database.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the codebase for errors and style issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
