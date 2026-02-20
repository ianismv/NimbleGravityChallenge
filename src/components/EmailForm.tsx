import { useState } from "react";

interface Props {
  onSubmit: (email: string) => void;
}

export default function EmailForm({ onSubmit }: Props) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email (manosianis@gmail.com)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <button type="submit">Continue</button>
    </form>
  );
}