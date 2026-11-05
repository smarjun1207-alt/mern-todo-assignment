# MERN To-Do List — Arjun SM

A full-stack task manager built with MongoDB, Express, React, and Node.js.

## Features
- Create tasks with a title and optional description
- View all tasks
- Mark tasks as completed or pending
- Edit existing tasks
- Delete tasks
- Task counts for all, completed, and pending items
- Input validation and API error handling
- Responsive interface

## Requirements
- Node.js 18 or newer
- npm
- A MongoDB Atlas database (or local MongoDB)

## 1. Configure MongoDB
1. Create a MongoDB Atlas cluster and database user.
2. Copy the connection string for your database.
3. In `backend`, copy `.env.example` to `.env`.
4. Set `MONGO_URI` to your own connection string. Do not commit `.env`.

Example:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority
```

Replace the placeholders with your own Atlas values. Never share the URI or password publicly.

## 2. Install dependencies
From the project root:
```bash
npm install
npm run install:all
```

## 3. Run the application
From the project root:
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/tasks
- Health check: http://localhost:5000/api/health

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example task body
```json
{
  "title": "Complete Web Technology assignment",
  "description": "Build and test the MERN application"
}
```

## Project structure
```text
Arjun_SM_MERN_Todo/
├── backend/
│   ├── models/Task.js
│   ├── routes/tasks.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── screenshots/
├── .gitignore
├── package.json
└── README.md
```

## Screenshots
After running the application, capture your own screenshots and save them in `screenshots/`:
1. Application home page with task list
2. Adding a new task
3. Editing or completing a task
4. Deleting a task

Do not submit placeholder images as evidence.

## GitHub submission workflow
Create a new empty GitHub repository under Arjun's account. Then, from this project directory:
```bash
git init
git add .
git commit -m "Initial commit: add MERN todo project structure"
git branch -M main
git remote add origin <ARJUN_REPOSITORY_HTTPS_URL>
git push -u origin main
```

Create feature branches and make genuine, meaningful changes:
```bash
git checkout -b feature/backend
# implement, test and commit backend work
git add backend
git commit -m "Build task CRUD API and MongoDB model"
git push -u origin feature/backend
```
Open a pull request from `feature/backend` into `main` and merge it after review.

Then create the frontend branch from the updated main:
```bash
git checkout main
git pull origin main
git checkout -b feature/frontend
# implement, test and commit frontend work
git add frontend
git commit -m "Build React task management interface"
git push -u origin feature/frontend
```
Open and merge a second pull request into `main`.

Make commits that represent real work you performed. Do not create empty or misleading commits just to increase the commit count. Follow the exact submission rules given by your instructor.

## Security
- Keep `backend/.env` private.
- Never push passwords, API keys, or MongoDB credentials.
- `.gitignore` excludes environment files and dependencies.
