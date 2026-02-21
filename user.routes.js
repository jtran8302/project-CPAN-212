// user routes — manages the people in the system
// there are 3 roles: resident (submits requests), manager (assigns work),
// technician (does the repairs)
//
// in phase 2, users will also be tied to authentication (login/register)
// and role-based access control (who can do what)

import { Router } from "express";

export const userRoutes = Router();

// GET /api/users
// returns all users — managers need this to see available technicians
// will support filtering by role, e.g. GET /api/users?role=technician
userRoutes.get("/", async (req, res) => {
  // read from users.json
  // filter by role if query param is provided
});

// GET /api/users/:id
// returns one user's profile info
// used to display who submitted a work order, who's assigned, etc.
userRoutes.get("/:id", async (req, res) => {
  // find by id, 404 if not found
});

// POST /api/users
// creates a new user account
// in phase 2 this will also handle password hashing for auth
userRoutes.post("/", async (req, res) => {
  // needs: name, email, role
  // email should be unique across all users
  // role must be one of: resident, manager, technician
});

// PUT /api/users/:id
// updates user profile info
userRoutes.put("/:id", async (req, res) => {
  // find user first, 404 if not found
  // if changing email, check it's still unique
});

// DELETE /api/users/:id
// removes a user from the system
userRoutes.delete("/:id", async (req, res) => {
  // check if user exists
  // in the future, check if they have open work orders first
});
