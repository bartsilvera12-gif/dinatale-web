/* Reusable atoms: ProductCard, CategoryCard, Stars, Toast, QuickView, ReviewCard, BlogCard, SectionTitle, FloralAccents */

const Stars = ({ value = 5, size = 14 }) => {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} de 5`}>
      {[0,1,2,3,4].map((i) => (
        <window.Icon key={i} name="star" size={size} color={i < full ? "#E84DA3" : "#F5D5E8"} />
      ))}
    </span>
  );
};

const SectionTitle = ({ eyebrow, title, sub, center, dark }) => (
  <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? 720 : 640, margin: center ? "0 auto" : 0, marginBottom: 36 }}>
    {eyebrow && <div className={"eyebrow " + (center ? "center" : "")} style={{ marginBottom: 16, color: dark ? "var(--c-primary)" : "var(--c-primary-deep)" }}>{eyebrow}</div>}
    <h2 className="h-display" style={{ fontSize: "clamp(28px, 4.4vw, 46px)", margin: "0 0 14px", color: dark ? "white" : undefined }} dangerouslySetInnerHTML={{ __html: title }} />
    {sub && <p style={{ color: dark ? "rgba(255,255,255,0.78)" : "var(--c-mute)", fontSize: 16, margin: 0, lineHeight: 1.6 }}>{sub}</p>}
  </div>
);

const FloralAccent = ({ style, color = "#E84DA3", size = 100 }) => (
  <svg className="floral" width={size} height={size} viewBox="0 0 100 100" style={style} aria-hidden="true">
    <g fill="none" stroke={color} strokeWidth="0.8" opacity="0.55">
      <path d="M50 12c10 8 18 22 18 38s-8 30-18 38c-10-8-18-22-18-38S40 20 50 12Z" />
      <path d="M12 50c8-10 22-18 38-18s30 8 38 18c-8 10-22 18-38 18S20 60 12 50Z" />
      <circle cx="50" cy="50" r="6" />
    </g>
  </svg>
);

const Tag = ({ tag }) => {
  if (!tag) return null;
  const map = {
    new: { cls: "badge--new", label: "Nuevo" },
    sale: { cls: "badge--sale", label: "Promoción" },
    top: { cls: "badge--top", label: "Más vendido" },
    rec: { cls: "badge--rec", label: "Recomendado" }
  };
  const t = map[tag];
  if (!t) return null;
  return <span className={"badge " + t.cls}>{t.label}</span>;
};

const ProductCard = ({ product, onQuick }) => {
  const { addToCart, setRoute } = useStore();
  const stock = stockState(product.stock);
  const out = stock.kind === "out";
  const wa = waLink(`Hola, quiero consultar por ${product.name}.`);
  return (
    <article className="card" style={{ display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "relative", aspectRatio: "1 / 1", background: "var(--c-rose-50)", overflow: "hidden", cursor: "pointer" }}
           onClick={() => setRoute("product", { id: product.id })}>
        <img src={product.images[0]} alt={product.name} loading="lazy"
             style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease" }}
             onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.06)"}
             onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Tag tag={product.tag} />
          {product.oldPrice && product.tag !== "sale" && <Tag tag="sale" />}
        </div>
        <button className="btn btn--ghost btn--sm" style={{ position: "absolute", bottom: 12, right: 12, padding: "8px 12px" }}
                onClick={(e) => { e.stopPropagation(); onQuick && onQuick(product); }}>
          Vista rápida
        </button>
      </div>
      <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-mute)" }}>
            {CATEGORIES.find((c) => c.id === product.category)?.name}
          </span>
          <span className={"badge " + stock.badge}>{stock.label}</span>
        </div>
        <h3 style={{ margin: 0, fontFamily: "var(--ff-serif)", fontSize: 19, fontWeight: 500, lineHeight: 1.2, color: "var(--c-ink)", cursor: "pointer" }}
            onClick={() => setRoute("product", { id: product.id })}>{product.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Stars value={product.rating} />
          <span style={{ fontSize: 12, color: "var(--c-mute)" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: "var(--c-ink)" }}>{fmtGs(product.price)}</span>
          {product.oldPrice && <span style={{ fontSize: 13, color: "var(--c-mute)", textDecoration: "line-through" }}>{fmtGs(product.oldPrice)}</span>}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 6 }}>
          {out ? (
            <a className="btn btn--wa btn--sm btn--block" href={wa} target="_blank" rel="noreferrer">
              <window.Icon name="wa" size={14} color="white" />
              Consultar
            </a>
          ) : (
            <React.Fragment>
              <button className="btn btn--primary btn--sm" style={{ flex: 1 }} onClick={() => addToCart(product.id, 1)}>
                <window.Icon name="cart" size={14} color="white" />
                Añadir
              </button>
              <a className="btn btn--ghost btn--sm" href={wa} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp">
                <window.Icon name="wa" size={14} color="#25D366" />
              </a>
            </React.Fragment>
          )}
        </div>
      </div>
    </article>
  );
};

const CategoryCard = ({ cat, onClick }) => (
  <article className="card" style={{ overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column" }} onClick={onClick}>
    <div style={{ aspectRatio: "4 / 3", background: "var(--c-rose-50)", overflow: "hidden", position: "relative" }}>
      <img src={cat.img} alt={cat.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease" }}
           onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
           onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(31,23,32,0.45) 100%)" }}/>
    </div>
    <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
      <h3 style={{ margin: 0, fontFamily: "var(--ff-serif)", fontSize: 22, fontWeight: 500, color: "var(--c-ink)" }}>{cat.name}</h3>
      <p style={{ margin: 0, color: "var(--c-mute)", fontSize: 14, lineHeight: 1.5 }}>{cat.desc}</p>
      <span className="ulink" style={{ marginTop: 6, alignSelf: "flex-start", fontSize: 13 }}>Ver productos →</span>
    </div>
  </article>
);

const ReviewCard = ({ r }) => (
  <article className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, position: "relative", overflow: "hidden" }}>
    <window.Icon name="quote" size={32} color="#FCE7F3" style={{ position: "absolute", top: 14, right: 16 }} />
    <Stars value={r.rating} />
    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--c-ink-2)", fontFamily: "var(--ff-serif)", fontWeight: 400, fontStyle: "italic" }}>"{r.text}"</p>
    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, paddingTop: 12, borderTop: "1px solid var(--c-border-soft)" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--grad-brand-soft)", display: "grid", placeItems: "center", color: "white", fontWeight: 600, fontSize: 14 }}>
        {r.name.split(" ").map((s) => s[0]).join("").slice(0,2)}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
        <div style={{ fontSize: 12, color: "var(--c-mute)" }}>{r.product} · vía {r.channel}</div>
      </div>
    </div>
  </article>
);

const BlogCard = ({ a }) => (
  <article className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer" }}>
    <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "var(--c-rose-50)" }}>
      <img src={a.img} alt={a.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: "var(--c-mute)" }}>
        <span style={{ color: "var(--c-primary-deep)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>{a.cat}</span>
        <span>·</span>
        <span>{a.date}</span>
        <span>·</span>
        <span>{a.read} lectura</span>
      </div>
      <h3 style={{ margin: 0, fontFamily: "var(--ff-serif)", fontSize: 22, fontWeight: 500, lineHeight: 1.25 }}>{a.title}</h3>
      <p style={{ margin: 0, color: "var(--c-mute)", fontSize: 14, lineHeight: 1.6 }}>{a.excerpt}</p>
      <span className="ulink" style={{ marginTop: 6, alignSelf: "flex-start", fontSize: 13 }}>Leer artículo →</span>
    </div>
  </article>
);

const Toast = () => {
  const { toast, setRoute } = useStore();
  if (!toast) return null;
  return (
    <div style={{ position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)", zIndex: 60, background: "white", padding: "12px 18px", borderRadius: 999, boxShadow: "var(--shadow-3)", display: "flex", alignItems: "center", gap: 14, border: "1px solid var(--c-border-soft)", animation: "viewFade 240ms ease both" }}>
      <window.Icon name="check" size={16} color="#2E8F66" />
      <span style={{ fontSize: 14, fontWeight: 500 }}>{toast.msg}</span>
      {toast.to && (
        <button className="ulink" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13 }} onClick={() => setRoute(toast.to)}>{toast.action}</button>
      )}
    </div>
  );
};

const QuickView = () => {
  const { quickView, setQuickView, addToCart } = useStore();
  if (!quickView) return null;
  const p = quickView;
  const stock = stockState(p.stock);
  const out = stock.kind === "out";
  return (
    <div role="dialog" aria-modal="true" style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(31,23,32,0.4)", backdropFilter: "blur(6px)", display: "grid", placeItems: "center", padding: 20, animation: "viewFade 200ms ease both" }} onClick={() => setQuickView(null)}>
      <div className="card" style={{ background: "white", maxWidth: 880, width: "100%", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", overflow: "hidden", position: "relative" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setQuickView(null)} aria-label="Cerrar" style={{ position: "absolute", top: 12, right: 12, background: "white", border: "1px solid var(--c-border)", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "grid", placeItems: "center", zIndex: 2 }}>
          <window.Icon name="close" size={16} />
        </button>
        <div style={{ aspectRatio: "1 / 1", background: "var(--c-rose-50)" }}>
          <img src={p.images[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-mute)" }}>{CATEGORIES.find((c) => c.id === p.category)?.name}</span>
          <h2 style={{ margin: 0, fontFamily: "var(--ff-serif)", fontWeight: 500, fontSize: 28, lineHeight: 1.15 }}>{p.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Stars value={p.rating} /><span style={{ fontSize: 13, color: "var(--c-mute)" }}>({p.reviews})</span></div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 24, fontWeight: 600 }}>{fmtGs(p.price)}</span>
            {p.oldPrice && <span style={{ fontSize: 14, color: "var(--c-mute)", textDecoration: "line-through" }}>{fmtGs(p.oldPrice)}</span>}
          </div>
          <span className={"badge " + stock.badge} style={{ alignSelf: "flex-start" }}>{stock.label}</span>
          <p style={{ margin: 0, color: "var(--c-mute)", fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
          <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
            {out ? (
              <a className="btn btn--wa btn--block" href={waLink(`Hola, quiero consultar disponibilidad de ${p.name}.`)} target="_blank" rel="noreferrer">
                <window.Icon name="wa" size={16} color="white" /> Consultar disponibilidad
              </a>
            ) : (
              <React.Fragment>
                <button className="btn btn--primary" style={{ flex: 1 }} onClick={() => { addToCart(p.id, 1); setQuickView(null); }}>
                  <window.Icon name="cart" size={16} color="white" /> Añadir al carrito
                </button>
                <a className="btn btn--ghost" href={waLink(`Hola, quiero consultar por ${p.name}.`)} target="_blank" rel="noreferrer">
                  <window.Icon name="wa" size={16} color="#25D366" />
                </a>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Stars, SectionTitle, FloralAccent, Tag, ProductCard, CategoryCard, ReviewCard, BlogCard, Toast, QuickView });
