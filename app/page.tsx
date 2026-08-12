import { Icon } from "./components/ui-icon";
import { ShopSection } from "./components/shop-section";
import { categories, contact, serviceHighlights } from "./data/store";

const navigation = [
  "Accueil",
  "Produits",
  "Catégories",
  "Professionnels",
  "Contact",
];

export default function Home() {
  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    "Bonjour TROTTI PARTS MAROC, je souhaite commander des pièces."
  )}`;

  return (
    <main className="overflow-hidden bg-[#f8fafc] text-slate-950">
      {/* TOP BAR */}
      <div className="border-b border-slate-200 bg-white px-4 py-2.5 text-center text-[11px] font-semibold text-slate-600 sm:text-xs">
        Livraison rapide au Maroc
        <span className="mx-2 text-slate-300">•</span>
        Stock disponible à Mrirt
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
              height={60}
              className="block h-14 w-auto object-contain"
            />
          </a>

          {/* NAVIGATION */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Navigation principale"
          >
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-slate-600 transition hover:text-[#075985]"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              className="hidden size-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 sm:grid"
              aria-label="Rechercher"
            >
              <Icon name="search" className="size-5" />
            </button>

            <button
              className="relative grid size-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100"
              aria-label="Panier"
            >
              <Icon name="bag" className="size-5" />

              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-[#0b85c6] text-[9px] font-bold text-white">
                0
              </span>
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-[#1faa59] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#168a47] sm:flex"
            >
              <Icon name="whatsapp" className="size-4" />
              WhatsApp
            </a>

            <button
              className="grid size-10 place-items-center rounded-xl text-slate-700 lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="accueil" className="relative isolate bg-[#eaf5fb]">
        <div className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(#9cd3ef_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-xs font-bold text-[#075985] shadow-sm">
              <span className="size-2 rounded-full bg-[#1faa59]" />
              Pièces disponibles au Maroc
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Pièces &amp; accessoires pour{" "}
              <span className="text-[#087bb6]">
                trottinettes électriques
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Pièces de rechange disponibles rapidement au Maroc pour
              particuliers et réparateurs.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#produits"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075985] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:-translate-y-0.5 hover:bg-[#064b70]"
              >
                Voir les produits
                <Icon name="arrow" className="size-4" />
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition hover:border-[#1faa59] hover:text-[#168a47]"
              >
                <Icon name="whatsapp" className="size-5 text-[#1faa59]" />
                Commander sur WhatsApp
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-[#1faa59]" />
                Stock local
              </span>

              <span className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-[#1faa59]" />
                Paiement à la livraison
              </span>

              <span className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-[#1faa59]" />
                Conseils experts
              </span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-10 -z-10 rounded-full bg-sky-300/25 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[#0a5176] p-4 shadow-2xl shadow-sky-950/25 sm:p-6">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[5rem] bg-[#0b85c6]" />

              <div className="relative h-[310px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#d8eef9] via-[#f8fbfd] to-[#8fc9e7] sm:h-[355px]">
                <div className="absolute -bottom-20 -left-10 h-52 w-[130%] rotate-[-9deg] rounded-t-[100%] bg-slate-800" />

                <div className="absolute left-8 top-8 rounded-lg bg-white/85 px-3 py-2 text-[10px] font-black tracking-[0.14em] text-[#075985] shadow-sm">
                  PIÈCES D&apos;ORIGINE &amp; COMPATIBLES
                </div>

                <div className="absolute bottom-11 left-1/2 h-[180px] w-[270px] -translate-x-1/2 sm:h-[210px] sm:w-[315px]">
                  <div className="absolute bottom-0 left-[19px] size-[68px] rounded-full border-[13px] border-slate-950 bg-slate-500 shadow-xl" />
                  <div className="absolute bottom-0 right-[19px] size-[68px] rounded-full border-[13px] border-slate-950 bg-slate-500 shadow-xl" />
                  <div className="absolute bottom-[58px] left-[55px] h-3 w-[207px] rounded-full bg-slate-950" />
                  <div className="absolute bottom-[67px] left-[95px] h-3 w-[135px] rotate-[-22deg] rounded-full bg-[#101827]" />
                  <div className="absolute bottom-[80px] left-[120px] h-[108px] w-3 rotate-[10deg] rounded-full bg-[#101827]" />
                  <div className="absolute bottom-[173px] left-[128px] h-3 w-[88px] rotate-[-32deg] rounded-full bg-[#101827]" />
                  <div className="absolute bottom-[185px] left-[205px] h-3 w-12 rounded-full bg-[#101827]" />
                  <div className="absolute bottom-[70px] left-[81px] h-7 w-24 -rotate-[22deg] rounded-full bg-[#0b85c6]" />
                </div>
              </div>

              <div className="relative mt-4 flex items-center justify-between px-1 text-white">
                <span className="text-xs font-semibold text-sky-100">
                  Votre spécialiste trottinette
                </span>

                <span className="flex items-center gap-1 text-xs font-bold">
                  <Icon name="pin" className="size-4" />
                  Maroc
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="catégories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Trouver la bonne pièce</p>
            <h2 className="section-title">Explorez nos catégories</h2>
          </div>

          <a
            href="#produits"
            className="hidden text-sm font-bold text-[#087bb6] sm:block"
          >
            Voir tout <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#produits"
              className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg sm:p-5"
            >
              <span
                className={`grid size-11 place-items-center rounded-xl ${category.color} text-[#075985] transition group-hover:scale-110`}
              >
                <Icon name={category.icon} className="size-6" />
              </span>

              <h3 className="mt-4 text-sm font-extrabold sm:text-base">
                {category.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
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
        <div className="rounded-3xl bg-[#073f5d] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
              Notre engagement
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Pourquoi choisir Trotti Parts Maroc ?
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {serviceHighlights.map((item) => (
              <div
                key={item.title}
                className="border-l border-sky-400/35 pl-4"
              >
                <Icon name={item.icon} className="size-6 text-sky-300" />

                <h3 className="mt-3 text-sm font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-sky-100/80">
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
        className="bg-[#eaf5fb] py-16 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative order-2 overflow-hidden rounded-3xl bg-[#075985] p-8 text-white lg:order-1 lg:p-10">
            <div className="absolute -right-10 -top-10 size-44 rounded-full border-[28px] border-sky-300/20" />

            <Icon
              name="tools"
              className="relative size-12 text-sky-200"
            />

            <p className="relative mt-12 max-w-xs text-xl font-black leading-snug">
              Un partenaire fiable pour votre atelier.
            </p>

            <div className="relative mt-8 flex gap-3">
              <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">
                Stock régulier
              </span>

              <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">
                Réponse rapide
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="section-eyebrow">Professionnels</p>

            <h2 className="section-title">Vous êtes réparateur ?</h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Profitez de tarifs professionnels sur les commandes en quantité.
              Nous vous accompagnons avec les pièces dont votre atelier a
              besoin.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#075985] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#064b70]"
            >
              <Icon name="whatsapp" className="size-5" />
              Demander un tarif professionnel
            </a>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-sky-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <span className="grid size-14 place-items-center rounded-2xl bg-sky-100 text-[#075985]">
            <Icon name="truck" className="size-7" />
          </span>

          <div>
            <p className="section-eyebrow">Expédition</p>

            <h2 className="section-title">
              Livraison partout au Maroc
            </h2>

            <p className="mt-3 text-sm text-slate-600">
              Mrirt
              <span className="mx-1.5 text-sky-400">•</span>
              Khénifra
              <span className="mx-1.5 text-sky-400">•</span>
              Kénitra
              <span className="mx-1.5 text-sky-400">•</span>
              et toutes les villes du Maroc
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <p className="text-lg font-black text-white">
              TROTTI PARTS{" "}
              <span className="text-sky-400">MAROC</span>
            </p>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Votre spécialiste des pièces de trottinettes électriques au
              Maroc.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Navigation</h3>

            <ul className="mt-4 space-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item}>
                  <a
                    className="transition hover:text-sky-300"
                    href={`#${item.toLowerCase()}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Contact</h3>

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
            <h3 className="text-sm font-bold text-white">Livraison</h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Expédition vers Mrirt, Khénifra, Kénitra et partout au Maroc.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
            <span>
              © 2026 TROTTI PARTS MAROC. Tous droits réservés.
            </span>

            <span>
              Pièces &amp; accessoires trottinettes électriques
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}