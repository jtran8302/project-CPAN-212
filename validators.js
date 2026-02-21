// validation helper functions
// will be used in route handlers to check if request data is correct
// before saving to the database
//
// for now just has the basic helpers
// each team member will add their own validate functions in phase 2
// e.g. validateCreateWorkOrder(), validateCreateUser(), etc.
//
// the idea is: collect all errors into an array, then return { ok, errors }
// so the route handler can send back a clear 400 response with what went wrong
