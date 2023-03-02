import { useCallback, useEffect, useState } from "react";

import { httpGetxxx } from "./requests";

function useXxx() {
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetxxx();
    savePlanets(fetchedPlanets);
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default useXxx;
