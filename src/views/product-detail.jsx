const ProductDetailView = () => {
  const { route, setRoute, addToCart, setQuickView } = useStore();
  const id = route.params?.id;
  const product = PRODUCTS.find((p) => p.id === id);
  const [qty, setQty] = React.useState(1);
  const [imgIdx, setImgIdx] = React.useState(0);
  const [tab, setTab] = React.useState("benefits");

  React.useEffect(() => { setImgIdx(0); setQty(1); setTab("benefits"); }, [id]);

  if (!product) {
    return (
      <div className="container view-fade" style={{ paddingTop: 60, paddingBottom: 60, textAlign: "center" }}>
        <p>Producto no encontrado.</p>
        <button className="btn btn--primary" onClick={() => setRoute("products")}>Ver productos</button>
      </div>
    );
  }

  const stock = stockState(product.stock);
  const out = stock.kind === "out";
  const cat = CATEGORIES.find((c) => c.id === product.category);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container view-fade" style={{ paddingTop: 40, paddingBottom: 60 }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: "var(--c-mute)", marginBottom: 28 }}>
        <button onClick={() => setRoute("home")} style={crumbBtn}>Inicio</button>
        <span style={{ margin: "0 8px" }}>/</span>
        <button onClick={() => setRoute("products")} style={crumbBtn}>Productos</button>
        <span style={{ margin: "0 8px" }}>/</span>
        <button onClick={() => setRoute("products", { cat: product.category })} style={crumbBtn}>{cat?.name}</button>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--c-ink-2)" }}>{product.name}</span>
      </div>

      <div style={{ display: "grid", gap: 56, gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)" }} className="dn-pd">
        {/* Gallery */}
        <div>
          <div style={{ aspectRatio: "1 / 1", borderRadius: 24, overflow: "hidden", background: "var(--c-rose-50)", marginBottom: 14, position: "relative" }}>
            <img src={product.images[imgIdx] || window.DN_IMG_FALLBACK} alt={product.name} onError={window.imgFallback} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {product.tag && <div style={{ position: "absolute", top: 18, left: 18 }}><window.Tag tag={product.tag} /></div>}
          </div>
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: 10 }}>
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{ width: 80, height: 80, borderRadius: 14, overflow: "hidden", padding: 0, border: "2px solid " + (i === imgIdx ? "var(--c-primary)" : "transparent"), cursor: "pointer", background: "var(--c-rose-50)" }}>
                  <img src={src || window.DN_IMG_FALLBACK} alt="" onError={window.imgFallback} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-mute)", marginBottom: 8 }}>{cat?.name}</div>
          <h1 className="h-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "0 0 14px" }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <Stars value={product.rating} size={16} />
            <span style={{ fontSize: 13, color: "var(--c-mute)" }}>{product.rating} · {product.reviews} reseñas</span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 32, fontWeight: 600, color: "var(--c-ink)" }}>{fmtGs(product.price)}</span>
            {product.oldPrice && (
              <React.Fragment>
                <span style={{ fontSize: 16, color: "var(--c-mute)", textDecoration: "line-through" }}>{fmtGs(product.oldPrice)}</span>
                <span className="badge badge--sale">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
              </React.Fragment>
            )}
          </div>

          <span className={"badge " + stock.badge} style={{ marginBottom: 24 }}>● {stock.label}{!out && product.stock <= 5 && ` (${product.stock} unidades)`}</span>

          <p style={{ color: "var(--c-mute)", lineHeight: 1.7, fontSize: 15, margin: "20px 0 28px" }}>{product.desc}</p>

          {/* Qty + actions */}
          {!out && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <span className="label" style={{ margin: 0 }}>Cantidad</span>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--c-border)", borderRadius: 999, overflow: "hidden" }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={qtyBtn} aria-label="Restar"><window.Icon name="minus" size={14} /></button>
                <span style={{ minWidth: 40, textAlign: "center", fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} style={qtyBtn} aria-label="Sumar"><window.Icon name="plus" size={14} /></button>
              </div>
              <span style={{ fontSize: 12, color: "var(--c-mute)" }}>Máx. {product.stock}</span>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            {out ? (
              <a className="btn btn--wa btn--lg btn--block" href={waLink(`Hola, quiero consultar disponibilidad de ${product.name}.`)} target="_blank" rel="noreferrer">
                <window.Icon name="wa" size={16} color="white" /> Consultar disponibilidad por WhatsApp
              </a>
            ) : (
              <React.Fragment>
                <button className="btn btn--primary btn--lg" style={{ flex: 1 }} onClick={() => addToCart(product.id, qty)}>
                  <window.Icon name="cart" size={16} color="white" /> Añadir al carrito
                </button>
                <a className="btn btn--ghost btn--lg" href={waLink(`Hola, quiero consultar por ${product.name}.`)} target="_blank" rel="noreferrer">
                  <window.Icon name="wa" size={16} color="#25D366" />
                </a>
              </React.Fragment>
            )}
          </div>

          {out && (
            <div style={{ padding: "14px 16px", background: "#FFF1F8", borderRadius: 12, fontSize: 14, color: "var(--c-ink-2)", marginBottom: 24, border: "1px solid var(--c-border-soft)" }}>
              Este producto no está disponible actualmente. Escribinos por WhatsApp y te avisamos cuando vuelva al stock.
            </div>
          )}

          {/* Trust strip */}
          <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
            {[
              { i: "truck", t: "Envíos a todo el país" },
              { i: "shield", t: "Compra segura y embalaje cuidado" },
              { i: "wa", t: "Consultas y asesoría por WhatsApp" }
            ].map((x) => (
              <div key={x.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--c-rose-50)", borderRadius: 12 }}>
                <window.Icon name={x.i} size={16} color={x.i === "wa" ? "#25D366" : "var(--c-primary)"} />
                <span style={{ fontSize: 13, color: "var(--c-ink-2)" }}>{x.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: 80 }}>
        <div style={{ display: "flex", gap: 6, borderBottom: "1px solid var(--c-border-soft)", marginBottom: 28, flexWrap: "wrap" }}>
          {[
            { id: "benefits", label: "Beneficios" },
            { id: "use", label: "Forma de uso" },
            { id: "rec", label: "Recomendaciones" },
            { id: "faq", label: "FAQ del producto" }
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none", padding: "14px 18px", cursor: "pointer", fontSize: 14, fontFamily: "inherit",
              color: tab === t.id ? "var(--c-primary-deep)" : "var(--c-mute)",
              fontWeight: tab === t.id ? 600 : 400,
              borderBottom: "2px solid " + (tab === t.id ? "var(--c-primary)" : "transparent"),
              marginBottom: -1
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ maxWidth: 720, fontSize: 15, color: "var(--c-ink-2)", lineHeight: 1.7 }}>
          {tab === "benefits" && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {product.benefits.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--c-rose-50)", display: "grid", placeItems: "center", flexShrink: 0, marginTop: 2 }}>
                    <window.Icon name="check" size={12} color="var(--c-primary)" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
              <li style={{ fontSize: 13, color: "var(--c-mute)", paddingLeft: 36, marginTop: 6, fontStyle: "italic" }}>Los resultados pueden variar según el tipo de piel y la constancia de uso.</li>
            </ul>
          )}
          {tab === "use" && <p>{product.use}</p>}
          {tab === "rec" && <p>Recomendado para quienes buscan complementar una rutina de cuidado personal con productos de calidad. Si tenés piel sensible o estás bajo tratamiento dermatológico, te sugerimos consultar con un profesional antes de incorporar nuevos productos.</p>}
          {tab === "faq" && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
              <li><strong style={{ color: "var(--c-ink)" }}>¿Es apto para todo tipo de piel?</strong><br />Recomendamos siempre probar en una zona pequeña antes del primer uso.</li>
              <li><strong style={{ color: "var(--c-ink)" }}>¿Cuál es la duración del envase?</strong><br />Aproximadamente 2 a 3 meses con uso regular.</li>
              <li><strong style={{ color: "var(--c-ink)" }}>¿Se puede combinar con otros productos?</strong><br />Sí. Si tenés dudas sobre tu rutina, te asesoramos por WhatsApp.</li>
            </ul>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: 100 }}>
          <window.SectionTitle eyebrow="También podría gustarte" title="Productos <em>relacionados</em>" />
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {related.map((p) => <window.ProductCard key={p.id} product={p} onQuick={setQuickView} />)}
          </div>
        </div>
      )}

      <style>{`@media (max-width: 880px){ .dn-pd { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

const crumbBtn = { background: "none", border: "none", padding: 0, cursor: "pointer", color: "inherit", fontSize: "inherit", fontFamily: "inherit" };
const qtyBtn = { width: 38, height: 38, background: "white", border: "none", cursor: "pointer", display: "grid", placeItems: "center" };

window.ProductDetailView = ProductDetailView;
