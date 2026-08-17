"use client";

import { useEffect, useState } from "react";
import { Icon } from "./components/ui-icon";
import { ShopSection } from "./components/shop-section";
import { DiagnosticRapide } from "./components/diagnostic-rapide";
import {
  categories,
  contact,
  serviceHighlights,
} from "./data/store";

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

      if (customEvent.detail?.count !== undefined) {
        setCartCount(customEvent.detail.count);
      }
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
    const cart = document.getElementById("cart-section");

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
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950">

      {/* =========================================================
          TOP BAR
      ========================================================= */}
      <div className="bg-gradient-to-r from-[#06275f] via-[#073f91] to-[#06275f] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-2 px-4 py-3 text-center sm:grid-cols-3 sm:text-left lg:px-8">

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10">
              <Icon name="truck" className="size-5 text-white" />
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-wide sm:text-xs">
                Livraison rapide au Maroc
              </p>

              <p className="text-[10px] text-blue-100 sm:text-[11px]">
                Partout au Maroc en 24h - 48h
              </p>
            </div>
          </div>

          <div className="hidden items-center justify-center sm:flex">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full border-4 border-emerald-400/30 bg-emerald-500/20">
                <Icon name="pin" className="size-5 text-white" />
              </div>

              <div>
                <p className="text-xs font-black uppercase">
                  Stock disponible à Mrirt
                </p>

                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#19a957] px-3 py-1 text-[9px] font-black">
                  <span className="size-1.5 rounded-full bg-white" />
                  Retrait rapide sur place
                </span>
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-center gap-3 sm:flex sm:justify-end">
            <div className="grid size-10 place-items-center rounded-full bg-white/10">
              <Icon name="check" className="size-5 text-white" />
            </div>

            <div>
              <p className="text-xs font-black uppercase">
                Pièces testées & garanties
              </p>

              <p className="text-[10px] text-blue-100">
                Qualité et fiabilité assurées
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          HEADER PRINCIPAL
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex min-h-[92px] max-w-7xl items-center gap-5 px-4 py-3 lg:px-8">

          {/* LOGO */}
          <a
            href="#accueil"
            className="shrink-0"
            aria-label="Trotti Parts Maroc"
          >
            <img
              src="/logo.png"
              alt="Trotti Parts Maroc"
              width={190}
              height={100}
              className="h-[68px] w-auto object-contain sm:h-[76px]"
            />
          </a>

          {/* SEARCH */}
          <div className="hidden flex-1 md:block">
            <div className="mx-auto flex h-[58px] max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition focus-within:border-[#0b6ee8] focus-within:ring-4 focus-within:ring-blue-100">

              <input
                id="header-search"
                type="text"
                placeholder="Rechercher une pièce, une référence..."
                onFocus={handleSearchClick}
                className="min-w-0 flex-1 bg-transparent px-5 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={handleSearchClick}
                className="grid w-16 place-items-center bg-[#073b78] text-white transition hover:bg-[#075985]"
                aria-label="Rechercher"
              >
                <Icon name="search" className="size-6" />
              </button>
            </div>
          </div>

          {/* HEADER ACTIONS */}
          <div className="ml-auto flex items-center gap-2 sm:gap-4">

            {/* COMPTE */}
            <button
              type="button"
              className="hidden flex-col items-center gap-1 text-[#062f68] sm:flex"
              aria-label="Compte"
            >
              <Icon name="user" className="size-7" />
              <span className="text-[11px] font-bold">Compte</span>
            </button>

            {/* PANIER */}
            <button
              type="button"
              onClick={handleCartClick}
              className="relative flex flex-col items-center gap-1 text-[#062f68]"
              aria-label={`Panier (${cartCount} articles)`}
            >
              <div className="relative">
                <Icon name="bag" className="size-7" />

                <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[#0877df] text-[9px] font-black text-white">
                  {cartCount}
                </span>
              </div>

              <span className="text-[11px] font-bold">
                Panier
              </span>
            </button>

            {/* WHATSAPP */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="hidden h-[52px] items-center gap-2 rounded-xl bg-[#19a957] px-5 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#128b47] hover:shadow-lg sm:flex"
            >
              <Icon name="whatsapp" className="size-5" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="border-t border-slate-100 px-4 py-3 md:hidden">
          <div className="flex h-12 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <input
              type="text"
              placeholder="Rechercher une pièce..."
              onFocus={handleSearchClick}
              className="min-w-0 flex-1 px-4 text-xs outline-none"
            />

            <button
              type="button"
              onClick={handleSearchClick}
              className="grid w-14 place-items-center bg-[#073b78] text-white"
            >
              <Icon name="search" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <div className="bg-white px-4 py-4">
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,0.06)] lg:px-3"
        >
          {navigation.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-black transition ${
                index === 0
                  ? "bg-[#0877ed] text-white shadow-md shadow-blue-500/20"
                  : "text-[#082d60] hover:bg-blue-50 hover:text-[#0877ed]"
              }`}
            >
              {index === 0 && (
                <Icon name="home" className="size-4" />
              )}

              {index === 1 && (
                <Icon name="tag" className="size-4" />
              )}

              {index === 2 && (
                <Icon name="grid" className="size-4" />
              )}

              {index === 3 && (
                <Icon name="tools" className="size-4" />
              )}

              {index === 4 && (
                <Icon name="phone" className="size-4" />
              )}

              {item.label}
            </a>
          ))}

          <div className="ml-auto hidden shrink-0 items-center gap-3 xl:flex">

            <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5">
              <Icon
                name="truck"
                className="size-5 text-[#0877ed]"
              />

              <div>
                <p className="text-[10px] font-black text-[#082d60]">
                  Livraison 24/48h
                </p>

                <p className="text-[9px] text-slate-500">
                  Partout au Maroc
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5">
              <Icon
                name="check"
                className="size-5 text-[#0877ed]"
              />

              <div>
                <p className="text-[10px] font-black text-[#082d60]">
                  SAV Réactif
                </p>

                <p className="text-[9px] text-slate-500">
                  7j/7
                </p>
              </div>
            </div>

          </div>
        </nav>
      </div>

      {/* =========================================================
    HERO
========================================================= */}
<section
  id="accueil"
  className="px-4 pb-6 pt-2 sm:px-6 lg:px-8"
>
  <div
    className="
      relative mx-auto min-h-[560px] max-w-7xl
      overflow-hidden rounded-[2rem]
      bg-[#001d3d]
      shadow-[0_25px_70px_rgba(0,29,61,0.25)]
    "
  >

    {/* =====================================================
        BACKGROUND
    ===================================================== */}

    <div
      className="
        absolute inset-0
        bg-[radial-gradient(circle_at_80%_50%,rgba(0,110,255,0.45),transparent_38%),linear-gradient(110deg,#00152e_0%,#002b5b_55%,#003f91_100%)]
      "
    />

    {/* Blue curves */}
    <div
      className="
        absolute right-[-15%] top-[12%]
        h-[450px] w-[800px]
        rounded-full
        border border-blue-400/20
        rotate-[-15deg]
      "
    />

    <div
      className="
        absolute right-[-10%] top-[35%]
        h-[350px] w-[700px]
        rounded-full
        border border-blue-400/20
        rotate-[-15deg]
      "
    />

    {/* Glow */}
    <div
      className="
        absolute right-[10%] top-[30%]
        h-[350px] w-[550px]
        rounded-full
        bg-blue-500/20
        blur-[100px]
      "
    />

    {/* =====================================================
        CONTENT
    ===================================================== */}

    <div
      className="
        relative z-10
        grid min-h-[560px]
        items-center
        gap-6
        px-7 py-12
        sm:px-10
        lg:grid-cols-[0.9fr_1.1fr]
        lg:px-12
      "
    >

      {/* ===================================================
          HERO TEXT
      =================================================== */}

      <div className="relative z-20 max-w-2xl">

        {/* Badge */}
        <span
          className="
            inline-flex
            rounded-lg
            bg-[#0877ed]
            px-4 py-2
            text-[11px]
            font-black
            uppercase
            tracking-wide
            text-white
            shadow-lg
            shadow-blue-500/20
          "
        >
          Pièces & accessoires
        </span>

        {/* Title */}
        <h1
          className="
            mt-6
            text-4xl
            font-black
            uppercase
            leading-[0.98]
            tracking-tight
            text-white
            sm:text-5xl
            lg:text-[4.2rem]
          "
        >
          Pour trottinettes

          <span
            className="
              mt-2
              block
              text-[#1685ff]
            "
          >
            électriques
          </span>
        </h1>

        {/* Blue line */}
        <div
          className="
            mt-6
            h-1
            w-16
            rounded-full
            bg-[#0877ed]
          "
        />

        {/* Description */}
        <p
          className="
            mt-6
            max-w-xl
            text-base
            leading-7
            text-blue-50/90
            sm:text-lg
          "
        >
          Qualité, fiabilité et performance pour toutes les
          marques de trottinettes.
        </p>

        {/* =================================================
            FEATURES
        ================================================= */}

        <div
          className="
            mt-8
            grid
            gap-4
            sm:grid-cols-3
          "
        >

          {/* Feature 1 */}
          <div className="flex items-center gap-3">

            <span
              className="
                grid size-10 shrink-0
                place-items-center
                rounded-full
                border-2 border-blue-500
                bg-blue-500/10
              "
            >
              <Icon
                name="check"
                className="size-5 text-[#1685ff]"
              />
            </span>

            <span
              className="
                text-[11px]
                font-bold
                leading-4
                text-white
              "
            >
              Pièces originales
              <br />
              et compatibles
            </span>

          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3">

            <span
              className="
                grid size-10 shrink-0
                place-items-center
                rounded-full
                border-2 border-blue-500
                bg-blue-500/10
              "
            >
              <Icon
                name="check"
                className="size-5 text-[#1685ff]"
              />
            </span>

            <span
              className="
                text-[11px]
                font-bold
                leading-4
                text-white
              "
            >
              Garantie
              <br />
              6 à 12 mois
            </span>

          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3">

            <span
              className="
                grid size-10 shrink-0
                place-items-center
                rounded-full
                border-2 border-blue-500
                bg-blue-500/10
              "
            >
              <Icon
                name="truck"
                className="size-5 text-[#1685ff]"
              />
            </span>

            <span
              className="
                text-[11px]
                font-bold
                leading-4
                text-white
              "
            >
              Expédition rapide
              <br />
              24h - 48h
            </span>

          </div>

        </div>

        {/* =================================================
            CTA BUTTONS
        ================================================= */}

        <div
          className="
            mt-9
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >

          {/* Products */}
          <a
            href="#produits"
            className="
              inline-flex
              min-h-14
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#0877ed]
              px-7
              text-sm
              font-black
              text-white
              shadow-xl
              shadow-blue-900/30
              transition
              hover:-translate-y-1
              hover:bg-[#0069d9]
            "
          >
            <Icon
              name="bag"
              className="size-5"
            />

            Voir les produits
          </a>

          {/* Categories */}
          <a
            href="#categories"
            className="
              inline-flex
              min-h-14
              items-center
              justify-center
              gap-2
              rounded-xl
              border-2
              border-white/80
              bg-white/5
              px-7
              text-sm
              font-black
              text-white
              backdrop-blur-sm
              transition
              hover:bg-white
              hover:text-[#082d60]
            "
          >
            <Icon
              name="grid"
              className="size-5"
            />

            Nos catégories
          </a>

        </div>

      </div>

      {/* ===================================================
          HERO IMAGE
      =================================================== */}

      <div
        className="
          relative
          hidden
          min-h-[520px]
          lg:block
        "
      >

        {/* Image glow */}
        <div
          className="
            absolute
            right-[5%]
            top-[25%]
            h-[350px]
            w-[500px]
            rounded-full
            bg-blue-500/30
            blur-[90px]
          "
        />

        {/* Main image */}
        <img
          src="/hero-scooter.png"
          alt="Trottinette électrique et pièces détachées"
          className="
            absolute
            right-[-90px]
            top-1/2
            z-10
            h-[620px]
            w-[720px]
            max-w-none
            -translate-y-1/2
            object-contain
            drop-shadow-[0_30px_40px_rgba(0,0,0,0.40)]
          "
        />

      </div>

    </div>

  </div>
</section>
      <section
        id="accueil"
        className="px-4 pb-6 pt-2 sm:px-6 lg:px-8"
      >
        <div className="relative mx-auto min-h-[520px] max-w-7xl overflow-hidden rounded-[2rem] bg-[#001d3d] shadow-[0_25px_70px_rgba(0,29,61,0.25)]">

          {/* BACKGROUND */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(0,110,255,0.45),transparent_35%),linear-gradient(110deg,#00152e_0%,#002b5b_55%,#003f91_100%)]" />

          <div className="absolute right-[-15%] top-[15%] h-[450px] w-[800px] rounded-full border-[1px] border-blue-400/20 rotate-[-15deg]" />

          <div className="absolute right-[-10%] top-[35%] h-[350px] w-[700px] rounded-full border-[1px] border-blue-400/20 rotate-[-15deg]" />

          {/* CONTENT */}
          <div className="relative z-10 grid min-h-[520px] items-center gap-10 px-7 py-12 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">

            {/* HERO TEXT */}
            <div className="max-w-2xl">

              <span className="inline-flex rounded-lg bg-[#0877ed] px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white shadow-lg shadow-blue-500/20">
                Pièces & accessoires
              </span>

              <h1 className="mt-6 text-4xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-[4.2rem]">
                Pour trottinettes
                <span className="mt-2 block text-[#1685ff]">
                  électriques
                </span>
              </h1>

              <div className="mt-6 h-1 w-16 rounded-full bg-[#0877ed]" />

              <p className="mt-6 max-w-xl text-base leading-7 text-blue-50/90 sm:text-lg">
                Qualité, fiabilité et performance pour toutes les
                marques de trottinettes.
              </p>

              {/* FEATURES */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full border-2 border-blue-500">
                    <Icon
                      name="check"
                      className="size-5 text-[#1685ff]"
                    />
                  </span>

                  <span className="text-[11px] font-bold leading-4 text-white">
                    Pièces originales
                    <br />
                    et compatibles
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full border-2 border-blue-500">
                    <Icon
                      name="check"
                      className="size-5 text-[#1685ff]"
                    />
                  </span>

                  <span className="text-[11px] font-bold leading-4 text-white">
                    Garantie
                    <br />
                    6 à 12 mois
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full border-2 border-blue-500">
                    <Icon
                      name="truck"
                      className="size-5 text-[#1685ff]"
                    />
                  </span>

                  <span className="text-[11px] font-bold leading-4 text-white">
                    Expédition rapide
                    <br />
                    24h - 48h
                  </span>
                </div>

              </div>

              {/* CTA */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <a
                  href="#produits"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#0877ed] px-7 text-sm font-black text-white shadow-xl shadow-blue-900/30 transition hover:-translate-y-1 hover:bg-[#0069d9]"
                >
                  <Icon name="bag" className="size-5" />
                  Voir les produits
                </a>

                <a
                  href="#categories"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-white/5 px-7 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white hover:text-[#082d60]"
                >
                  <Icon name="grid" className="size-5" />
                  Nos catégories
                </a>

              </div>
            </div>

            {/* HERO VISUAL */}
<div className="relative hidden min-h-[460px] lg:block">

  <img
    src="/hero-trotti.png"
    alt="Trottinette électrique et pièces détachées"
    className="absolute inset-0 h-full w-full object-contain"
  />


              {/* Main scooter visual */}
              <div className="absolute bottom-[-35px] right-[-20px] h-[470px] w-[500px]">

                <div className="absolute bottom-10 right-10 h-[80px] w-[380px] rounded-full bg-blue-500/30 blur-3xl" />

                <div className="absolute right-[160px] top-[70px] h-[340px] w-[34px] rotate-[10deg] rounded-full bg-gradient-to-r from-slate-700 via-black to-slate-600 shadow-2xl" />

                <div className="absolute right-[95px] bottom-[95px] h-[34px] w-[300px] rotate-[4deg] rounded-full bg-gradient-to-r from-black via-slate-700 to-black shadow-xl" />

                <div className="absolute right-[355px] bottom-[70px] h-[110px] w-[110px] rounded-full border-[20px] border-black bg-slate-700 shadow-xl" />

                <div className="absolute right-[40px] bottom-[65px] h-[125px] w-[125px] rounded-full border-[20px] border-black bg-slate-700 shadow-xl" />

                <div className="absolute right-[150px] top-[35px] h-[120px] w-[25px] rotate-[15deg] rounded-full bg-black" />

                <div className="absolute right-[105px] top-[20px] h-[18px] w-[120px] rotate-[4deg] rounded-full bg-black" />

                <div className="absolute right-[215px] top-[95px] h-[15px] w-[70px] rotate-[15deg] rounded-full bg-red-500" />
              </div>

              {/* Floating product cards */}
              <div className="absolute left-0 top-12 rounded-2xl border border-blue-300/30 bg-blue-950/60 p-4 backdrop-blur-md">
                <div className="grid size-28 place-items-center rounded-xl bg-white/5">
                  <div className="h-16 w-16 rounded-full border-[10px] border-slate-300" />
                </div>
              </div>

              <div className="absolute right-2 top-10 rounded-2xl border border-blue-300/30 bg-blue-950/60 p-4 backdrop-blur-md">
                <div className="grid size-28 place-items-center rounded-xl bg-white/5">
                  <div className="h-16 w-16 rounded-full border-[12px] border-black bg-slate-500" />
                </div>
              </div>

              <div className="absolute bottom-14 left-5 rounded-2xl border border-blue-300/30 bg-blue-950/60 p-4 backdrop-blur-md">
                <div className="flex h-20 w-32 items-center justify-center">
                  <div className="h-10 w-28 rounded-md bg-gradient-to-b from-slate-400 to-slate-700 shadow-xl" />
                </div>
              </div>

              <div className="absolute bottom-20 right-0 rounded-2xl border border-blue-300/30 bg-blue-950/60 p-4 backdrop-blur-md">
                <div className="flex h-20 w-32 items-center justify-center">
                  <div className="h-12 w-24 rounded-full border-8 border-slate-700 bg-black" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST CARDS
      ========================================================= */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-50">
              <Icon
                name="pin"
                className="size-6 text-[#0877ed]"
              />
            </span>

            <div>
              <h3 className="text-sm font-black text-[#082d60]">
                STOCK À MRIRT
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Retrait rapide disponible
              </p>

              <span className="mt-2 inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                ✓ En stock
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-50">
              <Icon
                name="box"
                className="size-6 text-[#0877ed]"
              />
            </span>

            <div>
              <h3 className="text-sm font-black text-[#082d60]">
                +1500 PIÈCES
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                En stock et prêtes à expédier
              </p>

              <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-[#0877ed]">
                Grand choix
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-50">
              <Icon
                name="star"
                className="size-6 text-[#0877ed]"
              />
            </span>

            <div>
              <h3 className="text-sm font-black text-[#082d60]">
                CLIENTS SATISFAITS
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Qualité approuvée
              </p>

              <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-[#0877ed]">
                4.9/5
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-50">
              <Icon
                name="phone"
                className="size-6 text-[#0877ed]"
              />
            </span>

            <div>
              <h3 className="text-sm font-black text-[#082d60]">
                SUPPORT 7J/7
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Notre équipe à votre écoute
              </p>

              <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                Réponse rapide
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================
          DIAGNOSTIC RAPIDE
      ========================================================= */}
      <section
        id="diagnostic"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <DiagnosticRapide />
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="flex items-end justify-between gap-5">

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0877ed]">
              Trouver rapidement
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#082d60] sm:text-4xl">
              Nos catégories
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Découvrez les pièces les plus recherchées pour
              l'entretien et la réparation de votre trottinette.
            </p>
          </div>

          <a
            href="#produits"
            className="hidden text-sm font-black text-[#0877ed] hover:text-[#075985] sm:block"
          >
            Voir tous les produits →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#produits"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <span
                className={`grid size-14 place-items-center rounded-xl ${category.color} text-[#075985] transition group-hover:scale-110`}
              >
                <Icon
                  name={category.icon}
                  className="size-6"
                />
              </span>

              <h3 className="mt-4 text-sm font-black text-[#082d60] sm:text-base">
                {category.name}
              </h3>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Voir la sélection
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* =========================================================
          PRODUCTS
      ========================================================= */}
      <ShopSection />

      {/* =========================================================
          ENGAGEMENT
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#052c5c] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">

          <div className="absolute right-[-100px] top-[-100px] size-[300px] rounded-full border-[50px] border-blue-400/10" />

          <div className="relative max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-300">
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
                className="border-l border-blue-400/30 pl-4"
              >
                <Icon
                  name={item.icon}
                  className="size-6 text-blue-300"
                />

                <h3 className="mt-3 text-sm font-black">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-blue-100/75">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROFESSIONNELS
      ========================================================= */}
      <section
        id="professionnels"
        className="border-y border-blue-100 bg-[#eef6ff] py-16 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#075985] p-8 text-white shadow-xl sm:p-10">

            <div className="absolute right-[-35px] top-[-35px] size-40 rounded-full border-[25px] border-blue-300/15" />

            <div className="relative">
              <div className="grid size-14 place-items-center rounded-2xl bg-white/10">
                <Icon
                  name="tools"
                  className="size-7 text-blue-200"
                />
              </div>

              <p className="mt-10 max-w-sm text-2xl font-black leading-tight">
                Votre atelier mérite un fournisseur fiable.
              </p>

              <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100/80">
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

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0877ed]">
              Pour les professionnels
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#082d60] sm:text-4xl">
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
              <Icon name="whatsapp" className="size-5" />
              Demander un tarif professionnel
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          DELIVERY
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white px-6 py-10 shadow-sm sm:px-10">

          <div className="absolute right-0 top-0 h-full w-1/3 bg-blue-50/60" />

          <div className="relative flex flex-col items-center gap-5 text-center">

            <span className="grid size-14 place-items-center rounded-2xl bg-blue-100 text-[#075985]">
              <Icon
                name="truck"
                className="size-7"
              />
            </span>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0877ed]">
                Expédition
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#082d60]">
                Livraison partout au Maroc
              </h2>

              <p className="mt-3 text-sm text-slate-600">
                Mrirt
                <span className="mx-2 text-blue-400">•</span>
                Khénifra
                <span className="mx-2 text-blue-400">•</span>
                Kénitra
                <span className="mx-2 text-blue-400">•</span>
                Casablanca
                <span className="mx-2 text-blue-400">•</span>
                et toutes les villes du Maroc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer
        id="contact"
        className="bg-[#061a35] text-slate-300"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">

          {/* BRAND */}
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

                <p className="text-[10px] font-bold text-blue-400">
                  MAROC
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              Votre spécialiste des pièces et accessoires pour
              trottinettes électriques au Maroc.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-sm font-black text-white">
              Navigation
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    className="transition hover:text-blue-300"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
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
                  className="size-4 text-blue-400"
                />

                Mrirt, Maroc
              </li>

            </ul>
          </div>

          {/* DELIVERY */}
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