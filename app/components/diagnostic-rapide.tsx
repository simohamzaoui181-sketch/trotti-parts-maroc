"use client";

import { useState } from "react";

type Diagnostic = {
  problem: string;
  solution: string;
  category: string;
};

const diagnostics: Record<string, Diagnostic> = {
  pneu: {
    problem: "Pneu crevé, usé ou endommagé",
    solution:
      "Vérifiez la dimension inscrite sur le pneu et choisissez un pneu compatible avec votre trottinette.",
    category: "Pneus",
  },
  frein: {
    problem: "Frein faible, bruyant ou qui ne répond plus correctement",
    solution:
      "Vérifiez les plaquettes, le disque et le système de freinage. Une pièce peut être usée et nécessiter un remplacement.",
    category: "Freins",
  },
  charge: {
    problem: "La trottinette ne charge pas",
    solution:
      "Vérifiez d'abord le chargeur, le connecteur et la prise de charge. Si le problème persiste, le chargeur ou le contrôleur peut être en cause.",
    category: "Chargeurs",
  },
  demarrage: {
    problem: "La trottinette ne démarre plus",
    solution:
      "Vérifiez la batterie, l'écran, les connexions et le contrôleur. Évitez de démonter la batterie sans connaissances techniques.",
    category: "Contrôleurs",
  },
  acceleration: {
    problem: "L'accélérateur ne fonctionne pas correctement",
    solution:
      "Vérifiez la gâchette d'accélération, son câble et les connexions. L'accélérateur ou le contrôleur peut être défectueux.",
    category: "Accélérateurs",
  },
  autonomie: {
    problem: "L'autonomie de la batterie a diminué",
    solution:
      "Une batterie vieillissante peut perdre progressivement sa capacité. Vérifiez également la pression des pneus et le chargeur.",
    category: "Batteries / Charge",
  },
};

export function DiagnosticRapide() {
  const [selectedProblem, setSelectedProblem] = useState("");
  const [result, setResult] = useState<Diagnostic | null>(null);

  function handleDiagnostic() {
    if (!selectedProblem) return;

    setResult(diagnostics[selectedProblem]);
  }

  function resetDiagnostic() {
    setSelectedProblem("");
    setResult(null);
  }

  return (
    <section
      id="diagnostic"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT */}
          <div className="relative overflow-hidden bg-[#075985] p-7 text-white sm:p-10">
            <div className="absolute -right-20 -top-20 size-52 rounded-full border-[35px] border-sky-300/10" />
            <div className="absolute -bottom-20 -left-20 size-48 rounded-full border-[30px] border-white/5" />

            <div className="relative">
              <div className="grid size-14 place-items-center rounded-2xl bg-white/10">
                <span className="text-2xl">🔧</span>
              </div>

              <p className="mt-7 text-[11px] font-black uppercase tracking-[0.18em] text-sky-200">
                Besoin d'aide ?
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Diagnostic rapide
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-sky-100/80">
                Vous ne savez pas quelle pièce est à l'origine du problème ?
                Sélectionnez votre problème et obtenez une première
                orientation.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-lg bg-white/10 px-3 py-2 text-[10px] font-black">
                  Simple
                </span>

                <span className="rounded-lg bg-white/10 px-3 py-2 text-[10px] font-black">
                  Rapide
                </span>

                <span className="rounded-lg bg-white/10 px-3 py-2 text-[10px] font-black">
                  Gratuit
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-7 sm:p-10">
            {!result ? (
              <>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#087bb6]">
                  Étape 1
                </p>

                <h3 className="mt-2 text-2xl font-black text-slate-900">
                  Quel est le problème ?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Choisissez le problème rencontré avec votre trottinette.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    ["pneu", "🛞", "Problème de pneu"],
                    ["frein", "🛑", "Problème de frein"],
                    ["charge", "🔌", "Elle ne charge pas"],
                    ["demarrage", "⚡", "Elle ne démarre pas"],
                    ["acceleration", "🎮", "Problème d'accélérateur"],
                    ["autonomie", "🔋", "Faible autonomie"],
                  ].map(([value, icon, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedProblem(value)}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                        selectedProblem === value
                          ? "border-[#087bb6] bg-sky-50 ring-2 ring-sky-100"
                          : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50"
                      }`}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-slate-50 text-lg">
                        {icon}
                      </span>

                      <span className="text-xs font-black text-slate-800">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleDiagnostic}
                  disabled={!selectedProblem}
                  className="mt-7 w-full rounded-xl bg-[#075985] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064b70] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Lancer le diagnostic →
                </button>
              </>
            ) : (
              <>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#19a957]">
                  Résultat du diagnostic
                </p>

                <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-lg shadow-sm">
                      ✓
                    </span>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                        Pièce à vérifier
                      </p>

                      <h3 className="mt-1 text-xl font-black text-slate-900">
                        {result.category}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-black text-slate-900">
                      Problème possible
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {result.problem}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-black text-slate-900">
                      Que faire ?
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {result.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#produits"
                    className="flex-1 rounded-xl bg-[#075985] px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-[#064b70]"
                  >
                    Voir les pièces
                  </a>

                  <button
                    type="button"
                    onClick={resetDiagnostic}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                  >
                    Nouveau diagnostic
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}