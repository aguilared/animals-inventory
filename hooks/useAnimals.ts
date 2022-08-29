import { useInfiniteQuery } from "react-query";

import fetchClient from "../services/fetchClient1";

type ResultData = {
  count: number;
  next: number;
  previous: number;
  results: Animal[];
};
export type Animal = {
  name: string;
  url: string;
};

async function fetchAnimals({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<ResultData> {
  const url = `http://localhost:3000/api/animals/animals_paginated?offset=${pageParam}&limit=3`;
  console.log("URL", url);

  const request = await fetchClient.get<ResultData>(url);

  return request.data;
}
function useAnimals() {
  return useInfiniteQuery(
    ["animals"],
    async ({ pageParam }) => {
      const data = await fetchAnimals({ pageParam });

      return data;
    },
    {
      getNextPageParam: (lastPage) => lastPage?.next,
      getPreviousPageParam: (firstPage) => firstPage?.previous,
    }
  );
}

export default useAnimals;
