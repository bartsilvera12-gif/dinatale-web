const CartView = () => {
  const { cartItems, cartTotal, updateQty, removeFromCart, setRoute, clearCart } = useStore();

  if (cartItems.length === 0) {
    return (
      <div className="container view-fade" style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center", maxWidth: 600 }}>
        <div style={{ width: 90, height: 90, borderRadius: "50%", background: "var(--c-rose-50)", display: "grid", placeItems: "center", margin: "0 auto 22px" }}>
          <window.Icon name="cart" size={36} color="var(--c-primary)" />
        </div>
        <h1 className="h-display" style={{ fontSize: 34, margin: "0 0 12px" }}>Tu carrito está vacío</h1>
        <p style={{ color: "var(--c-mute)", marginBottom: 28 }}>Empezá explorando nuestra curaduría de productos.</p>
        <button className="btn btn--primary" onClick={() => setRoute("products")}>Ver productos</button>
      </div>
    );
  }

  const wa = waLink(`Hola, quiero finalizar mi compra:\n\n${cartItems.map((p) => `• ${p.qty}x ${p.name} — ${fmtGs(p.lineTotal)}`).join("\n")}\n\nTotal: ${fmtGs(cartTotal)}`);

  return (
    <div className="container view-fade" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <h1 className="h-display" style={{ fontSize: "clamp(30px, 4.4vw, 46px)", margin: "0 0 30px" }}>Tu <em>carrito</em></h1>

      <div style={{ display: "grid", gap: 32, gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)" }} className="dn-2col">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cartItems.map((p) => (
            <div key={p.id} className="card" style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: 18, padding: 16, alignItems: "center" }}>
              <div style={{ width: 100, height: 100, borderRadius: 12, overflow: "hidden", background: "var(--c-rose-50)" }}>
                <img src={p.images[0] || window.DN_IMG_FALLBACK} alt="" onError={window.imgFallback} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-mute)", marginBottom: 4 }}>
                  {CATEGORIES.find((c) => c.id === p.category)?.name}
                </div>
                <h3 style={{ margin: 0, fontFamily: "var(--ff-serif)", fontSize: 17, fontWeight: 500 }}>{p.name}</h3>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--c-border)", borderRadius: 999 }}>
                    <button onClick={() => updateQty(p.id, p.qty - 1)} style={qtyBtnSm} aria-label="Restar"><window.Icon name="minus" size={12} /></button>
                    <span style={{ minWidth: 32, textAlign: "center", fontWeight: 600, fontSize: 13 }}>{p.qty}</span>
                    <button onClick={() => updateQty(p.id, Math.min(p.stock, p.qty + 1))} style={qtyBtnSm} aria-label="Sumar"><window.Icon name="plus" size={12} /></button>
                  </div>
                  <span style={{ fontSize: 13, color: "var(--c-mute)" }}>{fmtGs(p.price)} c/u</span>
                </div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 16 }}>{fmtGs(p.lineTotal)}</span>
                <button onClick={() => removeFromCart(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-mute)", display: "flex", alignItems: "center", gap: 6, fontSize: 12, padding: 4 }}>
                  <window.Icon name="trash" size={14} /> Quitar
                </button>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button className="btn btn--ghost btn--sm" onClick={() => setRoute("products")}>← Seguir comprando</button>
            <button className="btn btn--ghost btn--sm" onClick={clearCart} style={{ color: "var(--c-mute)" }}>Vaciar carrito</button>
          </div>
        </div>

        {/* Summary */}
        <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <div className="card" style={{ padding: 28 }}>
            <h3 className="h-display" style={{ fontSize: 22, margin: "0 0 18px" }}>Resumen</h3>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 14, color: "var(--c-mute)" }}>
              <span>Subtotal</span><span>{fmtGs(cartTotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 14, color: "var(--c-mute)", borderBottom: "1px solid var(--c-border-soft)" }}>
              <span>Envío</span><span>A calcular</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontSize: 18, fontWeight: 600 }}>
              <span>Total</span><span style={{ color: "var(--c-primary-deep)" }}>{fmtGs(cartTotal)}</span>
            </div>
            <button className="btn btn--primary btn--block btn--lg" onClick={() => setRoute("checkout")} style={{ marginTop: 8 }}>
              Finalizar compra
              <window.Icon name="chevron-right" size={16} color="white" />
            </button>
            <p style={{ fontSize: 12, color: "var(--c-mute)", marginTop: 16, textAlign: "center" }}>
              Pagos por transferencia, efectivo u otros medios a coordinar.
            </p>
          </div>
        </aside>
      </div>
      <style>{`@media (max-width: 880px){ .dn-2col { grid-template-columns: 1fr !important; }}`}</style>
    </div>
  );
};

const qtyBtnSm = { width: 30, height: 30, background: "white", border: "none", cursor: "pointer", display: "grid", placeItems: "center" };

window.CartView = CartView;
