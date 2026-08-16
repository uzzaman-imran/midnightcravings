"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  is_available: boolean | null;
  is_active: boolean | null;
  price_regular: number | null;
  price_medium: number | null;
  price_large: number | null;
};

export default function ManagerProductsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingAvailabilityId, setUpdatingAvailabilityId] = useState<
    number | null
  >(null);

  useEffect(() => {
    async function loadProducts() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/manager/login");
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, category, description, price, image_url, is_available, is_active, price_regular, price_medium, price_large"
        )
        .order("id", { ascending: true });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setProducts(data ?? []);
      setLoading(false);
    }

    loadProducts();
  }, [router, supabase]);

  async function handleToggleAvailability(product: Product) {
    const newAvailability = !(product.is_available ?? false);

    setError("");
    setUpdatingAvailabilityId(product.id);

    const { error } = await supabase
      .from("products")
      .update({
        is_available: newAvailability,
      })
      .eq("id", product.id);

    if (error) {
      setError(error.message);
      setUpdatingAvailabilityId(null);
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((currentProduct) =>
        currentProduct.id === product.id
          ? {
              ...currentProduct,
              is_available: newAvailability,
            }
          : currentProduct
      )
    );

    setUpdatingAvailabilityId(null);
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setDeletingId(product.id);

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      setError(error.message);
      setDeletingId(null);
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (currentProduct) => currentProduct.id !== product.id
      )
    );

    setDeletingId(null);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        <p className="text-neutral-400">Loading products...</p>
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
              Product Management
            </h1>
          </div>

          <button
            onClick={() => router.push("/manager")}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Products</h2>

          <p className="mt-2 text-neutral-400">
            {products.length} products in your menu.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {!error && products.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center">
            <p className="text-neutral-400">No products found.</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-neutral-800 text-neutral-500">
                  No image
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-orange-400">
                      {product.category}
                    </p>

                    <h3 className="mt-1 text-xl font-semibold">
                      {product.name}
                    </h3>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      product.is_available
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {product.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>

                {product.description && (
                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    {product.description}
                  </p>
                )}

                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">
                      Price
                    </span>

                    <span className="text-lg font-semibold text-orange-400">
                      {product.price !== null
                        ? `₹${Number(product.price).toFixed(2)}`
                        : "—"}
                    </span>
                  </div>

                  {(product.price_regular !== null ||
                    product.price_medium !== null ||
                    product.price_large !== null) && (
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-lg bg-neutral-800 p-2">
                        <p className="text-neutral-500">Regular</p>
                        <p className="mt-1 font-medium">
                          {product.price_regular !== null
                            ? `₹${Number(product.price_regular).toFixed(2)}`
                            : "—"}
                        </p>
                      </div>

                      <div className="rounded-lg bg-neutral-800 p-2">
                        <p className="text-neutral-500">Medium</p>
                        <p className="mt-1 font-medium">
                          {product.price_medium !== null
                            ? `₹${Number(product.price_medium).toFixed(2)}`
                            : "—"}
                        </p>
                      </div>

                      <div className="rounded-lg bg-neutral-800 p-2">
                        <p className="text-neutral-500">Large</p>
                        <p className="mt-1 font-medium">
                          {product.price_large !== null
                            ? `₹${Number(product.price_large).toFixed(2)}`
                            : "—"}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleToggleAvailability(product)}
                    disabled={updatingAvailabilityId === product.id}
                    className={`mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      product.is_available
                        ? "border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white"
                        : "border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-white"
                    }`}
                  >
                    {updatingAvailabilityId === product.id
                      ? "Updating..."
                      : product.is_available
                        ? "Mark Unavailable"
                        : "Mark Available"}
                  </button>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/manager/products/edit/${product.id}`
                        )
                      }
                      className="rounded-lg border border-orange-500/40 px-4 py-2.5 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-white"
                    >
                      Edit Product
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                      className="rounded-lg border border-red-500/40 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === product.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}