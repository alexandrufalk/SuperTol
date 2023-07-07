import { useCallback, useEffect, useState } from "react";

import {
  httpGetAllProjects,
  httpAddNewProject,
  httpDeleteProject,
  httpAddNewCase,
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
    async (project) => {
      console.log("project from addNewProject", project);

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

  const addNewCase = useCallback(
    async (id, newCase) => {
      console.log("project from addNewProject", newCase);

      const response = await httpAddNewCase(id, newCase);
      if (response) {
        getDatabaseProjects();
      } else {
        console.log("Project wasn't add to Database");
      }
    },
    [getDatabaseProjects]
  );

  return {
    databaseProjects,
    addNewProject,
    removeProject,
    getDatabaseProjects,
    addNewCase,
  };
}

export default useDatabaseProjects;
