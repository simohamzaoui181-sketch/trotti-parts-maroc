"use client";

import { useState } from "react";

type Message = {
  role: "bot" | "user";
  text: string;
};

const questions = [
  {
    question: "Quel est le principal problème avec votre trottinette ?",
    options: [
      "Elle ne démarre pas",
      "Elle ne charge plus",
      "Elle avance mal",
      "Elle freine mal",
      "Problème de roue ou pneu",
      "Autre problème",
    ],
  },
  {
    question: "Quand vous appuyez sur l'accélérateur, que se passe-t-il ?",
    options: [
      "Rien ne se passe",
      "Elle démarre puis s'arrête",
      "Elle avance normalement",
      "Elle fait un bruit anormal",
    ],
  },
  {
    question: "La batterie affiche-t-elle une charge normale ?",
    options: [
      "Oui",
      "Non",
      "Je ne sais pas",
    ],
  },
  {
    question: "Avez-vous remarqué un bruit, une vibration ou une odeur inhabituelle ?",
    options: [
      "Non",
      "Bruit",
      "Vibration",
      "Odeur de brûlé",
    ],
  },
  {
    question: "Quelle partie pensez-vous être à l'origine du problème ?",
    options: [
      "Batterie",
      "Chargeur",
      "Contrôleur",
      "Moteur",
      "Frein",
      "Roue / pneu",
      "Je ne sais pas",
    ],
  },
];

export default function DiagnosticChat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  const [answers, setAnswers] = useState<string[]>([]);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Bonjour ! Je peux vous aider à identifier la pièce qui pourrait être à l'origine du problème.",
    },
  ]);

  function chooseAnswer(answer: string) {
    const newAnswers = [...answers, answer];

    setAnswers(newAnswers);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: answer,
      },
    ]);

    if (step < questions.length - 1) {
      const nextStep = step + 1;

      setStep(nextStep);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: questions[nextStep].question,
          },
        ]);
      }, 250);
    } else {
      setFinished(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: getRecommendation(newAnswers),
          },
        ]);
      }, 250);
    }
  }

  function getRecommendation(currentAnswers: string[]) {
    const all = currentAnswers.join(" ").toLowerCase();

    if (
      all.includes("charge") ||
      all.includes("chargeur") ||
      all.includes("batterie")
    ) {
      return "D'après vos réponses, le problème peut être lié à la batterie ou au chargeur. Nous vous conseillons de vérifier ces deux éléments avant de commander une pièce.";
    }

    if (
      all.includes("frein") ||
      all.includes("freine")
    ) {
      return "Le problème semble lié au système de freinage. Il peut s'agir du levier, du câble ou d'un élément du système de frein.";
    }

    if (
      all.includes("roue") ||
      all.includes("pneu")
    ) {
      return "Le problème semble lié à la roue ou au pneu. Nous pouvons vous aider à identifier la bonne dimension et la bonne référence.";
    }

    if (
      all.includes("moteur") ||
      all.includes("avance")
    ) {
      return "Le problème peut être lié au moteur, au contrôleur ou à l'accélérateur. Une vérification supplémentaire est recommandée.";
    }

    if (
      all.includes("contrôleur") ||
      all.includes("controleur")
    ) {
      return "Le contrôleur peut être à l'origine du problème. Envoyez-nous le modèle exact de votre trottinette afin d'identifier la bonne référence.";
    }

    return "Nous n'avons pas pu identifier précisément la pièce. Envoyez-nous le modèle exact de votre trottinette ou une photo du problème afin que nous puissions vous aider.";
  }

  function resetDiagnostic() {
    setStep(0);
    setAnswers([]);
    setFinished(false);

    setMessages([
      {
        role: "bot",
        text: "Bonjour ! Je peux vous aider à identifier la pièce qui pourrait être à l'origine du problème.",
      },
    ]);
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le diagnostic"
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-full bg-[#087dea] px-4 py-3 text-white shadow-[0_15px_40px_rgba(8,125,234,0.4)] transition hover:-translate-y-1 hover:bg-[#066dcc]"
        >
          <span className="grid size-11 place-items-center rounded-full bg-white/15">
            <span className="text-lg font-black">AI</span>
          </span>

          <span className="hidden text-left sm:block">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-100">
              Besoin d&apos;aide ?
            </span>

            <span className="block text-sm font-black">
              Diagnostic
            </span>
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-[9999] w-[calc(100vw-2rem)] max-w-[390px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.25)]">

          {/* HEADER */}
          <div className="flex items-center justify-between bg-[#062d67] px-5 py-4 text-white">

            <div className="flex items-center gap-3">

              <div className="grid size-11 place-items-center rounded-full bg-[#087dea]">
                <span className="text-xs font-black">
                  AI
                </span>
              </div>

              <div>
                <p className="text-sm font-black">
                  Assistant Diagnostic
                </p>

                <p className="text-[11px] text-blue-200">
                  Identifiez la pièce à vérifier
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-9 place-items-center rounded-full bg-white/10 text-lg transition hover:bg-white/20"
              aria-label="Fermer"
            >
              ×
            </button>

          </div>

          {/* PROGRESS */}
          <div className="h-1 bg-slate-100">
            <div
              className="h-full bg-[#087dea] transition-all duration-300"
              style={{
                width: finished
                  ? "100%"
                  : `${((step + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* MESSAGES */}
          <div className="max-h-[350px] space-y-3 overflow-y-auto bg-slate-50 p-4">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-5 ${
                    message.role === "user"
                      ? "rounded-br-md bg-[#087dea] font-semibold text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

          </div>

          {/* QUESTIONS */}
          {!finished ? (
            <div className="border-t border-slate-100 bg-white p-4">

              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Étape {step + 1} / {questions.length}
                </p>

                <p className="text-[10px] font-bold text-[#087dea]">
                  Diagnostic
                </p>
              </div>

              <div className="grid gap-2">

                {questions[step].options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => chooseAnswer(option)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-xs font-bold text-slate-700 transition hover:border-[#087dea] hover:bg-blue-50 hover:text-[#062d67]"
                  >
                    {option}
                  </button>
                ))}

              </div>

            </div>
          ) : (
            <div className="border-t border-slate-100 bg-white p-4">

              <button
                type="button"
                onClick={resetDiagnostic}
                className="w-full rounded-xl bg-[#062d67] px-4 py-3 text-xs font-black text-white transition hover:bg-[#087dea]"
              >
                Refaire le diagnostic
              </button>

              <a
                href="https://wa.me/212781575905"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#19a957] px-4 py-3 text-xs font-black text-white transition hover:bg-[#128b47]"
              >
                Contacter sur WhatsApp
              </a>

            </div>
          )}

        </div>
      )}
    </>
  );
}