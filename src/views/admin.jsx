/* ─── Panel de Administración DI NATALE ─── */

const ADMIN_USER = "admin";
const ADMIN_PASS = "dinatale2026";

/* ── Select elegante (custom) ──────────────────────────────── */
const AdmSelect = ({ value, onChange, children, style }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  const options = React.Children.map(children, (c) => ({ value: c.props.value, label: c.props.children }));
  const selected = options.find((o) => String(o.value) === String(value)) || options[0];

  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (opt) => {
    onChange({ target: { value: opt.value } });
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative", userSelect: "none", ...style }}>
      <button type="button" onClick={() => setOpen((v) => !v)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
        fontSize: 14, color: "var(--c-ink)", background: "white", textAlign: "left",
        border: open ? "1.5px solid var(--c-primary)" : "1.5px solid var(--c-border)",
        boxShadow: open ? "0 0 0 3px rgba(232,77,163,0.10)" : "none",
        transition: "border-color .2s, box-shadow .2s"
      }}>
        <span>{selected?.label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-mute)" strokeWidth="2.5" strokeLinecap="round"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 999,
          background: "white", borderRadius: 14, padding: "6px",
          border: "1.5px solid var(--c-border)",
          boxShadow: "0 12px 40px -8px rgba(200,38,138,0.15), 0 4px 12px rgba(0,0,0,0.08)",
          animation: "admDropIn 0.15s ease"
        }}>
          {options.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <div key={opt.value} onClick={() => pick(opt)} style={{
                padding: "10px 14px", cursor: "pointer", fontSize: 14, borderRadius: 9,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                color: isSelected ? "var(--c-primary-deep)" : "var(--c-ink)",
                fontWeight: isSelected ? 600 : 400,
                transition: "background .12s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--c-rose-50)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? "var(--c-rose-50)" : "transparent"; }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
      <style>{`@keyframes admDropIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:none } }`}</style>
    </div>
  );
};

/* ── Gestor de imágenes ────────────────────────────────────── */
const ImageManager = ({ images, onChange }) => {
  const [newUrl, setNewUrl] = React.useState("");
  const add = () => {
    const url = newUrl.trim();
    if (!url) return;
    onChange([...images, url]);
    setNewUrl("");
  };
  const remove = (i) => onChange(images.filter((_, idx) => idx !== i));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {images.map((src, i) => (
          <div key={i} style={{ position: "relative", width: 64, height: 64 }}>
            <img src={src || window.DN_IMG_FALLBACK} onError={window.imgFallback} alt=""
              style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", border: "1.5px solid var(--c-border)" }} />
            <button onClick={() => remove(i)} style={{
              position: "absolute", top: -6, right: -6, width: 20, height: 20,
              borderRadius: "50%", background: "var(--c-danger)", color: "white",
              border: "none", cursor: "pointer", fontSize: 11, display: "grid", placeItems: "center", lineHeight: 1
            }}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Pegar URL de imagen y presionar +"
          style={{ flex: 1, padding: "9px 14px", borderRadius: 10, border: "1.5px solid var(--c-border)", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
        <button onClick={add} style={{
          width: 38, height: 38, borderRadius: 10, background: "var(--grad-brand)", color: "white",
          border: "none", cursor: "pointer", fontSize: 20, display: "grid", placeItems: "center", flexShrink: 0
        }}>+</button>
      </div>
    </div>
  );
};

/* ── Login ─────────────────────────────────────────────────── */
const AdminLogin = ({ onAuth }) => {
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [shake, setShake] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      onAuth();
    } else {
      setErr(true); setShake(true);
      setTimeout(() => { setErr(false); setShake(false); }, 1800);
    }
  };

  const inputStyle = (hasErr) => ({
    width: "100%", boxSizing: "border-box", padding: "14px 18px", borderRadius: 12,
    border: `1.5px solid ${hasErr ? "var(--c-danger)" : "var(--c-border)"}`,
    fontSize: 15, outline: "none", fontFamily: "inherit", transition: "border-color .2s"
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--grad-soft)" }}>
      <div style={{
        background: "white", borderRadius: 24, padding: "52px 44px", width: "min(400px, 90vw)",
        boxShadow: "0 12px 48px rgba(200,38,138,0.14)",
        animation: shake ? "adm-shake 0.4s ease" : "none"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
            <span className="dn-mark"><span className="dn-mark__icon"/><span className="dn-mark__word">DI Natale</span></span>
            <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--c-mute)", textTransform: "uppercase", paddingLeft: 50 }}>by Letizia</span>
          </div>
          <span style={{ background: "var(--c-rose-100)", color: "var(--c-primary-deep)", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 99, letterSpacing: ".05em" }}>ADMIN</span>
        </div>
        <h2 style={{ fontFamily: "var(--ff-serif)", fontSize: 26, margin: "0 0 8px" }}>Panel de administración</h2>
        <p style={{ color: "var(--c-mute)", fontSize: 14, marginBottom: 30, lineHeight: 1.5 }}>Ingresá tus credenciales para acceder.</p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--c-mute)", marginBottom: 6, letterSpacing: ".05em" }}>USUARIO</label>
            <input
              type="text" value={user} onChange={(e) => setUser(e.target.value)}
              placeholder="admin" autoFocus autoComplete="username"
              style={inputStyle(err)}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--c-mute)", marginBottom: 6, letterSpacing: ".05em" }}>CONTRASEÑA</label>
            <input
              type="password" value={pass} onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••••" autoComplete="current-password"
              style={inputStyle(err)}
            />
          </div>
          {err && <p style={{ color: "var(--c-danger)", fontSize: 13, margin: 0 }}>Usuario o contraseña incorrectos.</p>}
          <button type="submit" className="btn btn--primary btn--block btn--lg" style={{ marginTop: 4 }}>Ingresar</button>
        </form>
      </div>
      <style>{`@keyframes adm-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-9px)} 60%{transform:translateX(9px)} 80%{transform:translateX(-4px)} }`}</style>
    </div>
  );
};

/* ── Stat Card ─────────────────────────────────────────────── */
const StatCard = ({ label, value, sub, color, icon }) => {
  const c = color || "var(--c-primary)";
  return (
    <div className="card" style={{ padding: "24px 28px", display: "flex", gap: 18, alignItems: "center" }}>
      <div style={{ width: 54, height: 54, borderRadius: 16, background: c + "18", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <window.Icon name={icon} size={22} color={c} />
      </div>
      <div>
        <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "var(--ff-serif)", color: "var(--c-ink)", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: "var(--c-mute)", marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: c, marginTop: 3, fontWeight: 600 }}>{sub}</div>}
      </div>
    </div>
  );
};

/* ── Tag Pill ──────────────────────────────────────────────── */
const TagPill = ({ tag }) => {
  const map = {
    top:  { label: "Top",    bg: "#FEF3C7", color: "#92400E" },
    new:  { label: "Nuevo",  bg: "#DCFCE7", color: "#166534" },
    sale: { label: "Oferta", bg: "#FEE2E2", color: "#991B1B" },
    rec:  { label: "Rec.",   bg: "#EDE9FE", color: "#5B21B6" },
  };
  if (!tag) return <span style={{ color: "var(--c-mute)", fontSize: 12 }}>—</span>;
  const t = map[tag] || { label: tag, bg: "#F3F4F6", color: "#374151" };
  return <span style={{ background: t.bg, color: t.color, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>{t.label}</span>;
};

/* ── Dashboard ─────────────────────────────────────────────── */
const Dashboard = ({ products, reviews }) => {
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock   = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const avgRating  = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "—";

  const activity = [
    { text: "Stock actualizado en 'Sérum Iluminador'",   time: "Hace 2h",  icon: "check"   },
    { text: "Nueva reseña de Camila R. — ⭐ 5 estrellas", time: "Hace 5h",  icon: "star"    },
    { text: "Pedido enviado por WhatsApp",                time: "Hace 1d",  icon: "wa"      },
    { text: "Artículo publicado en el blog",              time: "Hace 2d",  icon: "leaf"    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <h2 style={{ fontFamily: "var(--ff-serif)", fontSize: 28, margin: "0 0 4px" }}>Dashboard</h2>
        <p style={{ color: "var(--c-mute)", fontSize: 14, margin: 0 }}>Resumen general del negocio.</p>
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <StatCard label="Productos" value={products.length} sub={`${outOfStock} sin stock · ${lowStock} bajo`} icon="sparkle" />
        <StatCard label="Unidades en stock" value={totalStock} icon="cart" color="var(--c-success)" />
        <StatCard label="Reseñas" value={reviews.length} sub={`Promedio ⭐ ${avgRating}`} icon="star" color="#F59E0B" />
        <StatCard label="Artículos" value={window.ARTICLES.length} icon="leaf" color="#6366F1" />
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }} className="adm-2col">
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 18, margin: "0 0 18px" }}>⚠️ Alertas de stock</h3>
          {products.filter((p) => p.stock <= 5).length === 0
            ? <p style={{ color: "var(--c-mute)", fontSize: 14, margin: 0 }}>✓ Todo el stock está en orden.</p>
            : products.filter((p) => p.stock <= 5).map((p) => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--c-border-soft)", fontSize: 13 }}>
                <span style={{ fontWeight: 500 }}>{p.name}</span>
                <span style={{ color: p.stock === 0 ? "var(--c-danger)" : "var(--c-warn)", fontWeight: 700 }}>
                  {p.stock === 0 ? "Sin stock" : `${p.stock} uds`}
                </span>
              </div>
            ))
          }
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 18, margin: "0 0 18px" }}>📋 Actividad reciente</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 13 }}>
                <div style={{ width: 32, height: 32, borderRadius: 99, background: "var(--c-rose-50)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <window.Icon name={a.icon} size={13} color="var(--c-primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 500 }}>{a.text}</div>
                  <div style={{ color: "var(--c-mute)", fontSize: 12, marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Productos ─────────────────────────────────────────────── */
const ProductsSection = ({ products, setProducts, loading }) => {
  const [editing, setEditing] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [filterCat, setFilterCat] = React.useState("all");
  const [saved, setSaved] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [saveErr, setSaveErr] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState(null);
  const [deleting, setDeleting] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [newData, setNewData] = React.useState({});
  const [creating, setCreating] = React.useState(false);
  const [createErr, setCreateErr] = React.useState(null);

  const filtered = products.filter((p) => {
    const matchQ   = !search.trim() || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchQ && matchCat;
  });

  const startEdit = (p) => { setEditing(p.id); setEditData({ price: p.price, stock: p.stock, tag: p.tag ?? "", oldPrice: p.oldPrice ?? "", imageUrl: p.images[0] ?? "" }); };
  const cancelEdit = () => { setEditing(null); setEditData({}); setSaveErr(null); };

  const openNew = () => { setNewData({ name: "", category_id: window.CATEGORIES[0]?.id || "", price: "", oldPrice: "", stock: "", tag: "", images: [], description: "" }); setCreateErr(null); setShowNew(true); };

  const createProduct = async () => {
    if (!newData.name.trim() || !newData.price) { setCreateErr("Nombre y precio son obligatorios."); return; }
    setCreating(true); setCreateErr(null);
    try {
      const row = await window.createDNProduct(newData);
      const mapped = window.mapProduct(row);
      const updated = [mapped, ...products];
      setProducts(updated);
      window.PRODUCTS = updated;
      setShowNew(false);
    } catch(e) {
      setCreateErr("Error al crear el producto. Reintentá.");
    } finally {
      setCreating(false);
    }
  };

  const deleteProduct = async (id) => {
    setDeleting(true);
    try {
      await window.deleteDNProduct(id);
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      window.PRODUCTS = updated;
      setConfirmDelete(null);
    } catch(e) {
      alert("Error al eliminar el producto. Reintentá.");
    } finally {
      setDeleting(false);
    }
  };

  const saveEdit = async (id) => {
    setSaving(true); setSaveErr(null);
    try {
      const newImages = editData.imageUrl.trim() ? [editData.imageUrl.trim()] : products.find(p => p.id === id).images;
      await window.updateDNProduct(id, {
        price:    Number(editData.price)    || products.find(p => p.id === id).price,
        stock:    Math.max(0, Number(editData.stock) || 0),
        tag:      editData.tag || null,
        oldPrice: editData.oldPrice ? Number(editData.oldPrice) : null,
        images:   newImages
      });
      const updated = products.map((p) => p.id === id
        ? { ...p, price: Number(editData.price) || p.price, stock: Math.max(0, Number(editData.stock) || 0), tag: editData.tag || null, oldPrice: editData.oldPrice ? Number(editData.oldPrice) : null, images: newImages }
        : p
      );
      setProducts(updated);
      window.PRODUCTS = updated;
      setEditing(null);
      setSaved(id);
      setTimeout(() => setSaved(null), 2500);
    } catch(e) {
      setSaveErr("Error al guardar. Reintentá.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--ff-serif)", fontSize: 28, margin: "0 0 4px" }}>Productos</h2>
          <p style={{ color: "var(--c-mute)", fontSize: 14, margin: 0 }}>{products.length} productos en catálogo.</p>
        </div>
        <button onClick={openNew} className="btn btn--primary btn--sm" style={{ gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nuevo producto
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <window.Icon name="search" size={15} color="var(--c-mute)" />
          </span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto..."
            style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px 11px 38px", borderRadius: 10, border: "1.5px solid var(--c-border)", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
          style={{ padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--c-border)", fontSize: 13, fontFamily: "inherit", outline: "none", background: "white" }}>
          <option value="all">Todas las categorías</option>
          {window.CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {showNew && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(31,23,32,0.45)", display: "grid", placeItems: "center", padding: 20 }}
             onClick={() => !creating && setShowNew(false)}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 520, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}
               onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 24, margin: "0 0 24px" }}>Nuevo producto</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Nombre *", key: "name", type: "text", placeholder: "Ej: Sérum Vitamina C" },
                { label: "Precio *", key: "price", type: "number", placeholder: "195000" },
                { label: "Precio anterior", key: "oldPrice", type: "number", placeholder: "220000" },
                { label: "Stock", key: "stock", type: "number", placeholder: "10" },
                { label: "Descripción", key: "description", type: "text", placeholder: "Breve descripción del producto" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--c-mute)", marginBottom: 5, letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</label>
                  <input type={type} value={newData[key] || ""} onChange={(e) => setNewData((d) => ({ ...d, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--c-border)", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "border-color .2s" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--c-primary)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--c-border)"} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--c-mute)", marginBottom: 5, letterSpacing: ".06em", textTransform: "uppercase" }}>Categoría</label>
                <AdmSelect value={newData.category_id || ""} onChange={(e) => setNewData((d) => ({ ...d, category_id: e.target.value }))}>
                  {window.CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </AdmSelect>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--c-mute)", marginBottom: 5, letterSpacing: ".06em", textTransform: "uppercase" }}>Tag</label>
                <AdmSelect value={newData.tag || ""} onChange={(e) => setNewData((d) => ({ ...d, tag: e.target.value }))}>
                  <option value="">Sin tag</option>
                  <option value="new">Nuevo</option>
                  <option value="top">Top</option>
                  <option value="sale">Oferta</option>
                  <option value="rec">Recomendado</option>
                </AdmSelect>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--c-mute)", marginBottom: 5, letterSpacing: ".06em", textTransform: "uppercase" }}>Imágenes</label>
                <ImageManager images={newData.images || []} onChange={(imgs) => setNewData((d) => ({ ...d, images: imgs }))} />
              </div>
              {createErr && <p style={{ color: "var(--c-danger)", fontSize: 13, margin: 0 }}>{createErr}</p>}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowNew(false)} disabled={creating} className="btn btn--ghost btn--block">Cancelar</button>
              <button onClick={createProduct} disabled={creating} className="btn btn--primary btn--block">
                {creating ? "Creando..." : "Crear producto"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(31,23,32,0.45)", display: "grid", placeItems: "center", padding: 20 }}
             onClick={() => !deleting && setConfirmDelete(null)}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 400, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
               onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12, textAlign: "center" }}>🗑️</div>
            <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 22, margin: "0 0 10px", textAlign: "center" }}>¿Eliminar producto?</h3>
            <p style={{ color: "var(--c-mute)", fontSize: 14, textAlign: "center", margin: "0 0 24px", lineHeight: 1.5 }}>
              <strong>{confirmDelete.name}</strong> será eliminado permanentemente de la base de datos.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} disabled={deleting} className="btn btn--ghost btn--block">Cancelar</button>
              <button onClick={() => deleteProduct(confirmDelete.id)} disabled={deleting}
                style={{ flex: 1, padding: "12px 0", borderRadius: 999, background: "var(--c-danger)", color: "white", border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                {deleting ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--c-rose-50)", borderBottom: "1.5px solid var(--c-border-soft)" }}>
                {["Producto", "Categoría", "Precio", "Stock", "Tag", "Rating", ""].map((h, i) => (
                  <th key={i} style={{ padding: "13px 16px", textAlign: "left", fontWeight: 600, fontSize: 11.5, color: "var(--c-mute)", letterSpacing: ".06em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isEdit  = editing === p.id;
                const isSaved = saved === p.id;
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--c-border-soft)", background: isEdit ? "var(--c-rose-50)" : isSaved ? "#F0FDF4" : "white", transition: "background .35s" }}>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 9, overflow: "hidden", background: "var(--c-rose-50)", flexShrink: 0 }}>
                          <img src={(isEdit ? editData.imageUrl : null) || p.images[0] || window.DN_IMG_FALLBACK} alt="" onError={window.imgFallback} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <span style={{ fontWeight: 500, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", fontSize: 13 }}>{p.name}</span>
                          {isEdit && (
                            <input
                              type="url"
                              value={editData.imageUrl}
                              onChange={(e) => setEditData((d) => ({ ...d, imageUrl: e.target.value }))}
                              placeholder="URL de imagen..."
                              style={{ marginTop: 4, width: 180, padding: "4px 8px", border: "1.5px solid var(--c-border)", borderRadius: 7, fontSize: 11, outline: "none", fontFamily: "inherit", color: "var(--c-mute)" }}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px", color: "var(--c-mute)", whiteSpace: "nowrap" }}>
                      {window.CATEGORIES.find((c) => c.id === p.category)?.name ?? p.category}
                    </td>
                    <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                      {isEdit
                        ? <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <input type="number" value={editData.price} onChange={(e) => setEditData((d) => ({ ...d, price: e.target.value }))}
                              placeholder="Precio" style={{ width: 108, padding: "5px 8px", border: "1.5px solid var(--c-primary)", borderRadius: 7, fontSize: 12, outline: "none", fontFamily: "inherit" }} />
                            <input type="number" value={editData.oldPrice} onChange={(e) => setEditData((d) => ({ ...d, oldPrice: e.target.value }))}
                              placeholder="Ant." style={{ width: 108, padding: "5px 8px", border: "1.5px solid var(--c-border)", borderRadius: 7, fontSize: 11, outline: "none", fontFamily: "inherit", color: "var(--c-mute)" }} />
                          </div>
                        : <div>
                            <span style={{ fontWeight: 600 }}>{fmtGs(p.price)}</span>
                            {p.oldPrice && <div style={{ fontSize: 11, color: "var(--c-mute)", textDecoration: "line-through" }}>{fmtGs(p.oldPrice)}</div>}
                          </div>
                      }
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {isEdit
                        ? <input type="number" min="0" value={editData.stock} onChange={(e) => setEditData((d) => ({ ...d, stock: e.target.value }))}
                            style={{ width: 58, padding: "5px 8px", border: "1.5px solid var(--c-primary)", borderRadius: 7, fontSize: 12, outline: "none", fontFamily: "inherit" }} />
                        : <span style={{ color: p.stock === 0 ? "var(--c-danger)" : p.stock <= 5 ? "var(--c-warn)" : "var(--c-success)", fontWeight: 700 }}>
                            {p.stock === 0 ? "Sin stock" : p.stock}
                          </span>
                      }
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {isEdit
                        ? <AdmSelect value={editData.tag} onChange={(e) => setEditData((d) => ({ ...d, tag: e.target.value }))} style={{ maxWidth: 110 }}>
                            <option value="">Sin tag</option>
                            <option value="top">Top</option>
                            <option value="new">Nuevo</option>
                            <option value="sale">Oferta</option>
                            <option value="rec">Rec.</option>
                          </AdmSelect>
                        : <TagPill tag={p.tag} />
                      }
                    </td>
                    <td style={{ padding: "10px 12px", color: "#F59E0B", fontWeight: 700, whiteSpace: "nowrap" }}>
                      ⭐ {p.rating} <span style={{ color: "var(--c-mute)", fontWeight: 400, fontSize: 12 }}>({p.reviews})</span>
                    </td>
                    <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                      {saveErr && isEdit && <div style={{ color: "var(--c-danger)", fontSize: 11, marginBottom: 4 }}>{saveErr}</div>}
                      {isEdit
                        ? <div style={{ display: "flex", gap: 5 }}>
                            <button onClick={() => saveEdit(p.id)} disabled={saving} className="btn btn--primary btn--sm" style={{ padding: "6px 12px", fontSize: 12 }}>{saving ? "..." : "Guardar"}</button>
                            <button onClick={cancelEdit} className="btn btn--ghost btn--sm" style={{ padding: "6px 10px", fontSize: 12 }}>✕</button>
                          </div>
                        : <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                            {isSaved && <span style={{ color: "var(--c-success)", fontSize: 12, fontWeight: 700, marginRight: 4 }}>✓</span>}
                            <button onClick={() => startEdit(p)} className="btn btn--ghost btn--sm" style={{ padding: "6px 12px", fontSize: 12 }}>Editar</button>
                            <button onClick={() => setConfirmDelete(p)} title="Eliminar producto"
                              style={{ width: 32, height: 32, display: "grid", placeItems: "center", background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: 8, cursor: "pointer", flexShrink: 0 }}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                              </svg>
                            </button>
                          </div>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--c-mute)", fontSize: 14 }}>
              No se encontraron productos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Reseñas ───────────────────────────────────────────────── */
const CHANNELS = ["WhatsApp", "Instagram", "Facebook", "Google", "Otro"];

const ReviewsSection = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = React.useState(initialReviews);
  const [editing, setEditing] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [saving, setSaving] = React.useState(false);
  const [saveErr, setSaveErr] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState(null);
  const [deleting, setDeleting] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [newData, setNewData] = React.useState({});
  const [creating, setCreating] = React.useState(false);
  const [createErr, setCreateErr] = React.useState(null);

  const startEdit = (r) => { setEditing(r.id); setEditData({ name: r.name, text: r.text, rating: r.rating, product: r.product, channel: r.channel }); setSaveErr(null); };
  const cancelEdit = () => { setEditing(null); setEditData({}); setSaveErr(null); };

  const saveEdit = async (id) => {
    setSaving(true); setSaveErr(null);
    try {
      await window.updateDNReview(id, editData);
      const updated = reviews.map((r) => r.id === id ? { ...r, ...editData } : r);
      setReviews(updated);
      window.REVIEWS = updated;
      setEditing(null);
    } catch(e) {
      setSaveErr("Error al guardar. Reintentá.");
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (id) => {
    setDeleting(true);
    try {
      await window.deleteDNReview(id);
      const updated = reviews.filter((r) => r.id !== id);
      setReviews(updated);
      window.REVIEWS = updated;
      setConfirmDelete(null);
    } catch(e) {
      alert("Error al eliminar la reseña. Reintentá.");
    } finally {
      setDeleting(false);
    }
  };

  const openNew = () => { setNewData({ name: "", text: "", rating: 5, product: "", channel: "WhatsApp" }); setCreateErr(null); setShowNew(true); };

  const createReview = async () => {
    if (!newData.name.trim() || !newData.text.trim()) { setCreateErr("Nombre y texto son obligatorios."); return; }
    setCreating(true); setCreateErr(null);
    try {
      const row = await window.createDNReview(newData);
      const mapped = { id: row.id, name: row.name, text: row.text, rating: row.rating, product: row.product, channel: row.channel };
      const updated = [mapped, ...reviews];
      setReviews(updated);
      window.REVIEWS = updated;
      setShowNew(false);
    } catch(e) {
      setCreateErr("Error al crear la reseña. Reintentá.");
    } finally {
      setCreating(false);
    }
  };

  const inputStyle = { width: "100%", boxSizing: "border-box", padding: "9px 12px", borderRadius: 9, border: "1.5px solid var(--c-primary)", fontSize: 13, outline: "none", fontFamily: "inherit" };
  const modalInputStyle = { width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--c-border)", fontSize: 14, outline: "none", fontFamily: "inherit" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--ff-serif)", fontSize: 28, margin: "0 0 4px" }}>Reseñas</h2>
          <p style={{ color: "var(--c-mute)", fontSize: 14, margin: 0 }}>{reviews.length} reseñas de clientes.</p>
        </div>
        <button onClick={openNew} className="btn btn--primary btn--sm" style={{ gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nueva reseña
        </button>
      </div>

      {/* Modal nueva reseña */}
      {showNew && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(31,23,32,0.45)", display: "grid", placeItems: "center", padding: 20 }}
             onClick={() => !creating && setShowNew(false)}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 500, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}
               onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 24, margin: "0 0 24px" }}>Nueva reseña</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Nombre *", key: "name", placeholder: "Ej: Camila R." },
                { label: "Producto", key: "product", placeholder: "Ej: Sérum Vitamina C" },
                { label: "Texto *", key: "text", placeholder: "Comentario de la clienta...", textarea: true },
              ].map(({ label, key, placeholder, textarea }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--c-mute)", marginBottom: 5, letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</label>
                  {textarea
                    ? <textarea value={newData[key] || ""} onChange={(e) => setNewData((d) => ({ ...d, [key]: e.target.value }))} placeholder={placeholder} rows={3}
                        style={{ ...modalInputStyle, resize: "vertical" }}
                        onFocus={(e) => e.target.style.borderColor = "var(--c-primary)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--c-border)"} />
                    : <input value={newData[key] || ""} onChange={(e) => setNewData((d) => ({ ...d, [key]: e.target.value }))} placeholder={placeholder}
                        style={modalInputStyle}
                        onFocus={(e) => e.target.style.borderColor = "var(--c-primary)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--c-border)"} />
                  }
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--c-mute)", marginBottom: 5, letterSpacing: ".06em", textTransform: "uppercase" }}>Canal</label>
                <AdmSelect value={newData.channel || "WhatsApp"} onChange={(e) => setNewData((d) => ({ ...d, channel: e.target.value }))}>
                  {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
                </AdmSelect>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--c-mute)", marginBottom: 5, letterSpacing: ".06em", textTransform: "uppercase" }}>Calificación</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1,2,3,4,5].map((n) => (
                    <button key={n} type="button" onClick={() => setNewData((d) => ({ ...d, rating: n }))}
                      style={{ fontSize: 22, background: "none", border: "none", cursor: "pointer", opacity: n <= (newData.rating || 5) ? 1 : 0.25, transition: "opacity .15s" }}>⭐</button>
                  ))}
                </div>
              </div>
              {createErr && <p style={{ color: "var(--c-danger)", fontSize: 13, margin: 0 }}>{createErr}</p>}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowNew(false)} disabled={creating} className="btn btn--ghost btn--block">Cancelar</button>
              <button onClick={createReview} disabled={creating} className="btn btn--primary btn--block">
                {creating ? "Creando..." : "Crear reseña"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmar eliminar */}
      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(31,23,32,0.45)", display: "grid", placeItems: "center", padding: 20 }}
             onClick={() => !deleting && setConfirmDelete(null)}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 400, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
               onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12, textAlign: "center" }}>🗑️</div>
            <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 22, margin: "0 0 10px", textAlign: "center" }}>¿Eliminar reseña?</h3>
            <p style={{ color: "var(--c-mute)", fontSize: 14, textAlign: "center", margin: "0 0 24px", lineHeight: 1.5 }}>
              La reseña de <strong>{confirmDelete.name}</strong> será eliminada permanentemente.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} disabled={deleting} className="btn btn--ghost btn--block">Cancelar</button>
              <button onClick={() => deleteReview(confirmDelete.id)} disabled={deleting}
                style={{ flex: 1, padding: "12px 0", borderRadius: 999, background: "var(--c-danger)", color: "white", border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                {deleting ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {reviews.map((r) => {
          const isEdit = editing === r.id;
          return (
            <div key={r.id} className="card" style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start", background: isEdit ? "var(--c-rose-50)" : "white", transition: "background .3s" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--grad-brand)", display: "grid", placeItems: "center", flexShrink: 0, color: "white", fontWeight: 700, fontSize: 17 }}>
                {(isEdit ? editData.name : r.name)[0] || "?"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {isEdit ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <input value={editData.name} onChange={(e) => setEditData((d) => ({ ...d, name: e.target.value }))} placeholder="Nombre" style={{ ...inputStyle, flex: "1 1 140px" }} />
                      <input value={editData.product} onChange={(e) => setEditData((d) => ({ ...d, product: e.target.value }))} placeholder="Producto" style={{ ...inputStyle, flex: "1 1 140px" }} />
                    </div>
                    <textarea value={editData.text} onChange={(e) => setEditData((d) => ({ ...d, text: e.target.value }))} placeholder="Texto de la reseña..." rows={2}
                      style={{ ...inputStyle, resize: "vertical" }} />
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <AdmSelect value={editData.channel} onChange={(e) => setEditData((d) => ({ ...d, channel: e.target.value }))} style={{ minWidth: 130 }}>
                        {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </AdmSelect>
                      <div style={{ display: "flex", gap: 2 }}>
                        {[1,2,3,4,5].map((n) => (
                          <button key={n} type="button" onClick={() => setEditData((d) => ({ ...d, rating: n }))}
                            style={{ fontSize: 18, background: "none", border: "none", cursor: "pointer", opacity: n <= editData.rating ? 1 : 0.25, transition: "opacity .15s", padding: 0 }}>⭐</button>
                        ))}
                      </div>
                    </div>
                    {saveErr && <p style={{ color: "var(--c-danger)", fontSize: 12, margin: 0 }}>{saveErr}</p>}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => saveEdit(r.id)} disabled={saving} className="btn btn--primary btn--sm" style={{ padding: "7px 16px" }}>{saving ? "..." : "Guardar"}</button>
                      <button onClick={cancelEdit} className="btn btn--ghost btn--sm" style={{ padding: "7px 14px" }}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                        <span style={{ color: "var(--c-mute)", fontSize: 12, marginLeft: 10 }}>via {r.channel}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14 }}>{"⭐".repeat(r.rating)}</span>
                        <button onClick={() => startEdit(r)} className="btn btn--ghost btn--sm" style={{ padding: "5px 12px", fontSize: 12 }}>Editar</button>
                        <button onClick={() => setConfirmDelete(r)} title="Eliminar reseña"
                          style={{ width: 30, height: 30, display: "grid", placeItems: "center", background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: 8, cursor: "pointer", flexShrink: 0 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: "0 0 8px", fontSize: 14, lineHeight: 1.65, color: "var(--c-ink-2)" }}>{r.text}</p>
                    <span style={{ fontSize: 12, color: "var(--c-primary)", fontWeight: 600, background: "var(--c-rose-50)", padding: "3px 10px", borderRadius: 99 }}>{r.product}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
);

/* ── Artículos ─────────────────────────────────────────────── */
const ArticlesSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
    <div>
      <h2 style={{ fontFamily: "var(--ff-serif)", fontSize: 28, margin: "0 0 4px" }}>Artículos</h2>
      <p style={{ color: "var(--c-mute)", fontSize: 14, margin: 0 }}>{window.ARTICLES.length} artículos publicados.</p>
    </div>
    <div style={{ display: "grid", gap: 14 }}>
      {window.ARTICLES.map((a) => (
        <div key={a.id} className="card" style={{ padding: "18px 22px", display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: "var(--c-rose-50)" }}>
            <img src={a.img || window.DN_IMG_FALLBACK} alt="" onError={window.imgFallback} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 14 }}>{a.title}</div>
            <div style={{ fontSize: 12, color: "var(--c-mute)" }}>{a.date} · {a.read} de lectura · <span style={{ color: "var(--c-primary)", fontWeight: 600 }}>{a.cat}</span></div>
          </div>
          <span style={{ background: "#DCFCE7", color: "#166534", fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 99, whiteSpace: "nowrap" }}>Publicado</span>
        </div>
      ))}
    </div>
  </div>
);

/* ── FAQs ──────────────────────────────────────────────────── */
const FAQsSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
    <div>
      <h2 style={{ fontFamily: "var(--ff-serif)", fontSize: 28, margin: "0 0 4px" }}>Preguntas frecuentes</h2>
      <p style={{ color: "var(--c-mute)", fontSize: 14, margin: 0 }}>{window.FAQS.length} preguntas publicadas.</p>
    </div>
    <div style={{ display: "grid", gap: 12 }}>
      {window.FAQS.map((f, i) => (
        <div key={i} className="card" style={{ padding: "20px 24px" }}>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>❓ {f.q}</div>
          <div style={{ fontSize: 13.5, color: "var(--c-mute)", lineHeight: 1.65 }}>{f.a}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Pedidos ────────────────────────────────────────────────── */
const OrdersSection = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    window.loadDNOrders().then((data) => { setOrders(data); setLoading(false); });
  }, []);

  const statusColor = (s) => ({
    pending:    { bg: "#FEF3C7", color: "#92400E", label: "Pendiente"   },
    confirmed:  { bg: "#DCFCE7", color: "#166534", label: "Confirmado"  },
    shipped:    { bg: "#DBEAFE", color: "#1E40AF", label: "Enviado"     },
    delivered:  { bg: "#D1FAE5", color: "#065F46", label: "Entregado"   },
    cancelled:  { bg: "#FEE2E2", color: "#991B1B", label: "Cancelado"   },
  })[s] || { bg: "#F3F4F6", color: "#374151", label: s };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 80, color: "var(--c-mute)" }}>
      Cargando pedidos desde Supabase...
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h2 style={{ fontFamily: "var(--ff-serif)", fontSize: 28, margin: "0 0 4px" }}>Pedidos</h2>
        <p style={{ color: "var(--c-mute)", fontSize: 14, margin: 0 }}>{orders.length} pedidos registrados.</p>
      </div>

      {orders.length === 0 ? (
        <div className="card" style={{ padding: "48px 24px", textAlign: "center", color: "var(--c-mute)" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
          <p style={{ margin: 0 }}>Aún no hay pedidos registrados.</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Los pedidos del checkout se guardarán aquí automáticamente.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--c-rose-50)", borderBottom: "1.5px solid var(--c-border-soft)" }}>
                  {["Cliente", "Contacto", "Pago", "Total", "Estado", "Fecha"].map((h, i) => (
                    <th key={i} style={{ padding: "13px 16px", textAlign: "left", fontWeight: 600, fontSize: 11.5, color: "var(--c-mute)", letterSpacing: ".06em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const st = statusColor(o.order_status);
                  return (
                    <tr key={o.id} style={{ borderBottom: "1px solid var(--c-border-soft)" }}>
                      <td style={{ padding: "13px 16px", fontWeight: 500 }}>{o.customer_name}</td>
                      <td style={{ padding: "13px 16px", color: "var(--c-mute)" }}>
                        <div>{o.customer_phone}</div>
                        <div style={{ fontSize: 11 }}>{o.customer_email}</div>
                      </td>
                      <td style={{ padding: "13px 16px", color: "var(--c-mute)" }}>{o.payment_method}</td>
                      <td style={{ padding: "13px 16px", fontWeight: 700 }}>{o.total ? fmtGs(o.total) : "—"}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{ background: st.bg, color: st.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>{st.label}</span>
                      </td>
                      <td style={{ padding: "13px 16px", color: "var(--c-mute)", fontSize: 12 }}>
                        {new Date(o.created_at).toLocaleDateString("es-PY")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Categorías ────────────────────────────────────────────── */
const CategoriesSection = () => {
  const [cats, setCats] = React.useState([...window.CATEGORIES]);
  const [editing, setEditing] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(null);
  const [saveErr, setSaveErr] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState(null);
  const [deleting, setDeleting] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [newData, setNewData] = React.useState({});
  const [creating, setCreating] = React.useState(false);
  const [createErr, setCreateErr] = React.useState(null);

  const startEdit = (c) => { setEditing(c.id); setEditData({ name: c.name, desc: c.desc, img: c.img }); setSaveErr(null); };
  const cancelEdit = () => { setEditing(null); setEditData({}); setSaveErr(null); };

  const saveEdit = async (id) => {
    setSaving(true); setSaveErr(null);
    try {
      await window.updateDNCategory(id, { name: editData.name, description: editData.desc, img: editData.img });
      const updated = cats.map((c) => c.id === id ? { ...c, name: editData.name, desc: editData.desc, img: editData.img } : c);
      setCats(updated);
      window.CATEGORIES = updated;
      setEditing(null);
      setSaved(id);
      setTimeout(() => setSaved(null), 2500);
    } catch(e) {
      setSaveErr("Error al guardar. Reintentá.");
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (id) => {
    setDeleting(true);
    try {
      await window.deleteDNCategory(id);
      const updated = cats.filter((c) => c.id !== id);
      setCats(updated);
      window.CATEGORIES = updated;
      setConfirmDelete(null);
    } catch(e) {
      alert("Error al eliminar la categoría. Reintentá.");
    } finally {
      setDeleting(false);
    }
  };

  const openNew = () => { setNewData({ name: "", desc: "", img: "" }); setCreateErr(null); setShowNew(true); };

  const createCategory = async () => {
    if (!newData.name.trim()) { setCreateErr("El nombre es obligatorio."); return; }
    setCreating(true); setCreateErr(null);
    try {
      const row = await window.createDNCategory({ name: newData.name, description: newData.desc, img: newData.img });
      const mapped = { id: row.id, name: row.name, desc: row.description || "", img: row.img || "" };
      const updated = [...cats, mapped];
      setCats(updated);
      window.CATEGORIES = updated;
      setShowNew(false);
    } catch(e) {
      setCreateErr("Error al crear la categoría. Reintentá.");
    } finally {
      setCreating(false);
    }
  };

  const fieldStyle = { width: "100%", boxSizing: "border-box", padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--c-primary)", fontSize: 13, outline: "none", fontFamily: "inherit" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--ff-serif)", fontSize: 28, margin: "0 0 4px" }}>Categorías</h2>
          <p style={{ color: "var(--c-mute)", fontSize: 14, margin: 0 }}>{cats.length} categorías en el catálogo.</p>
        </div>
        <button onClick={openNew} className="btn btn--primary btn--sm" style={{ gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nueva categoría
        </button>
      </div>

      {showNew && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(31,23,32,0.45)", display: "grid", placeItems: "center", padding: 20 }}
             onClick={() => !creating && setShowNew(false)}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 480, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
               onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 24, margin: "0 0 24px" }}>Nueva categoría</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Nombre *", key: "name", placeholder: "Ej: Hidratantes" },
                { label: "Descripción", key: "desc", placeholder: "Breve descripción" },
                { label: "URL de imagen", key: "img", placeholder: "https://..." },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--c-mute)", marginBottom: 5, letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</label>
                  <input value={newData[key] || ""} onChange={(e) => setNewData((d) => ({ ...d, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--c-border)", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                    onFocus={(e) => e.target.style.borderColor = "var(--c-primary)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--c-border)"} />
                </div>
              ))}
              {newData.img && (
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <img src={newData.img} onError={window.imgFallback} alt="" style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", border: "1.5px solid var(--c-border)" }} />
                  <span style={{ fontSize: 12, color: "var(--c-mute)" }}>Vista previa</span>
                </div>
              )}
              {createErr && <p style={{ color: "var(--c-danger)", fontSize: 13, margin: 0 }}>{createErr}</p>}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowNew(false)} disabled={creating} className="btn btn--ghost btn--block">Cancelar</button>
              <button onClick={createCategory} disabled={creating} className="btn btn--primary btn--block">
                {creating ? "Creando..." : "Crear categoría"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(31,23,32,0.45)", display: "grid", placeItems: "center", padding: 20 }}
             onClick={() => !deleting && setConfirmDelete(null)}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 400, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
               onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12, textAlign: "center" }}>🗑️</div>
            <h3 style={{ fontFamily: "var(--ff-serif)", fontSize: 22, margin: "0 0 10px", textAlign: "center" }}>¿Eliminar categoría?</h3>
            <p style={{ color: "var(--c-mute)", fontSize: 14, textAlign: "center", margin: "0 0 24px", lineHeight: 1.5 }}>
              <strong>{confirmDelete.name}</strong> será eliminada permanentemente. Los productos de esta categoría quedarán sin categoría.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} disabled={deleting} className="btn btn--ghost btn--block">Cancelar</button>
              <button onClick={() => deleteCategory(confirmDelete.id)} disabled={deleting}
                style={{ flex: 1, padding: "12px 0", borderRadius: 999, background: "var(--c-danger)", color: "white", border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                {deleting ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {cats.map((c) => {
          const isEdit = editing === c.id;
          const isSaved = saved === c.id;
          return (
            <div key={c.id} className="card" style={{ padding: "18px 22px", display: "grid", gridTemplateColumns: "72px 1fr auto", gap: 18, alignItems: "center", background: isEdit ? "var(--c-rose-50)" : isSaved ? "#F0FDF4" : "white", transition: "background .3s" }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, overflow: "hidden", background: "var(--c-rose-50)", flexShrink: 0 }}>
                <img src={(isEdit ? editData.img : c.img) || window.DN_IMG_FALLBACK} onError={window.imgFallback} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <div style={{ minWidth: 0 }}>
                {isEdit ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <input value={editData.name} onChange={(e) => setEditData((d) => ({ ...d, name: e.target.value }))} placeholder="Nombre" style={fieldStyle} />
                    <input value={editData.desc} onChange={(e) => setEditData((d) => ({ ...d, desc: e.target.value }))} placeholder="Descripción" style={fieldStyle} />
                    <input value={editData.img} onChange={(e) => setEditData((d) => ({ ...d, img: e.target.value }))} placeholder="URL de imagen" style={{ ...fieldStyle, fontSize: 12, color: "var(--c-mute)" }} />
                  </div>
                ) : (
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: "var(--c-mute)", lineHeight: 1.4 }}>{c.desc}</div>
                    {isSaved && <span style={{ fontSize: 12, color: "var(--c-success)", fontWeight: 700 }}>✓ Guardado</span>}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                {saveErr && isEdit && <div style={{ color: "var(--c-danger)", fontSize: 11, marginBottom: 4 }}>{saveErr}</div>}
                {isEdit ? (
                  <React.Fragment>
                    <button onClick={() => saveEdit(c.id)} disabled={saving} className="btn btn--primary btn--sm" style={{ padding: "7px 14px", fontSize: 13 }}>{saving ? "..." : "Guardar"}</button>
                    <button onClick={cancelEdit} className="btn btn--ghost btn--sm" style={{ padding: "7px 14px", fontSize: 13 }}>Cancelar</button>
                  </React.Fragment>
                ) : (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => startEdit(c)} className="btn btn--ghost btn--sm" style={{ padding: "7px 14px", fontSize: 13 }}>Editar</button>
                    <button onClick={() => setConfirmDelete(c)} title="Eliminar categoría"
                      style={{ width: 32, height: 32, display: "grid", placeItems: "center", background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: 8, cursor: "pointer", flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Sidebar nav config ─────────────────────────────────────── */
const SECTIONS = [
  { id: "dashboard",  label: "Dashboard",   icon: "sparkle" },
  { id: "products",   label: "Productos",   icon: "cart"    },
  { id: "categories", label: "Categorías",  icon: "leaf"    },
  { id: "orders",     label: "Pedidos",     icon: "truck"   },
  { id: "reviews",    label: "Reseñas",     icon: "star"    },
  { id: "articles",   label: "Artículos",   icon: "leaf"    },
  { id: "faqs",       label: "FAQs",        icon: "shield"  },
];

/* ── Admin Panel Shell ──────────────────────────────────────── */
const AdminPanel = ({ onLogout }) => {
  const { setRoute } = useStore();
  const [section, setSection] = React.useState("dashboard");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [productsLoading, setProductsLoading] = React.useState(true);

  const [products, setProducts] = React.useState([...window.PRODUCTS]);

  // Cargar productos frescos desde Supabase al entrar al admin
  React.useEffect(() => {
    window.loadDNProducts().then((data) => {
      setProducts(data);
      setProductsLoading(false);
    }).catch(() => setProductsLoading(false));
  }, []);

  const reviews = window.REVIEWS;

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "28px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, paddingLeft: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <span className="dn-mark"><span className="dn-mark__icon"/><span className="dn-mark__word">DI Natale</span></span>
          <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--c-mute)", textTransform: "uppercase", paddingLeft: 50 }}>by Letizia</span>
        </div>
        <span style={{ background: "var(--c-rose-100)", color: "var(--c-primary-deep)", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, letterSpacing: ".05em" }}>ADMIN</span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => { setSection(s.id); setMobileOpen(false); }} style={{
            display: "flex", alignItems: "center", gap: 11, padding: "12px 14px",
            borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left",
            fontSize: 14, fontFamily: "inherit", fontWeight: section === s.id ? 600 : 400,
            background: section === s.id ? "var(--c-rose-50)" : "transparent",
            color: section === s.id ? "var(--c-primary-deep)" : "var(--c-ink-2)",
            transition: "all .15s ease"
          }}>
            <window.Icon name={s.icon} size={16} color={section === s.id ? "var(--c-primary)" : "var(--c-mute)"} />
            {s.label}
            {s.id === "products" && products.filter((p) => p.stock === 0).length > 0 && (
              <span style={{ marginLeft: "auto", background: "var(--c-danger)", color: "white", fontSize: 10, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 99, display: "grid", placeItems: "center", padding: "0 5px" }}>
                {products.filter((p) => p.stock === 0).length}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--c-border-soft)", display: "flex", flexDirection: "column", gap: 4 }}>
        <button onClick={() => setRoute("home")} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
          borderRadius: 12, border: "none", cursor: "pointer", fontSize: 13,
          fontFamily: "inherit", background: "transparent", color: "var(--c-mute)"
        }}>
          <window.Icon name="chevron-right" size={14} color="var(--c-mute)" />
          Ver sitio
        </button>
        <button onClick={onLogout} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
          borderRadius: 12, border: "none", cursor: "pointer", fontSize: 13,
          fontFamily: "inherit", background: "transparent", color: "var(--c-danger)"
        }}>
          <window.Icon name="close" size={14} color="var(--c-danger)" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F7FA" }}>
      {/* Sidebar desktop */}
      <aside className="adm-sidebar" style={{
        width: 248, flexShrink: 0, background: "white",
        borderRight: "1px solid var(--c-border-soft)",
        height: "100vh", position: "sticky", top: 0, overflowY: "auto"
      }}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "36px 32px", overflowY: "auto", minWidth: 0 }}>
        {/* Mobile topbar */}
        <div className="adm-topbar" style={{ display: "none", alignItems: "center", gap: 12, marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid var(--c-border-soft)" }}>
          <button onClick={() => setMobileOpen(true)} style={{ width: 40, height: 40, borderRadius: 10, border: "1.5px solid var(--c-border)", background: "white", cursor: "pointer", display: "grid", placeItems: "center" }}>
            <window.Icon name="menu" size={18} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="dn-mark"><span className="dn-mark__icon"/></span>
            <span style={{ fontFamily: "var(--ff-serif)", fontWeight: 600, fontSize: 18 }}>
              {SECTIONS.find((s) => s.id === section)?.label}
            </span>
          </div>
        </div>

        {section === "dashboard"  && <Dashboard products={products} reviews={reviews} />}
        {section === "products"   && <ProductsSection products={products} setProducts={setProducts} loading={productsLoading} />}
        {section === "categories" && <CategoriesSection />}
        {section === "orders"     && <OrdersSection />}
        {section === "reviews"    && <ReviewsSection reviews={reviews} />}
        {section === "articles"   && <ArticlesSection />}
        {section === "faqs"       && <FAQsSection />}
      </main>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }} onClick={() => setMobileOpen(false)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(31,23,32,0.45)" }} />
          <aside style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 272, background: "white", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <SidebarContent />
          </aside>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .adm-sidebar { display: none !important; }
          .adm-topbar  { display: flex !important; }
          main { padding: 20px 16px 40px !important; }
        }
        .adm-2col { grid-template-columns: 1fr 1fr; }
        @media (max-width: 640px) { .adm-2col { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

/* ── Root AdminView ─────────────────────────────────────────── */
const AdminView = () => {
  const [authed, setAuthed] = React.useState(() => sessionStorage.getItem("dn_admin") === "1");

  if (!authed) {
    return <AdminLogin onAuth={() => { sessionStorage.setItem("dn_admin", "1"); setAuthed(true); }} />;
  }
  return <AdminPanel onLogout={() => { sessionStorage.removeItem("dn_admin"); setAuthed(false); }} />;
};

window.AdminView = AdminView;
