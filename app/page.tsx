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
      {/* TOP BAR */}
      <div className="hidden overflow-hidden bg-gradient-to-r from-[#031d4e] to-[#063a86] text-white lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-1 px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur-sm text-sky-200">
              <Icon name="truck" className="size-6" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">Livraison rapide au Maroc</p>
              <p className="mt-0.5 text-sm text-sky-100">Partout au Maroc en 24h - 48h</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 border-l border-r border-white/10">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-500/20 ring-2 ring-emerald-400/50">
              <Icon name="pin" className="size-6 text-emerald-300" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">Stock à Mrirt</p>
              <p className="mt-0.5 text-sm text-emerald-100">Retrait rapide sur place</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur-sm">
              <Icon name="check" className="size-6 text-emerald-300" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">Testées & garanties</p>
              <p className="mt-0.5 text-sm text-sky-100">Qualité assurée</p>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 items-center justify-between gap-4 py-3">
            {/* Logo */}
            <a
              href="#accueil"
              className="flex shrink-0 items-center"
              aria-label="Trotti Parts Maroc"
            >
              <img
                src="/logo.png"
                alt="Trotti Parts Maroc"
                width={140}
                height={80}
                className="h-14 w-auto object-contain"
              />
            </a>

            {/* Desktop search */}
            <button
              type="button"
              onClick={handleSearchClick}
              className="hidden flex-1 max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 transition hover:border-slate-300 hover:bg-white lg:flex"
            >
              <Icon name="search" className="size-4 text-slate-400" />
              <span>Rechercher...</span>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile search */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
                aria-label="Rechercher"
              >
                <Icon name="search" className="size-5" />
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={handleCartClick}
                className="relative grid size-10 place-items-center rounded-lg border border-slate-200 text-[#075985] transition hover:bg-slate-100"
                aria-label={`Panier (${cartCount} articles)`}
              >
                <Icon name="bag" className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full bg-[#1faa59] text-[10px] font-black text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-lg bg-[#1faa59] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#168a47] hover:shadow-lg sm:flex"
              >
                <Icon name="whatsapp" className="size-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              {/* Mobile menu */}
              <button
                type="button"
                className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
                aria-label="Menu"
              >
                <Icon name="menu" className="size-5" />
              </button>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden gap-1 border-t border-slate-100 py-3 lg:flex">
            {navigation.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  idx === 0
                    ? "bg-[#075985] text-white hover:bg-[#064b70]"
                    : "text-[#075985] hover:bg-sky-50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        id="accueil"
        className="relative mx-auto mt-0 overflow-hidden bg-gradient-to-br from-[#021f45] via-[#042f68] to-[#063e5b]"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 size-96 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute -left-32 bottom-0 size-96 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#087dea]/20 border border-[#087dea]/40 px-4 py-2 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-[#1faa59]" />
                <span className="text-xs font-bold text-[#087dea]">Spécialiste trottinettes électriques</span>
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Pièces pour
                <span className="mt-2 block bg-gradient-to-r from-[#087dea] to-[#00d4ff] bg-clip-text text-transparent">
                  trottinettes électriques
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-sky-100">
                Qualité, fiabilité et performance pour toutes les marques. Stock disponible à Mrirt avec livraison partout au Maroc.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#produits"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#087dea] px-6 py-3.5 text-base font-black text-white shadow-lg shadow-sky-900/30 transition hover:bg-[#0665c0] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                >
                  Voir les produits
                  <Icon name="arrow" className="size-4" />
                </a>

                <a
                  href="#categories"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-6 py-3.5 text-base font-black text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10"
                >
                  <Icon name="grid" className="size-4" />
                  Explorer catégories
                </a>
              </div>

              {/* Trust icons */}
              <div className="mt-10 grid gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#087dea]/40 text-[#1faa59]">
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Pièces originales et compatibles
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#087dea]/40 text-[#1faa59]">
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Garantie 6 à 12 mois
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#087dea]/40 text-[#1faa59]">
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Expédition rapide 24h-48h
                  </span>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden h-[500px] lg:block">
              <img
                src="/products/hero-scooter.png"
                alt="Trottinette électrique"
                width={500}
                height={500}
                className="h-full w-full object-contain drop-shadow-2xl"
              />

              {/* Floating cards */}
              <div className="absolute bottom-8 left-8 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="text-xs font-bold text-[#1faa59]">✓ EN STOCK</p>
                <p className="mt-1 text-sm font-black text-white">Mrirt · Maroc</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "pin", title: "Stock à Mrirt", desc: "Retrait rapide disponible", badge: "✓ En stock" },
            { icon: "box", title: "+1500 pièces", desc: "Prêtes à expédier", badge: "Grand choix" },
            { icon: "check", title: "100% testées", desc: "Qualité approuvée", badge: "Garantie" },
            { icon: "whatsapp", title: "Support 7j/7", desc: "Réponse rapide assurée", badge: "24/48h" },
          ].map(({ icon, title, desc, badge }) => (
            <div
              key={title}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-sky-100 text-[#075985] transition group-hover:scale-110">
                <Icon name={icon} className="size-6" />
              </span>
              <h3 className="mt-4 text-sm font-black text-slate-900">{title}</h3>
              <p className="mt-1 text-xs text-slate-600">{desc}</p>
              <span className="mt-3 inline-block rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-[#075985]">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Trouver rapidement</p>
            <h2 className="section-title">Nos catégories</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Découvrez les pièces les plus recherchées pour l&apos;entretien et la réparation de votre trottinette.
            </p>
          </div>

          <a
            href="#produits"
            className="hidden text-sm font-bold text-[#075985] transition hover:text-[#064b70] sm:block"
          >
            Voir tous les produits →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#produits"
              className="group flex flex-col items-start rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg sm:p-6"
            >
              <span
                className={`inline-flex size-12 items-center justify-center rounded-xl ${category.color} text-[#075985] transition duration-300 group-hover:scale-110`}
              >
                <Icon name={category.icon} className="size-6" />
              </span>

              <h3 className="mt-4 text-sm font-black text-slate-900 sm:text-base">
                {category.name}
              </h3>

              <p className="mt-2 text-xs font-medium text-slate-500">
                Explorer →
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <ShopSection />

      {/* ENGAGEMENT */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063e5b] to-[#031d4e] px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute -right-40 -top-40 size-80 rounded-full border border-sky-400/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-sky-300">
              Pourquoi nous choisir
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Une solution simple et fiable pour vos pièces de trottinette.
            </h2>
          </div>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {serviceHighlights.map((item) => (
              <div key={item.title} className="border-l border-sky-400/30 pl-4">
                <Icon name={item.icon} className="size-6 text-sky-300" />
                <h3 className="mt-3 font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sky-100/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONNELS */}
      <section
        id="professionnels"
        className="border-y border-slate-100 bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Professional card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075985] to-[#042f68] p-8 text-white shadow-xl sm:p-12">
              <div className="absolute -right-32 -top-32 size-80 rounded-full border border-sky-400/10 blur-3xl" />

              <div className="relative">
                <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Icon name="tools" className="size-8 text-sky-200" />
                </div>

                <h3 className="mt-6 max-w-sm text-2xl font-black leading-tight">
                  Votre atelier m&eacute;rite un fournisseur fiable.
                </h3>

                <p className="mt-4 max-w-sm leading-relaxed text-sky-100">
                  Commandes en quantité, réponse rapide et accompagnement pour les réparateurs.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {["Stock régulier", "Tarifs pros", "Réponse rapide"].map((badge) => (
                    <span key={badge} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur-sm">
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
                Vous êtes réparateur ?
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                Nous proposons des solutions adaptées aux ateliers et réparateurs qui ont besoin de pièces régulièrement. Contactez-nous pour connaître nos tarifs professionnels et les disponibilités.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                  <Icon name="check" className="size-6 text-emerald-600" />
                  <h4 className="mt-3 font-bold text-slate-900">Commandes en quantité</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Solutions adaptées aux besoins des ateliers.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                  <Icon name="whatsapp" className="size-6 text-emerald-600" />
                  <h4 className="mt-3 font-bold text-slate-900">Contact direct</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Échangez directement avec nous sur WhatsApp.
                  </p>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#075985] px-6 py-3.5 font-bold text-white shadow-lg transition hover:bg-[#064b70] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <Icon name="whatsapp" className="size-5" />
                Demander un tarif professionnel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-r from-sky-50 to-blue-50 px-6 py-12 shadow-sm sm:px-10 sm:py-16">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-sky-100/30 blur-2xl" />

          <div className="relative flex flex-col items-center gap-4 text-center">
            <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-[#075985] text-white">
              <Icon name="truck" className="size-8" />
            </span>

            <div>
              <p className="section-eyebrow">Expédition</p>
              <h2 className="section-title">
                Livraison partout au Maroc
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Mrirt • Khénifra • Kénitra • Casablanca • et toutes les villes du Maroc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-slate-100 bg-slate-900 text-slate-300"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Trotti Parts Maroc"
                  width={100}
                  height={60}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <div>
                  <p className="text-sm font-black text-white">TROTTI</p>
                  <p className="text-xs font-bold text-sky-400">PARTS MAROC</p>
                </div>
              </div>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Votre spécialiste des pièces et accessoires pour trottinettes électriques au Maroc.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-black text-white">Navigation</h3>
              <ul className="mt-4 space-y-2">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm transition hover:text-sky-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-black text-white">Contact</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="whatsapp" className="size-4 text-emerald-400" />
                  <span>+{contact.displayWhatsapp}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="pin" className="size-4 text-sky-400" />
                  <span>Mrirt, Maroc</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-sm font-black text-white">Besoin d&apos;aide ?</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Contactez-nous sur WhatsApp pour toute question ou commande.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700"
              >
                <Icon name="whatsapp" className="size-4" />
                Nous contacter
              </a>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="mt-8 border-t border-slate-800 pt-8">
            <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:justify-between">
              <span>
                © 2026 TROTTI PARTS MAROC. Tous droits réservés.
              </span>
              <span>
                Pièces & accessoires pour trottinettes électriques
              </span>
            </div>
          </div>
        </div>
      </footer>

      <DiagnosticChat />
    </main>
  );
}