import { useCallback, useEffect, useState } from "react";

import { httpGetSummary } from "./requests";

function useSummry() {
  const [summary, saveSummary] = useState([]);

  const getSummary = useCallback(async () => {
    const fetchedPlanets = await httpGetSummary();
    saveSummary(fetchedPlanets);
  }, []);

  useEffect(() => {
    getSummary();
  }, [getSummary]);

  return summary;
}

export default useSummry;
