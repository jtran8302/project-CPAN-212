// category routes — types of maintenance work
// e.g. plumbing, electrical, hvac, structural, etc.
// when creating a work order, the resident picks a category
// this helps managers assign the right technician
//
// simpler than other resources — just a name and description
// no update route needed, just create and delete

import { Router } from "express";

export const categoryRoutes = Router();

// GET /api/categories
// returns all categories — used as dropdown options in the work order form
categoryRoutes.get("/", async (req, res) => {
  // read from categories.json
});

// GET /api/categories/:id
// returns one category
categoryRoutes.get("/:id", async (req, res) => {
  // find by id, 404 if not found
});

// POST /api/categories
// adds a new category type
categoryRoutes.post("/", async (req, res) => {
  // needs: name (at least 2 chars)
  // optional: description
});

// DELETE /api/categories/:id
// removes a category — should check if work orders are using it
categoryRoutes.delete("/:id", async (req, res) => {
  // check if any work orders reference this category first
});
