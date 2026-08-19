"use client";

import { useState } from "react";

type Message = {
  role: "bot" | "user";
  text: string;
};

const questions = [
  {
    question: "Quel est le problème principal de votre trottinette ?",
    options: [
      "Elle ne démarre plus",
      "Elle ne charge plus",
      "Elle avance mal / manque de puissance",
      "Elle freine mal",
      "J'ai un problème avec la roue ou le pneu",
      "L'écran / accélérateur ne fonctionne plus",
    ],
  },
  {
    question: "Votre trottinette s'allume-t-elle ?",
    options: [
      "Oui, elle s'allume",
      "Non, aucun signe",
      "Elle s'allume puis s'éteint",
      "Je ne sais pas",
    ],
  },
  {
    question: "Avez-vous un voyant ou un code erreur ?",
    options: [
      "Oui",
      "Non",
      "Je ne sais pas",
    ],
  },
  {
    question: "Le problème est-il apparu soudainement ?",
    options: [
      "Oui, soudainement",
      "Non, progressivement",
      "Après une chute ou un choc",
      "Après une réparation",
    ],
  },
];

export default function DiagnosticChat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Bonjour 👋 Je peux vous aider à identifier la pièce probablement nécessaire pour votre trottinette.",
    },
  ]);

  const [finished, setFinished] = useState(false);

  function chooseOption(option: string) {
    const newMessages: Message[] = [
      ...messages,
      {
        role: "user",
        text: option,
      },
    ];

    if (step < questions.length - 1) {
      setMessages(newMessages);
      setStep(step + 1);

      setTimeout(() => {
        setMessages((current) => [
          ...current,
          {
            role: "bot",
            text: questions[step + 1].question,
          },
        ]);
      }, 200);
    } else {
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: "Merci 👍 J'ai suffisamment d'informations pour vous orienter.",
        },
      ]);

      setFinished(true);
    }
  }

  function resetDiagnostic() {
    setStep(0);
    setFinished(false);
    setMessages([
      {
        role: "bot",
        text: "Bonjour 👋 Je peux vous aider à identifier la pièce probablement nécessaire pour votre trottinette.",
      },
    ]);
  }

  const currentQuestion = questions[step];

  return (
    <>
      {/* BOUTON FLOTTANT */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le diagnostic"
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-full bg-[#087dea] px-5 py-4 text-sm font-black text-white shadow-2xl transition hover:-translate-y-1 hover:bg-[#0069d9]"
      >
        <span className="grid size-9 place-items-center rounded-full bg-white/15 text-lg">
          🔧
        </span>

        <span className="hidden sm:block">
          Diagnostic
        </span>
      </button>

      {/* FENÊTRE */}
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-end bg-slate-950/30 p-4 backdrop-blur-[2px] sm:items-end sm:p-6">
          <div className="flex h-[min(700px,calc(100vh-32px))] w-full max-w-[430px] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_rgba(0,0,0,.25)]">
            
            {/* HEADER */}
            <div className="flex items-center justify-between bg-[#062d67] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-[#087dea] text-xl">
                  🔧
                </div>

                <div>
                  <p className="text-sm font-black">
                    Diagnostic Trottinette
                  </p>

                  <p className="text-[11px] text-blue-100">
                    Trouvez la pièce adaptée
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full bg-white/10 text-xl transition hover:bg-white/20"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
              <div className="space-y-3">
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
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "rounded-br-md bg-[#087dea] text-white"
                          : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUESTIONS */}
            <div className="border-t border-slate-100 bg-white p-4">
              {!finished ? (
                <>
                  <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">
                    Question {step + 1} / {questions.length}
                  </p>

                  <p className="mb-4 text-sm font-black text-slate-900">
                    {currentQuestion.question}
                  </p>

                  <div className="grid gap-2">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => chooseOption(option)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:border-[#087dea] hover:bg-blue-50 hover:text-[#062d67]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-2xl bg-blue-50 p-4">
                    <p className="text-sm font-black text-[#062d67]">
                      Diagnostic terminé ✅
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Pour identifier précisément la pièce, envoyez-nous
                      votre modèle de trottinette et, si possible, une photo
                      du problème sur WhatsApp.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center rounded-xl bg-[#19a957] px-4 py-3 text-sm font-black text-white transition hover:bg-[#128b47]"
                  >
                    Envoyer les informations sur WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={resetDiagnostic}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50"
                  >
                    Refaire le diagnostic
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}