import type { Candidate, Job } from "../types";
import JobItem from "./JobItem";

interface Props {
  jobs: Job[];
  candidate: Candidate;
}

export default function JobList({ jobs, candidate }: Props) {
  if (jobs.length === 0) {
    return <p>No open positions available at this time.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}