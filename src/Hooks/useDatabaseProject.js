import { useCallback, useEffect, useState } from "react";

import { httpGetAllProjects } from "./requests";

function useDatabaseProjects() {
  const [databaseProjects, saveDatabaseProjects] = useState([]);

  const getDatabaseProjects = useCallback(async () => {
    const fetchedDatabaseProjects = await httpGetAllProjects();
    saveDatabaseProjects(fetchedDatabaseProjects);
  }, []);

  useEffect(() => {
    getDatabaseProjects();
  }, [getDatabaseProjects]);

  return databaseProjects;
}

export default useDatabaseProjects;
