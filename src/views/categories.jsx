const CategoriesView = () => {
  const { setRoute } = useStore();
  return (
    <div className="container view-fade" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div className="eyebrow center" style={{ marginBottom: 18 }}>Catálogo organizado</div>
        <h1 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", margin: 0 }}>Categorías de <em>cuidado</em></h1>
        <p style={{ color: "var(--c-mute)", maxWidth: 620, margin: "16px auto 0" }}>
          Encontrá tu próxima rutina en una curaduría organizada por necesidad y momento del día.
        </p>
      </div>
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {CATEGORIES.map((c) => (
          <window.CategoryCard key={c.id} cat={c} onClick={() => setRoute("products", { cat: c.id })} />
        ))}
      </div>
    </div>
  );
};

window.CategoriesView = CategoriesView;
