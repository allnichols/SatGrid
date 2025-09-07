
// this is used to provide a consistent "now" across the app
// to avoid discrepancies in satellite positions due to time differences
export const globalNow = new Date().toISOString();