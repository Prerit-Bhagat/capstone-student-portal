export async function fetchApi(endpoint: string) {
  const response = await fetch(`/api${endpoint}`);
  return response.json();
}
