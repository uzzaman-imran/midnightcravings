"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priceRegular, setPriceRegular] = useState("");
  const [priceMedium, setPriceMedium] = useState("");
  const [priceLarge, setPriceLarge] = useState("");

  const [isAvailable, setIsAvailable] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/manager/login");
      return;
    }

    const { error } = await supabase.from("products").insert({
      name,
      category,
      description: description || null,
      price: price ? Number(price) : null,
      image_url: imageUrl || null,
      is_available: isAvailable,
      is_active: isActive,
      price_regular: priceRegular ? Number(priceRegular) : null,
      price_medium: priceMedium ? Number(priceMedium) : null,
      price_large: priceLarge ? Number(priceLarge) : null,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/manager/products");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-neutral-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-orange-400">
              Midnight Cravings
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Add Product
            </h1>
          </div>

          <button
            type="button"
            onClick={() => router.push("/manager/products")}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-white/10 bg-neutral-900 p-6 md:p-8"
        >
          <div>
            <h2 className="text-xl font-semibold">
              Product Details
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Add a new item to your Midnight Cravings menu.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Product name *
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Margherita Pizza"
                className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium"
              >
                Category *
              </label>

              <input
                id="category"
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                placeholder="Pizzas"
                className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              placeholder="Describe the product..."
              className="w-full resize-none rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="mb-2 block text-sm font-medium"
            >
              Image URL
            </label>

            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Pricing
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium"
                >
                  Main price
                </label>

                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="179"
                  className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label
                  htmlFor="priceRegular"
                  className="mb-2 block text-sm font-medium"
                >
                  Regular price
                </label>

                <input
                  id="priceRegular"
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceRegular}
                  onChange={(event) =>
                    setPriceRegular(event.target.value)
                  }
                  placeholder="179"
                  className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label
                  htmlFor="priceMedium"
                  className="mb-2 block text-sm font-medium"
                >
                  Medium price
                </label>

                <input
                  id="priceMedium"
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceMedium}
                  onChange={(event) =>
                    setPriceMedium(event.target.value)
                  }
                  placeholder="249"
                  className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label
                  htmlFor="priceLarge"
                  className="mb-2 block text-sm font-medium"
                >
                  Large price
                </label>

                <input
                  id="priceLarge"
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceLarge}
                  onChange={(event) =>
                    setPriceLarge(event.target.value)
                  }
                  placeholder="349"
                  className="w-full rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Availability
            </h3>

            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={(event) =>
                    setIsAvailable(event.target.checked)
                  }
                  className="h-4 w-4 accent-orange-500"
                />

                <span>
                  <span className="block text-sm font-medium">
                    Available for customers
                  </span>

                  <span className="block text-xs text-neutral-500">
                    Customers can order this product.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(event) =>
                    setIsActive(event.target.checked)
                  }
                  className="h-4 w-4 accent-orange-500"
                />

                <span>
                  <span className="block text-sm font-medium">
                    Active product
                  </span>

                  <span className="block text-xs text-neutral-500">
                    Keep this product active in the system.
                  </span>
                </span>
              </label>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => router.push("/manager/products")}
              className="rounded-lg border border-white/10 px-5 py-3 font-medium transition hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-orange-500 px-5 py-3 font-semibold transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding product..." : "Add product"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}