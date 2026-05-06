/* Inline SVG icon set — light, line, 1.6 stroke */
const Icon = ({ name, size = 18, color = "currentColor", style, className }) => {
  const s = size;
  const sw = 1.6;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", style, className };
  switch (name) {
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "cart":
      return <svg {...common}><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>;
    case "heart":
      return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case "menu":
      return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case "close":
      return <svg {...common}><path d="M5 5l14 14M19 5L5 19"/></svg>;
    case "chevron-down":
      return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    case "chevron-right":
      return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
    case "chevron-left":
      return <svg {...common}><path d="m15 6-6 6 6 6"/></svg>;
    case "plus": return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus": return <svg {...common}><path d="M5 12h14"/></svg>;
    case "trash":
      return <svg {...common}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/></svg>;
    case "wa":
      return <svg viewBox="0 0 24 24" width={s} height={s} fill={color} style={style} className={className}><path d="M19.05 4.91A10 10 0 0 0 4.43 18.6L3 22l3.5-1.4A10 10 0 1 0 19.05 4.91Zm-7.07 15.4a8.3 8.3 0 0 1-4.2-1.15l-.3-.18-2.07.83.84-2.02-.2-.31a8.3 8.3 0 1 1 5.93 2.83Zm4.78-6.2c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.58.13-.17.26-.66.86-.81 1.04-.15.18-.3.2-.55.07-.26-.13-1.1-.4-2.1-1.3-.78-.7-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.18.04-.33-.02-.46-.07-.13-.58-1.4-.79-1.92-.21-.5-.42-.43-.58-.44h-.5c-.17 0-.45.06-.69.33-.24.26-.91.89-.91 2.17 0 1.28.93 2.51 1.06 2.69.13.18 1.83 2.79 4.43 3.91.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.5-.07 1.55-.63 1.77-1.24.22-.6.22-1.13.15-1.24-.06-.11-.24-.18-.5-.31Z"/></svg>;
    case "ig":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill={color}/></svg>;
    case "fb":
      return <svg {...common}><path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v8h3v-8h2.2l.3-3H14v-1.5c0-.5.3-1 1-1Z"/></svg>;
    case "tt":
      return <svg {...common}><path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 4c0 2 1.6 4 4 4"/></svg>;
    case "phone":
      return <svg {...common}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case "pin":
      return <svg {...common}><path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "filter":
      return <svg {...common}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case "sparkle":
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case "leaf":
      return <svg {...common}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z"/><path d="M5 19c4-4 7-7 14-14"/></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 5 5L20 7"/></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "truck":
      return <svg {...common}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
    case "gift":
      return <svg {...common}><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M8 8a3 3 0 1 1 4-2 3 3 0 1 1 4 2"/></svg>;
    case "star":
      return <svg viewBox="0 0 24 24" width={s} height={s} fill={color} stroke="none"><path d="m12 3 2.7 5.5 6 .9-4.4 4.3 1 6L12 17l-5.4 2.8 1-6L3.3 9.4l6-.9L12 3Z"/></svg>;
    case "quote":
      return <svg viewBox="0 0 24 24" width={s} height={s} fill={color} stroke="none"><path d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-2-6-6V7Zm10 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-2-6-6V7Z"/></svg>;
    default:
      return null;
  }
};

window.Icon = Icon;
