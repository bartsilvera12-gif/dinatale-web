const Footer = () => {
  const { setRoute } = useStore();
  const links = [
    { id: "home", label: "Inicio" },
    { id: "products", label: "Productos" },
    { id: "categories", label: "Categorías" },
    { id: "blog", label: "Consultoría" },
    { id: "faq", label: "Preguntas frecuentes" },
    { id: "about", label: "Quiénes somos" }
  ];

  return (
    <footer style={{ marginTop: 100, background: "linear-gradient(180deg, #FFF1F8 0%, #FFF9FC 100%)", borderTop: "1px solid var(--c-border-soft)", paddingTop: 80, paddingBottom: 40, position: "relative", overflow: "hidden" }}>
      <window.FloralAccent style={{ top: 30, right: -40, opacity: 0.3 }} size={200} color="#E84DA3" />
      <window.FloralAccent style={{ bottom: -60, left: -40, opacity: 0.25 }} size={240} color="#C7A4F4" />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <img src="assets/logo.jpeg" alt="DI Natale" style={{ height: 64, width: "auto", objectFit: "contain", mixBlendMode: "multiply" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--c-mute)", textTransform: "uppercase", fontFamily: "var(--ff-body)" }}>by Letizia</span>
            </div>
            <p style={{ color: "var(--c-mute)", fontSize: 14, lineHeight: 1.7, maxWidth: 320, marginTop: 0 }}>
              Marca dedicada a estética, belleza y cuidado personal. Curaduría con criterio y asesoría cercana, profesional y delicada.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              {[{ name: "ig", href: "#" }, { name: "fb", href: "#" }, { name: "tt", href: "#" }].map((s) => (
                <a key={s.name} href={s.href} style={{ width: 38, height: 38, borderRadius: "50%", background: "white", border: "1px solid var(--c-border)", display: "grid", placeItems: "center", color: "var(--c-primary-deep)", transition: "all .2s ease" }}
                   onMouseEnter={(e) => { e.currentTarget.style.background = "var(--grad-brand)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "transparent"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--c-primary-deep)"; e.currentTarget.style.borderColor = "var(--c-border)"; }}>
                  <window.Icon name={s.name} size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--ff-serif)", fontSize: 18, fontWeight: 500, margin: "0 0 16px" }}>Navegación</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map((l) => (
                <li key={l.id}><button onClick={() => setRoute(l.id)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--c-mute)", fontSize: 14 }}>{l.label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--ff-serif)", fontSize: 18, fontWeight: 500, margin: "0 0 16px" }}>Contacto</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "var(--c-mute)" }}>
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}><window.Icon name="wa" size={14} color="#25D366" />{WA_NUMBER}</li>
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}><window.Icon name="mail" size={14} color="var(--c-primary)" />hola@dinatale.com.py</li>
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}><window.Icon name="pin" size={14} color="var(--c-primary)" />Asunción, Paraguay</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--ff-serif)", fontSize: 18, fontWeight: 500, margin: "0 0 16px" }}>Atención</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: "var(--c-mute)" }}>
              <li>Lunes a Viernes · 9 a 18 hs</li>
              <li>Sábados · 10 a 14 hs</li>
              <li>Domingos · cerrado</li>
            </ul>
            <a className="btn btn--outline btn--sm" href={waLink("Hola, quiero solicitar asesoría personalizada.")} target="_blank" rel="noreferrer" style={{ marginTop: 16 }}>
              Solicitar consulta
            </a>
          </div>
        </div>

        <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid var(--c-border-soft)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <p style={{ fontSize: 12.5, color: "var(--c-mute)", margin: 0 }}>© 2026 DI NATALE. Belleza, estética y cuidado personal. Todos los derechos reservados.</p>
          <p style={{ fontSize: 12.5, color: "var(--c-mute)", margin: 0 }}>
            Diseñado con cuidado · Asunción · Desarrollado por <a href="https://neura.com.py" target="_blank" rel="noreferrer" style={{ color: "var(--c-primary)", textDecoration: "none", fontWeight: 600 }}>Neura</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

window.Footer = Footer;
