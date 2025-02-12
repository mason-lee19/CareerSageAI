export async function searchJobs(query, page, limit) {
  const response = await fetch(`http://127.0.0.1:8000/search_jobs/?page=${page}&limit=${limit}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, k: 20, limit: 5 }),
  });
  return response.json();
}
