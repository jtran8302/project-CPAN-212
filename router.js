// central router — connects each resource to its route file
// this is where we register all the endpoints for the app
// each route file handles one resource (work orders, users, etc.)
// adding a new resource later = create a route file and add one line here

import { Router } from "express";
import { workOrderRoutes } from "./routes/workOrder.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { buildingRoutes } from "./routes/building.routes.js";
import { unitRoutes } from "./routes/unit.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";

export const router = Router();

// each line below maps a url prefix to a route file
// e.g. /api/work-orders/* is handled by workOrder.routes.js

router.use("/work-orders", workOrderRoutes);  // core feature — maintenance requests
router.use("/users", userRoutes);              // residents, managers, technicians
router.use("/buildings", buildingRoutes);      // condo buildings in the system
router.use("/units", unitRoutes);              // individual units inside buildings
router.use("/categories", categoryRoutes);     // types of maintenance (plumbing, electrical, etc.)
