const CheckoutView = () => {
  const { cartItems, cartTotal, setRoute, clearCart } = useStore();
  const [form, setForm] = React.useState({
    name: "", phone: "", email: "", address: "",
    delivery: "envio", payment: "transferencia", note: ""
  });
  const [step, setStep] = React.useState("form"); // form | done
  const [errors, setErrors] = React.useState({});

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (cartItems.length === 0 && step === "form") {
    return (
      <div className="container view-fade" style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
        <p style={{ color: "var(--c-mute)" }}>Tu carrito está vacío.</p>
        <button className="btn btn--primary" onClick={() => setRoute("products")}>Ver productos</button>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Por favor ingresá tu nombre.";
    if (!form.phone.trim()) e.phone = "Por favor ingresá un teléfono.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email no válido.";
    if (form.delivery === "envio" && !form.address.trim()) e.address = "Necesitamos la dirección de envío.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWA = () => {
    const items = cartItems.map((p) => `• ${p.qty}x ${p.name} — ${fmtGs(p.lineTotal)}`).join("\n");
    const entrega = form.delivery === "envio" ? `Envío a domicilio\nDirección: ${form.address}` : "Retiro en local (Asunción)";
    const pago = { transferencia: "Transferencia bancaria", efectivo: "Efectivo", otro: "A coordinar" }[form.payment] || form.payment;
    return `🌸 *Pedido DI NATALE*\n\n*Datos del cliente*\nNombre: ${form.name}\nTeléfono: ${form.phone}\nEmail: ${form.email}\n\n*Entrega*\n${entrega}\n\n*Forma de pago*\n${pago}\n\n*Productos*\n${items}\n\n*Total: ${fmtGs(cartTotal)}*${form.note ? `\n\n*Nota:* ${form.note}` : ""}\n\n_Por favor confirmame disponibilidad y datos de pago. ¡Gracias!_`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(waLink(buildWA()), "_blank");
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="container view-fade" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 640, textAlign: "center" }}>
        <div style={{ width: 90, height: 90, borderRadius: "50%", background: "var(--grad-brand)", display: "grid", placeItems: "center", margin: "0 auto 24px", boxShadow: "var(--shadow-glow)" }}>
          <window.Icon name="check" size={40} color="white" />
        </div>
        <h1 className="h-display" style={{ fontSize: 38, margin: "0 0 14px" }}>¡Gracias, {form.name.split(" ")[0]}!</h1>
        <p style={{ color: "var(--c-mute)", lineHeight: 1.7, fontSize: 16 }}>
          Recibimos tu pedido. Te vamos a contactar a la brevedad para confirmar los detalles y coordinar el {form.delivery === "envio" ? "envío" : "retiro"} y el medio de pago.
        </p>
        <div className="card" style={{ padding: 24, marginTop: 28, textAlign: "left" }}>
          <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 18, margin: "0 0 14px" }}>Resumen del pedido</h3>
          {cartItems.map((p) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14, color: "var(--c-ink-2)" }}>
              <span>{p.qty}x {p.name}</span><span>{fmtGs(p.lineTotal)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", marginTop: 6, borderTop: "1px solid var(--c-border-soft)", fontWeight: 600, fontSize: 16 }}>
            <span>Total</span><span style={{ color: "var(--c-primary-deep)" }}>{fmtGs(cartTotal)}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <button className="btn btn--primary btn--lg" onClick={() => { clearCart(); setRoute("home"); }}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container view-fade" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <h1 className="h-display" style={{ fontSize: "clamp(30px, 4.4vw, 46px)", margin: "0 0 8px" }}>Finalizar <em>compra</em></h1>
      <p style={{ color: "var(--c-mute)", marginBottom: 30 }}>Completá tus datos. Coordinamos pago y entrega después.</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 32, gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)" }} className="dn-2col">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Customer */}
          <div className="card" style={{ padding: 28 }}>
            <h3 className="h-display" style={{ fontSize: 20, margin: "0 0 18px" }}>1 · Datos personales</h3>
            <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="label">Nombre completo</label>
                <input className="input" value={form.name} onChange={(e) => upd("name", e.target.value)} placeholder="Ej: Camila Pérez" />
                {errors.name && <span style={errStyle}>{errors.name}</span>}
              </div>
              <div>
                <label className="label">Teléfono</label>
                <input className="input" value={form.phone} onChange={(e) => upd("phone", e.target.value)} placeholder="Ej: 0981 234 567" />
                {errors.phone && <span style={errStyle}>{errors.phone}</span>}
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} placeholder="Ej: camila@email.com" />
                {errors.email && <span style={errStyle}>{errors.email}</span>}
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="card" style={{ padding: 28 }}>
            <h3 className="h-display" style={{ fontSize: 20, margin: "0 0 18px" }}>2 · Entrega</h3>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
              {[
                { id: "envio", label: "Envío a domicilio", desc: "A todo Paraguay", icon: "truck" },
                { id: "retiro", label: "Retiro en local", desc: "Asunción, coordinable", icon: "pin" }
              ].map((opt) => (
                <button type="button" key={opt.id} onClick={() => upd("delivery", opt.id)} style={radioCard(form.delivery === opt.id)}>
                  <window.Icon name={opt.icon} size={18} color={form.delivery === opt.id ? "var(--c-primary)" : "var(--c-mute)"} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: "var(--c-mute)" }}>{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            {form.delivery === "envio" && (
              <div style={{ marginTop: 18 }}>
                <label className="label">Dirección de envío</label>
                <input className="input" value={form.address} onChange={(e) => upd("address", e.target.value)} placeholder="Calle, número, ciudad, referencia" />
                {errors.address && <span style={errStyle}>{errors.address}</span>}
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="card" style={{ padding: 28 }}>
            <h3 className="h-display" style={{ fontSize: 20, margin: "0 0 18px" }}>3 · Pago</h3>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {[
                { id: "transferencia", label: "Transferencia", desc: "Datos al confirmar" },
                { id: "efectivo", label: "Efectivo", desc: "Solo retiro en local" },
                { id: "otro", label: "Otro medio", desc: "A coordinar" }
              ].map((opt) => (
                <button type="button" key={opt.id} onClick={() => upd("payment", opt.id)} style={radioCard(form.payment === opt.id)}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid " + (form.payment === opt.id ? "var(--c-primary)" : "var(--c-border)"), display: "grid", placeItems: "center", flexShrink: 0 }}>
                    {form.payment === opt.id && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--c-primary)" }} />}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: "var(--c-mute)" }}>{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              <label className="label">Notas (opcional)</label>
              <textarea className="textarea" rows="3" value={form.note} onChange={(e) => upd("note", e.target.value)} placeholder="¿Algo que debamos saber?" />
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <div className="card" style={{ padding: 28 }}>
            <h3 className="h-display" style={{ fontSize: 20, margin: "0 0 16px" }}>Tu pedido</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              {cartItems.map((p) => (
                <div key={p.id} style={{ display: "flex", gap: 12, fontSize: 13 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 8, background: "var(--c-rose-50)", overflow: "hidden", flexShrink: 0 }}>
                    <img src={p.images[0] || window.DN_IMG_FALLBACK} alt="" onError={window.imgFallback} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "var(--c-mute)" }}>x{p.qty}</div>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{fmtGs(p.lineTotal)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid var(--c-border-soft)", paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 600 }}>
              <span>Total</span><span style={{ color: "var(--c-primary-deep)" }}>{fmtGs(cartTotal)}</span>
            </div>
            <button type="submit" className="btn btn--primary btn--block btn--lg" style={{ marginTop: 20 }}>
              Confirmar pedido
            </button>
            <p style={{ fontSize: 12, color: "var(--c-mute)", marginTop: 14, textAlign: "center" }}>
              Al confirmar, te contactaremos para coordinar el pago y la entrega.
            </p>
          </div>
        </aside>
      </form>
      <style>{`@media (max-width: 880px){ .dn-2col { grid-template-columns: 1fr !important; }}`}</style>
    </div>
  );
};

const errStyle = { display: "block", color: "var(--c-danger)", fontSize: 12, marginTop: 6 };
const radioCard = (active) => ({
  display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
  border: "1.5px solid " + (active ? "var(--c-primary)" : "var(--c-border)"),
  background: active ? "var(--c-rose-50)" : "white",
  borderRadius: 14, cursor: "pointer", fontFamily: "inherit",
  transition: "all .2s ease"
});

window.CheckoutView = CheckoutView;
