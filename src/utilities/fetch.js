import { useQuery } from '@tanstack/react-query';

const fetchJson = async (url) => {
const response = await fetch(url);
  if (!response.ok) throw response;
  return response.json();
};

export const useJsonQuery = (url) => {
  const { data, isLoading, error } = useQuery(["post", url], () => fetchJson(url));
  return [ data, isLoading, error ];
};