const API_URL = "";
async function httpGetSummary() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/summary`);
  return await response.json();
  // Load summary and return as JSON.
}

export { httpGetSummary };
