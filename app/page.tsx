"use client";

import { useState } from "react";

type PizzaSize = "Regular" | "Medium" | "Large";

type Pizza = {
  name: string;
  description: string;
  prices: {
    Regular: number;
    Medium: number;
    Large: number;
  };
  emoji: string;
  image?: string;
};

type MenuItem = {
  name: string;
  price: number;
  description: string;
  emoji: string;
};

type CartItem = {
  name: string;
  size?: PizzaSize;
  price: number;
  quantity: number;
};

const PHONE = "9966955540";
const WHATSAPP = "919966955540";

const pizzas: Pizza[] = [
  {
    name: "Margherita",
    description: "Classic cheesy Margherita pizza.",
    prices: { Regular: 179, Medium: 249, Large: 349 },
    emoji: "🍕",
    image: "/margherita.jpg",
  },
  {
    name: "Farm House",
    description:
      "Loaded with fresh vegetables, cheese and delicious toppings.",
    prices: { Regular: 179, Medium: 249, Large: 349 },
    emoji: "🍕",
    image: "/farm-house.jpg",
  },
  {
    name: "Veg Delight",
    description:
      "Fresh vegetables, mushrooms, olives, corn and cheese.",
    prices: { Regular: 179, Medium: 249, Large: 349 },
    emoji: "🍕",
    image: "/veg-delight.jpg",
  },
  {
    name: "Paneer Tikka",
    description:
      "Spicy paneer tikka with onions, peppers and cheese.",
    prices: { Regular: 229, Medium: 319, Large: 419 },
    emoji: "🍕",
    image: "/paneer-tikka.jpg",
  },
  {
    name: "Margherita + Farm House",
    description:
      "Half Margherita and half Farm House on one pizza.",
    prices: { Regular: 179, Medium: 249, Large: 349 },
    emoji: "🍕",
    image: "/margherita-farm-house.jpg",
  },
  {
    name: "Paneer Tikka + Veg Delight",
    description:
      "Half Paneer Tikka and half Veg Delight.",
    prices: { Regular: 199, Medium: 289, Large: 389 },
    emoji: "🍕",
  },
  {
    name: "Chicken Pepperoni",
    description:
      "Classic chicken pepperoni pizza.",
    prices: { Regular: 229, Medium: 319, Large: 419 },
    emoji: "🍕",
  },
  {
    name: "BBQ Chicken Pepperoni",
    description:
      "Chicken pepperoni with smoky BBQ flavor.",
    prices: { Regular: 249, Medium: 349, Large: 449 },
    emoji: "🍕",
  },
  {
    name: "Peri Peri Chicken Pepperoni",
    description:
      "Chicken pepperoni with spicy peri peri seasoning.",
    prices: { Regular: 249, Medium: 349, Large: 449 },
    emoji: "🍕",
  },
  {
    name: "Spicy Chicken Pepperoni",
    description:
      "Chicken pepperoni with an extra spicy kick.",
    prices: { Regular: 249, Medium: 349, Large: 449 },
    emoji: "🍕",
  },
  {
    name: "Chicken Pepperoni + BBQ Chicken",
    description:
      "Half Chicken Pepperoni and half BBQ Chicken.",
    prices: { Regular: 239, Medium: 339, Large: 439 },
    emoji: "🍕",
  },
  {
    name: "Peri Peri Chicken + Spicy Chicken",
    description:
      "A spicy half-and-half chicken pizza.",
    prices: { Regular: 239, Medium: 339, Large: 439 },
    emoji: "🍕",
  },
  {
    name: "Corn Pizza",
    description:
      "Sweet corn, cheese and delicious pizza sauce.",
    prices: { Regular: 179, Medium: 249, Large: 349 },
    emoji: "🌽",
  },
];

const burgers: MenuItem[] = [
  {
    name: "Classic Zinzer",
    price: 229,
    description:
      "Chicken zinzer, yellow cheese, tomato, cucumber, jalapeño, onion and sauces.",
    emoji: "🍔",
  },
  {
    name: "Jalapeno Delight",
    price: 229,
    description:
      "Chicken zinzer, American cheese, jalapeño, western veggies, onion and sauces.",
    emoji: "🍔",
  },
  {
    name: "Cheese Burst",
    price: 259,
    description:
      "Chicken zinzer, double yellow cheese, red paprika, chipotle sauce, garlic sauce and lettuce.",
    emoji: "🍔",
  },
  {
    name: "Spicy Paneer Burger",
    price: 169,
    description:
      "Spicy paneer patty, cheese, lettuce, onion and spicy mayo.",
    emoji: "🍔",
  },
  {
    name: "Crispy Veg Burger",
    price: 149,
    description:
      "Crispy veg patty, lettuce, tomato, onion and tandoori mayo.",
    emoji: "🍔",
  },
  {
    name: "Loaded Cheese Burger",
    price: 199,
    description:
      "Double patty, double cheese, pickles, jalapeños and special sauce.",
    emoji: "🍔",
  },
  {
    name: "Beef Burger",
    price: 199,
    description:
      "Beef patty, cheese, lettuce, tomato, onion and signature sauce.",
    emoji: "🍔",
  },
];

const wraps: MenuItem[] = [
  {
    name: "Paneer Tikka Wrap",
    price: 149,
    description:
      "Paneer tikka, onion, capsicum, lettuce and mint mayo.",
    emoji: "🌯",
  },
  {
    name: "Schezwan Wrap",
    price: 149,
    description:
      "Schezwan rice, crispy vegetables, cabbage and schezwan mayo.",
    emoji: "🌯",
  },
  {
    name: "Chicken Fried Wrap",
    price: 149,
    description:
      "Chicken fried strips, lettuce, onion and garlic mayo.",
    emoji: "🌯",
  },
  {
    name: "Regular Chicken Wrap",
    price: 149,
    description:
      "Chicken tikka, onion, capsicum, lettuce and mint mayo.",
    emoji: "🌯",
  },
  {
    name: "Beef Wrap",
    price: 169,
    description:
      "Beef strips, lettuce, onion, fries and special sauce.",
    emoji: "🌯",
  },
];

const sandwiches: MenuItem[] = [
  {
    name: "Chicken Sandwich",
    price: 129,
    description:
      "Fresh chicken sandwich with creamy sauces.",
    emoji: "🥪",
  },
  {
    name: "Paneer Cheese Sandwich",
    price: 149,
    description:
      "Paneer, cheese, tomato, onion and mayo sauce.",
    emoji: "🥪",
  },
  {
    name: "Veg Grilled Sandwich",
    price: 129,
    description:
      "Crunchy vegetables, cheese and green chutney.",
    emoji: "🥪",
  },
  {
    name: "Corn & Cheese Sandwich",
    price: 129,
    description:
      "Sweet corn, cheese, mayo and herbs.",
    emoji: "🥪",
  },
  {
    name: "Club Sandwich",
    price: 189,
    description:
      "Veg or chicken, lettuce, tomato, mayo and fries.",
    emoji: "🥪",
  },
];

const fries: MenuItem[] = [
  {
    name: "Salty Fries",
    price: 129,
    description:
      "Crispy fries with peri peri salt seasoning.",
    emoji: "🍟",
  },
  {
    name: "Peri Peri Fries",
    price: 149,
    description:
      "Crispy fries tossed in peri peri spices.",
    emoji: "🍟",
  },
  {
    name: "Cheese Fries",
    price: 169,
    description:
      "Fries topped with cheesy sauce.",
    emoji: "🍟",
  },
  {
    name: "Loaded Fries",
    price: 179,
    description:
      "Fries loaded with cheese sauce and special toppings.",
    emoji: "🍟",
  },
];

const mocktails: MenuItem[] = [
  {
    name: "Blue Lagoon",
    price: 79,
    description:
      "Blue curacao, lemon, soda and ice.",
    emoji: "🍹",
  },
  {
    name: "Green Apple Mojito",
    price: 79,
    description:
      "Green apple syrup, lime, mint, soda and ice.",
    emoji: "🍹",
  },
  {
    name: "Strawberry Mojito",
    price: 79,
    description:
      "Strawberry syrup, mint, lime, soda and ice.",
    emoji: "🍹",
  },
  {
    name: "Watermelon Cooler",
    price: 79,
    description:
      "Watermelon, lime, mint, soda and ice.",
    emoji: "🍹",
  },
  {
    name: "Virgin Mojito",
    price: 79,
    description:
      "Lime, mint, sugar syrup and ice.",
    emoji: "🍹",
  },
];

const milkshakes: MenuItem[] = [
  {
    name: "Chocolate Shake",
    price: 149,
    description:
      "Chocolate ice cream, milk and chocolate syrup.",
    emoji: "🥤",
  },
  {
    name: "Oreo Shake",
    price: 169,
    description:
      "Oreo, vanilla ice cream and milk.",
    emoji: "🥤",
  },
  {
    name: "Strawberry Shake",
    price: 149,
    description:
      "Strawberry ice cream, milk and strawberry syrup.",
    emoji: "🥤",
  },
  {
    name: "Vanilla Shake",
    price: 149,
    description:
      "Vanilla ice cream, milk and vanilla syrup.",
    emoji: "🥤",
  },
];

const combos: MenuItem[] = [
  {
    name: "Burger Combo",
    price: 329,
    description:
      "Any burger + fries + cold drink.",
    emoji: "🍔🍟🥤",
  },
  {
    name: "Wrap Combo",
    price: 309,
    description:
      "Any wrap + fries + cold drink.",
    emoji: "🌯🍟🥤",
  },
  {
    name: "Midnight Meal",
    price: 499,
    description:
      "Any burger + wrap + fries + 2 cold drinks.",
    emoji: "🍔🌯🍟🥤",
  },
];

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
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

function MenuCard({
  item,
  onAddToCart,
}: {
  item: MenuItem;
  onAddToCart: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-orange-500/40 hover:bg-white/[0.07]">
      <div className="mb-5 flex h-44 items-center justify-center rounded-xl bg-white/[0.06] text-7xl">
        {item.emoji}
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold">
          {item.name}
        </h3>

        <span className="whitespace-nowrap text-lg font-black text-orange-500">
          ₹{item.price}
        </span>
      </div>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-400">
        {item.description}
      </p>

      <button
        onClick={onAddToCart}
        className="mt-5 block w-full rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-black transition hover:bg-orange-400"
      >
        Add to Cart
      </button>
    </div>
  );
}

function PizzaCard({
  pizza,
  selectedSize,
  onSizeChange,
  onAddToCart,
}: {
  pizza: Pizza;
  selectedSize: PizzaSize;
  onSizeChange: (size: PizzaSize) => void;
  onAddToCart: () => void;
}) {
  const price = pizza.prices[selectedSize];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-orange-500/40 hover:bg-white/[0.07]">
      {pizza.image ? (
        <img
          src={pizza.image}
          alt={pizza.name}
          className="mb-5 h-48 w-full rounded-xl object-cover"
        />
      ) : (
        <div className="mb-5 flex h-48 items-center justify-center rounded-xl bg-white/[0.06] text-8xl">
          {pizza.emoji}
        </div>
      )}

      <h3 className="text-2xl font-bold">
        {pizza.name}
      </h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-400">
        {pizza.description}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {(["Regular", "Medium", "Large"] as PizzaSize[]).map(
          (size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`rounded-lg border px-2 py-3 text-center text-sm transition ${
                selectedSize === size
                  ? "border-orange-500 bg-orange-500 font-bold text-black"
                  : "border-white/10 hover:bg-white/10"
              }`}
            >
              <span className="block">
                {size}
              </span>

              <span className="mt-1 block font-bold">
                ₹{pizza.prices[size]}
              </span>
            </button>
          )
        )}
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Selected:{" "}
        <span className="font-bold text-white">
          {selectedSize}
        </span>
      </p>

      <button
        onClick={onAddToCart}
        className="mt-5 block w-full rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-black transition hover:bg-orange-400"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default function Home() {
  const [pizzaSelections, setPizzaSelections] = useState<
    Record<string, PizzaSize>
  >({});

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
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

  function getPizzaSize(name: string): PizzaSize {
    return pizzaSelections[name] || "Regular";
  }

  function setPizzaSize(
    name: string,
    size: PizzaSize
  ) {
    setPizzaSelections((current) => ({
      ...current,
      [name]: size,
    }));
  }

  function addToCart(
    name: string,
    price: number,
    size?: PizzaSize
  ) {
    setCart((current) => {
      const existingIndex = current.findIndex(
        (item) =>
          item.name === name &&
          item.size === size
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
          name,
          size,
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

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 px-3 py-2 sm:hidden"
          >
            ☰
          </button>
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

      {/* Cart Panel */}
      {cartOpen && (
        <div className="fixed right-2 top-20 z-[60] w-[calc(100%-1rem)] max-w-sm rounded-2xl border border-white/10 bg-[#151515] p-5 shadow-2xl sm:right-5 sm:top-24 sm:w-80">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">
              Your Cart
            </h2>

            <button
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
                key={`${item.name}-${item.size ?? "none"}-${index}`}
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
                      onClick={() => {
                        setCart((current) =>
                          current
                            .map((cartItem, cartIndex) =>
                              cartIndex === index
                                ? {
                                    ...cartItem,
                                    quantity:
                                      cartItem.quantity - 1,
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
                      onClick={() => {
                        setCart((current) =>
                          current.map(
                            (cartItem, cartIndex) =>
                              cartIndex === index
                                ? {
                                    ...cartItem,
                                    quantity:
                                      cartItem.quantity + 1,
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

      {/* Independence Day Offer */}
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

      {/* Menu */}
      <section
        id="menu"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-6"
      >
        {/* Pizzas */}
        <div>
          <SectionTitle
            number="1"
            title="PIZZAS"
            subtitle="Fresh from the oven"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pizzas.map((pizza) => (
              <PizzaCard
                key={pizza.name}
                pizza={pizza}
                selectedSize={getPizzaSize(pizza.name)}
                onSizeChange={(size) =>
                  setPizzaSize(pizza.name, size)
                }
                onAddToCart={() => {
                  const size = getPizzaSize(pizza.name);
                  const price = pizza.prices[size];

                  addToCart(
                    pizza.name,
                    price,
                    size
                  );
                }}
              />
            ))}
          </div>
        </div>

        {/* Burgers */}
        <div className="mt-24">
          <SectionTitle
            number="2"
            title="BURGERS"
            subtitle="Big flavour"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {burgers.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onAddToCart={() =>
                  addToCart(
                    item.name,
                    item.price
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Wraps */}
        <div className="mt-24">
          <SectionTitle
            number="3"
            title="WRAPS"
            subtitle="Wrapped fresh"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wraps.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onAddToCart={() =>
                  addToCart(
                    item.name,
                    item.price
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Sandwiches */}
        <div className="mt-24">
          <SectionTitle
            number="4"
            title="SANDWICHES"
            subtitle="Fresh & loaded"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sandwiches.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onAddToCart={() =>
                  addToCart(
                    item.name,
                    item.price
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Combos */}
        <div className="mt-24">
          <SectionTitle
            number="5"
            title="COMBOS"
            subtitle="More for less"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {combos.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onAddToCart={() =>
                  addToCart(
                    item.name,
                    item.price
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Fries */}
        <div className="mt-24">
          <SectionTitle
            number="6"
            title="FRIES"
            subtitle="Crispy & loaded"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fries.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onAddToCart={() =>
                  addToCart(
                    item.name,
                    item.price
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Mocktails */}
        <div className="mt-24">
          <SectionTitle
            number="7"
            title="MOCKTAILS"
            subtitle="Cool & refreshing"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mocktails.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onAddToCart={() =>
                  addToCart(
                    item.name,
                    item.price
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Milkshakes */}
        <div className="mt-24">
          <SectionTitle
            number="8"
            title="MILKSHAKES"
            subtitle="Thick & creamy"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milkshakes.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onAddToCart={() =>
                  addToCart(
                    item.name,
                    item.price
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Order CTA */}
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