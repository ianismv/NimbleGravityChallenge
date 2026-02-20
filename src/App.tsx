import { useState, useCallback } from "react";
import { getCandidateByEmail, getJobs } from "./services/api";
import type { Candidate, Job } from "./types";
import JobList from "./components/JobList";
import EmailForm from "./components/EmailForm";

type AppStatus = "idle" | "loading" | "ready" | "error";

export default function App() {
  const [status, setStatus] = useState<AppStatus>("idle");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async (email: string) => {
    setStatus("loading");
    setError(null);

    try {
      const [candidateData, jobsData] = await Promise.all([
        getCandidateByEmail(email),
        getJobs(),
      ]);
      setCandidate(candidateData);
      setJobs(jobsData);
      setStatus("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error occurred");
      setStatus("error");
    }
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Nimble Gravity — Open Positions</h1>

      {status === "idle" && (
        <EmailForm onSubmit={initialize} />
      )}

      {status === "loading" && (
        <p>Loading...</p>
      )}

      {status === "error" && (
        <>
          <p style={{ color: "red" }}>{error}</p>
          <EmailForm onSubmit={initialize} />
        </>
      )}

      {status === "ready" && candidate && (
        <>
          <p>
            Welcome, <strong>{candidate.firstName} {candidate.lastName}</strong>
          </p>
          <JobList jobs={jobs} candidate={candidate} />
        </>
      )}
    </div>
  );
}