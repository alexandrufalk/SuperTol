import { useCallback, useEffect, useState } from "react";

import {
  httpGetAllProjects,
  httpAddNewProject,
  httpDeleteProject,
} from "./requests";

function useDatabaseProjects() {
  const getDatabaseProjects = useCallback(async () => {
    const fetchedDatabaseProjects = await httpGetAllProjects();
    console.log(
      "httpGetAllProjects fetchedDatabaseProjects",
      fetchedDatabaseProjects
    );
    saveDatabaseProjects(fetchedDatabaseProjects);
  }, []);

  useEffect(() => {
    getDatabaseProjects();
  }, [getDatabaseProjects]);

  const [databaseProjects, saveDatabaseProjects] = useState([]);
  console.log("databaseProjects from useState", databaseProjects);

  const addNewProject = useCallback(
    async (e) => {
      e.preventDefault();
      const project = e.target;
      const response = await httpAddNewProject(project);
      if (response) {
        getDatabaseProjects();
      } else {
        console.log("Project wasn't add to Database");
      }
    },
    [getDatabaseProjects]
  );

  const removeProject = useCallback(
    async (id) => {
      const response = await httpDeleteProject(id);
      if (response) {
        getDatabaseProjects();
      } else {
        console.log("Project wasn't delete");
      }
    },
    [getDatabaseProjects]
  );

  return {
    databaseProjects,
    addNewProject,
    removeProject,
    getDatabaseProjects,
  };
}

export default useDatabaseProjects;
