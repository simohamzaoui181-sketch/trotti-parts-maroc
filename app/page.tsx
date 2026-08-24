"use client";


import { useEffect, useState } from "react";
import { Icon } from "./components/ui-icon";
import { ShopSection } from "./components/shop-section";
import DiagnosticChat from "./components/diagnostic-chat";
import { categories, contact, serviceHighlights } from "./data/products";

const navigation = [
  { label: "Accueil", href: "#accueil" },
  { label: "Produits", href: "#produits" },
  { label: "Catégories", href: "#categories" },
  { label: "Professionnels", href: "#professionnels" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function handleCartUpdate(event: Event) {
      const customEvent = event as CustomEvent<{ count: number }>;
      setCartCount(customEvent.detail.count);
    }

    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  function handleSearchClick() {
    const search = document.getElementById("product-search");

    if (!search) return;

    search.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      (search as HTMLInputElement).focus();
    }, 400);
  }

  function handleCartClick() {
    const cart = document.getElementById("cart-section") ?? document.getElementById("produits");

    if (!cart) return;

    cart.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

    const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    "Bonjour TROTTI PARTS MAROC, je souhaite commander des pièces."
  )}`;

  return (
    <main className="overflow-hidden bg-[#f8fafc] text-slate-950">
      {/* OPTIMIZED TOP BAR - Simplified and Professional */}
      <div className="hidden border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-neutral-100 lg:block">
        <div className="mx-auto max-w-7xl px-8 py-3">
          <div className="flex items-center justify-between gap-6 text-xs font-semibold text-neutral-600">
            <div className="flex items-center gap-3">
              <Icon name="truck" className="size-4 text-primary" />
              <span>Livraison 24h-48h au Maroc</span>
            </div>
            <span className="text-neutral-300">•</span>
            <div className="flex items-center gap-3">
              <Icon name="check" className="size-4 text-accent-success" />
              <span>Pièces testées & garanties</span>
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM HEADER - Streamlined and Professional */}
      <header className="sticky top-0 z-40 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-14 items-center justify-between gap-6 py-2.5">
            {/* Logo */}
            <a
              href="#accueil"
              className="flex shrink-0 items-center transition-all duration-200 hover:scale-105"
              aria-label="Trotti Parts Maroc - Accueil"
            >
              <img
                src="/logo.png"
                alt="Trotti Parts Maroc"
                width={140}
                height={80}
                className="h-12 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden flex-1 lg:flex items-center justify-center gap-1">
              {navigation.slice(1, 4).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-xs font-semibold text-neutral-600 transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-lg"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Search - Desktop Only */}
            <button
              type="button"
              onClick={handleSearchClick}
              className="hidden lg:flex flex-1 max-w-xs items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-500 transition-all duration-200 hover:border-neutral-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
            >
              <Icon name="search" className="size-4 text-neutral-400" />
              <span>Rechercher une pièce...</span>
            </button>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Mobile Search */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="grid size-9 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-300 lg:hidden"
                aria-label="Rechercher"
              >
                <Icon name="search" className="size-4.5" />
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={handleCartClick}
                className="relative grid size-9 place-items-center rounded-lg border border-neutral-200 text-primary transition-all duration-200 hover:bg-primary/5 hover:border-primary/30 font-semibold"
                aria-label={`Panier (${cartCount} ${cartCount > 1 ? 'articles' : 'article'})`}
              >
                <Icon name="bag" className="size-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 inline-flex size-5 items-center justify-center rounded-full bg-accent-success text-[10px] font-black text-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-lg bg-accent-success px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-success-dark hover:shadow-md hover:-translate-y-0.5 active:scale-95 sm:flex"
              >
                <Icon name="whatsapp" className="size-4" />
                <span className="hidden sm:inline">Commander</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="grid size-9 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-300 lg:hidden"
                aria-label="Navigation"
              >
                <Icon name="menu" className="size-4.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO - PREMIUM LUXURY DESIGN */}
      <section
        id="accueil"
        className="relative mx-auto mt-0 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #053d5a 0%, #075985 25%, #0a7cc4 50%, rgba(10, 124, 196, 0.8) 75%, #053d5a 100%)",
          backgroundSize: "400% 400%",
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30 animate-gradient" style={{
          background: "radial-gradient(circle at 20% 50%, rgba(31, 170, 89, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(10, 124, 196, 0.2) 0%, transparent 50%)",
          animation: "gradient-shift 15s ease infinite"
        }} />

        {/* Premium floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large blur orbs */}
          <div className="absolute -right-32 -top-32 size-96 rounded-full bg-white/15 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute -left-40 bottom-20 size-80 rounded-full bg-accent-success/10 blur-2xl" style={{ animation: "floatSlow 6s ease-in-out infinite" }} />
          <div className="absolute right-1/4 top-1/2 size-72 rounded-full bg-white/10 blur-3xl" style={{ animation: "float 8s ease-in-out infinite" }} />

          {/* Accent glow circles */}
          <div className="absolute top-1/4 right-1/3 size-48 rounded-full border-2 border-white/10 blur-xl" style={{ animation: "pulse 4s ease-in-out infinite", animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/4 left-1/4 size-64 rounded-full border border-accent-success/20 blur-2xl" style={{ animation: "pulse 5s ease-in-out infinite", animationDelay: "1s" }} />
        </div>

        {/* Premium grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px"
        }} />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-32 lg:px-8 z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div>
              {/* Premium badge with glassmorphism */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 group">
                <span className="size-2.5 rounded-full bg-accent-success animate-pulse" />
                <span className="text-xs font-semibold text-white/95">✨ Spécialiste trottinettes électriques</span>
              </div>

              {/* Main headline with glow */}
              <h1 className="mt-10 text-5xl sm:text-6xl lg:text-7xl font-black leading-tight" style={{
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 50%, rgba(31, 170, 89, 0.8) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(255,255,255,0.3)",
                filter: "drop-shadow(0 0 20px rgba(10, 124, 196, 0.4))"
              }}>
                Pièces Premium
                <span className="block mt-2" style={{
                  background: "linear-gradient(135deg, rgba(31, 170, 89, 0.9) 0%, #00d4ff 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  pour votre ride
                </span>
              </h1>

              <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/85 font-medium">
                Qualité vérifiée, performance garantie. Plus de 1500 pièces premium testées, avec livraison ultra-rapide au Maroc.
              </p>

              {/* Premium CTAs with gradients */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#produits"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-primary-dark transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95 group"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.95) 100%)",
                    boxShadow: "0 20px 40px rgba(255,255,255,0.2), 0 0 30px rgba(10, 124, 196, 0.3)"
                  }}
                >
                  <span>Voir nos pièces</span>
                  <Icon name="arrow" className="size-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 px-8 py-4 text-base font-bold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 group"
                  style={{
                    borderColor: "rgba(255,255,255,0.4)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                    backdropFilter: "blur(10px)",
                    color: "white"
                  }}
                >
                  <Icon name="whatsapp" className="size-5" />
                  <span>Commander maintenant</span>
                </a>
              </div>

              {/* Trust badges with icons and glow */}
              <div className="mt-12 grid gap-4">
                {[
                  { icon: "check", text: "100% pièces testées & garanties", glow: true },
                  { icon: "truck", text: "Livraison ultra-rapide 24h-48h", glow: true },
                  { icon: "pin", text: "Stock premium à Mrirt", glow: true }
                ].map(({ icon, text, glow }, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group" style={{
                    animation: `fadeInUp 500ms ease-out ${idx * 100}ms both`
                  }}>
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-success to-accent-success/70 flex-shrink-0" style={{
                      animation: glow ? "iconGlow 3s ease-in-out infinite" : "none"
                    }}>
                      <Icon name={icon} className="size-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white/90">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image with premium effects */}
            <div className="relative hidden h-[600px] lg:block">
              {/* Glow background circle */}
              <div className="absolute -inset-20 rounded-full bg-gradient-to-r from-accent-success/30 to-primary-light/30 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />

              {/* Premium frame */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/20 backdrop-blur-sm p-4" style={{
                boxShadow: "inset 0 0 30px rgba(255,255,255,0.1), 0 0 50px rgba(10, 124, 196, 0.4)"
              }}>
                <img
                  src="/products/hero-scooter.png"
                  alt="Trottinette électrique premium"
                  width={500}
                  height={500}
                  className="h-full w-full object-contain transition-transform duration-700 hover:scale-110 drop-shadow-2xl"
                />
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-10 -right-10 size-40 rounded-full border-2 border-accent-success/30 blur-xl animate-float" />
              <div className="absolute -bottom-10 -left-10 size-32 rounded-full border border-white/20 blur-lg" style={{ animation: "floatSlow 8s ease-in-out infinite" }} />
            </div>
          </div>
        </div>

        {/* Mobile hero image - optimized */}
        <div className="relative lg:hidden mx-4 mt-8 mb-8 h-80 sm:h-96">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-sm p-4" style={{
            boxShadow: "inset 0 0 20px rgba(255,255,255,0.1)"
          }}>
            <img
              src="/products/hero-scooter.png"
              alt="Trottinette électrique"
              width={400}
              height={400}
              className="h-full w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* TRUST SECTION - PREMIUM GLASSMORPHISM */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "box", title: "+1500 pièces", desc: "En stock à Mrirt", delay: 0 },
            { icon: "check", title: "100% testées", desc: "Qualité vérifiée", delay: 100 },
            { icon: "truck", title: "Livraison rapide", desc: "24h-48h au Maroc", delay: 200 },
          ].map(({ icon, title, desc, delay }, idx) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl border border-neutral-100 p-6 transition-all duration-300 hover:border-neutral-200 hover:shadow-2xl hover:-translate-y-2"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(10,124,196,0.08) 100%)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(10, 124, 196, 0.1)",
                animation: `fadeInUp 500ms ease-out ${delay}ms both`
              }}
            >
              {/* Animated background glow */}
              <div
                className="absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at 30% 50%, rgba(10, 124, 196, 0.2) 0%, transparent 70%)",
                  animation: "pulse 4s ease-in-out infinite"
                }}
              />

              {/* Icon with premium glow */}
              <span
                className="inline-flex size-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 relative z-10"
                style={{
                  background: "linear-gradient(135deg, rgba(10, 124, 196, 0.15) 0%, rgba(31, 170, 89, 0.1) 100%)",
                  boxShadow: "0 0 20px rgba(10, 124, 196, 0.2), inset 0 0 15px rgba(255,255,255,0.5)",
                  filter: "drop-shadow(0 0 8px rgba(10, 124, 196, 0.4))"
                }}
              >
                <Icon name={icon} className="size-7 text-primary" />
              </span>

              {/* Text content */}
              <h3 className="mt-4 text-base font-semibold text-neutral-900 relative z-10">{title}</h3>
              <p className="mt-1.5 text-sm text-neutral-500 relative z-10">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES - PREMIUM VISUAL TRANSFORMATION */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mb-16">
          <p className="section-eyebrow">Parcourir par type</p>
          <h2 className="section-title">Catégories Premium</h2>
          <p className="mt-4 max-w-xl text-body text-neutral-600">
            Explorez nos catégories de pièces spécialisées avec des designs premium et des interfaces intuitives.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {categories.map((category, idx) => {
            const gradients = [
              "linear-gradient(135deg, rgba(247, 144, 9, 0.15) 0%, rgba(247, 144, 9, 0.05) 100%)",
              "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)",
              "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)",
              "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%)",
              "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)",
              "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)",
              "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)",
              "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)",
            ];

            const iconGlows = [
              "drop-shadow(0 0 15px rgba(247, 144, 9, 0.4))",
              "drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))",
              "drop-shadow(0 0 15px rgba(239, 68, 68, 0.4))",
              "drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))",
              "drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))",
              "drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))",
              "drop-shadow(0 0 15px rgba(34, 197, 94, 0.4))",
              "drop-shadow(0 0 15px rgba(236, 72, 153, 0.4))",
            ];

            return (
              <a
                key={category.name}
                href="#produits"
                className="group relative overflow-hidden flex flex-col items-start rounded-2xl border border-neutral-100 p-4 transition-all duration-300 hover:border-neutral-200 hover:shadow-xl hover:-translate-y-2 sm:p-5"
                style={{
                  background: gradients[idx % gradients.length],
                  backdropFilter: "blur(10px)",
                  animation: `fadeInUp 400ms ease-out ${idx * 50}ms both`
                }}
              >
                {/* Shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    animation: "shine 2s infinite",
                    pointerEvents: "none"
                  }}
                />

                {/* Icon with glow and rotation */}
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-xl ${category.color} text-primary transition-all duration-300 group-hover:scale-125 group-hover:rotate-12`}
                  style={{
                    filter: `${iconGlows[idx % iconGlows.length]} brightness(1.1)`,
                    boxShadow: "0 0 15px rgba(0,0,0,0.1)"
                  }}
                >
                  <Icon name={category.icon} className="size-6" />
                </span>

                {/* Text content */}
                <h3 className="mt-4 text-sm font-semibold text-neutral-900 transition-all duration-300 group-hover:text-primary sm:text-base relative z-10">
                  {category.name}
                </h3>

                <p className="mt-2 text-xs text-neutral-500 transition-all duration-300 group-hover:text-primary font-medium relative z-10">
                  Parcourir →
                </p>

                {/* Gradient border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(10, 124, 196, 0.3) 0%, rgba(31, 170, 89, 0.2) 100%)`,
                    padding: "1px",
                    borderRadius: "1rem"
                  }}
                />
              </a>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS */}
      <ShopSection />

      {/* ENGAGEMENT - Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark to-primary px-6 py-14 text-white shadow-lg sm:px-10 sm:py-20 lg:px-16">
          <div className="absolute -right-32 -top-32 size-80 rounded-full border border-white/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="section-eyebrow text-white/70">Pourquoi nous choisir</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
              La solution fiable pour vos pièces de trottinette
            </h2>
          </div>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceHighlights.slice(0, 3).map((item) => (
              <div key={item.title} className="border-l-2 border-white/20 pl-4">
                <Icon name={item.icon} className="size-5 text-accent-success" />
                <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONALS */}
      <section
        id="professionnels"
        className="border-y border-neutral-200 bg-gradient-to-b from-neutral-50 to-white py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Professional card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark to-primary p-8 text-white shadow-lg sm:p-12">
              <div className="absolute -right-32 -top-32 size-72 rounded-full border border-white/10 blur-3xl" />

              <div className="relative">
                <div className="inline-flex size-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Icon name="tools" className="size-7 text-accent-success" />
                </div>

                <h3 className="mt-6 max-w-sm text-2xl font-black leading-tight">
                  Vous êtes réparateur ou atelier ?
                </h3>

                <p className="mt-4 max-w-sm leading-relaxed text-white/75">
                  Nous proposons des solutions professionnelles avec tarifs adaptés et support prioritaire.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {["Stock régulier", "Tarifs pros", "Support 24/48h"].map((badge) => (
                    <span key={badge} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Professional content */}
            <div>
              <p className="section-eyebrow">Pour les professionnels</p>

              <h2 className="section-title">
                Solutions professionnelles
              </h2>

              <p className="mt-6 max-w-xl text-body leading-relaxed text-neutral-600">
                Accédez à des tarifs professionnels et un accompagnement personnalisé pour vos besoins en pièces de trottinette. Commandes régulières, stock réservé et réponse rapide garantis.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
                  <Icon name="check" className="size-5 text-accent-success" />
                  <h4 className="mt-3 font-semibold text-neutral-900">Commandes en quantité</h4>
                  <p className="mt-1.5 text-xs text-neutral-600">
                    Solutions adaptées aux ateliers.
                  </p>
                </div>

                <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
                  <Icon name="whatsapp" className="size-5 text-accent-success" />
                  <h4 className="mt-3 font-semibold text-neutral-900">Contact direct</h4>
                  <p className="mt-1.5 text-xs text-neutral-600">
                    Échangez avec nous sur WhatsApp.
                  </p>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                <Icon name="whatsapp" className="size-4" />
                Demander un tarif professionnel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-12 shadow-sm sm:px-10 sm:py-16">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-primary/10 blur-2xl" />

          <div className="relative flex flex-col items-center gap-4 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-lg bg-primary text-white shadow-md">
              <Icon name="truck" className="size-6" />
            </span>

            <div>
              <p className="section-eyebrow">Livraison</p>
              <h2 className="section-title">
                Partout au Maroc
              </h2>
              <p className="mt-3 max-w-lg mx-auto text-body text-neutral-600">
                Expédition 24h-48h vers toutes les villes du Maroc. Mrirt • Khénifra • Kénitra • Casablanca • et plus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - PREMIUM LUXURY DESIGN */}
      <footer
        id="contact"
        className="relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(180deg, #053d5a 0%, #031d3d 50%, #000814 100%)"
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-40 top-0 size-96 rounded-full bg-primary-light/20 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute -left-40 bottom-0 size-80 rounded-full bg-accent-success/10 blur-3xl" style={{ animation: "floatSlow 6s ease-in-out infinite" }} />
        </div>

        {/* Premium wave separator at top */}
        <div className="relative h-16 bg-gradient-to-b from-white/5 to-transparent">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.3))" }}>
            <path
              d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
              fill="rgba(255,255,255,0.05)"
              style={{ animation: "wave 15s linear infinite" }}
            />
            <path
              d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="rgba(255,255,255,0.02)"
              style={{ animation: "wave 10s linear infinite reverse" }}
            />
          </svg>
        </div>

        {/* Footer content */}
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {/* Brand - Premium */}
            <div className="group">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="size-10 rounded-lg bg-gradient-to-br from-primary-light to-accent-success p-1.5 shadow-lg">
                  <img
                    src="/logo.png"
                    alt="Trotti Parts Maroc"
                    width={100}
                    height={60}
                    className="h-full w-full object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="text-sm font-black text-white">TROTTI</p>
                  <p className="text-xs font-bold bg-gradient-to-r from-primary-light to-accent-success bg-clip-text text-transparent">PARTS MAROC</p>
                </div>
              </div>

              <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60">
                Spécialiste premium des pièces et accessoires pour trottinettes électriques de qualité supérieure au Maroc.
              </p>
            </div>

            {/* Navigation - Premium */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5" style={{
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Navigation</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-xs text-white/70 transition-all duration-300 hover:text-accent-success relative group/link"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-light to-accent-success group-hover/link:w-full transition-all duration-300" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact - Premium */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5" style={{
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Contact</h3>
              <ul className="space-y-3.5 text-xs">
                <li className="flex items-center gap-3 text-white/70 hover:text-accent-success transition-colors duration-300 group/contact">
                  <div className="size-6 rounded-lg bg-gradient-to-br from-accent-success to-primary-light p-1 flex items-center justify-center" style={{
                    boxShadow: "0 0 15px rgba(31, 170, 89, 0.3)"
                  }}>
                    <Icon name="whatsapp" className="size-4 text-white" />
                  </div>
                  <span className="group-hover/contact:translate-x-1 transition-transform">+{contact.displayWhatsapp}</span>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <div className="size-6 rounded-lg bg-gradient-to-br from-primary-light to-primary p-1 flex items-center justify-center" style={{
                    boxShadow: "0 0 15px rgba(10, 124, 196, 0.3)"
                  }}>
                    <Icon name="pin" className="size-4 text-white" />
                  </div>
                  <span>Mrirt, Maroc</span>
                </li>
              </ul>
            </div>

            {/* CTA - Premium */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5" style={{
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Besoin d&apos;aide ?</h3>
              <p className="text-xs leading-relaxed text-white/60 mb-5">
                Écrivez-nous directement sur WhatsApp pour toute question ou commande.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group"
                style={{
                  background: "linear-gradient(135deg, #1faa59 0%, #168a47 100%)",
                  boxShadow: "0 8px 20px rgba(31, 170, 89, 0.3)"
                }}
              >
                <Icon name="whatsapp" className="size-4 group-hover:scale-110 transition-transform" />
                Nous écrire
              </a>
            </div>
          </div>

          {/* Footer divider with gradient */}
          <div className="h-px mb-8" style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 75%, transparent 100%)"
          }} />

          {/* Footer bottom - Premium */}
          <div className="text-center">
            <p className="text-xs text-white/50 mb-3">
              © {new Date().getFullYear()} Trotti Parts Maroc. Tous droits réservés.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-white/40">
              <span>Premium Scooter Parts</span>
              <span>•</span>
              <span>Quality Guaranteed</span>
              <span>•</span>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </footer>

      <DiagnosticChat />
    </main>
  );
}