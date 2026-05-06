const WhatsAppFAB = () => {
  const [open, setOpen] = React.useState(false);
  const opts = [
    { msg: "Hola, quiero asesoría para elegir un producto.", label: "Pedir asesoría" },
    { msg: "Hola, quiero saber disponibilidad de un producto.", label: "Consultar disponibilidad" },
    { msg: "Hola, quiero finalizar mi compra.", label: "Finalizar compra" },
    { msg: "Hola, tengo otra consulta.", label: "Otra consulta" }
  ];
  return (
    <React.Fragment>
      {open && (
        <div style={{ position: "fixed", bottom: 150, right: 24, zIndex: 70, animation: "viewFade 220ms ease both" }}>
          <div className="card" style={{ padding: 16, width: 280, background: "white" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#25D366", display: "grid", placeItems: "center" }}>
                <window.Icon name="wa" size={18} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>DI NATALE</div>
                <div style={{ fontSize: 12, color: "#2E8F66" }}>● En línea</div>
              </div>
            </div>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--c-mute)" }}>¡Hola! ¿En qué te podemos ayudar?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {opts.map((o) => (
                <a key={o.label} href={waLink(o.msg)} target="_blank" rel="noreferrer"
                   style={{ padding: "10px 12px", background: "var(--c-rose-50)", borderRadius: 10, fontSize: 13, color: "var(--c-ink)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {o.label}
                  <window.Icon name="chevron-right" size={12} color="var(--c-primary)" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} aria-label="WhatsApp"
        style={{ position: "fixed", bottom: 80, right: 24, zIndex: 70, width: 60, height: 60, borderRadius: "50%", border: "none", background: "#25D366", color: "white", cursor: "pointer", boxShadow: "0 8px 24px -6px rgba(37,211,102,0.5), 0 4px 10px -4px rgba(31,23,32,0.15)", display: "grid", placeItems: "center", transition: "transform .25s ease" }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.06)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
        <window.Icon name={open ? "close" : "wa"} size={26} color="white" />
      </button>
    </React.Fragment>
  );
};

window.WhatsAppFAB = WhatsAppFAB;
