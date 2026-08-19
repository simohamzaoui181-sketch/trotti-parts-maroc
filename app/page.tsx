"use client";


import { useEffect, useState } from "react";
import { Icon } from "./components/ui-icon";
import { ShopSection } from "./components/shop-section";
import { categories, contact, serviceHighlights } from "./data/store";

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
      <div className="hidden overflow-hidden bg-[#031d4e] text-white lg:block">
        <div className="mx-auto grid max-w-[1440px] grid-cols-3 px-8">
          <div className="flex items-center gap-4 py-3.5"><span className="grid size-10 place-items-center rounded-full bg-white/10 text-sky-200"><Icon name="truck" className="size-6" /></span><div><p className="text-sm font-black uppercase">Livraison rapide au Maroc</p><p className="mt-0.5 text-sm text-slate-200">Partout au Maroc en 24h - 48h</p></div></div>
          <div className="relative flex items-center justify-center gap-4 bg-[#063a86] py-3.5"><span className="grid size-10 place-items-center rounded-full bg-emerald-500/30 ring-2 ring-emerald-300"><Icon name="pin" className="size-6" /></span><div><p className="text-sm font-black uppercase">Stock disponible à Mrirt</p><p className="mt-0.5 inline-block rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold">✓ Retrait rapide sur place</p></div></div>
          <div className="flex items-center justify-end gap-4 py-3.5"><span className="grid size-10 place-items-center rounded-full bg-white/10"><Icon name="check" className="size-6" /></span><div><p className="text-sm font-black uppercase">Pièces testées & garanties</p><p className="mt-0.5 text-sm text-slate-200">Qualité et fiabilité assurées</p></div></div>
        </div>
      </div>

      {/* HEADER */}
      <header className="relative z-50 bg-white">
        <div className="mx-auto flex min-h-[140px] max-w-[1440px] items-center gap-6 px-5 py-5 sm:px-8 lg:px-12">
          {/* LOGO */}
          <a
            href="#accueil"
            className="flex h-full items-center"
            aria-label="Trotti Parts Maroc"
          >
            <img
              src="/logo.png"
              alt="Trotti Parts Maroc"
              width={180}
              height={100}
              className="block h-[96px] w-auto object-contain"
            />
          </a>

          <div className="hidden flex-1 lg:flex"><button type="button" onClick={handleSearchClick} className="flex h-[62px] w-full max-w-[620px] items-center rounded-xl border border-slate-200 bg-white pl-6 text-left text-[16px] text-slate-500 shadow-sm">Rechercher une pièce, une référence...<span className="ml-auto grid h-full w-[68px] place-items-center rounded-r-[11px] bg-[#062d67] text-white"><Icon name="search" className="size-7" /></span></button></div>

          {/* ACTIONS */}
<div className="ml-auto flex items-center gap-3">

  {/* SEARCH */}
  <button
    type="button"
    onClick={handleSearchClick}
    className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 lg:hidden"
    aria-label="Rechercher"
  >
    <Icon
      name="search"
      className="size-[18px]"
    />
  </button>

  {/* PANIER */}
  <button
    type="button"
    onClick={handleCartClick}
    className="relative grid place-items-center text-[#062d67] transition hover:text-blue-600 lg:min-w-[66px]"
    aria-label={`Panier (${cartCount} articles)`}
  >
    <Icon
      name="bag"
      className="size-7"
    />

    <span className="absolute right-1 top-[-7px] grid size-5 place-items-center rounded-full bg-[#087dea] text-[10px] font-black text-white">
      {cartCount}
    </span>
  </button>

  <span className="hidden text-sm font-black text-[#062d67] lg:block">Panier</span>
  {/* WHATSAPP */}
  <a
    href={whatsappLink}
    target="_blank"
    rel="noreferrer"
    className="hidden items-center gap-2 rounded-xl bg-[#07963d] px-5 py-3.5 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#087b35] hover:shadow-md lg:flex"
  >
    <Icon
      name="whatsapp"
      className="size-6"
    />
    WhatsApp
  </a>

  {/* MOBILE MENU */}
  <button
    type="button"
    className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
    aria-label="Ouvrir le menu"
  >
    <Icon
      name="menu"
      className="size-5"
    />
    </button>

</div>

</div>
        <div className="mx-auto hidden max-w-[1360px] items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-[0_10px_28px_rgba(15,45,96,0.09)] lg:flex">
          <nav className="flex items-center gap-1" aria-label="Navigation principale">{navigation.map((item) => (<a key={item.label} href={item.href} className={`rounded-lg px-5 py-4 text-sm font-black uppercase text-[#062d67] transition hover:bg-blue-50 ${item.label === "Accueil" ? "bg-[#087dea] text-white hover:bg-[#087dea]" : ""}`}>{item.label}{["Produits", "Catégories"].includes(item.label) && <span className="ml-3">⌄</span>}</a>))}</nav>
          <div className="flex gap-3"><div className="flex items-center gap-3 rounded-2xl bg-[#f1f6ff] px-4 py-2"><Icon name="truck" className="size-7 text-[#087dea]" /><span className="text-sm font-black text-[#062d67]">Livraison 24/48h<br /><small className="font-medium text-slate-500">Partout au Maroc</small></span></div><div className="flex items-center gap-3 rounded-2xl bg-[#f1f6ff] px-4 py-2"><Icon name="check" className="size-7 text-[#087dea]" /><span className="text-sm font-black text-[#062d67]">SAV Réactif<br /><small className="font-medium text-slate-500">7j/7</small></span></div></div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="accueil"
        className="relative mx-auto mt-6 max-w-[1360px] overflow-hidden rounded-[24px] bg-[#021f45] text-white shadow-2xl"
      >
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_73%_55%,rgba(0,126,255,.65),transparent_24%),radial-gradient(circle_at_20%_20%,rgba(0,93,198,.25),transparent_43%),linear-gradient(115deg,#02152f,#042f68)]" />

        <div className="absolute right-[-100px] top-[-100px] -z-10 size-[360px] rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative mx-auto min-h-[600px] max-w-[1360px] px-6 py-12 sm:px-12 lg:px-12 lg:py-16">
          {/* HERO CONTENT */}
          <div className="relative z-10 max-w-[560px]">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#087dea] px-4 py-2 text-[13px] font-black uppercase text-white shadow-sm">
              Pièces & accessoires
            </div>

            <h1 className="mt-6 max-w-3xl text-[2.7rem] font-black uppercase leading-[.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.6rem]">
              Pour trottinettes
              <span className="mt-2 block text-[#087dea]">
                électriques
              </span>
            </h1>

            <div className="mt-7 h-0.5 w-16 bg-[#087dea]" />
            <p className="mt-6 max-w-md text-[16px] leading-7 text-slate-100 sm:text-[18px]">
              Qualité, fiabilité et performance pour toutes les marques de trottinettes.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#produits"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#087dea] px-6 py-3.5 text-sm font-black uppercase text-white shadow-lg shadow-sky-900/15 transition hover:-translate-y-0.5 hover:bg-blue-600"
              >
                Voir les produits
                <Icon name="arrow" className="size-4" />
              </a>

              <a
                href="#categories"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-6 py-3.5 text-sm font-black uppercase text-white shadow-sm transition hover:bg-white/10"
              >
                <Icon
                  name="bag"
                  className="size-5"
                />
                Nos catégories
              </a>
            </div>

            {/* TRUST */}
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2.5 px-1 py-1">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#087dea]">
                  <Icon
                    name="check"
                    className="size-4 text-[#19a957]"
                  />
                </span>
                <span className="text-[12px] font-bold text-white">
                  Pièces originales<br />et compatibles
                </span>
              </div>

              <div className="flex items-center gap-2.5 px-1 py-1">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#087dea]">
                  <Icon
                    name="truck"
                    className="size-4 text-[#087bb6]"
                  />
                </span>
                <span className="text-[12px] font-bold text-white">
                  Garantie<br />6 à 12 mois
                </span>
              </div>

              <div className="flex items-center gap-2.5 px-1 py-1">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#087dea]">
                  <Icon
                  name="truck"
                  className="size-4 text-[#087dea]"
                  />
                </span>
                <span className="text-[12px] font-bold text-white">
                  Expédition rapide<br />24h - 48h
                </span>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mt-8 w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[65%]">
            <div className="absolute -inset-8 -z-10 rounded-full bg-sky-300/30 blur-3xl" />

            <div className="relative overflow-visible rounded-none border-0 bg-transparent p-0 shadow-none">
              {/* Blue decoration */}
              <div className="absolute right-0 top-0 hidden h-44 w-44 rounded-bl-[5rem] bg-[#087bb6]" />

              <div className="absolute bottom-0 left-0 hidden h-28 w-28 rounded-tr-[4rem] bg-[#eaf7fc]" />

              {/* Image */}
              <div className="relative flex h-[360px] items-end justify-center overflow-hidden lg:h-[600px]">

                <img
                  src="/products/hero-scooter.png"
                  alt="Trotti Parts Maroc"
                  width={600}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover object-center lg:object-left"
                />

                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 z-20 hidden items-center gap-2 rounded-xl border border-white bg-white px-3 py-2.5 shadow-lg">
                  <span className="grid size-8 place-items-center rounded-lg bg-emerald-50">
                    <span className="size-2.5 rounded-full bg-[#19b45b]" />
                  </span>
                  <div>
                    <p className="text-[10px] font-black text-slate-900">
                      Stock disponible
                    </p>
                    <p className="text-[9px] font-semibold text-slate-500">
                      Mrirt · Maroc
                    </p>
                  </div>
                </div>

                {/* Floating category */}
                <div className="absolute right-5 top-5 z-20 hidden rounded-xl bg-[#075985] px-3 py-2.5 text-white shadow-lg">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-sky-200">
                    Spécialiste
                  </p>
                  <p className="mt-0.5 text-xs font-black">
                    Trottinettes électriques
                  </p>
                </div>
              </div>

              <div className="hidden items-center justify-between px-2 pb-1 pt-3">
                <span className="text-[11px] font-bold text-slate-500">
                  Pièces & accessoires
                </span>

                <span className="text-[11px] font-black text-[#075985]">
                  TROTTI PARTS MAROC
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1360px] gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-0">
        {[
          ["pin", "Stock à Mrirt", "Retrait rapide disponible", "✓ En stock"],
          ["box", "+1500 pièces", "En stock et prêtes à expédier", "Grand choix"],
          ["check", "Clients satisfaits", "Qualité approuvée", "4.9/5 sur Google"],
          ["whatsapp", "Support 7j/7", "Notre équipe à votre écoute", "Réponse rapide"],
        ].map(([icon, title, text, badge]) => (
          <div key={title} className="flex items-start gap-4 rounded-xl border border-[#dce8f8] bg-white p-4 shadow-sm">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f0f6ff] text-[#087dea]"><Icon name={icon} className="size-7" /></span>
            <div><h3 className="text-sm font-black uppercase text-[#062d67]">{title}</h3><p className="mt-1 text-xs text-slate-500">{text}</p><span className="mt-2 inline-block rounded-full bg-[#edf5ff] px-2.5 py-1 text-[11px] font-semibold text-[#087dea]">{badge}</span></div>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">
              Trouver rapidement
            </p>

            <h2 className="section-title">
              Nos catégories
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Découvrez les pièces les plus recherchées pour
              l'entretien et la réparation de votre trottinette.
            </p>
          </div>

          <a
            href="#produits"
            className="hidden text-sm font-black text-[#087bb6] transition hover:text-[#075985] sm:block"
          >
            Voir tous les produits →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#produits"
              className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl sm:p-5"
            >
              <span
                className={`grid size-12 place-items-center rounded-xl ${category.color} text-[#075985] transition duration-200 group-hover:scale-110`}
              >
                <Icon
                  name={category.icon}
                  className="size-6"
                />
              </span>

              <h3 className="mt-4 text-sm font-black sm:text-base">
                {category.name}
              </h3>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Voir la sélection
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <ShopSection />

      {/* ENGAGEMENT */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#063e5b] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute right-[-100px] top-[-100px] size-[300px] rounded-full border-[50px] border-sky-300/10" />

          <div className="relative max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-300">
              Pourquoi nous choisir
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Une solution simple pour vos pièces de trottinette.
            </h2>
          </div>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {serviceHighlights.map((item) => (
              <div
                key={item.title}
                className="border-l border-sky-400/30 pl-4"
              >
                <Icon
                  name={item.icon}
                  className="size-6 text-sky-300"
                />

                <h3 className="mt-3 text-sm font-black">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-sky-100/75">
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
        className="border-y border-sky-100 bg-[#edf8fc] py-16 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          {/* Professional card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#075985] p-8 text-white shadow-xl sm:p-10">
            <div className="absolute right-[-35px] top-[-35px] size-40 rounded-full border-[25px] border-sky-300/15" />

            <div className="relative">
              <div className="grid size-14 place-items-center rounded-2xl bg-white/10">
                <Icon
                  name="tools"
                  className="size-7 text-sky-200"
                />
              </div>

              <p className="mt-10 max-w-sm text-2xl font-black leading-tight">
                Votre atelier mérite un fournisseur fiable.
              </p>

              <p className="mt-4 max-w-sm text-sm leading-6 text-sky-100/80">
                Commandes en quantité, réponse rapide et accompagnement
                pour les réparateurs.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-lg bg-white/10 px-3 py-2 text-[10px] font-black">
                  Stock régulier
                </span>

                <span className="rounded-lg bg-white/10 px-3 py-2 text-[10px] font-black">
                  Tarifs pros
                </span>

                <span className="rounded-lg bg-white/10 px-3 py-2 text-[10px] font-black">
                  Réponse rapide
                </span>
              </div>
            </div>
          </div>

          {/* Professional content */}
          <div>
            <p className="section-eyebrow">
              Pour les professionnels
            </p>

            <h2 className="section-title">
              Vous êtes réparateur ?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Nous proposons des solutions adaptées aux ateliers et
              réparateurs qui ont besoin de pièces régulièrement.
              Contactez-nous pour connaître nos tarifs professionnels
              et les disponibilités.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <Icon
                  name="check"
                  className="size-5 text-[#19a957]"
                />
                <p className="mt-2 text-sm font-black">
                  Commandes en quantité
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Des solutions adaptées aux besoins des ateliers.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <Icon
                  name="whatsapp"
                  className="size-5 text-[#19a957]"
                />
                <p className="mt-2 text-sm font-black">
                  Contact direct
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Échangez directement avec nous sur WhatsApp.
                </p>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#075985] px-5 py-3.5 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#064b70]"
            >
              <Icon
                name="whatsapp"
                className="size-5"
              />
              Demander un tarif professionnel
            </a>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white px-6 py-10 shadow-sm sm:px-10">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-sky-50/60" />

          <div className="relative flex flex-col items-center gap-5 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-sky-100 text-[#075985]">
              <Icon
                name="truck"
                className="size-7"
              />
            </span>

            <div>
              <p className="section-eyebrow">
                Expédition
              </p>

              <h2 className="section-title">
                Livraison partout au Maroc
              </h2>

              <p className="mt-3 text-sm text-slate-600">
                Mrirt
                <span className="mx-2 text-sky-400">•</span>
                Khénifra
                <span className="mx-2 text-sky-400">•</span>
                Kénitra
                <span className="mx-2 text-sky-400">•</span>
                Casablanca
                <span className="mx-2 text-sky-400">•</span>
                et toutes les villes du Maroc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-[#071923] text-slate-300"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Trotti Parts Maroc"
                width={120}
                height={70}
                className="h-12 w-auto object-contain brightness-0 invert"
              />

              <div>
                <p className="text-sm font-black text-white">
                  TROTTI PARTS
                </p>
                <p className="text-[10px] font-bold text-sky-400">
                  MAROC
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              Votre spécialiste des pièces et accessoires pour
              trottinettes électriques au Maroc.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black text-white">
              Navigation
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    className="transition hover:text-sky-300"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-white">
              Contact
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Icon
                  name="whatsapp"
                  className="size-4 text-[#35c96d]"
                />
                WhatsApp : +{contact.displayWhatsapp}
              </li>

              <li className="flex items-center gap-2">
                <Icon
                  name="pin"
                  className="size-4 text-sky-400"
                />
                Mrirt, Maroc
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-white">
              Livraison
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Expédition vers Mrirt, Khénifra, Kénitra et partout au
              Maroc.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#19a957] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#128b47]"
            >
              <Icon
                name="whatsapp"
                className="size-4"
              />
              Nous contacter
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
            <span>
              © 2026 TROTTI PARTS MAROC. Tous droits réservés.
            </span>

            <span>
              Pièces & accessoires pour trottinettes électriques
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
