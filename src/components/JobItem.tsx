import { useState } from "react";
import type { Candidate, Job } from "../types";
import { applyToJob } from "../services/api";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface Props {
  job: Job;
  candidate: Candidate;
}

export default function JobItem({ job, candidate }: Props) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    const trimmedUrl = repoUrl.trim();

    if (!trimmedUrl) {
      setErrorMessage("Repository URL is required.");
      setStatus("error");
      return;
    }

    if (!validateUrl(trimmedUrl)) {
      setErrorMessage("Please enter a valid URL.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      await applyToJob({
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        jobId: job.id,
        repoUrl: trimmedUrl,
      });

      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to apply. Please try again."
      );
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3>{job.title}</h3>

      <input
        type="url"
        placeholder="https://github.com/your-username/your-repo"
        value={repoUrl}
        onChange={(e) => {
          setRepoUrl(e.target.value);
          setErrorMessage(null);
          if (status !== "idle") setStatus("idle");
        }}
        disabled={status === "success"}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />

      <button
        onClick={handleSubmit}
        disabled={status === "submitting" || status === "success"}
      >
        {status === "submitting"
          ? "Submitting..."
          : status === "success"
          ? "✓ Sent"
          : "Submit"}
      </button>

      {status === "error" && errorMessage && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>
          {errorMessage}
        </p>
      )}

      {status === "success" && (
        <p style={{ color: "green", marginTop: "0.5rem" }}>
          Application sent successfully.
        </p>
      )}
    </div>
  );
}
