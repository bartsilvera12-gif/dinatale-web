/* ─── Supabase Integration — DI NATALE ─── */

const DN_SUPABASE_URL    = "https://api.neura.com.py";
const DN_ANON_KEY        = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc0MTAxNDYxLCJleHAiOjE5MzE3ODE0NjF9.7_wAph8IolPMXtgfpezSwS5XR62IdD__qhqCywLDp3Q";
const DN_SERVICE_KEY     = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzQxMDE0NjEsImV4cCI6MTkzMTc4MTQ2MX0.ZalpuMsNyVApzFSu3mOFjXUqnxqV9fVyhp3OQQGlAFI";
const DN_COMPANY_ID      = "bb52ef28-eb25-4d06-b1f2-bcef7fb8b367";
const DN_STORE_ID        = "a3b599a7-7a71-40d5-94c1-9fd6de459972";

/* ── HTTP helpers ───────────────────────────────────────────── */
const sbHeaders = (useService = false) => ({
  "Content-Type": "application/json",
  "apikey":       useService ? DN_SERVICE_KEY : DN_ANON_KEY,
  "Authorization":"Bearer " + (useService ? DN_SERVICE_KEY : DN_ANON_KEY),
  "Prefer":       "return=representation"
});

const sbGet = async (table, query = "", useService = false) => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: sbHeaders(useService)
  });
  if (!res.ok) throw new Error(`sbGet ${table}: ${res.status}`);
  return res.json();
};

const sbPatch = async (table, filter, data) => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: "PATCH",
    headers: sbHeaders(true),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`sbPatch ${table}: ${res.status}`);
  return res.json();
};

const sbPost = async (table, data) => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: sbHeaders(true),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`sbPost ${table}: ${res.status}`);
  return res.json();
};

/* ── Mapear producto Supabase → formato Di Natale ───────────── */
const mapProduct = (p) => {
  let extra = {};
  try { extra = JSON.parse(p.notes || "{}"); } catch(e) {}
  return {
    id:        p.id,
    sbId:      p.id,
    name:      p.name,
    category:  p.category,
    price:     p.price,
    oldPrice:  p.sale_price || null,
    stock:     p.stock,
    tag:       extra.tag    || null,
    rating:    extra.rating || 0,
    reviews:   extra.reviewsCount || 0,
    desc:      p.description || "",
    benefits:  extra.benefits || [],
    use:       extra.use || "",
    images:    extra.images && extra.images.length ? extra.images : [p.image].filter(Boolean),
  };
};

/* ── Cargar productos Di Natale desde Supabase ──────────────── */
const loadDNProducts = async () => {
  try {
    const rows = await sbGet(
      "products",
      `company_id=eq.${DN_COMPANY_ID}&is_active=eq.true&order=created_at.asc`,
      false
    );
    const mapped = rows.map(mapProduct);
    window.PRODUCTS = mapped;
    window.__SB_PRODUCTS_LOADED = true;
    return mapped;
  } catch(e) {
    console.warn("Supabase: no se pudo cargar productos, usando datos locales.", e);
    return window.PRODUCTS;
  }
};

/* ── Cargar categorías Di Natale desde Supabase ─────────────── */
const loadDNCategories = async () => {
  try {
    const rows = await sbGet(
      "company_categories",
      `company_id=eq.${DN_COMPANY_ID}&order=sort_order.asc`,
      false
    );
    const catIdToKey = {
      "Cuidado facial":    "facial",
      "Cuidado corporal":  "corporal",
      "Cosmetica":         "cosmetica",
      "Belleza y estetica":"estetica",
      "Recomendados":      "recomendados",
      "Packs especiales":  "packs",
      "Novedades":         "novedades"
    };
    window.DB_CATEGORIES = rows;
    return rows;
  } catch(e) {
    console.warn("Supabase: no se pudo cargar categorías.", e);
    return [];
  }
};

/* ── Actualizar producto en Supabase (admin) ────────────────── */
const updateDNProduct = async (sbId, { price, stock, tag, oldPrice }) => {
  // Fetch current notes to merge
  const [current] = await sbGet("products", `id=eq.${sbId}`, true);
  let notes = {};
  try { notes = JSON.parse(current.notes || "{}"); } catch(e) {}
  notes.tag = tag || null;

  const payload = {
    price,
    stock,
    sale_price: oldPrice || null,
    notes: JSON.stringify(notes),
    updated_at: new Date().toISOString()
  };
  // Update tags array
  if (tag) { payload.tags = [tag]; }
  else      { payload.tags = []; }

  return sbPatch("products", `id=eq.${sbId}`, payload);
};

/* ── Guardar pedido en Supabase (checkout) ──────────────────── */
const saveDNOrder = async ({ name, phone, email, delivery, address, payment, note, items, total }) => {
  try {
    // Insert order
    const [order] = await sbPost("orders", {
      company_id:      DN_COMPANY_ID,
      customer_name:   name,
      customer_phone:  phone,
      customer_email:  email,
      notes:           (note ? note + " | " : "") + (delivery === "envio" ? "Envio a: " + address : "Retiro en local"),
      payment_method:  payment,
      payment_status:  "pending",
      order_status:    "pending",
      subtotal:        total,
      total:           total,
      source_channel:  "web"
    });

    // Insert order items
    for (const item of items) {
      await sbPost("order_items", {
        order_id:              order.id,
        company_id:            DN_COMPANY_ID,
        product_id:            item.sbId || item.id,
        product_name_snapshot: item.name,
        quantity:              item.qty,
        unit_price:            item.price,
        line_total:            item.lineTotal
      });
    }
    return order;
  } catch(e) {
    console.warn("Supabase: no se pudo guardar el pedido.", e);
    return null;
  }
};

/* ── Cargar pedidos Di Natale (admin) ───────────────────────── */
const loadDNOrders = async () => {
  try {
    const rows = await sbGet(
      "orders",
      `company_id=eq.${DN_COMPANY_ID}&order=created_at.desc`,
      true
    );
    return rows;
  } catch(e) {
    console.warn("Supabase: no se pudo cargar pedidos.", e);
    return [];
  }
};

/* ── Init: cargar datos al arrancar la app ──────────────────── */
window.__sbLoadDNData = async () => {
  await Promise.all([loadDNProducts(), loadDNCategories()]);
};

/* ── Exportar al scope global ───────────────────────────────── */
Object.assign(window, {
  DN_COMPANY_ID,
  DN_STORE_ID,
  sbGet, sbPatch, sbPost,
  loadDNProducts, loadDNCategories,
  updateDNProduct, saveDNOrder, loadDNOrders,
  mapProduct
});
