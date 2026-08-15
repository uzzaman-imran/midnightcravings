"use client";

import { useState } from "react";

export default function Home() {
  const [pizzaSize, setPizzaSize] = useState("Regular");
  const [farmHouseSize, setFarmHouseSize] = useState("Regular");
  // Keep Veg Delight size selection separate from other pizzas
const [vegDelightSize, setVegDelightSize] = useState("Regular");

  const pizzaPrice =
    pizzaSize === "Regular" ? 179 : pizzaSize === "Medium" ? 249 : 349;

  const farmHousePrice =
    farmHouseSize === "Regular"
      ? 179
      : farmHouseSize === "Medium"
        ? 249
        : 349;
const vegDelightPrice =
  vegDelightSize === "Regular"
    ? 179
    : vegDelightSize === "Medium"
      ? 249
      : 349;
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-black tracking-wide">
              MIDNIGHT <span className="text-orange-500">CRAVINGS</span>
            </h1>
            <p className="text-xs tracking-[0.3em] text-gray-400">
              CLOUD KITCHEN
            </p>
          </div>

          <a
            href="tel:9966955540"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-orange-400"
          >
            Order Now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex min-h-[75vh] max-w-6xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
            Late Night • Right Bite
          </p>

          <h2 className="text-5xl font-black leading-tight sm:text-7xl">
            CRAVINGS HIT
            <br />
            <span className="text-orange-500">AFTER DARK.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Burgers, pizzas, wraps, chicken, fries, mocktails and shakes —
            freshly made for your late-night cravings.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:9966955540"
              className="rounded-full bg-orange-500 px-7 py-3.5 font-bold text-black hover:bg-orange-400"
            >
              Order Now
            </a>

            <a
              href="#menu"
              className="rounded-full border border-white/20 px-7 py-3.5 font-bold hover:bg-white/10"
            >
              View Menu
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Available for delivery • Zomato • Swiggy • WhatsApp
          </p>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-500">
          Our Menu
        </p>

        <h2 className="mt-3 text-4xl font-black">PIZZAS</h2>

        {/* Margherita */}
        <div className="mt-10 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6">
          <img
            src="/margherita.jpg"
            alt="Margherita Pizza"
            className="mb-5 h-48 w-full rounded-xl object-cover"
          />

          <h3 className="text-2xl font-bold">Margherita</h3>

          <p className="mt-2 text-sm text-gray-400">
            Classic cheesy Margherita pizza.
          </p>

          <div className="mt-5 space-y-2">
            <button
              onClick={() => setPizzaSize("Regular")}
              className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
            >
              <span>Regular</span>
              <span className="font-bold">₹179</span>
            </button>

            <button
              onClick={() => setPizzaSize("Medium")}
              className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
            >
              <span>Medium</span>
              <span className="font-bold">₹249</span>
            </button>

            <button
              onClick={() => setPizzaSize("Large")}
              className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
            >
              <span>Large</span>
              <span className="font-bold">₹349</span>
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Selected: <span className="text-white">{pizzaSize}</span>
          </p>

          <a
            href={`https://wa.me/919966955540?text=${encodeURIComponent(
              `Hi Midnight Cravings, I'd like to order a Margherita pizza - ${pizzaSize} - ₹${pizzaPrice}.`
            )}`}
            className="mt-6 block rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-black hover:bg-orange-400"
          >
            Order Now
          </a>
        </div>

        {/* Farm House */}
        <div className="mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6">
          <img
            src="/farm-house.jpg"
            alt="Farm House Pizza"
            className="mb-5 h-48 w-full rounded-xl object-cover"
          />

          <h3 className="text-2xl font-bold">Farm House</h3>

          <p className="mt-2 text-sm text-gray-400">
            Loaded with fresh vegetables, cheese and delicious toppings.
          </p>

          <div className="mt-5 space-y-2">
            <button
              onClick={() => setFarmHouseSize("Regular")}
              className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
            >
              <span>Regular</span>
              <span className="font-bold">₹179</span>
            </button>

            <button
              onClick={() => setFarmHouseSize("Medium")}
              className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
            >
              <span>Medium</span>
              <span className="font-bold">₹249</span>
            </button>

            <button
              onClick={() => setFarmHouseSize("Large")}
              className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
            >
              <span>Large</span>
              <span className="font-bold">₹349</span>
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Selected:{" "}
            <span className="text-white">{farmHouseSize}</span>
          </p>

          <a
            href={`https://wa.me/919966955540?text=${encodeURIComponent(
              `Hi Midnight Cravings, I'd like to order a Farm House pizza - ${farmHouseSize} - ₹${farmHousePrice}.`
            )}`}
            className="mt-6 block rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-black hover:bg-orange-400"
          >
            Order Now
          </a>
        </div>
        {/* Veg Delight */}
<div className="mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6">
  <img
    src="/veg-delight.jpg"
    alt="Veg Delight Pizza"
    className="mb-5 h-48 w-full rounded-xl object-cover"
  />

  <h3 className="text-2xl font-bold">Veg Delight</h3>

  <p className="mt-2 text-sm text-gray-400">
    A delicious mix of fresh vegetables, mushrooms, olives, corn and cheese.
  </p>

  <div className="mt-5 space-y-2">
    <button
      onClick={() => setVegDelightSize("Regular")}
      className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
    >
      <span>Regular</span>
      <span className="font-bold">₹179</span>
    </button>

    <button
      onClick={() => setVegDelightSize("Medium")}
      className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
    >
      <span>Medium</span>
      <span className="font-bold">₹249</span>
    </button>

    <button
      onClick={() => setVegDelightSize("Large")}
      className="flex w-full justify-between rounded-lg border border-white/10 px-4 py-3 text-left hover:bg-white/10"
    >
      <span>Large</span>
      <span className="font-bold">₹349</span>
    </button>
  </div>

  <p className="mt-4 text-sm text-gray-400">
    Selected:{" "}
    <span className="text-white">{vegDelightSize}</span>
  </p>

  <a
    href={`https://wa.me/919966955540?text=${encodeURIComponent(
      `Hi Midnight Cravings, I'd like to order a Veg Delight pizza - ${vegDelightSize} - ₹${vegDelightPrice}.`
    )}`}
    className="mt-6 block rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-black hover:bg-orange-400"
  >
    Order Now
  </a>
</div>
      </section>
    </main>
  );
}