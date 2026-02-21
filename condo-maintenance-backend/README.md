# Condo Maintenance Work Order System

## Team Members
- Quang Hung Tran [n01650970] - slide deck, readme, categories related files
- Silas Kajinaki [n01703372] - workOrder route js, config js -> this is like basic grounded business rule and setup
- Jayden Clark [n01510051] - user route js + seed js -> sample data users
- Denzel Mbaki [n01700856] - user route js + seed js -> sample data users
- Christian Kiyimba [n01707975] - server js / middleware -> infras 1
- Vishal [n01737533] - router js / utils -> infras 2

## What Is This

A web app for managing maintenance requests in condo buildings.
Think of it like a ticket system but for stuff that breaks in your apartment.

- Residents report issues (leaking faucet, broken light, etc.)
- Managers see the requests and assign a technician
- Technicians update the status as they work on it

We're building this for the Canadian condo market, starting with Toronto.

## Why This Exists (Business Case)

Right now most condos handle maintenance through emails, phone calls, or paper forms.
Requests get lost, nobody knows the status, and there's no record of what happened.

This system puts everything in one place — residents submit requests,
managers track them, technicians get their assignments. Everyone can see
what's going on without chasing people down.

## What Phase 1 Covers

Phase 1 is just the backend foundation. No working features yet.
We set up the project structure, defined all the API routes,
and created sample data so we know what our models look like.

What's done:
- Express server runs with a health check endpoint
- All API route files exist with endpoint definitions
- Sample data created for all 5 resources (users, buildings, units, categories, work orders)
- Config file with all the enums (statuses, roles, priorities, categories)
- Project structure and folder layout

What's NOT done yet (planned for phase 2-3):
- No route actually returns data yet — handlers are defined but empty
- No services or repositories — business logic not implemented
- No database — using json files as placeholder for now
- No authentication or authorization
- No frontend

## How To Run It

```bash
npm install        # install dependencies
npm run seed       # creates sample data in the /data folder
npm start          # starts the server on http://localhost:3000
```

After starting, go to `http://localhost:3000/health` to check if the server is running.
You should see `{ "status": "ok" }`.

## API Routes

These routes are defined but not yet implemented.
They show the planned API structure for the full app.

### Health Check

GET /health: confirms the server is running


### Work Orders (Core Feature)

GET /api/work-orders: list all work orders (supports filters)  
GET /api/work-orders/:id: get a single work order by ID  
POST /api/work-orders: create a new maintenance request  
PUT /api/work-orders/:id: update full work order details  
PATCH /api/work-orders/:id/status: update work order status (with special rules)  
DELETE /api/work-orders/:id: delete a work order  


### Users

GET /api/users: list all users (can filter by role)  
GET /api/users/:id: get a single user  
POST /api/users: create a new user  
PUT /api/users/:id: update user information  
DELETE /api/users/:id: delete a user  


### Buildings

GET /api/buildings: list all buildings  
GET /api/buildings/:id: get a single building  
POST /api/buildings: register a new building  
PUT /api/buildings/:id: update building details  
DELETE /api/buildings/:id: delete a building  


### Units

GET /api/units: list all units (can filter by building)  
GET /api/units/:id: get a single unit  
POST /api/units: add a unit to a building  
PUT /api/units/:id: update unit details  
DELETE /api/units/:id: delete a unit  


### Categories

GET /api/categories: list all maintenance categories  
GET /api/categories/:id: get a single category  
POST /api/categories: create a new category  
DELETE /api/categories/:id: delete a category  


## Data Models

These are the 5 resources in our system. You can see the actual sample data
in the `/data` folder after running `npm run seed`.

### Work Order
The main thing in the app. A maintenance request from a resident.
```
- id              unique identifier
- title           short description of the issue
- description     more details about what's wrong
- unitId          which apartment the issue is in
- residentId      who submitted it
- technicianId    who's assigned to fix it (null if not assigned)
- status          where it is in the lifecycle (NEW, IN_PROCESS, BLOCKED, DONE)
- priority        how urgent (LOW, MEDIUM, HIGH, URGENT)
- category        what type of issue (plumbing, electrical, hvac, etc.)
- createdAt       when it was submitted
```

### User
People who use the system. There are 3 roles:
```
- id              unique identifier
- name            full name
- email           must be unique
- role            resident, manager, or technician
- phone           contact number
- createdAt       when account was created
```

### Building
A condo building in the system.
```
- id              unique identifier
- name            building name
- address         street address
- floors          number of floors
- managerId       which manager oversees this building
- createdAt       when it was added
```

### Unit
An apartment inside a building.
```
- id              unique identifier
- unitNumber      apartment number (e.g. "101", "205")
- buildingId      which building this unit is in
- floor           what floor
- residentId      who lives here (null if vacant)
- createdAt       when it was added
```

### Category
Types of maintenance work.
```
- id              unique identifier
- name            category name (plumbing, electrical, hvac, etc.)
- description     what kind of issues this covers
- createdAt       when it was added
```

## How The Resources Connect

```
Building --> has many --> Units --> has many --> Work Orders
                          |                        |
                          v                        v
                       Resident (user)         Category
                                                   |
                                                   v
                                            Technician (user)
```

A building has units. Each unit can have a resident.
When a resident creates a work order, they pick their unit and a category.
A manager assigns a technician to the work order.

## Work Order Status Lifecycle

Work orders go through these stages:
```
NEW --> IN_PROCESS --> DONE
NEW --> BLOCKED
IN_PROCESS --> BLOCKED
BLOCKED --> IN_PROCESS
```

- NEW: just submitted, nobody assigned yet
- IN_PROCESS: technician is working on it
- BLOCKED: something is preventing progress (e.g. waiting for parts)
- DONE: issue is resolved

The exact transition rules (what's allowed, what's not) will be
implemented in phase 2.

## Project Structure

condo-maintenance-backend/

  package.json: defines dependencies and scripts (e.g. npm run seed), basic project metadata
  README.md: setup instructions, how to run the server, how to seed sample data

  src/

    server.js: Express setup, mounts router, includes health check endpoint, starts the server
    router.js: connects URL paths to the corresponding route files
    config.js: stores enums (statuses, roles, priorities) and JSON file paths
    seed.js: generates sample data and writes JSON files into the data folder

    routes/

      workOrder.routes.js: defines all endpoints related to work orders
      user.routes.js: defines all endpoints related to users
      building.routes.js: defines all endpoints related to buildings
      unit.routes.js: defines all endpoints related to units
      category.routes.js: defines all endpoints related to categories

    middleware/

      requestLogger.js: logs incoming requests for debugging (not implemented yet)

    utils/

      validators.js: validates incoming request data (not implemented yet)
      fileStore.js: handles reading and writing JSON files
      id.js: generates unique IDs for new records
      time.js: returns the current timestamp

  data/

    workOrders.json: stores work order records
    users.json: stores user records
    buildings.json: stores building records
    units.json: stores unit records
    categories.json: stores category records## Tech Stack
- Node.js — javascript runtime
- Express.js — web framework for building the API
- JSON files — temporary data storage (will switch to MongoDB in phase 2)

## What's Next

### Phase 2 — Database and Security
- Connect MongoDB using Mongoose (replace json files)
- Add authentication with JWT (login/register)
- Implement role-based access (who can do what)
- Build out the route logic — services, repositories, validation

### Phase 3 — Frontend and Deployment
- Build React frontend that connects to this backend
- Pages for each user role (resident view, manager dashboard, technician tasks)
- Deploy the whole thing to a hosting platform
