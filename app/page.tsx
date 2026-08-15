export default function Home() {
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
    </main>
  );
}