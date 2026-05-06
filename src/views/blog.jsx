const BlogView = () => {
  const [cat, setCat] = React.useState("all");
  const cats = ["all", ...Array.from(new Set(ARTICLES.map((a) => a.cat)))];
  const items = cat === "all" ? ARTICLES : ARTICLES.filter((a) => a.cat === cat);
  return (
    <div className="container view-fade" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div className="eyebrow center" style={{ marginBottom: 18 }}>Consejos DI NATALE</div>
        <h1 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", margin: 0 }}>Consultoría <em>estética</em></h1>
        <p style={{ color: "var(--c-mute)", maxWidth: 620, margin: "16px auto 0" }}>
          Notas pensadas para acompañar tu rutina, sin promesas exageradas. Tono responsable, mirada profesional.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "8px 16px", borderRadius: 999,
            border: "1px solid " + (cat === c ? "transparent" : "var(--c-border)"),
            background: cat === c ? "var(--grad-brand)" : "white",
            color: cat === c ? "white" : "var(--c-ink-2)",
            fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
          }}>{c === "all" ? "Todos" : c}</button>
        ))}
      </div>

      {/* Featured first */}
      {items[0] && (
        <article className="card" style={{ overflow: "hidden", display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", marginBottom: 32, cursor: "pointer" }} className="dn-feat">
          <div style={{ aspectRatio: "16 / 11", background: "var(--c-rose-50)" }}>
            <img src={items[0].img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: 36, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-primary-deep)", fontWeight: 600 }}>{items[0].cat} · destacado</div>
            <h2 className="h-display" style={{ fontSize: 30, margin: 0 }}>{items[0].title}</h2>
            <p style={{ color: "var(--c-mute)", lineHeight: 1.7 }}>{items[0].excerpt}</p>
            <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--c-mute)", marginTop: 6 }}>
              <span>{items[0].date}</span><span>·</span><span>{items[0].read} lectura</span>
            </div>
            <span className="ulink" style={{ alignSelf: "flex-start", marginTop: 8, fontSize: 14 }}>Leer artículo →</span>
          </div>
        </article>
      )}

      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {items.slice(1).map((a) => <window.BlogCard key={a.id} a={a} />)}
      </div>

      <style>{`@media (max-width: 800px){ .dn-feat { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

window.BlogView = BlogView;
