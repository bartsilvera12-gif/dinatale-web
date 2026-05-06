const Header = () => {
  const { route, setRoute, cartCount, menuOpen, setMenuOpen } = useStore();
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { id: "home", label: "Inicio" },
    { id: "products", label: "Productos" },
    { id: "categories", label: "Categorías" },
    { id: "reviews", label: "Reseñas" },
    { id: "about", label: "Quiénes somos" }
  ];

  const go = (id) => { setRoute(id); setMenuOpen(false); };

  const results = q.trim().length > 1
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];

  return (
    <React.Fragment>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(255, 249, 252, 0.92)" : "rgba(255, 249, 252, 0.7)",
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid " + (scrolled ? "var(--c-border-soft)" : "transparent"),
        transition: "background .3s ease, border-color .3s ease"
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 24, height: 76 }}>
          <button onClick={() => go("home")} aria-label="Inicio" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <img src="assets/logosinfondo.png" alt="DI Natale" style={{ height: 48, width: "auto", objectFit: "contain" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--c-mute)", textTransform: "uppercase", fontFamily: "var(--ff-body)", whiteSpace: "nowrap" }}>DI NATALE · BY LETIZIA</span>
          </button>

          <nav style={{ display: "none", alignItems: "center", gap: 4, marginLeft: "auto" }} className="dn-nav">
            {nav.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} style={{
                background: "none", border: "none", padding: "10px 14px", cursor: "pointer", fontSize: 13.5,
                color: route.name === n.id ? "var(--c-primary-deep)" : "var(--c-ink-2)",
                fontWeight: route.name === n.id ? 600 : 400, position: "relative"
              }}>
                {n.label}
                {route.name === n.id && <span style={{ position: "absolute", bottom: 4, left: 14, right: 14, height: 1.5, background: "var(--c-primary)", borderRadius: 2 }} />}
              </button>
            ))}
          </nav>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }} className="dn-actions">
            <button aria-label="Buscar" className="dn-iconbtn" onClick={() => setSearchOpen((s) => !s)} style={iconBtn}>
              <window.Icon name="search" size={18} />
            </button>
            <a className="dn-iconbtn" aria-label="WhatsApp" href={waLink("Hola DI NATALE, quiero consultar.")} target="_blank" rel="noreferrer" style={{ ...iconBtn, color: "#25D366" }}>
              <window.Icon name="wa" size={18} color="#25D366" />
            </a>
            <button aria-label="Carrito" onClick={() => go("cart")} style={{ ...iconBtn, position: "relative" }}>
              <window.Icon name="cart" size={18} />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: 2, right: 2, background: "var(--grad-brand)", color: "white", fontSize: 10, fontWeight: 600, minWidth: 18, height: 18, borderRadius: 999, padding: "0 5px", display: "grid", placeItems: "center" }}>{cartCount}</span>
              )}
            </button>
            <button aria-label="Menú" onClick={() => setMenuOpen(true)} className="dn-burger" style={{ ...iconBtn }}>
              <window.Icon name="menu" size={20} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div style={{ borderTop: "1px solid var(--c-border-soft)", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)" }}>
            <div className="container" style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <window.Icon name="search" size={18} color="var(--c-mute)" />
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar productos, categorías..." style={{ flex: 1, border: "none", outline: "none", fontSize: 18, fontFamily: "var(--ff-serif)", color: "var(--c-ink)", background: "transparent" }} />
                <button onClick={() => { setSearchOpen(false); setQ(""); }} style={iconBtn} aria-label="Cerrar"><window.Icon name="close" size={16} /></button>
              </div>
              {results.length > 0 && (
                <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
                  {results.map((p) => (
                    <button key={p.id} onClick={() => { setRoute("product", { id: p.id }); setSearchOpen(false); setQ(""); }}
                            style={{ display: "flex", alignItems: "center", gap: 14, padding: 10, background: "none", border: "1px solid transparent", borderRadius: 12, cursor: "pointer", textAlign: "left" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "var(--c-rose-50)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
                      <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", background: "var(--c-rose-50)", flexShrink: 0 }}>
                        <img src={p.images[0] || window.DN_IMG_FALLBACK} onError={window.imgFallback} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 14 }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: "var(--c-mute)" }}>{CATEGORIES.find((c) => c.id === p.category)?.name} · {fmtGs(p.price)}</div>
                      </div>
                      <window.Icon name="chevron-right" size={14} color="var(--c-mute)" />
                    </button>
                  ))}
                </div>
              )}
              {q.trim().length > 1 && results.length === 0 && (
                <p style={{ color: "var(--c-mute)", marginTop: 14, fontSize: 14 }}>Sin resultados para "{q}".</p>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 90 }} onClick={() => setMenuOpen(false)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(31,23,32,0.4)" }} />
          <aside style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "min(360px, 88vw)", background: "white", padding: "24px 24px 32px", display: "flex", flexDirection: "column", animation: "viewFade 240ms ease both" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <img src="assets/logo.jpeg" alt="DI Natale" style={{ height: 48, width: "auto", objectFit: "contain" }} />
              <button onClick={() => setMenuOpen(false)} style={iconBtn} aria-label="Cerrar"><window.Icon name="close" size={18} /></button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {nav.map((n) => (
                <button key={n.id} onClick={() => go(n.id)} style={{
                  background: route.name === n.id ? "var(--c-rose-50)" : "none",
                  border: "none", padding: "14px 16px", cursor: "pointer", fontSize: 16,
                  fontFamily: "var(--ff-serif)", textAlign: "left", borderRadius: 12,
                  color: route.name === n.id ? "var(--c-primary-deep)" : "var(--c-ink)"
                }}>{n.label}</button>
              ))}
            </nav>
            <a className="btn btn--wa" style={{ marginTop: "auto" }} href={waLink("Hola DI NATALE, quiero consultar.")} target="_blank" rel="noreferrer">
              <window.Icon name="wa" size={16} color="white" /> Escribir por WhatsApp
            </a>
          </aside>
        </div>
      )}

      <style>{`
        @media (min-width: 980px) {
          .dn-nav { display: flex !important; }
          .dn-burger { display: none !important; }
        }
      `}</style>
    </React.Fragment>
  );
};

const iconBtn = {
  width: 40, height: 40, borderRadius: 999, border: "1px solid transparent",
  background: "transparent", cursor: "pointer", display: "grid", placeItems: "center",
  color: "var(--c-ink-2)", transition: "background .2s ease, color .2s ease"
};

window.Header = Header;
