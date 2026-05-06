const ReviewsView = () => {
  return (
    <div className="container view-fade" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ marginBottom: 50, textAlign: "center" }}>
        <div className="eyebrow center" style={{ marginBottom: 18 }}>Experiencias de clientas</div>
        <h1 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", margin: 0 }}>Historias reales, resultados que inspiran <em>confianza</em></h1>
        <p style={{ color: "var(--c-mute)", maxWidth: 640, margin: "16px auto 0" }}>
          Conocé la experiencia de quienes ya eligieron DI NATALE. Cercanía, profesionalismo y productos cuidados.
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginBottom: 50, padding: "28px 32px", background: "var(--grad-soft)", borderRadius: 24 }}>
        {[
          { n: "+800", t: "Clientas felices" },
          { n: "4.9", t: "Promedio de reseñas" },
          { n: "+1.200", t: "Productos enviados" },
          { n: "97%", t: "Recomendaría a una amiga" }
        ].map((s) => (
          <div key={s.t} style={{ textAlign: "center" }}>
            <div className="h-display" style={{ fontSize: 36, color: "var(--c-primary-deep)", fontWeight: 500 }}>{s.n}</div>
            <div style={{ fontSize: 13, color: "var(--c-ink-2)", marginTop: 4 }}>{s.t}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {REVIEWS.map((r) => <window.ReviewCard key={r.id} r={r} />)}
      </div>

      <div style={{ marginTop: 50, textAlign: "center" }}>
        <a className="btn btn--primary" href={waLink("Hola, ya compré y quiero dejar mi reseña.")} target="_blank" rel="noreferrer">
          <window.Icon name="wa" size={16} color="white" /> Compartir tu experiencia
        </a>
      </div>
    </div>
  );
};

window.ReviewsView = ReviewsView;
