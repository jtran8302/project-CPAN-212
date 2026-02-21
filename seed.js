// seed script — creates sample data in the /data folder
// run with: npm run seed
//
// this generates json files with example records so we have
// something to work with during development
//
// the data here shows what each model looks like (fields, types, relationships)
// once we set up mongodb in phase 2, these json files probably wont be needed
// but for now they serve as our initial data models and test data

import { writeFileSync, mkdirSync } from "fs";
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");

// make sure the data folder exists before writing
mkdirSync(dataDir, { recursive: true });

// simple helper to write json to a file in the data folder
function writeData(filename, data) {
  writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2));
}

const now = new Date().toISOString();
const id = () => randomUUID();

// --- users ---
// 3 sample users, one for each role
// role determines what they can do in the system:
//   resident — submits work orders for their unit
//   manager — reviews requests, assigns technicians
//   technician — gets assigned to fix issues, updates progress
const users = [
  { id: id(), name: "Alice Nguyen", email: "alice@example.com", role: "resident", phone: "416-555-0101", createdAt: now },
  { id: id(), name: "Bob Martinez", email: "bob@example.com", role: "manager", phone: "416-555-0102", createdAt: now },
  { id: id(), name: "Carol Chen", email: "carol@example.com", role: "technician", phone: "416-555-0103", createdAt: now }
];

// --- buildings ---
// a condo building — has a name, address, floor count, and a manager
// managerId links to a user with role "manager"
const buildings = [
  { id: id(), name: "Maple Tower", address: "100 King St W, Toronto, ON", floors: 20, managerId: users[1].id, createdAt: now }
];

// --- units ---
// individual apartments inside a building
// each unit belongs to a building (buildingId) and can have a resident (residentId)
// when creating a work order, the resident picks which unit the issue is in
const units = [
  { id: id(), unitNumber: "101", buildingId: buildings[0].id, floor: 1, residentId: users[0].id, createdAt: now },
  { id: id(), unitNumber: "205", buildingId: buildings[0].id, floor: 2, residentId: null, createdAt: now },
  { id: id(), unitNumber: "310", buildingId: buildings[0].id, floor: 3, residentId: null, createdAt: now }
];

// --- categories ---
// types of maintenance work — used to classify work orders
// helps managers know which technician to assign (plumber vs electrician)
const categories = [
  { id: id(), name: "plumbing", description: "Water and pipe issues", createdAt: now },
  { id: id(), name: "electrical", description: "Electrical and lighting", createdAt: now },
  { id: id(), name: "hvac", description: "Heating and cooling", createdAt: now }
];

// --- work orders ---
// the core of the app — maintenance requests from residents
// each work order has:
//   - who submitted it (residentId) and where (unitId)
//   - what type of issue (category) and how urgent (priority)
//   - current status in the lifecycle (NEW -> IN_PROCESS -> DONE)
//   - who's assigned to fix it (technicianId, null if not assigned yet)
const workOrders = [
  {
    id: id(),
    title: "Leaking kitchen faucet",
    description: "The kitchen faucet has been dripping nonstop since yesterday.",
    unitId: units[0].id,
    residentId: users[0].id,
    technicianId: null,           // not assigned yet
    status: "NEW",                // just submitted
    priority: "MEDIUM",
    category: "plumbing",
    createdAt: now
  },
  {
    id: id(),
    title: "Broken hallway light",
    description: "Hallway light on floor 5 has been flickering.",
    unitId: units[1].id,
    residentId: users[0].id,
    technicianId: users[2].id,    // carol is working on this
    status: "IN_PROCESS",         // being fixed
    priority: "LOW",
    category: "electrical",
    createdAt: now
  }
];

// write everything to json files
writeData("users.json", users);
writeData("buildings.json", buildings);
writeData("units.json", units);
writeData("categories.json", categories);
writeData("workOrders.json", workOrders);

console.log("done — sample data created in /data");
console.log("this is just for reference, might not need it after mongodb setup");
