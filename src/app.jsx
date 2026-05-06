/* App: route → view */
const { StoreProvider, useStore } = window;

const Views = () => {
  const { route } = useStore();
  switch (route.name) {
    case "products": return <window.ProductsView />;
    case "categories": return <window.CategoriesView />;
    case "product": return <window.ProductDetailView />;
    case "blog": return <window.BlogView />;
    case "reviews": return <window.ReviewsView />;
    case "faq": return <window.FAQView />;
    case "about": return <window.AboutView />;
    case "cart": return <window.CartView />;
    case "checkout": return <window.CheckoutView />;
    default: return <window.HomeView />;
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
  return (
    <window.StoreProvider>
      <window.Header />
      <main style={{ minHeight: "60vh" }}>
        <Views />
      </main>
      <window.Footer />
      <window.WhatsAppFAB />
      <window.Toast />
      <window.QuickView />
      <Tweaks />
    </window.StoreProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
