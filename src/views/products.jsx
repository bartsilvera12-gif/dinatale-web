const ProductsView = () => {
  const { route, setRoute, setQuickView } = useStore();
  const initialCat = route.params?.cat || "all";
  const [cat, setCat] = React.useState(initialCat);
  const [sort, setSort] = React.useState("featured");
  const [q, setQ] = React.useState("");

  React.useEffect(() => { if (route.params?.cat) setCat(route.params.cat); }, [route.params?.cat]);

  const items = React.useMemo(() => {
    let list = PRODUCTS.slice();
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (q.trim()) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "new") list.sort((a, b) => (b.tag === "new") - (a.tag === "new"));
    if (sort === "top") list.sort((a, b) => (b.tag === "top") - (a.tag === "top"));
    return list;
  }, [cat, sort, q]);

  return (
    <div className="container view-fade" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: "var(--c-mute)" }}>
          <button onClick={() => setRoute("home")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "inherit" }}>Inicio</button>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>Productos</span>
        </div>
        <h1 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", margin: 0 }}>
          Catálogo <em>completo</em>
        </h1>
        <p style={{ color: "var(--c-mute)", maxWidth: 620, margin: "4px 0 0" }}>
          Filtrá por categoría, ordená por precio o lo más nuevo. Si tenés dudas, escribinos por WhatsApp para una recomendación.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 24, padding: 16, background: "white", borderRadius: 18, border: "1px solid var(--c-border-soft)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 200 }}>
          <window.Icon name="search" size={16} color="var(--c-mute)" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar productos..." style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, fontFamily: "inherit" }} />
        </div>
        <window.DNSelect value={sort} onChange={(e) => setSort(e.target.value)} style={{ minWidth: 200 }}>
          <option value="featured">Destacados</option>
          <option value="new">Más nuevos</option>
          <option value="top">Más vendidos</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </window.DNSelect>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        <button onClick={() => setCat("all")} style={chipStyle(cat === "all")}>Todos</button>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)} style={chipStyle(cat === c.id)}>{c.name}</button>
        ))}
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: 80, color: "var(--c-mute)" }}>
          <window.Icon name="search" size={36} color="var(--c-border)" />
          <p style={{ marginTop: 14 }}>No encontramos productos para esos filtros.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", maxWidth: items.length < 4 ? `${items.length * 260}px` : "none" }}>
          {items.map((p) => <window.ProductCard key={p.id} product={p} onQuick={setQuickView} />)}
        </div>
      )}
    </div>
  );
};

const chipStyle = (active) => ({
  padding: "9px 16px",
  borderRadius: 999,
  border: "1px solid " + (active ? "transparent" : "var(--c-border)"),
  background: active ? "var(--grad-brand)" : "white",
  color: active ? "white" : "var(--c-ink-2)",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: "all .2s ease",
  fontFamily: "inherit"
});

window.ProductsView = ProductsView;
