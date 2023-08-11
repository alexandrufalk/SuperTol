import { useCallback, useEffect, useState } from "react";
import {
  httpGetAllProjects,
  httpAddNewProject,
  httpDeleteProject,
  httpAddNewCase,
  httpDeleteCase,
  httpAddNewDim,
  httpDeleteDim,
} from "./requests";

function useDatabaseProjects() {
  const getDatabaseProjects = useCallback(async () => {
    try {
      const fetchedDatabaseProjects = await httpGetAllProjects();
      console.log("fetchedDatabaseProjects", fetchedDatabaseProjects);
      saveDatabaseProjects(fetchedDatabaseProjects);
    } catch (error) {
      console.error("Error fetching database projects:", error);
    }
  }, []);

  useEffect(() => {
    getDatabaseProjects();
  }, [getDatabaseProjects]);

  const [databaseProjects, saveDatabaseProjects] = useState([]);

  const addNewProject = useCallback(
    async (project) => {
      try {
        const response = await httpAddNewProject(project);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Project wasn't added to the database");
        }
      } catch (error) {
        console.error("Error adding new project:", error);
      }
    },
    [getDatabaseProjects]
  );

  const removeProject = useCallback(
    async (id) => {
      try {
        const response = await httpDeleteProject(id);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Project wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    },
    [getDatabaseProjects]
  );

  const addNewCase = useCallback(
    async (id, newCase) => {
      try {
        const response = await httpAddNewCase(id, newCase);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Case wasn't added to the database");
        }
      } catch (error) {
        console.error("Error adding new case:", error);
      }
    },
    [getDatabaseProjects]
  );

  const removeCase = useCallback(
    async (projectId, caseId) => {
      try {
        const response = await httpDeleteCase(projectId, caseId);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Case wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting case:", error);
      }
    },
    [getDatabaseProjects]
  );

  const addNewDim = useCallback(
    async (id, newDim) => {
      try {
        const response = await httpAddNewDim(id, newDim);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Dimension wasn't added to the database");
        }
      } catch (error) {
        console.error("Error adding new dimension:", error);
      }
    },
    [getDatabaseProjects]
  );

  const removeDim = useCallback(
    async (projectId, dimId) => {
      try {
        const response = await httpDeleteDim(projectId, dimId);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Dimension wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting dimension:", error);
      }
    },
    [getDatabaseProjects]
  );

  return {
    databaseProjects,
    addNewProject,
    removeProject,
    addNewCase,
    removeCase,
    addNewDim,
    removeDim,
  };
}

export default useDatabaseProjects;
