export async function searchJobs(query) {
  const response = await fetch("http://127.0.0.1:8000/search_jobs/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, k: 3 }),
  });
  return response.json();
}
