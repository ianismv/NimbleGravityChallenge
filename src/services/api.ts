import type { Candidate, Job, ApplyPayload } from "../types";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    console.error("API ERROR BODY:", body);
    const message =
        body?.error ??
        body?.message ??
        `Request failed (${response.status})`;
    throw new Error(message);
  }
  return response.json();
}

export async function getCandidateByEmail(email: string): Promise<Candidate> {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
  );
  return handleResponse<Candidate>(response);
}

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
  return handleResponse<Job[]>(response);
}

export async function applyToJob(params: ApplyPayload): Promise<{ ok: boolean }> {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return handleResponse<{ ok: boolean }>(response);
}