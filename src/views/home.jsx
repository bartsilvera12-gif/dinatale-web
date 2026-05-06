const HomeView = () => {
  const { setRoute, setQuickView } = useStore();
  const perPage = 4;
  const [featPage, setFeatPage] = React.useState(0);
  const [featDir, setFeatDir] = React.useState(1);
  const [featHovered, setFeatHovered] = React.useState(false);
  const [featClickPaused, setFeatClickPaused] = React.useState(false);
  const featResumeTimer = React.useRef(null);
  const featProds = PRODUCTS.filter((p) => p.is_featured).length > 0
    ? PRODUCTS.filter((p) => p.is_featured)
    : PRODUCTS;
  const featPages = Math.ceil(featProds.length / perPage);

  React.useEffect(() => {
    if (featPages <= 1 || featHovered || featClickPaused) return;
    const t = setInterval(() => {
      setFeatDir(1);
      setFeatPage((p) => (p + 1) % featPages);
    }, 4500);
    return () => clearInterval(t);
  }, [featPages, featHovered, featClickPaused]);

  const goFeat = (next) => {
    setFeatDir(next >= featPage ? 1 : -1);
    setFeatPage(next);
    setFeatClickPaused(true);
    if (featResumeTimer.current) clearTimeout(featResumeTimer.current);
    featResumeTimer.current = setTimeout(() => setFeatClickPaused(false), 30000);
  };
  const featSlice = featProds.slice(featPage * perPage, featPage * perPage + perPage);

  return (
    <div className="view-fade">
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", paddingBottom: 80 }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--grad-hero)", zIndex: -1 }} />
        <window.FloralAccent style={{ top: 60, left: -40, transform: "rotate(-25deg)" }} size={220} color="#E84DA3" />
        <window.FloralAccent style={{ top: 120, right: 8, transform: "rotate(15deg)" }} size={180} color="#C7A4F4" />
        <window.FloralAccent style={{ bottom: 40, left: "30%" }} size={140} color="#E84DA3" />

        <div className="container dn-hero" style={{ paddingTop: 60, paddingBottom: 40, display: "grid", gap: 60, alignItems: "center", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>Curado en Asunción · Asesoría profesional</div>
            <h1 className="h-display" style={{ fontSize: "clamp(40px, 6.6vw, 78px)", fontWeight: 400, margin: "0 0 20px" }}>
              Belleza, estética y bienestar en una <em>experiencia premium.</em>
            </h1>
            <p style={{ color: "var(--c-mute)", fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 540 }}>
              Productos seleccionados para realzar tu cuidado personal con confianza, elegancia y asesoramiento profesional. Una marca pensada para acompañarte.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn--primary btn--lg" onClick={() => setRoute("products")}>
                Ver productos
                <window.Icon name="chevron-right" size={16} color="white" />
              </button>
              <a className="btn btn--ghost btn--lg" href={waLink("Hola, quiero solicitar asesoría personalizada.")} target="_blank" rel="noreferrer">
                <window.Icon name="sparkle" size={16} />
                Solicitar consulta
              </a>
            </div>

            <div style={{ marginTop: 48, display: "grid", gap: 14, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
              {[
                { i: "sparkle", t: "Asesoría personalizada", s: "Te acompañamos a elegir." },
                { i: "leaf", t: "Productos seleccionados", s: "Curaduría con criterio." },
                { i: "shield", t: "Cuidado premium", s: "Embalaje delicado y seguro." }
              ].map((x) => (
                <div key={x.t} style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid var(--c-border-soft)", borderRadius: 16, padding: "14px 16px" }}>
                  <window.Icon name={x.i} size={18} color="var(--c-primary)" />
                  <div style={{ fontFamily: "var(--ff-serif)", fontSize: 15, fontWeight: 500, marginTop: 8 }}>{x.t}</div>
                  <div style={{ fontSize: 12, color: "var(--c-mute)", marginTop: 2 }}>{x.s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero composition */}
          <div style={{ position: "relative", aspectRatio: "5 / 6", maxWidth: 540, justifySelf: "center", width: "100%" }}>
            {/* Big logo backdrop */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,224,238,0.7) 50%, transparent 75%)" }} />

            {/* Center icon, large */}
            <div style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%, -50%)", width: "70%", aspectRatio: "1 / 1" }}>
              <img src="assets/dinatale-icon.png" alt="DI Natale" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 30px 60px rgba(232, 77, 163, 0.35))" }} />
            </div>

            {/* Floating cards */}
            <div className="card" style={{ position: "absolute", top: "8%", left: "-2%", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, animation: "floatA 6s ease-in-out infinite" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--grad-brand-soft)", display: "grid", placeItems: "center" }}>
                <window.Icon name="sparkle" size={16} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--ff-serif)", fontSize: 14, fontWeight: 600 }}>Glow editorial</div>
                <div style={{ fontSize: 11, color: "var(--c-mute)" }}>Edición primavera</div>
              </div>
            </div>

            <div className="card" style={{ position: "absolute", top: "18%", right: "-4%", padding: "12px 14px", animation: "floatB 7s ease-in-out infinite" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Stars value={5} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>4.9</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--c-mute)", marginTop: 4 }}>+800 clientas felices</div>
            </div>

            <div className="card" style={{ position: "absolute", bottom: "12%", left: "-6%", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, animation: "floatC 8s ease-in-out infinite" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FFE0EB", display: "grid", placeItems: "center" }}>
                <window.Icon name="gift" size={16} color="#C8268A" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--ff-serif)", fontSize: 14, fontWeight: 600 }}>Pack regalo</div>
                <div style={{ fontSize: 11, color: "var(--c-mute)" }}>Envoltura incluida</div>
              </div>
            </div>

            <div className="card" style={{ position: "absolute", bottom: "4%", right: "0%", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, animation: "floatA 9s ease-in-out infinite" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#25D366", display: "grid", placeItems: "center" }}>
                <window.Icon name="wa" size={16} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--ff-serif)", fontSize: 14, fontWeight: 600 }}>Asesoría 1:1</div>
                <div style={{ fontSize: 11, color: "var(--c-mute)" }}>Resp. en minutos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand strip */}
        <div className="container" style={{ marginTop: 20 }}>
          <div style={{ display: "flex", gap: 40, justifyContent: "space-between", flexWrap: "wrap", padding: "20px 28px", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)", border: "1px solid var(--c-border-soft)", borderRadius: 20 }}>
            {[
              { i: "truck", t: "Envíos a todo Paraguay" },
              { i: "shield", t: "Compra segura" },
              { i: "wa", t: "Asesoría por WhatsApp" },
              { i: "gift", t: "Packs y envoltura" }
            ].map((x) => (
              <div key={x.t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <window.Icon name={x.i} size={18} color={x.i === "wa" ? "#25D366" : "var(--c-primary-deep)"} />
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--c-ink-2)" }}>{x.t}</span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .dn-hero { grid-template-columns: 1fr !important; }
          }
          @keyframes floatA { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-10px) } }
          @keyframes floatB { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(8px) } }
          @keyframes floatC { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-6px) } }
          @keyframes featSlideR { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:none; } }
          @keyframes featSlideL { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:none; } }
          @media (max-width: 900px) { .feat-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }
          @media (max-width: 540px) { .feat-grid { grid-template-columns: repeat(1, minmax(0,1fr)) !important; } }
        `}</style>
      </section>

      {/* CATEGORIES */}
      <section className="container" style={{ paddingTop: 80 }}>
        <window.SectionTitle eyebrow="Explorá por categoría" title="Categorías de <em>cuidado</em>" sub="Una selección curada para acompañar cada momento de tu rutina." center />
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {CATEGORIES.slice(0, 6).map((c) => (
            <window.CategoryCard key={c.id} cat={c} onClick={() => setRoute("products", { cat: c.id })} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container" style={{ paddingTop: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <window.SectionTitle eyebrow="Lo más elegido" title="Productos <em>destacados</em>" sub="Nuestra selección preferida para esta temporada." />
          <button className="ulink" onClick={() => setRoute("products")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 14 }}>Ver catálogo completo →</button>
        </div>

        <div style={{ position: "relative" }}>
          {featPages > 1 && (
            <button onClick={() => goFeat((featPage - 1 + featPages) % featPages)}
              style={{ position: "absolute", left: -22, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 40, height: 40, borderRadius: "50%", border: "none", background: "var(--c-primary)", color: "white", cursor: "pointer", display: "grid", placeItems: "center", boxShadow: "0 4px 14px rgba(232,77,163,0.35)", transition: "transform .2s, box-shadow .2s" }}
              onMouseEnter={(e) => { setFeatHovered(true); e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,77,163,0.5)"; }}
              onMouseLeave={(e) => { setFeatHovered(false); e.currentTarget.style.transform = "translateY(-50%) scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,77,163,0.35)"; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          )}

          <div style={{ overflow: "hidden" }}>
            <div key={featPage} className="feat-grid" style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(4, minmax(0, 1fr))", animation: featDir >= 0 ? "featSlideR 0.42s ease" : "featSlideL 0.42s ease" }}>
              {featSlice.map((p) => (
                <window.ProductCard key={p.id} product={p} onQuick={setQuickView} />
              ))}
            </div>
          </div>

          {featPages > 1 && (
            <button onClick={() => goFeat((featPage + 1) % featPages)}
              style={{ position: "absolute", right: -22, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 40, height: 40, borderRadius: "50%", border: "none", background: "var(--c-primary)", color: "white", cursor: "pointer", display: "grid", placeItems: "center", boxShadow: "0 4px 14px rgba(232,77,163,0.35)", transition: "transform .2s, box-shadow .2s" }}
              onMouseEnter={(e) => { setFeatHovered(true); e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,77,163,0.5)"; }}
              onMouseLeave={(e) => { setFeatHovered(false); e.currentTarget.style.transform = "translateY(-50%) scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,77,163,0.35)"; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}
        </div>

        {featPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
            {Array.from({ length: featPages }).map((_, i) => (
              <button key={i} onClick={() => goFeat(i)} style={{ width: i === featPage ? 22 : 7, height: 7, borderRadius: 99, border: "none", cursor: "pointer", padding: 0, background: i === featPage ? "var(--c-primary)" : "var(--c-border)", transition: "all .3s ease" }} />
            ))}
          </div>
        )}
      </section>

      {/* EDITORIAL FEATURE */}
      <section className="container" style={{ paddingTop: 120 }}>
        <div style={{ display: "grid", gap: 50, gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", alignItems: "center" }} className="dn-2col">
          <div style={{ position: "relative", aspectRatio: "4 / 5", borderRadius: 28, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, padding: "16px 18px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <window.Icon name="quote" size={22} color="#E84DA3" />
              <p style={{ margin: 0, fontFamily: "var(--ff-serif)", fontSize: 14, fontStyle: "italic", color: "var(--c-ink-2)" }}>"Cada producto se siente como un pequeño ritual."</p>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Una experiencia, no solo un producto</div>
            <h2 className="h-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "0 0 18px" }}>
              Cuidarte con <em>intención</em> empieza por elegir bien.
            </h2>
            <p style={{ color: "var(--c-mute)", fontSize: 16, lineHeight: 1.7, margin: "0 0 24px" }}>
              En DI NATALE no creemos en rutinas saturadas. Creemos en pasos pensados, productos elegidos con criterio y una asesoría que te acompañe sin presionar. Una experiencia premium que se siente desde el primer envoltorio.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gap: 12 }}>
              {[
                "Curaduría delicada de marcas que probamos.",
                "Asesoría 1:1 sin promesas exageradas.",
                "Comunicación clara y respetuosa, siempre."
              ].map((t) => (
                <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--c-rose-50)", display: "grid", placeItems: "center", flexShrink: 0, marginTop: 2 }}>
                    <window.Icon name="check" size={12} color="var(--c-primary)" />
                  </span>
                  <span style={{ color: "var(--c-ink-2)" }}>{t}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn--outline" onClick={() => setRoute("about")}>Conocé la marca</button>
          </div>
        </div>
        <style>{`@media (max-width: 880px){ .dn-2col { grid-template-columns: 1fr !important; }}`}</style>
      </section>

      {/* REVIEWS */}
      <section className="container" style={{ paddingTop: 120 }}>
        <window.SectionTitle eyebrow="Experiencias reales" title="Historias que inspiran <em>confianza</em>" sub="Conocé la experiencia de quienes ya eligieron DI NATALE." center />
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {REVIEWS.slice(0, 3).map((r) => <window.ReviewCard key={r.id} r={r} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button className="btn btn--ghost" onClick={() => setRoute("reviews")}>Ver todas las reseñas</button>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="container" style={{ paddingTop: 120 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <window.SectionTitle eyebrow="Consejos DI NATALE" title="Consultoría <em>estética</em>" sub="Notas pensadas para acompañar tu cuidado, sin promesas exageradas." />
          <button className="ulink" onClick={() => setRoute("blog")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 14 }}>Ir al blog →</button>
        </div>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {ARTICLES.slice(0, 3).map((a) => <window.BlogCard key={a.id} a={a} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingTop: 120 }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 32, background: "var(--grad-brand)", color: "white", padding: "70px 40px", textAlign: "center" }}>
          <window.FloralAccent style={{ top: -20, left: -20, opacity: 0.4 }} size={200} color="white" />
          <window.FloralAccent style={{ bottom: -40, right: -10, opacity: 0.4 }} size={220} color="white" />
          <div style={{ position: "relative" }}>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.85)", marginBottom: 18 }}>Asesoría personalizada</div>
            <h2 className="h-display" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", color: "white", margin: "0 0 16px" }}>
              ¿Necesitás ayuda para elegir tu rutina?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 16, maxWidth: 580, margin: "0 auto 28px" }}>
              Escribinos por WhatsApp y te acompañamos a armar la combinación que mejor se adapta a vos.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btn--lg" style={{ background: "white", color: "var(--c-primary-deep)" }} href={waLink("Hola, quiero asesoría para armar mi rutina.")} target="_blank" rel="noreferrer">
                <window.Icon name="wa" size={16} color="#25D366" /> Solicitar consulta
              </a>
              <button className="btn btn--lg" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.5)" }} onClick={() => setRoute("products")}>
                Ver productos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

window.HomeView = HomeView;
