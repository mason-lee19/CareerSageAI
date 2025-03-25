interface JobSearchResult {
  // Define the expected structure of your job results
  url: string;
  title: string;
  company: boolean;
  salary: string;
  location: string;
  pullDate: string;
  employmentType: string;
  remoteStatus: boolean;
  yrsExp: string;
  jobDesc: string;
  req: string;
  compDesc: string;
}

interface SearchJobsParams {
  // Expected Search params
  query: string;
  page: number;
  limit: number;
}

export async function searchJobs(
  query: string,
  page: number,
  limit: number
): Promise<JobSearchResult[]> {
  const response = await fetch(
    `http://127.0.0.1:8000/search_jobs/?page=${page}&limit=${limit}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, k: 20, limit: 5 }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<JobSearchResult[]>;
}
