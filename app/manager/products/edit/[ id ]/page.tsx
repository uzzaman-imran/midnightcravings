"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";

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

export default function EditProductPage() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const productId = Number(pathname.split("/").pop());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    async function loadProduct() {
      if (!productId || Number.isNaN(productId)) {
        setError("Invalid product ID.");
        setLoading(false);
        return;
      }

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
        .eq("id", productId)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const product = data as Product;

      setName(product.name);
      setCategory(product.category);
      setDescription(product.description ?? "");
      setPrice(product.price !== null ? String(product.price) : "");
      setImageUrl(product.image_url ?? "");
      setPriceRegular(
        product.price_regular !== null
          ? String(product.price_regular)
          : ""
      );
      setPriceMedium(
        product.price_medium !== null
          ? String(product.price_medium)
          : ""
      );
      setPriceLarge(
        product.price_large !== null
          ? String(product.price_large)
          : ""
      );
      setIsAvailable(product.is_available ?? false);
      setIsActive(product.is_active ?? false);

      setLoading(false);
    }

    loadProduct();
  }, [productId, router, supabase]);

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setUploading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/manager/login");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        setUploading(false);
        return;
      }

      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!fileExtension) {
        setError("Unable to determine the image file type.");
        setUploading(false);
        return;
      }

      const fileName = `${productId}-${Date.now()}.${fileExtension}`;

      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload image."
      );
    }

    setUploading(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/manager/login");
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({
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
      })
      .eq("id", productId);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.push("/manager/products");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        <p className="text-neutral-400">Loading product...</p>
      </main>
    );
  }

  if (error && !name) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <h1 className="text-xl font-semibold">
            Unable to load product
          </h1>

          <p className="mt-2 text-sm text-red-300">
            {error}
          </p>

          <button
            onClick={() => router.push("/manager/products")}
            className="mt-6 rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
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
              Edit Product
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
              Update the information for this menu item.
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
              className="w-full resize-none rounded-lg border border-white/10 bg-neutral-800 px-4 py-3 text-white outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Product Image
            </h3>

            {imageUrl ? (
              <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-neutral-800">
                <img
                  src={imageUrl}
                  alt={name || "Product"}
                  className="h-64 w-full object-cover"
                />
              </div>
            ) : (
              <div className="mb-4 flex h-64 items-center justify-center rounded-xl border border-white/10 bg-neutral-800 text-neutral-500">
                No image
              </div>
            )}

            <label
              htmlFor="productImage"
              className={`inline-flex cursor-pointer items-center rounded-lg border border-orange-500/40 px-5 py-3 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-white ${
                uploading
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              {uploading ? "Uploading image..." : "Choose Image"}

              <input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            <p className="mt-2 text-xs text-neutral-500">
              Choose a new image to replace the current product image.
            </p>
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
              disabled={saving || uploading}
              className="rounded-lg bg-orange-500 px-5 py-3 font-semibold transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving changes..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}