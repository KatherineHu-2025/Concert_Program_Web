# Concert Program Web Application

## Overview

This repository contains the code for a concert program web application that allows users to add, browse, and manage concert events. Below, you'll find a directory overview to help navigate the key features and functionality:

- **Login and Signup Functionality**
  - `app/signup/page.tsx`: Contains the signup / login page for users to register or login to an account. The user can either choose to register through email or Google account.
- **Add Event Feature**
  - `app/add-event/page.tsx`: Allows users to add a new concert event. Includes a form collecting information for an event, such as title, datetime, location, concert type, performers, pieces, and etc.
- **Dashboard and Events Display**
  - `components/Dashboard.tsx`: Displays a list of all concert events added by users in chronological order. Events are categorized into:
	- Upcoming Events: Events scheduled for the future.
	- Past Events: Events that have already occurred.
  - `components/ConcertCard.tsx`: Represents individual concert events.

## Getting Started

### Prerequisites

Follow these steps to set up and run the project locally:

1.	Software Requirements:
	- Install Node.js (v16 or higher recommended).
	- Install npm, yarn, or pnpm for package management.
2.	Firebase Setup:
	- Create a Firebase project at Firebase Console.
	- Enable Authentication with Email/Password and Google sign-in methods.
	- Enable Firestore Database and configure security rules.
3.	OpenAI Setup (Optional for Generating Program Notes):
	- Create an OpenAI account and retrieve an API key from OpenAI.

### Step-by-Step Instructions

1.	Clone the Repository
```bash
git clone <repository-url>
cd concert_program_web
```

2.	Install Dependencies
Install the required packages with npm, yarn, or pnpm:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3.	Configure Environment Variables
    - Create a .env.local file in the root directory.
    - Add your Firebase and OpenAI credentials:
    ```bash
    NEXT_PUBLIC_OPENAI_API_KEY= your-openai-api-key
    NEXT_PUBLIC_FIREBASE_API_KEY= your-firebase-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= your-firebase-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID= your-firebase-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= your-firebase-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= your-firebase-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID= your-firebase-app-id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID= your-firebase-measurement-id
    ```

4.	Run the Development Server
Start the server with your preferred package manager:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
The application will be available at http://localhost:3000.

## User Documentation
User Documentation is available at: https://docs.google.com/document/d/1y6ilOXgRpWVcqeQqao48vHe62D14SqQkc6RNH5u_pKw/edit?usp=sharing