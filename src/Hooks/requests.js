const API_URL = "";
async function httpGetxxx() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/xxxx`);
  return await response.json();
  // Load planets and return as JSON.
}

export { httpGetxxx };
