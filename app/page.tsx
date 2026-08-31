"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type PizzaSize = "Regular" | "Medium" | "Large";

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

type CartItem = {
  id: number;
  name: string;
  size?: PizzaSize;
  price: number;
  quantity: number;
};

const PHONE = "9966955540";
const WHATSAPP = "919966955540";

const categoryOrder = [
  "Pizzas",
  "Burgers",
  "Wraps",
  "Sandwiches",
  "Combos",
  "Fries",
  "Mocktails",
  "Milkshakes",
];

const categorySubtitle: Record<string, string> = {
  Pizzas: "Freshly made",
  Burgers: "Big flavour",
  Wraps: "Wrapped fresh",
  Sandwiches: "Fresh & loaded",
  Combos: "More for less",
  Fries: "Crispy & loaded",
  Mocktails: "Cool & refreshing",
  Milkshakes: "Thick & creamy",
};

const categoryEmoji: Record<string, string> = {
  Pizzas: "🍕",
  Burgers: "🍔",
  Wraps: "🌯",
  Sandwiches: "🥪",
  Combos: "🍔🍟🥤",
  Fries: "🍟",
  Mocktails: "🍹",
  Milkshakes: "🥤",
};

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function getCategoryKey(category: string) {
  const value = category.trim().toLowerCase();

  if (value === "pizza" || value === "pizzas") return "Pizzas";
  if (value === "burger" || value === "burgers") return "Burgers";
  if (value === "wrap" || value === "wraps") return "Wraps";
  if (value === "sandwich" || value === "sandwiches") {
    return "Sandwiches";
  }
  if (value === "combo" || value === "combos") return "Combos";
  if (value === "fries" || value === "fry") return "Fries";
  if (value === "mocktail" || value === "mocktails") {
    return "Mocktails";
  }
  if (value === "milkshake" || value === "milkshakes") {
    return "Milkshakes";
  }

  return category;
}

function SectionTitle({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
        {number} • {subtitle}
      </p>

      <h2 className="mt-2 text-4xl font-black sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function ProductCard({
  product,
  selectedSize,
  onSizeChange,
  onAddToCart,
  addedProductId,
}: {
  product: Product;
  selectedSize: PizzaSize;
  onSizeChange: (size: PizzaSize) => void;
  onAddToCart: (product: Product, size?: PizzaSize) => void;
  addedProductId: number | null;
}) {
  const isPizza =
    getCategoryKey(product.category) === "Pizzas";

  const regular =
    product.price_regular ?? product.price ?? 0;

  const medium =
    product.price_medium ?? regular;

  const large =
    product.price_large ?? regular;

  const selectedPrice =
    selectedSize === "Regular"
      ? regular
      : selectedSize === "Medium"
        ? medium
        : large;

  const available = product.is_available === true;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white/[0.04] p-5 transition ${
        available
          ? "border-white/10 hover:border-orange-500/40 hover:bg-white/[0.07]"
          : "border-red-500/30"
      }`}
    >
      {!available && (
        <div className="absolute left-1/2 top-20 z-10 -translate-x-1/2 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
          Unavailable
        </div>
      )}

      {product.image_url ? (
        <img
  src={product.image_url}
  alt={product.name}
  loading="lazy"
  decoding="async"
  className={`mb-5 h-48 w-full rounded-xl object-cover ${
    !available ? "opacity-50 grayscale-[20%]" : ""
  }`}
/>
        
      ) : (
        <div
          className={`mb-5 flex h-48 items-center justify-center rounded-xl bg-white/[0.06] text-7xl ${
            !available ? "opacity-50" : ""
          }`}
        >
          {categoryEmoji[getCategoryKey(product.category)] ?? "🍽️"}
        </div>
      )}

      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-orange-400">
        {getCategoryKey(product.category)}
      </p>

      <h3 className="text-2xl font-bold">
        {product.name}
      </h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-400">
        {product.description || "Freshly made for your cravings."}
      </p>

      {isPizza ? (
        <>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {(
              ["Regular", "Medium", "Large"] as PizzaSize[]
            ).map((size) => {
              const sizePrice =
                size === "Regular"
                  ? regular
                  : size === "Medium"
                    ? medium
                    : large;

              return (
                <button
                  key={size}
                  type="button"
                  disabled={!available}
                  onClick={() => onSizeChange(size)}
                  className={`rounded-lg border px-2 py-3 text-center text-sm transition ${
                    selectedSize === size
                      ? "border-orange-500 bg-orange-500 font-bold text-black"
                      : "border-white/10 hover:bg-white/10"
                  } ${
                    !available
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  <span className="block">
                    {size}
                  </span>

                  <span className="mt-1 block font-bold">
                    ₹{sizePrice}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Selected:{" "}
            <span className="font-bold text-white">
              {selectedSize}
            </span>
          </p>

          <button
            type="button"
            disabled={!available}
            onClick={() =>
              onAddToCart(product, selectedSize)
            }
            className={`mt-5 block w-full rounded-full px-5 py-3 text-center font-bold transition-all duration-200 ${
  !available
    ? "cursor-not-allowed bg-neutral-800 text-neutral-500"
    : addedProductId === product.id
      ? "scale-[0.98] bg-green-500 text-white"
      : "bg-orange-500 text-black hover:bg-orange-400 active:scale-95"
}`}
          >
            {!available
  ? "Unavailable"
  : addedProductId === product.id
    ? "✓ Added to Cart"
    : "Add to Cart"}
          </button>
        </>
      ) : (
        <>
          <div className="mt-5">
            <span className="text-lg font-black text-orange-500">
              ₹{product.price ?? 0}
            </span>
          </div>

          <button
            type="button"
            disabled={!available}
            onClick={() => onAddToCart(product)}
            className={`mt-5 block w-full rounded-full px-5 py-3 text-center font-bold transition-all duration-200 ${
  !available
    ? "cursor-not-allowed bg-neutral-800 text-neutral-500"
    : addedProductId === product.id
      ? "scale-[0.98] bg-green-500 text-white"
      : "bg-orange-500 text-black hover:bg-orange-400 active:scale-95"
}`}
          >
            {!available
  ? "Unavailable"
  : addedProductId === product.id
    ? "✓ Added"
    : "Add to Cart"}
          </button>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] =
    useState(true);
  const [productsError, setProductsError] =
    useState("");

  const [pizzaSelections, setPizzaSelections] =
    useState<Record<number, PizzaSize>>({});

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  async function loadProducts() {
    setProductsError("");

    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, category, description, price, image_url, is_available, is_active, price_regular, price_medium, price_large"
      )
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (error) {
      console.error(
        "CUSTOMER SUPABASE ERROR:",
        error
      );

      setProductsError(error.message);
      setProductsLoading(false);
      return;
    }

    console.log(
      "CUSTOMER PRODUCTS FROM SUPABASE:",
      data
    );

    setProducts(data ?? []);
    setProductsLoading(false);
  }

  useEffect(() => {
    loadProducts();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        loadProducts();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {};

    for (const product of products) {
      const category = getCategoryKey(product.category);

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(product);
    }

    return groups;
  }, [products]);

  const orderedCategories = useMemo(() => {
    const existing = Object.keys(groupedProducts);

    return [
      ...categoryOrder.filter((category) =>
        existing.includes(category)
      ),
      ...existing.filter(
        (category) => !categoryOrder.includes(category)
      ),
    ];
  }, [groupedProducts]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const cartMessage = `Hi Midnight Cravings, I'd like to place this order:

${cart
  .map(
    (item) =>
      `${item.name}${
        item.size ? ` - ${item.size}` : ""
      } - ₹${item.price} x ${item.quantity}`
  )
  .join("\n")}

Total: ₹${cartTotal}`;

  function getPizzaSize(id: number): PizzaSize {
    return pizzaSelections[id] || "Regular";
  }

  function setPizzaSize(
    id: number,
    size: PizzaSize
  ) {
    setPizzaSelections((current) => ({
      ...current,
      [id]: size,
    }));
  }

  function addToCart(
  product: Product,
  size?: PizzaSize
) {
  if (product.is_available !== true) {
    return;
  }

  setAddedProductId(product.id);

  setTimeout(() => {
    setAddedProductId(null);
  }, 1000);

  const isPizza = 
      getCategoryKey(product.category) === "Pizzas";

    const selectedSize = size || "Regular";

    const price = isPizza
      ? selectedSize === "Regular"
        ? product.price_regular ?? product.price ?? 0
        : selectedSize === "Medium"
          ? product.price_medium ??
            product.price_regular ??
            product.price ??
            0
          : product.price_large ??
            product.price_medium ??
            product.price_regular ??
            product.price ??
            0
      : product.price ?? 0;

    setCart((current) => {
      const existingIndex = current.findIndex(
        (item) =>
          item.id === product.id &&
          item.size ===
            (isPizza ? selectedSize : undefined)
      );

      if (existingIndex !== -1) {
        return current.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          size: isPizza
            ? selectedSize
            : undefined,
          price,
          quantity: 1,
        },
      ];
    });
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <a href="#" className="block">
            <h1 className="text-xl font-black tracking-wide sm:text-2xl">
              MIDNIGHT{" "}
              <span className="text-orange-500">
                CRAVINGS
              </span>
            </h1>

            <p className="text-[10px] tracking-[0.3em] text-gray-400 sm:text-xs">
              CLOUD KITCHEN
            </p>
          </a>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#menu"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold hover:bg-white/10"
            >
              View Menu
            </a>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold hover:bg-white/10"
            >
              🛒 Cart ({cartCount})
            </button>

            <a
              href={`tel:${PHONE}`}
              className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-orange-400"
            >
              Order Now
            </a>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-bold hover:bg-white/10"
            >
              🛒 Cart ({cartCount})
            </button>

            <button
              type="button"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="rounded-lg border border-white/10 px-3 py-2"
            >
              ☰
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-4 sm:hidden">
            <div className="flex flex-col gap-3">
              <a
                href="#menu"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 hover:bg-white/10"
              >
                View Menu
              </a>

              <button
                type="button"
                onClick={() => {
                  setCartOpen(true);
                  setMenuOpen(false);
                }}
                className="rounded-full border border-white/15 px-5 py-3 font-bold hover:bg-white/10"
              >
                🛒 Cart ({cartCount})
              </button>

              <a
                href={`tel:${PHONE}`}
                className="rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-black"
              >
                Order Now
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Cart */}
      {cartOpen && (
        <div className="fixed right-2 top-20 z-[60] w-[calc(100%-1rem)] max-w-sm rounded-2xl border border-white/10 bg-[#151515] p-5 shadow-2xl sm:right-5 sm:top-24 sm:w-80">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">
              Your Cart
            </h2>

            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="rounded-lg px-3 py-1 text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>
          </div>

          {cart.length === 0 && (
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-6 text-center">
              <div className="text-5xl">🛒</div>

              <h3 className="mt-4 text-lg font-bold">
                Your cart is empty
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Add something delicious to get started.
              </p>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mt-5 rounded-full bg-orange-500 px-5 py-3 font-bold text-black hover:bg-orange-400"
              >
                Browse Menu
              </button>
            </div>
          )}

          <div className="mt-5 space-y-3">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${item.size ?? "none"}-${index}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    {item.size && (
                      <p className="mt-1 text-sm text-gray-400">
                        {item.size}
                      </p>
                    )}
                  </div>

                  <span className="font-bold text-orange-500">
                    ₹{item.price}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Quantity
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCart((current) =>
                          current
                            .map(
                              (cartItem, cartIndex) =>
                                cartIndex === index
                                  ? {
                                      ...cartItem,
                                      quantity:
                                        cartItem.quantity -
                                        1,
                                    }
                                  : cartItem
                            )
                            .filter(
                              (cartItem) =>
                                cartItem.quantity > 0
                            )
                        );
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 hover:bg-white/10"
                    >
                      −
                    </button>

                    <span className="w-6 text-center font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setCart((current) =>
                          current.map(
                            (cartItem, cartIndex) =>
                              cartIndex === index
                                ? {
                                    ...cartItem,
                                    quantity:
                                      cartItem.quantity +
                                      1,
                                  }
                                : cartItem
                          )
                        );
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <>
              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <span className="text-xl font-black text-orange-500">
                    ₹{cartTotal}
                  </span>
                </div>
              </div>

              <a
                href={whatsappLink(cartMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block w-full rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-black transition hover:bg-orange-400"
              >
                Order on WhatsApp
              </a>
            </>
          )}
        </div>
      )}

      {/* Offer */} {/*
          <section className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-white/[0.03] to-green-500/10">
        <div className="mx-auto max-w-7xl px-5 py-3 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400 sm:text-sm">
            🇮🇳 Independence Day Special
          </p>

          <p className="mt-1 text-lg font-black sm:text-2xl">
            Freedom to Crave. Freedom to Enjoy!
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Ask us about today&apos;s special offers.
          </p>
        </div>
      </section>
      */}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[78vh] max-w-7xl items-center px-5 py-20 sm:px-6">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.4em] text-orange-500">
              Late Night • Right Bite
            </p>

            <h2 className="text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">
              CRAVINGS HIT
              <br />
              <span className="text-orange-500">
                AFTER DARK.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
              Burgers, pizzas, wraps, chicken, fries,
              mocktails and shakes — freshly made for
              your late-night cravings.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#menu"
                className="rounded-full bg-orange-500 px-7 py-3.5 font-bold text-black transition hover:bg-orange-400"
              >
                Browse the Menu
              </a>

              <a
                href={whatsappLink(
                  "Hi Midnight Cravings, I'd like to place an order."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-7 py-3.5 font-bold transition hover:bg-white/10"
              >
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
              <span>🚚 Delivery</span>
              <span>• Zomato</span>
              <span>• Swiggy</span>
              <span>• WhatsApp</span>
              <span>• Late Night</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Menu */}
      <section
        id="menu"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-6"
      >
        {productsLoading && (
          <div className="py-20 text-center">
            <p className="text-gray-400">
              Loading menu...
            </p>
          </div>
        )}

        {productsError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            Unable to load menu: {productsError}
          </div>
        )}

        {!productsLoading &&
          !productsError &&
          products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400">
                No products are currently available.
              </p>
            </div>
          )}

        {!productsLoading &&
          !productsError &&
          orderedCategories.map(
            (category, categoryIndex) => (
              <div
                key={category}
                className={
                  categoryIndex === 0
                    ? ""
                    : "mt-24"
                }
              >
                <SectionTitle
                  number={String(categoryIndex + 1)}
                  title={category.toUpperCase()}
                  subtitle={
                    categorySubtitle[category] ??
                    "Fresh & delicious"
                  }
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedProducts[category].map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selectedSize={getPizzaSize(
                          product.id
                        )}
                        onSizeChange={(size) =>
                          setPizzaSize(
                            product.id,
                            size
                          )
                        }
                        onAddToCart={addToCart}
                        addedProductId={addedProductId}
                      />
                    )
                  )}
                </div>
              </div>
            )
          )}
      </section>

      {/* CTA */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
            Late Night Cravings?
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-6xl">
            WE&apos;VE GOT YOU.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Browse the menu, choose your favourites and
            order directly through WhatsApp or phone.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink(
                "Hi Midnight Cravings, I'd like to place an order."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-orange-500 px-8 py-4 font-bold text-black hover:bg-orange-400"
            >
              Order on WhatsApp
            </a>

            <a
              href={`tel:${PHONE}`}
              className="rounded-full border border-white/20 px-8 py-4 font-bold hover:bg-white/10"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black">
              MIDNIGHT{" "}
              <span className="text-orange-500">
                CRAVINGS
              </span>
            </h2>

            <p className="mt-1 text-xs tracking-[0.25em] text-gray-500">
              CLOUD KITCHEN
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Late Night. Right Bite.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-6 text-sm text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Midnight Cravings
          </p>

          <p>
            Delivery • Zomato • Swiggy • WhatsApp
          </p>
        </div>
      </footer>
    </main>
  );
}