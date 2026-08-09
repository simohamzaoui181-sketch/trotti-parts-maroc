type IconName = string;

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };
  const paths: Record<string, React.ReactNode> = {
    scooter: <><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M6 18h9l-2-8h3l2 8M12 5h3M9 18l4-13" /></>,
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>, bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>, menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M8.8 8.5c.3-.7.6-.7.9-.7h.4c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4 0 .6l-.5.6c-.1.2-.1.3 0 .5.4.7 1.2 1.5 2.2 1.9.2.1.4.1.5-.1l.6-.7c.1-.2.3-.2.5-.1l1.8.8c.2.1.3.2.3.4 0 .6-.3 1.2-.8 1.4-.5.2-1.4.2-2.8-.4-1.2-.5-2.4-1.5-3.3-2.6-.7-.8-1.3-1.9-1.3-2.8 0-.7.3-1.3.5-1.5Z" /></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />, check: <path d="m5 12 4 4L19 6" />, pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    wheel: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" /><path d="M12 4v6m0 4v6m8-8h-6M10 12H4" /></>, tube: <><circle cx="12" cy="12" r="7" /><path d="M12 5a7 7 0 0 1 6 3M7 17l-2 2" /></>, brake: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /><path d="m17 6 3-2M4 15l3 1" /></>, chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 3v3m6-3v3m-6 12v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3" /></>, bolt: <path d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z" />, screen: <><rect x="4" y="5" width="16" height="13" rx="2" /><path d="M8 21h8M12 18v3" /></>, handle: <><path d="M7 5h10M9 5v7a4 4 0 0 0 4 4h2" /><path d="M17 5v4M14 16h4" /></>, tool: <path d="m14 6 4-4 2 2-4 4m-2 2-8 8-3-3 8-8m4-4 3 3" />,
    plus: <path d="M12 5v14M5 12h14" />, truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>, tag: <><path d="M20 13 13 20 4 11V4h7l9 9Z" /><circle cx="8.5" cy="8.5" r="1" /></>, box: <><path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z" /><path d="m3 7 9 5 9-5M12 12v9" /></>, tools: <><path d="M14 6a5 5 0 0 0-6 6l-5 5 3 3 5-5a5 5 0 0 0 6-6l-3 3-3-3 3-3Z" /><path d="m16 14 5 5-2 2-5-5" /></>,
  };
  return <svg {...common}>{paths[name] ?? paths.tool}</svg>;
}
