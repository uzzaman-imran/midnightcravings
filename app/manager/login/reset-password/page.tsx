"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function prepareResetSession() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          setError(
            "This password reset link is invalid or has expired. Please request a new one."
          );
          setCheckingSession(false);
          return;
        }

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError(
          "No password reset session was found. Please request a new reset link."
        );
      }

      setCheckingSession(false);
    }

    prepareResetSession();
  }, [supabase]);

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError(
        "Your reset session has expired. Please request a new reset link."
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password updated successfully.");

    await supabase.auth.signOut();

    setTimeout(() => {
      router.push("/manager/login");
      router.refresh();
    }, 1500);
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 text-white">
        <div className="text-center">
          <p className="text-lg font-semibold">Verifying reset link...</p>
          <p className="mt-2 text-sm text-neutral-400">
            Please wait.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-8 shadow-2xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-orange-400">
            Midnight Cravings
          </p>

          <h1 className="text-3xl font-bold">Set New Password</h1>

          <p className="mt-2 text-sm text-neutral-400">
            Enter a new password for your manager account.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              New password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter new password"
              required
              minLength={8}
              disabled={!!error}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              required
              minLength={8}
              disabled={!!error}
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400 disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {message}
            </div>
          )}

          {!error && !message && (
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          )}

          {error && (
            <button
              type="button"
              onClick={() => router.push("/manager/login")}
              className="w-full rounded-lg border border-white/10 px-4 py-3 font-semibold hover:bg-white/10"
            >
              Back to login
            </button>
          )}
        </form>
      </div>
    </main>
  );
}