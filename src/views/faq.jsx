const FAQView = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="container view-fade" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 880 }}>
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div className="eyebrow center" style={{ marginBottom: 18 }}>Preguntas frecuentes</div>
        <h1 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", margin: 0 }}>Resolvemos tus <em>dudas</em></h1>
        <p style={{ color: "var(--c-mute)", maxWidth: 580, margin: "16px auto 0" }}>
          Si no encontrás lo que necesitás, escribinos por WhatsApp y te respondemos a la brevedad.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="card" style={{ overflow: "hidden", border: "1px solid " + (isOpen ? "var(--c-border)" : "var(--c-border-soft)") }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: "100%", padding: "20px 24px", background: "none", border: "none", textAlign: "left",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, cursor: "pointer",
                fontFamily: "var(--ff-serif)", fontSize: 17, fontWeight: 500, color: "var(--c-ink)"
              }}>
                <span>{f.q}</span>
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: isOpen ? "var(--grad-brand)" : "var(--c-rose-50)", display: "grid", placeItems: "center", flexShrink: 0, transition: "all .25s ease" }}>
                  <window.Icon name={isOpen ? "minus" : "plus"} size={14} color={isOpen ? "white" : "var(--c-primary)"} />
                </span>
              </button>
              <div style={{ maxHeight: isOpen ? 300 : 0, transition: "max-height .35s ease", overflow: "hidden" }}>
                <p style={{ padding: "0 24px 22px", margin: 0, color: "var(--c-mute)", fontSize: 14.5, lineHeight: 1.7 }}>{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 40, textAlign: "center", padding: 32, background: "var(--c-rose-50)", borderRadius: 20 }}>
        <h3 className="h-display" style={{ fontSize: 22, margin: "0 0 8px" }}>¿No encontraste tu respuesta?</h3>
        <p style={{ color: "var(--c-mute)", fontSize: 14, margin: "0 0 18px" }}>Estamos para ayudarte por WhatsApp.</p>
        <a className="btn btn--wa" href={waLink("Hola, tengo una consulta.")} target="_blank" rel="noreferrer">
          <window.Icon name="wa" size={16} color="white" /> Escribir por WhatsApp
        </a>
      </div>
    </div>
  );
};

window.FAQView = FAQView;
