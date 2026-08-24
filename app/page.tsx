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

      {/* HERO - Premium Design */}
      <section
        id="accueil"
        className="relative mx-auto mt-0 overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 size-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-40 bottom-0 size-80 rounded-full bg-white/5 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3.5 py-1.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                <span className="size-2 rounded-full bg-accent-success" />
                <span className="text-xs font-semibold text-white/90">Pièces trottinettes • Maroc</span>
              </div>

              <h1 className="mt-8 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Pièces fiables
                <span className="block text-white/90 mt-2">pour trottinettes électriques</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">
                Qualité vérifiée, compatibilité garantie et livraison rapide partout au Maroc. Plus de 1500 pièces en stock à Mrirt.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#produits"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                >
                  Voir les produits
                  <Icon name="arrow" className="size-4" />
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/20"
                >
                  <Icon name="whatsapp" className="size-4" />
                  Commander
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-10 grid gap-3">
                {[
                  { icon: "check", text: "Pièces testées & garanties" },
                  { icon: "truck", text: "Livraison 24h-48h au Maroc" },
                  { icon: "pin", text: "Stock à Mrirt disponible" }
                ].map(({ icon, text }, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white/85">
                    <Icon name={icon} className="size-4 text-accent-success flex-shrink-0" />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden h-[500px] lg:block">
              <img
                src="/products/hero-scooter.png"
                alt="Trottinette électrique"
                width={500}
                height={500}
                className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION - Simplified */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "box", title: "+1500 pièces", desc: "En stock à Mrirt" },
            { icon: "check", title: "100% testées", desc: "Qualité vérifiée" },
            { icon: "truck", title: "Livraison rapide", desc: "24h-48h au Maroc" },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-neutral-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md hover:-translate-y-1"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-200">
                <Icon name={icon} className="size-6" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-neutral-900">{title}</h3>
              <p className="mt-1.5 text-xs text-neutral-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES - Enhanced */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mb-12">
          <p className="section-eyebrow">Parcourir par type</p>
          <h2 className="section-title">Catégories de pièces</h2>
          <p className="mt-4 max-w-xl text-body text-neutral-600">
            Trouvez rapidement la pièce adaptée à votre trottinette parmi nos catégories principales.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {categories.map((category, idx) => (
            <a
              key={category.name}
              href="#produits"
              className="group flex flex-col items-start rounded-xl border border-neutral-100 bg-white p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 sm:p-5"
              style={{
                animation: `fadeInUp 300ms ease-out ${idx * 40}ms both`
              }}
            >
              <span
                className={`inline-flex size-10 items-center justify-center rounded-lg ${category.color} text-primary/70 transition-all duration-200 group-hover:scale-110 group-hover:text-primary`}
              >
                <Icon name={category.icon} className="size-5" />
              </span>

              <h3 className="mt-3 text-xs font-semibold text-neutral-900 sm:text-sm">
                {category.name}
              </h3>

              <p className="mt-2 text-xs text-neutral-400 transition-colors duration-200 group-hover:text-primary">
                Parcourir →
              </p>
            </a>
          ))}
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

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-neutral-200 bg-neutral-900 text-neutral-300"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo.png"
                  alt="Trotti Parts Maroc"
                  width={100}
                  height={60}
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
                <div>
                  <p className="text-xs font-black text-white">TROTTI</p>
                  <p className="text-xs font-semibold text-primary">PARTS</p>
                </div>
              </div>

              <p className="mt-4 max-w-xs text-xs leading-relaxed text-neutral-400">
                Spécialiste des pièces et accessoires pour trottinettes électriques au Maroc.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Navigation</h3>
              <ul className="mt-4 space-y-2">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-xs transition-colors duration-200 hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Contact</h3>
              <ul className="mt-4 space-y-2.5 text-xs">
                <li className="flex items-center gap-2.5">
                  <Icon name="whatsapp" className="size-4 text-accent-success flex-shrink-0" />
                  <span>+{contact.displayWhatsapp}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="pin" className="size-4 text-primary flex-shrink-0" />
                  <span>Mrirt, Maroc</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Questions ?</h3>
              <p className="mt-4 text-xs leading-relaxed text-neutral-400">
                Contactez-nous sur WhatsApp pour toute demande.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent-success px-3.5 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-accent-success-dark hover:shadow-md active:scale-95"
              >
                <Icon name="whatsapp" className="size-4" />
                Nous écrire
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Trotti Parts Maroc. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <DiagnosticChat />
    </main>
  );
}