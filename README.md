# Mahir's Eisenhower Matrix Task App

This app uses a simple GTD system to organize tasks using an Eisenhower Matrix. There is also a board view available for task management. While this project is still in progress, it still shows how I write code, integrate firebase and the different methods I used to build features like the task drawer, pages, the different views.

## Tech stack

-   React for Frontend
-   Firebase Firestore for NoSQL Database
-   Firebase Auth for Sign in and Sign out

## Libraries Used

-   React
-   React Router (Page routing)
-   React Hook Form (Form handling)
-   HeroUI (UI library)
-   Motion
-   Lucide
-   Tailwind

---

## Current Functionality

1.  **Add and Manage Tasks**

    -   Add tasks and manage them through the frontend, and it updates in firestore in real time

2.  **Firebase Offline Functionality**

    -   Task management can be done offline and will automatically update once reconnected

## Next Steps

1.  **Add activity tracking for the tasks**

    -   In the task drawer, show the list of activities that were done to the task (e.g. status change, matrix change, date changed)

2.  **Collaboration**

    -   Allow users to work together on tasks and invite others

3.  **Mobile View**

    -   Use React Native to create a mobile app

---

## Notes

### Why Firebase instead of Supabase

> As you might notice, I used Firebase but have a branch with Supabase integration that I started. The issue that I was experiencing was that Supabase uses a PostgreSQL database, meaning that the task structure needed to be defined before I implemented the database, but the problem is that I knew the task object would change over time. Additionally Supabase needs to be continuously used in order to be active, meaning that the demo could not be used.

---
