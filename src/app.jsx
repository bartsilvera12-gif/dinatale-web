/* App: route → view */
const { StoreProvider, useStore } = window;

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF1F8", padding: 32 }}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 560, width: "100%", boxShadow: "0 8px 40px rgba(200,38,138,0.12)" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <h2 style={{ fontFamily: "serif", fontSize: 22, margin: "0 0 12px", color: "#991B1B" }}>Error al cargar el panel</h2>
            <pre style={{ fontSize: 12, background: "#FEE2E2", padding: 16, borderRadius: 10, overflowX: "auto", color: "#7F1D1D", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{String(this.state.error)}</pre>
            <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: "10px 24px", borderRadius: 999, background: "#E84DA3", color: "white", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Recargar</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const Views = () => {
  const { route } = useStore();
  switch (route.name) {
    case "products":   return <window.ProductsView />;
    case "categories": return <window.CategoriesView />;
    case "product":    return <window.ProductDetailView />;
    case "blog":       return <window.BlogView />;
    case "reviews":    return <window.ReviewsView />;
    case "faq":        return <window.FAQView />;
    case "about":      return <window.AboutView />;
    case "cart":       return <window.CartView />;
    case "checkout":   return <window.CheckoutView />;
    case "admin":      return <window.AdminView />;
    default:           return <window.HomeView />;
  }
};

const Tweaks = () => {
  if (!window.TweaksPanel) return null;
  const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle } = window;
  const [t, setTweak] = useTweaks(window.__DN_TWEAKS);

  // Apply palette to CSS variables live
  React.useEffect(() => {
    const root = document.documentElement;
    const palettes = {
      rosa:    { p: "#E84DA3", pd: "#C8268A", s: "#C7A4F4", r100: "#FCE7F3", r50: "#FFF1F8", bg: "#FFF9FC", border: "#F5D5E8" },
      mauve:   { p: "#B85ECC", pd: "#8B3FA0", s: "#E0A4D4", r100: "#F4E4F5", r50: "#FBF1FB", bg: "#FCF8FC", border: "#ECD0EE" },
      coral:   { p: "#F26B7A", pd: "#D04959", s: "#F2A6B3", r100: "#FEE5E8", r50: "#FFF1F2", bg: "#FFFAFA", border: "#F8D7DC" },
      champagne:{ p: "#C19A6B", pd: "#9C7748", s: "#E1C9A6", r100: "#F4EAD8", r50: "#FAF4E8", bg: "#FCF9F2", border: "#E8DAC0" }
    };
    const c = palettes[t.palette] || palettes.rosa;
    root.style.setProperty("--c-primary", c.p);
    root.style.setProperty("--c-primary-deep", c.pd);
    root.style.setProperty("--c-secondary", c.s);
    root.style.setProperty("--c-rose-100", c.r100);
    root.style.setProperty("--c-rose-50", c.r50);
    root.style.setProperty("--c-bg", c.bg);
    root.style.setProperty("--c-border", c.border);
    root.style.setProperty("--grad-brand", `linear-gradient(120deg, ${c.p} 0%, ${c.pd} 60%, ${c.s} 100%)`);
    root.style.setProperty("--grad-brand-soft", `linear-gradient(120deg, ${c.p}cc 0%, ${c.s} 100%)`);
    root.style.setProperty("--grad-soft", `linear-gradient(135deg, ${c.r50} 0%, ${c.r100} 60%, ${c.r50} 100%)`);
  }, [t.palette]);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--ff-serif", t.displayFont === "Cormorant" ? '"Cormorant Garamond", Georgia, serif' : '"Fraunces", Georgia, serif');
  }, [t.displayFont]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Paleta">
        <TweakRadio label="Estilo" value={t.palette} onChange={(v) => setTweak("palette", v)} options={[
          { value: "rosa", label: "Rosa" },
          { value: "mauve", label: "Mauve" },
          { value: "coral", label: "Coral" },
          { value: "champagne", label: "Champán" }
        ]} />
      </TweakSection>
      <TweakSection title="Tipografía display">
        <TweakRadio label="Familia" value={t.displayFont} onChange={(v) => setTweak("displayFont", v)} options={[
          { value: "Fraunces", label: "Fraunces" },
          { value: "Cormorant", label: "Cormorant" }
        ]} />
      </TweakSection>
    </TweaksPanel>
  );
};

const App = () => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    window.__sbLoadDNData().finally(() => setReady(true));
  }, []);

  if (!ready) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--c-bg)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <span className="dn-mark"><span className="dn-mark__icon"/><span className="dn-mark__word">DI Natale</span></span>
        <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--c-mute)", textTransform: "uppercase", paddingLeft: 50 }}>by Letizia</span>
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <window.StoreProvider>
        <AppShell />
      </window.StoreProvider>
    </ErrorBoundary>
  );
};

const AppShell = () => {
  const { route } = useStore();
  const isAdmin = route.name === "admin";

  if (isAdmin) {
    return <Views />;
  }

  return (
    <React.Fragment>
      <window.Header />
      <main style={{ minHeight: "60vh" }}>
        <Views />
      </main>
      <window.Footer />
      <window.WhatsAppFAB />
      <window.Toast />
      <window.QuickView />
      <Tweaks />
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
