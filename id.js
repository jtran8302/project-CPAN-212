import { randomUUID } from "crypto";

// generates a unique id for new records
// used when creating any new item (work order, user, building, etc.)
// uuid format looks like: "550e8400-e29b-41d4-a716-446655440000"
// in phase 2 mongodb will generate its own _id, so this might change
export function newId() {
  return randomUUID();
}
