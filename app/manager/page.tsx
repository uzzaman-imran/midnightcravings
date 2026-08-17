"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ManagerDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/manager/login");
        return;
      }

      setEmail(user.email ?? "");
      setLoading(false);
    }

    checkUser();
  }, [router, supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/manager/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-neutral-400">
          Loading manager dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-neutral-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-orange-400">
              Midnight Cravings
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Manager Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Welcome back
          </h2>

          <p className="mt-2 text-neutral-400">
            Signed in as {email}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Manage Products */}
          <button
            type="button"
            onClick={() => router.push("/manager/products")}
            className="rounded-2xl border border-white/10 bg-neutral-900 p-6 text-left transition hover:border-orange-500/40 hover:bg-neutral-800"
          >
            <p className="text-sm text-neutral-400">
              Products
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Manage Products
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Add, edit, remove and manage your food items.
            </p>

            <span className="mt-5 inline-block text-sm font-semibold text-orange-400">
              Open Products →
            </span>
          </button>

          {/* Manage Orders */}
          <button
            type="button"
            onClick={() => router.push("/manager/orders")}
            className="rounded-2xl border border-white/10 bg-neutral-900 p-6 text-left transition hover:border-orange-500/40 hover:bg-neutral-800"
          >
            <p className="text-sm text-neutral-400">
              Orders
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Manage Orders
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              View and manage customer orders.
            </p>

            <span className="mt-5 inline-block text-sm font-semibold text-orange-400">
              Open Orders →
            </span>
          </button>

          {/* Manager Account */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
            <p className="text-sm text-neutral-400">
              Account
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Manager Account
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Currently signed in as your manager account.
            </p>

            <p className="mt-5 break-all text-sm text-orange-400">
              {email}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}