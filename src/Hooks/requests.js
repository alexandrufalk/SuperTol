const API_URL = "http://localhost:5001/v1";
async function httpGetAllProjects() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/databaseproject`);

  return await response.json();
  // Load Database and return as JSON.
}

//add new project

async function httpAddNewProject(project) {
  console.log("launch httpSubmitLaunch", project);
  // TODO: Once API is ready.
  // Submit given project data to launch system.
  try {
    return await fetch(`${API_URL}/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

//delete project

async function httpDeleteProject(id) {
  // TODO: Once API is ready.
  // Delete project with given ID.
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export { httpGetAllProjects, httpAddNewProject, httpDeleteProject };
