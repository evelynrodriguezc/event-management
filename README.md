```markdown
  # TechPoint

  Platform for creating and discovering tech events across Latin America — conferences, meetups, workshops, hackathons.

  ## Features

  - User registration and login (JWT)
  - Create, edit, and delete events
  - Browse and filter events by date and location
  - Responsive layout

  ## Stack

  **Frontend:** React, React Bootstrap, React Router, Axios
  **Backend:** Node.js, Express, MongoDB, JWT

  ## Setup

  You'll need Node.js 14+ and MongoDB running locally.

  ```bash
  # Backend
  cd backend
  npm install
  cp .env.example .env   # add your MongoDB URI and JWT secret
  npm start

  # Frontend (separate terminal)
  cd frontend
  npm install
  npm start

  Frontend runs on localhost:3000, backend on localhost:5000.
