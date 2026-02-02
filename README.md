*MINI TASK MANAGER API*

---

*OVERVIEW*

This project is a backend task management system built using Node.js, Express, and MongoDB.

The codebase is adapted from a previously developed task management application (Tasko) and has been *modified and extended specifically for this coding assignment* to align with the given requirements. The focus is on clean business logic, validation, and clarity rather than heavy frameworks.

---

*FEATURES*

- Create tasks with validation  
- Update task status with controlled state transitions  
- List tasks with filtering and sorting  
- Task metrics and basic analytics  
- User-specific task isolation using authentication  

---

*TASK MODEL*

Each task contains:

- id (MongoDB ObjectId)
- title (required, minimum 3 characters)
- description (optional)
- status  
  - todo  
  - in_progress  
  - done  
- createdAt


---

*STATUS TRANSITION RULES*

Only the following transitions are allowed:

- todo → in_progress  
- todo → done  
- in_progress → done  

Any other transition is rejected to maintain valid task state flow.

---

*API ENDPOINTS*

*Authentication*
- POST /api/auth/register  
- POST /api/auth/login  

*Tasks*
- POST   /api/tasks            → Create task  
- GET    /api/tasks            → List tasks  
- PATCH  /api/tasks/:id/status → Update task status  
- DELETE /api/tasks/:id        → Delete task  



Returns:
- Total number of tasks  
- Count per status  
- Average completion time for completed tasks  

---

*FILTERING & SORTING*

Tasks can be filtered and sorted using query parameters.

Example:
GET /api/tasks?status=done&sort=asc

---

*HOW TO RUN THE PROJECT*

1. Clone the repository
2. Install dependencies

   npm install

3. Create a .env file and configure:

   PORT=5000  
   MONGO_URI=your_mongodb_connection_string  
   JWT_SECRET=your_secret_key  

4. Start the server

   npm start  
   or  
   npm run dev  

The server will run on:
http://localhost:5000

---

*EXAMPLE INPUT / OUTPUT*

*Create Task*

Request:
POST /api/tasks

{
  "title": "Finish assignment",
  "description": "Task manager coding round"
}

Response:
{
  "_id": "65abc123...",
  "title": "Finish assignment",
  "status": "todo",
  "createdAt": "2026-02-01T10:30:00Z",
  "updatedAt": "2026-02-01T10:30:00Z"
}

---

*Update Task Status*

Request:
PATCH /api/tasks/:id/status

{
  "status": "in_progress"
}

Response:
{
  "status": "in_progress"
}

Invalid transition example:
Attempting to change from in_progress → todo will return an error.

---

*ASSUMPTIONS MADE*

- Each task belongs to a single authenticated user
- Authentication is required for all task-related operations
- Tasks follow a strict lifecycle and cannot move backward in status
- MongoDB is used for persistence as it was part of the original project

---

*DESIGN DECISIONS*

- Reused an existing task management backend and refactored it to match assignment requirements
- Introduced explicit status transition rules to enforce valid task flow
- Used a simple and readable controller-service structure
- Prioritized clarity and correctness over adding unnecessary complexity

---

*AI USAGE DISCLOSURE*

AI tools were used responsibly for:
- Clarifying assignment requirements
- Reviewing status transition logic
- Improving code structure and readability

All core business logic, validations, and design decisions were implemented, reviewed, and modified manually to ensure complete understanding.

---

*NOTES*

This submission focuses on:
- Clean backend logic
- Explicit validation
- Maintainable and readable code
- Sound engineering judgment
