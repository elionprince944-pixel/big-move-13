"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, ArrowLeft, LoaderCircle } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Could not sign in.");
        return;
      }
      window.location.assign("/admin");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-page">
      <div className="admin-shell" style={{ maxWidth: 560, paddingTop: 72 }}>
        <a className="back" href="/"><ArrowLeft size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />Back to BIG MOVE</a>
        <div className="kicker" style={{ marginTop: 42, color: "var(--orange)" }}>RESTRICTED AREA</div>
        <h1 className="admin-title">Studio sign in<span className="orange">.</span></h1>
        <p className="admin-lead">Sign in with the admin password configured privately on the server.</p>
        <form className="panel" onSubmit={submit} style={{ marginTop: 28 }}>
          <label className="field-label" htmlFor="admin-password">Admin password</label>
          <input className="admin-input" id="admin-password" type="password" autoComplete="current-password" required maxLength={1024} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter admin password" />
          <button className="primary save" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
            {loading ? <LoaderCircle size={16} /> : <LockKeyhole size={16} />}{loading ? "Signing in…" : "Sign in to admin"}
          </button>
          {error && <div className="notice" role="alert">{error}</div>}
        </form>
      </div>
    </main>
  );
}
