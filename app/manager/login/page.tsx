"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ManagerLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/manager");
    router.refresh();
  }

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email address first.");
      return;
    }

    setResetLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        "http://localhost:3000/manager/login/reset-password",
    });

    if (error) {
      setError(error.message);
      setResetLoading(false);
      return;
    }

    setMessage(
      "Password reset email sent. Check your email and follow the link."
    );

    setResetLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-8 shadow-2xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-orange-400">
            Midnight Cravings
          </p>

          <h1 className="text-3xl font-bold">Manager Login</h1>

          <p className="mt-2 text-sm text-neutral-400">
            Sign in to manage products and orders.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="manager@example.com"
              required
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium"
              >
                Password
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="text-sm text-orange-400 hover:text-orange-300"
              >
                {resetLoading ? "Sending..." : "Forgot password?"}
              </button>
            </div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}