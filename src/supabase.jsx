/* ─── Supabase — DI NATALE (esquema: dinatale) ─── */

const DN_SUPABASE_URL = "https://api.neura.com.py";
const DN_ANON_KEY     = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc0MTAxNDYxLCJleHAiOjE5MzE3ODE0NjF9.7_wAph8IolPMXtgfpezSwS5XR62IdD__qhqCywLDp3Q";
const DN_SERVICE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzQxMDE0NjEsImV4cCI6MTkzMTc4MTQ2MX0.ZalpuMsNyVApzFSu3mOFjXUqnxqV9fVyhp3OQQGlAFI";

/* ── Headers ───────────────────────────────────────────────── */
const sbHeaders = (admin = false) => ({
  "Content-Type":  "application/json",
  "apikey":        admin ? DN_SERVICE_KEY : DN_ANON_KEY,
  "Authorization": "Bearer " + (admin ? DN_SERVICE_KEY : DN_ANON_KEY),
  "Prefer":        "return=representation"
});

/* ── Helpers REST ──────────────────────────────────────────── */
const sbGet = async (view, query = "") => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/${view}?${query}`, { headers: sbHeaders() });
  if (!res.ok) throw new Error(`GET ${view}: ${res.status}`);
  return res.json();
};

const sbPatch = async (view, filter, data) => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/${view}?${filter}`, {
    method: "PATCH", headers: sbHeaders(true), body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`PATCH ${view}: ${res.status}`);
  return res.json();
};

const sbPost = async (view, data) => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/${view}`, {
    method: "POST", headers: sbHeaders(true), body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`POST ${view}: ${res.status}`);
  return res.json();
};

/* ── Mapear producto dinatale → formato interno de la app ──── */
const mapProduct = (p) => ({
  id:       p.id,
  name:     p.name,
  category: p.category_id,
  price:    p.price,
  oldPrice: p.old_price || null,
  stock:    p.stock,
  tag:      p.tag || null,
  rating:   p.rating || 0,
  reviews:  p.reviews_count || 0,
  desc:     p.description || "",
  benefits: p.benefits || [],
  use:      p.use_instructions || "",
  images:   p.images && p.images.length ? p.images : [],
  is_active: p.is_active
});

/* ── Cargar productos desde dinatale.products ──────────────── */
const loadDNProducts = async () => {
  try {
    const rows = await sbGet("dn_products", "is_active=eq.true&order=created_at.asc");
    const mapped = rows.map(mapProduct);
    window.PRODUCTS = mapped;
    return mapped;
  } catch(e) {
    console.warn("Supabase: usando productos locales.", e);
    return window.PRODUCTS;
  }
};

/* ── Cargar categorías desde dinatale.categories ───────────── */
const loadDNCategories = async () => {
  try {
    const rows = await sbGet("dn_categories", "order=sort_order.asc");
    window.CATEGORIES = rows.map((c) => ({
      id:   c.id,
      name: c.name,
      desc: c.description || "",
      img:  c.img || ""
    }));
    return window.CATEGORIES;
  } catch(e) {
    console.warn("Supabase: usando categorías locales.", e);
    return window.CATEGORIES;
  }
};

/* ── Actualizar producto en Supabase (admin) ───────────────── */
const updateDNProduct = async (id, { price, stock, tag, oldPrice }) => {
  return sbPatch("dn_products", `id=eq.${id}`, {
    price,
    stock,
    tag:       tag || null,
    old_price: oldPrice || null,
    updated_at: new Date().toISOString()
  });
};

/* ── Guardar pedido desde el checkout ──────────────────────── */
const saveDNOrder = async ({ name, phone, email, delivery, address, payment, note, items, total }) => {
  try {
    const [order] = await sbPost("dn_orders", {
      customer_name:  name,
      customer_phone: phone,
      customer_email: email,
      delivery,
      address:        delivery === "envio" ? address : null,
      payment,
      note:           note || null,
      subtotal:       total,
      total,
      order_status:   "pending"
    });
    for (const item of items) {
      await sbPost("dn_order_items", {
        order_id:     order.id,
        product_id:   item.id,
        product_name: item.name,
        quantity:     item.qty,
        unit_price:   item.price,
        line_total:   item.lineTotal
      });
    }
    return order;
  } catch(e) {
    console.warn("Supabase: no se pudo guardar el pedido.", e);
    return null;
  }
};

/* ── Cargar pedidos (admin) ────────────────────────────────── */
const loadDNOrders = async () => {
  try {
    return await sbGet("dn_orders", "order=created_at.desc");
  } catch(e) {
    console.warn("Supabase: no se pudo cargar pedidos.", e);
    return [];
  }
};

/* ── Init: carga productos y categorías al arrancar ─────────── */
window.__sbLoadDNData = async () => {
  await Promise.all([loadDNProducts(), loadDNCategories()]);
};

Object.assign(window, {
  sbGet, sbPatch, sbPost,
  loadDNProducts, loadDNCategories,
  updateDNProduct, saveDNOrder, loadDNOrders,
  mapProduct
});
