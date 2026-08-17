"use client";

import { useMemo, useState } from "react";
import { contact } from "../data/store";

type Answer = {
  id: string;
  label: string;
  emoji?: string;
  next?: string;
  score?: Record<string, number>;
};

type Question = {
  id: string;
  title: string;
  description?: string;
  answers: Answer[];
};

type Result = {
  title: string;
  subtitle: string;
  category: string;
  severity: "low" | "medium" | "high";
  checks: string[];
  advice: string;
  productHref: string;
};

const questions: Question[] = [
  {
    id: "problem",
    title: "Quel problème rencontrez-vous ?",
    description:
      "Sélectionnez le problème principal de votre trottinette.",
    answers: [
      {
        id: "start",
        emoji: "⚡",
        label: "La trottinette ne démarre pas",
        next: "screen",
      },
      {
        id: "charge",
        emoji: "🔋",
        label: "Elle ne charge pas",
        next: "charger",
      },
      {
        id: "range",
        emoji: "🏃",
        label: "L'autonomie a diminué",
        next: "rangeAge",
      },
      {
        id: "brake",
        emoji: "🛑",
        label: "Problème de frein",
        next: "brakeType",
      },
      {
        id: "wheel",
        emoji: "🛞",
        label: "Problème de pneu / roue",
        next: "wheelType",
      },
      {
        id: "accelerator",
        emoji: "🎮",
        label: "Problème d'accélérateur",
        next: "accelerationType",
      },
      {
        id: "display",
        emoji: "📱",
        label: "Problème d'écran",
        next: "displayType",
      },
      {
        id: "noise",
        emoji: "🔊",
        label: "Bruit ou vibration anormale",
        next: "noiseType",
      },
    ],
  },

  /* =========================
     DÉMARRAGE
  ========================= */

  {
    id: "screen",
    title: "Est-ce que l'écran s'allume ?",
    description:
      "Appuyez sur le bouton Power et observez l'écran.",
    answers: [
      {
        id: "screen_yes",
        emoji: "💡",
        label: "Oui, l'écran s'allume",
        next: "error",
      },
      {
        id: "screen_no",
        emoji: "⚫",
        label: "Non, l'écran reste éteint",
        next: "batteryIndicator",
      },
    ],
  },

  {
    id: "error",
    title: "Un code erreur apparaît-il sur l'écran ?",
    description:
      "Exemple : E1, E2, E3, E4, Error, etc.",
    answers: [
      {
        id: "error_yes",
        emoji: "⚠️",
        label: "Oui, un code erreur apparaît",
        next: "errorCode",
      },
      {
        id: "error_no",
        emoji: "✅",
        label: "Non, aucun code erreur",
        next: "acceleratorStart",
      },
    ],
  },

  {
    id: "errorCode",
    title: "Quel type de code voyez-vous ?",
    description:
      "Si vous connaissez le code exact, vous pourrez nous l'envoyer sur WhatsApp.",
    answers: [
      {
        id: "error_motor",
        emoji: "⚙️",
        label: "Erreur moteur / Hall",
        score: { controller: 2, motor: 2 },
        next: "motorSound",
      },
      {
        id: "error_battery",
        emoji: "🔋",
        label: "Erreur batterie / tension",
        score: { battery: 3 },
        next: "batteryIndicator",
      },
      {
        id: "error_other",
        emoji: "❓",
        label: "Autre / je ne sais pas",
        score: { controller: 1, display: 1 },
        next: "acceleratorStart",
      },
    ],
  },

  {
    id: "acceleratorStart",
    title: "L'accélérateur répond-il ?",
    description:
      "Avec la trottinette allumée, essayez doucement l'accélérateur.",
    answers: [
      {
        id: "accel_yes",
        emoji: "🟢",
        label: "Oui, le moteur répond",
        score: { controller: 1, motor: 1 },
        next: "motorSound",
      },
      {
        id: "accel_no",
        emoji: "🔴",
        label: "Non, rien ne se passe",
        score: { accelerator: 2, controller: 2 },
        next: "brakeCutoff",
      },
    ],
  },

  {
    id: "batteryIndicator",
    title: "Avez-vous une indication de batterie ?",
    description:
      "Regardez si une LED, un écran ou un indicateur s'allume.",
    answers: [
      {
        id: "battery_yes",
        emoji: "🔋",
        label: "Oui, il y a une indication",
        score: { battery: 1, controller: 1 },
        next: "charger",
      },
      {
        id: "battery_no",
        emoji: "⚫",
        label: "Non, aucune indication",
        score: { battery: 3, controller: 2, display: 1 },
        next: "charger",
      },
    ],
  },

  {
    id: "motorSound",
    title: "Entendez-vous un bruit du moteur ?",
    description:
      "Essayez doucement l'accélérateur et écoutez le moteur.",
    answers: [
      {
        id: "motor_noise_yes",
        emoji: "🔊",
        label: "Oui, le moteur fait un bruit mais n'avance pas",
        score: { motor: 3, controller: 2 },
        next: "brakeCutoff",
      },
      {
        id: "motor_noise_no",
        emoji: "🔇",
        label: "Non, aucun bruit",
        score: { controller: 2, motor: 1 },
        next: "brakeCutoff",
      },
    ],
  },

  {
    id: "brakeCutoff",
    title: "Le problème apparaît-il lorsque vous touchez au frein ?",
    answers: [
      {
        id: "brake_yes",
        emoji: "🛑",
        label: "Oui",
        score: { brake: 2, controller: 1 },
        next: "generalConnection",
      },
      {
        id: "brake_no",
        emoji: "➡️",
        label: "Non",
        next: "generalConnection",
      },
    ],
  },

  /* =========================
     CHARGE
  ========================= */

  {
    id: "charger",
    title: "Que se passe-t-il lorsque vous branchez le chargeur ?",
    answers: [
      {
        id: "charger_green",
        emoji: "🟢",
        label: "Le chargeur reste vert",
        score: { charger: 3, battery: 2 },
        next: "chargerPort",
      },
      {
        id: "charger_red",
        emoji: "🔴",
        label: "Il passe au rouge normalement",
        score: { charger: 1, battery: 1 },
        next: "chargingTime",
      },
      {
        id: "charger_nothing",
        emoji: "⚫",
        label: "Aucune lumière / rien ne se passe",
        score: { charger: 3, battery: 2, controller: 1 },
        next: "chargerPort",
      },
    ],
  },

  {
    id: "chargerPort",
    title: "Le connecteur de charge semble-t-il endommagé ?",
    answers: [
      {
        id: "port_bad",
        emoji: "🔌",
        label: "Oui, il est desserré ou endommagé",
        score: { charger: 2, battery: 2 },
        next: "generalConnection",
      },
      {
        id: "port_good",
        emoji: "✅",
        label: "Non, il semble normal",
        score: { charger: 1, battery: 1 },
        next: "generalConnection",
      },
    ],
  },

  {
    id: "chargingTime",
    title: "La batterie atteint-elle normalement 100% ?",
    answers: [
      {
        id: "charge_full",
        emoji: "🔋",
        label: "Oui",
        score: { charger: 1 },
        next: "chargingHeat",
      },
      {
        id: "charge_not_full",
        emoji: "⚠️",
        label: "Non, elle reste bloquée avant 100%",
        score: { battery: 3, charger: 2 },
        next: "chargingHeat",
      },
    ],
  },

  {
    id: "chargingHeat",
    title: "Le chargeur chauffe-t-il anormalement ?",
    answers: [
      {
        id: "heat_yes",
        emoji: "🌡️",
        label: "Oui, beaucoup",
        score: { charger: 3 },
        next: "generalConnection",
      },
      {
        id: "heat_no",
        emoji: "👌",
        label: "Non, température normale",
        score: { charger: 1 },
        next: "generalConnection",
      },
    ],
  },

  /* =========================
     AUTONOMIE
  ========================= */

  {
    id: "rangeAge",
    title: "Depuis combien de temps avez-vous cette batterie ?",
    answers: [
      {
        id: "battery_new",
        emoji: "🆕",
        label: "Moins de 1 an",
        score: { battery: 1 },
        next: "rangeChange",
      },
      {
        id: "battery_old",
        emoji: "📆",
        label: "Plus de 2 ans",
        score: { battery: 3 },
        next: "rangeChange",
      },
      {
        id: "battery_unknown",
        emoji: "❓",
        label: "Je ne sais pas",
        score: { battery: 1 },
        next: "rangeChange",
      },
    ],
  },

  {
    id: "rangeChange",
    title: "La diminution d'autonomie est-elle importante ?",
    answers: [
      {
        id: "range_small",
        emoji: "🟡",
        label: "Un peu",
        score: { battery: 1, tire: 1 },
        next: "tirePressure",
      },
      {
        id: "range_big",
        emoji: "🔴",
        label: "Oui, fortement",
        score: { battery: 3 },
        next: "tirePressure",
      },
    ],
  },

  {
    id: "tirePressure",
    title: "Vos pneus sont-ils correctement gonflés ?",
    answers: [
      {
        id: "pressure_yes",
        emoji: "✅",
        label: "Oui",
        score: { battery: 1 },
        next: "generalConnection",
      },
      {
        id: "pressure_no",
        emoji: "🛞",
        label: "Non / je ne sais pas",
        score: { tire: 3, battery: 1 },
        next: "generalConnection",
      },
    ],
  },

  /* =========================
     FREINS
  ========================= */

  {
    id: "brakeType",
    title: "Quel est le problème avec le frein ?",
    answers: [
      {
        id: "brake_weak",
        emoji: "🛑",
        label: "Le freinage est faible",
        score: { brake: 3 },
        next: "brakeNoise",
      },
      {
        id: "brake_noise",
        emoji: "🔊",
        label: "Le frein fait du bruit",
        score: { brake: 3 },
        next: "brakeNoise",
      },
      {
        id: "brake_locked",
        emoji: "🔒",
        label: "La roue reste bloquée",
        score: { brake: 3, motor: 1 },
        next: "brakeNoise",
      },
      {
        id: "brake_none",
        emoji: "❌",
        label: "Le frein ne fonctionne presque plus",
        score: { brake: 4 },
        next: "brakeNoise",
      },
    ],
  },

  {
    id: "brakeNoise",
    title: "Le disque ou les plaquettes semblent-ils usés ?",
    answers: [
      {
        id: "brake_worn",
        emoji: "🔧",
        label: "Oui / probablement",
        score: { brake: 3 },
        next: "generalConnection",
      },
      {
        id: "brake_ok",
        emoji: "✅",
        label: "Non / je ne sais pas",
        score: { brake: 1 },
        next: "generalConnection",
      },
    ],
  },

  /* =========================
     ROUE / PNEU
  ========================= */

  {
    id: "wheelType",
    title: "Quel est le problème avec la roue ?",
    answers: [
      {
        id: "puncture",
        emoji: "🛞",
        label: "Pneu crevé",
        score: { tire: 4 },
        next: "wheelDimension",
      },
      {
        id: "worn",
        emoji: "⚠️",
        label: "Pneu usé",
        score: { tire: 4 },
        next: "wheelDimension",
      },
      {
        id: "vibration",
        emoji: "〰️",
        label: "Vibration / roue voilée",
        score: { tire: 2, motor: 1 },
        next: "wheelDimension",
      },
      {
        id: "noise",
        emoji: "🔊",
        label: "Bruit au niveau de la roue",
        score: { tire: 2, motor: 2 },
        next: "wheelDimension",
      },
    ],
  },

  {
    id: "wheelDimension",
    title: "Connaissez-vous la dimension du pneu ?",
    description:
      "Elle est généralement écrite sur le flanc du pneu : 10×2.5, 80/65-6, etc.",
    answers: [
      {
        id: "dimension_yes",
        emoji: "📏",
        label: "Oui",
        score: { tire: 1 },
        next: "generalConnection",
      },
      {
        id: "dimension_no",
        emoji: "❓",
        label: "Non",
        score: { tire: 1 },
        next: "generalConnection",
      },
    ],
  },

  /* =========================
     ACCÉLÉRATEUR
  ========================= */

  {
    id: "accelerationType",
    title: "Quel problème avez-vous avec l'accélérateur ?",
    answers: [
      {
        id: "accel_dead",
        emoji: "❌",
        label: "Il ne répond plus",
        score: { accelerator: 4, controller: 2 },
        next: "accelerationDisplay",
      },
      {
        id: "accel_jump",
        emoji: "⚡",
        label: "L'accélération est irrégulière",
        score: { accelerator: 3, controller: 2 },
        next: "accelerationDisplay",
      },
      {
        id: "accel_delay",
        emoji: "⏱️",
        label: "Il y a un retard",
        score: { accelerator: 2, controller: 2 },
        next: "accelerationDisplay",
      },
    ],
  },

  {
    id: "accelerationDisplay",
    title: "L'écran affiche-t-il une erreur ?",
    answers: [
      {
        id: "accel_error",
        emoji: "⚠️",
        label: "Oui",
        score: { accelerator: 2, controller: 2 },
        next: "generalConnection",
      },
      {
        id: "accel_no_error",
        emoji: "✅",
        label: "Non",
        score: { accelerator: 3 },
        next: "generalConnection",
      },
    ],
  },

  /* =========================
     ÉCRAN
  ========================= */

  {
    id: "displayType",
    title: "Quel est le problème de l'écran ?",
    answers: [
      {
        id: "display_off",
        emoji: "⚫",
        label: "L'écran reste éteint",
        score: { display: 4, battery: 2, controller: 1 },
        next: "generalConnection",
      },
      {
        id: "display_error",
        emoji: "⚠️",
        label: "Code erreur",
        score: { display: 2, controller: 3 },
        next: "generalConnection",
      },
      {
        id: "display_flicker",
        emoji: "💡",
        label: "L'écran clignote",
        score: { display: 3, controller: 2 },
        next: "generalConnection",
      },
      {
        id: "display_damage",
        emoji: "📱",
        label: "Écran cassé / fissuré",
        score: { display: 4 },
        next: "generalConnection",
      },
    ],
  },

  /* =========================
     BRUIT
  ========================= */

  {
    id: "noiseType",
    title: "D'où semble venir le bruit ?",
    answers: [
      {
        id: "noise_wheel",
        emoji: "🛞",
        label: "Roue / pneu",
        score: { tire: 3 },
        next: "noiseSpeed",
      },
      {
        id: "noise_motor",
        emoji: "⚙️",
        label: "Moteur",
        score: { motor: 4 },
        next: "noiseSpeed",
      },
      {
        id: "noise_brake",
        emoji: "🛑",
        label: "Frein",
        score: { brake: 4 },
        next: "noiseSpeed",
      },
      {
        id: "noise_unknown",
        emoji: "❓",
        label: "Je ne sais pas",
        score: { motor: 1, tire: 1, brake: 1 },
        next: "noiseSpeed",
      },
    ],
  },

  {
    id: "noiseSpeed",
    title: "Le bruit augmente-t-il avec la vitesse ?",
    answers: [
      {
        id: "noise_speed_yes",
        emoji: "📈",
        label: "Oui",
        score: { motor: 1, tire: 2 },
        next: "generalConnection",
      },
      {
        id: "noise_speed_no",
        emoji: "➡️",
        label: "Non",
        score: { brake: 1, motor: 1 },
        next: "generalConnection",
      },
    ],
  },

  /* =========================
     FINAL
  ========================= */

  {
    id: "generalConnection",
    title: "Dernière vérification",
    description:
      "Avez-vous récemment démonté, réparé ou modifié votre trottinette ?",
    answers: [
      {
        id: "recent_repair",
        emoji: "🔧",
        label: "Oui, récemment",
        score: { controller: 1, motor: 1 },
        next: "final",
      },
      {
        id: "no_repair",
        emoji: "👌",
        label: "Non",
        next: "final",
      },
    ],
  },

  {
    id: "final",
    title: "Diagnostic terminé",
    answers: [],
  },
];

const resultData: Record<string, Result> = {
  battery: {
    title: "Batterie / alimentation",
    subtitle:
      "Vos réponses indiquent principalement un problème possible au niveau de la batterie ou de son alimentation.",
    category: "Batterie",
    severity: "high",
    checks: [
      "État et tension de la batterie",
      "Connecteurs et câblage",
      "Port de charge",
      "Chargeur compatible",
    ],
    advice:
      "Ne démontez pas une batterie lithium vous-même si vous n'avez pas les connaissances nécessaires. Faites vérifier la tension et les connexions par un professionnel.",
    productHref: "#produits",
  },

  charger: {
    title: "Chargeur / système de charge",
    subtitle:
      "Le comportement observé peut correspondre à un problème de chargeur, de connecteur ou de circuit de charge.",
    category: "Chargeurs",
    severity: "medium",
    checks: [
      "Chargeur",
      "Connecteur de charge",
      "Câble de charge",
      "Circuit de charge",
    ],
    advice:
      "Vérifiez d'abord que le chargeur correspond bien à la tension de votre trottinette. Évitez d'utiliser un chargeur incompatible.",
    productHref: "#produits",
  },

  controller: {
    title: "Contrôleur",
    subtitle:
      "Plusieurs réponses orientent vers un problème possible du contrôleur ou de ses connexions.",
    category: "Contrôleurs",
    severity: "high",
    checks: [
      "Contrôleur",
      "Connecteurs",
      "Câblage moteur",
      "Câblage batterie",
    ],
    advice:
      "Un diagnostic visuel des connecteurs et du contrôleur est recommandé avant de remplacer une pièce.",
    productHref: "#produits",
  },

  motor: {
    title: "Moteur / câblage moteur",
    subtitle:
      "Les symptômes semblent davantage liés au moteur ou à sa connexion avec le contrôleur.",
    category: "Moteurs / pièces électriques",
    severity: "high",
    checks: [
      "Connecteurs moteur",
      "Câbles moteur",
      "Capteurs Hall",
      "Moteur",
    ],
    advice:
      "Évitez de continuer à rouler si le moteur chauffe fortement, bloque ou produit un bruit mécanique important.",
    productHref: "#produits",
  },

  brake: {
    title: "Système de freinage",
    subtitle:
      "Les réponses indiquent principalement un problème possible au niveau du freinage.",
    category: "Freins",
    severity: "high",
    checks: [
      "Plaquettes",
      "Disque",
      "Étrier",
      "Câble / commande de frein",
    ],
    advice:
      "Si le freinage est faible ou absent, évitez de rouler avant d'avoir vérifié le système de freinage.",
    productHref: "#produits",
  },

  tire: {
    title: "Pneu / roue",
    subtitle:
      "Le problème semble principalement lié au pneu, à la roue ou à son état.",
    category: "Pneus",
    severity: "medium",
    checks: [
      "Dimension du pneu",
      "Pression",
      "État du pneu",
      "Roue et roulements",
    ],
    advice:
      "Vérifiez la dimension inscrite sur le flanc du pneu avant de commander une pièce.",
    productHref: "#produits",
  },

  accelerator: {
    title: "Accélérateur",
    subtitle:
      "Les symptômes orientent vers l'accélérateur, son câble ou sa connexion au contrôleur.",
    category: "Accélérateurs",
    severity: "medium",
    checks: [
      "Gâchette d'accélérateur",
      "Connecteur",
      "Câble",
      "Contrôleur",
    ],
    advice:
      "Vérifiez que la gâchette revient correctement à sa position initiale et que son câble n'est pas endommagé.",
    productHref: "#produits",
  },

  display: {
    title: "Écran / tableau de bord",
    subtitle:
      "Le problème semble principalement concerner l'écran ou sa connexion.",
    category: "Écrans",
    severity: "medium",
    checks: [
      "Écran",
      "Connecteur écran",
      "Câblage",
      "Alimentation",
    ],
    advice:
      "Un connecteur mal branché peut provoquer un écran noir, des coupures ou des erreurs.",
    productHref: "#produits",
  },
};

function getResult(scores: Record<string, number>): Result {
  const entries = Object.entries(scores);

  if (entries.length === 0) {
    return {
      title: "Diagnostic à confirmer",
      subtitle:
        "Nous avons besoin d'informations supplémentaires pour identifier précisément la pièce responsable.",
      category: "Diagnostic",
      severity: "medium",
      checks: [
        "Batterie",
        "Contrôleur",
        "Câblage",
        "Pièce concernée",
      ],
      advice:
        "Envoyez votre diagnostic à notre équipe WhatsApp avec les réponses données pour obtenir une vérification plus précise.",
      productHref: "#produits",
    };
  }

  entries.sort((a, b) => b[1] - a[1]);

  const winner = entries[0][0];

  return resultData[winner] ?? resultData.controller;
}

export function DiagnosticRapide() {
  const [currentId, setCurrentId] = useState("problem");
  const [history, setHistory] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >([]);
  const [result, setResult] = useState<Result | null>(null);

  const currentQuestion = questions.find(
    (question) => question.id === currentId
  );

  const progress = useMemo(() => {
    const completed = answers.length;
    const estimated = Math.min(
      100,
      Math.round((completed / 7) * 100)
    );

    return Math.max(8, estimated);
  }, [answers.length]);

  function selectAnswer(answer: Answer) {
    if (!currentQuestion) return;

    const newScores = { ...scores };

    if (answer.score) {
      Object.entries(answer.score).forEach(([key, value]) => {
        newScores[key] = (newScores[key] ?? 0) + value;
      });
    }

    const newAnswers = [
      ...answers,
      {
        question: currentQuestion.title,
        answer: answer.label,
      },
    ];

    setScores(newScores);
    setAnswers(newAnswers);

    if (answer.next === "final") {
      setResult(getResult(newScores));
      setCurrentId("final");
      return;
    }

    if (answer.next) {
      setHistory([...history, currentId]);
      setCurrentId(answer.next);
    }
  }

  function goBack() {
    if (history.length === 0) return;

    const previous = history[history.length - 1];

    setHistory(history.slice(0, -1));
    setCurrentId(previous);

    setAnswers(answers.slice(0, -1));
  }

  function reset() {
    setCurrentId("problem");
    setHistory([]);
    setScores({});
    setAnswers([]);
    setResult(null);
  }

  function sendWhatsApp() {
    if (!result) return;

    const diagnosticText = answers
      .map(
        (item, index) =>
          `${index + 1}. ${item.question}\n→ ${item.answer}`
      )
      .join("\n\n");

    const message = `Bonjour TROTTI PARTS MAROC 👋

Je viens de faire le diagnostic rapide de ma trottinette.

🔴 DIAGNOSTIC PROBABLE
${result.title}

📦 CATÉGORIE
${result.category}

📝 MES RÉPONSES

${diagnosticText}

🔧 PIÈCES À VÉRIFIER
${result.checks.map((item) => `• ${item}`).join("\n")}

Je voudrais avoir votre avis et savoir quelle pièce je dois vérifier ou commander.

Merci.`;

    const link = `https://wa.me/${
      contact.whatsapp
    }?text=${encodeURIComponent(message)}`;

    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (result) {
    return (
      <section
        id="diagnostic"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-[0_20px_70px_rgba(7,89,133,0.10)]">
          <div className="bg-[#075985] px-6 py-10 text-white sm:px-10 lg:px-14">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-200">
                  Diagnostic terminé
                </p>

                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  Voici notre première analyse
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100/80">
                  Ce résultat est une orientation et non un diagnostic
                  professionnel définitif.
                </p>
              </div>

              <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-3xl">
                🔧
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:p-14">
            <div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-700">
                  Problème probable
                </p>

                <h3 className="mt-2 text-2xl font-black text-slate-900">
                  {result.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {result.subtitle}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-sm font-black text-slate-900">
                  🔍 Pièces / éléments à vérifier
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {result.checks.map((check) => (
                    <div
                      key={check}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700"
                    >
                      ✓ {check}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50 p-5">
                <p className="text-sm font-black text-[#075985]">
                  💡 Notre conseil
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {result.advice}
                </p>
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Besoin d'aide ?
                </p>

                <h3 className="mt-2 text-xl font-black text-slate-900">
                  Envoyez votre diagnostic
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Toutes vos réponses seront envoyées directement sur
                  WhatsApp pour que nous puissions mieux comprendre le
                  problème.
                </p>

                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#19a957] px-5 py-4 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#128b47]"
                >
                  <span className="text-lg">💬</span>
                  Envoyer mon diagnostic sur WhatsApp
                </button>

                <a
                  href={result.productHref}
                  className="mt-3 block w-full rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  Voir les pièces disponibles
                </a>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 w-full rounded-xl px-5 py-3 text-xs font-black text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                >
                  ↻ Refaire le diagnostic
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-[10px] font-bold leading-5 text-slate-400">
                  ⚠️ Pour votre sécurité, ne continuez pas à utiliser la
                  trottinette si le problème concerne le freinage, la batterie
                  ou une surchauffe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentQuestion) return null;

  return (
    <section
      id="diagnostic"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-[0_20px_70px_rgba(7,89,133,0.10)]">
        {/* HEADER */}
        <div className="bg-[#075985] px-6 py-9 text-white sm:px-10 lg:px-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-sky-100">
                <span className="size-2 rounded-full bg-[#35d878]" />
                Diagnostic intelligent
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Trouvez la pièce à vérifier.
              </h2>

              <p className="mt-4 text-sm leading-6 text-sky-100/80 sm:text-base">
                Répondez à quelques questions. Notre système analyse vos
                réponses avant de vous proposer une orientation.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-white/10 p-5 text-center">
              <div className="text-3xl">🔧</div>

              <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-sky-200">
                Étape
              </p>

              <p className="text-2xl font-black">
                {answers.length + 1}
              </p>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-[10px] font-bold text-sky-200">
              <span>Progression</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#35d878] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* QUESTION */}
        <div className="p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-4xl">
            {history.length > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="mb-6 inline-flex items-center gap-2 text-xs font-black text-slate-400 transition hover:text-[#075985]"
              >
                ← Question précédente
              </button>
            )}

            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#087bb6]">
              Question {answers.length + 1}
            </p>

            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {currentQuestion.title}
            </h3>

            {currentQuestion.description && (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                {currentQuestion.description}
              </p>
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {currentQuestion.answers.map((answer) => (
                <button
                  key={answer.id}
                  type="button"
                  onClick={() => selectAnswer(answer)}
                  className="group flex min-h-[76px] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-50 text-xl transition group-hover:bg-white">
                    {answer.emoji ?? "→"}
                  </span>

                  <span className="flex-1">
                    <span className="block text-sm font-black text-slate-800">
                      {answer.label}
                    </span>

                    <span className="mt-1 block text-[10px] font-bold text-slate-400">
                      Cliquez pour continuer
                    </span>
                  </span>

                  <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#075985]">
                    →
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-center text-[10px] font-bold leading-5 text-slate-400">
                🔒 Aucun compte nécessaire. Le diagnostic est gratuit et vos
                réponses restent sur votre appareil jusqu'à l'envoi WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}