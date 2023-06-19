const API_URL = "http://localhost:5001/v1";
async function httpGetAllProjects() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/databaseproject`);

  return await response.json();
  // Load summary and return as JSON.
}

export { httpGetAllProjects };
