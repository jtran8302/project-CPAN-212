// returns current time as an iso string
// used for createdAt and updatedAt timestamps on records
// iso format looks like: "2026-02-19T03:36:28.040Z"
export function nowIso() {
  return new Date().toISOString();
}
