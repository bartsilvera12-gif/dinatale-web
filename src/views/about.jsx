const AboutView = () => {
  const { setRoute } = useStore();
  return (
    <div className="view-fade">
      <section className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ display: "grid", gap: 50, gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", alignItems: "center" }} className="dn-2col">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Quiénes somos</div>
            <h1 className="h-display" style={{ fontSize: "clamp(34px, 5.4vw, 56px)", margin: "0 0 20px" }}>
              Una marca creada para acompañarte con <em>cuidado</em>.
            </h1>
            <p style={{ color: "var(--c-mute)", lineHeight: 1.8, fontSize: 16 }}>
              DI NATALE es una marca enfocada en estética, belleza y cuidado personal, creada para ofrecer productos seleccionados con criterio, elegancia y confianza. Acompañamos a cada clienta en su proceso de cuidado, combinando productos de calidad con una experiencia cercana, profesional y delicada.
            </p>
            <p style={{ color: "var(--c-mute)", lineHeight: 1.8, fontSize: 16, marginTop: 16 }}>
              Trabajamos sin promesas exageradas y con un tono responsable. Cada producto que sumamos a la curaduría pasa por una selección cuidada del equipo.
            </p>
            <a className="btn btn--primary" style={{ marginTop: 28 }} href={waLink("Hola, quiero solicitar asesoría personalizada.")} target="_blank" rel="noreferrer">
              <window.Icon name="wa" size={16} color="white" /> Solicitar consulta personalizada
            </a>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "4 / 5", borderRadius: 28, overflow: "hidden", boxShadow: "var(--shadow-glow)" }}>
              <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="card" style={{ position: "absolute", bottom: 24, left: -24, padding: 18, maxWidth: 240 }}>
              <window.Icon name="quote" size={22} color="#E84DA3" />
              <p style={{ margin: "8px 0 0", fontFamily: "var(--ff-serif)", fontStyle: "italic", fontSize: 14 }}>"Belleza con criterio, asesoría con respeto."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 40 }}>
        <window.SectionTitle eyebrow="Lo que nos guía" title="Nuestros <em>valores</em>" sub="Cinco principios que guían todas las decisiones de la marca." center />
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {VALUES.map((v) => (
            <div key={v.title} className="card" style={{ padding: 24, textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--grad-soft)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
                <window.Icon name={v.icon} size={22} color="var(--c-primary)" />
              </div>
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--ff-serif)", fontSize: 19, fontWeight: 500 }}>{v.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, color: "var(--c-mute)", lineHeight: 1.6 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingTop: 100 }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 32, background: "var(--grad-brand)", color: "white", padding: "60px 40px", textAlign: "center" }}>
          <window.FloralAccent style={{ top: -20, right: -20, opacity: 0.4 }} size={200} color="white" />
          <h2 className="h-display" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "white", margin: "0 0 14px" }}>Conocé nuestra curaduría</h2>
          <p style={{ color: "rgba(255,255,255,0.88)", maxWidth: 520, margin: "0 auto 24px" }}>Productos elegidos con criterio para acompañarte de forma simple y elegante.</p>
          <button className="btn btn--lg" style={{ background: "white", color: "var(--c-primary-deep)" }} onClick={() => setRoute("products")}>Ver productos</button>
        </div>
      </section>
      <style>{`@media (max-width: 880px){ .dn-2col { grid-template-columns: 1fr !important; }}`}</style>
    </div>
  );
};

window.AboutView = AboutView;
