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

/* ── Actualizar categoría en Supabase (admin) ──────────────── */
const updateDNCategory = async (id, { name, description, img }) => {
  return sbPatch("dn_categories", `id=eq.${id}`, { name, description, img: img || null });
};

/* ── Crear categoría en Supabase (admin) ───────────────────── */
const createDNCategory = async ({ name, description, img }) => {
  const [row] = await sbPost("dn_categories", {
    name,
    description: description || "",
    img:         img || null,
    sort_order:  999
  });
  return row;
};

/* ── Eliminar categoría en Supabase (admin) ────────────────── */
const deleteDNCategory = async (id) => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/dn_categories?id=eq.${id}`, {
    method: "DELETE", headers: sbHeaders(true)
  });
  if (!res.ok) throw new Error(`DELETE dn_categories: ${res.status}`);
};

/* ── Crear producto en Supabase (admin) ────────────────────── */
const createDNProduct = async ({ name, category_id, price, oldPrice, stock, tag, images, description }) => {
  const [row] = await sbPost("dn_products", {
    name,
    category_id,
    price:            Number(price),
    old_price:        oldPrice ? Number(oldPrice) : null,
    stock:            Number(stock) || 0,
    tag:              tag || null,
    images:           images && images.length ? images : [],
    description:      description || "",
    benefits:         [],
    use_instructions: "",
    is_active:        true
  });
  return row;
};

/* ── Eliminar producto en Supabase (admin) ─────────────────── */
const deleteDNProduct = async (id) => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/dn_products?id=eq.${id}`, {
    method: "DELETE", headers: sbHeaders(true)
  });
  if (!res.ok) throw new Error(`DELETE dn_products: ${res.status}`);
};

/* ── Actualizar producto en Supabase (admin) ───────────────── */
const updateDNProduct = async (id, { price, stock, tag, oldPrice, images }) => {
  const body = {
    price,
    stock,
    tag:       tag || null,
    old_price: oldPrice || null,
    updated_at: new Date().toISOString()
  };
  if (images !== undefined) body.images = images;
  return sbPatch("dn_products", `id=eq.${id}`, body);
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

/* ── Crear reseña (admin) ──────────────────────────────────── */
const createDNReview = async ({ name, text, rating, product, channel }) => {
  const [row] = await sbPost("dn_reviews", { name, text, rating: Number(rating), product, channel });
  return row;
};

/* ── Actualizar reseña (admin) ─────────────────────────────── */
const updateDNReview = async (id, { name, text, rating, product, channel }) => {
  return sbPatch("dn_reviews", `id=eq.${id}`, { name, text, rating: Number(rating), product, channel });
};

/* ── Eliminar reseña (admin) ───────────────────────────────── */
const deleteDNReview = async (id) => {
  const res = await fetch(`${DN_SUPABASE_URL}/rest/v1/dn_reviews?id=eq.${id}`, {
    method: "DELETE", headers: sbHeaders(true)
  });
  if (!res.ok) throw new Error(`DELETE dn_reviews: ${res.status}`);
};

/* ── Cargar reseñas desde dinatale.reviews ─────────────────── */
const loadDNReviews = async () => {
  try {
    const rows = await sbGet("dn_reviews", "order=created_at.asc");
    window.REVIEWS = rows.map((r) => ({
      id:      r.id,
      name:    r.name,
      text:    r.text,
      rating:  r.rating,
      product: r.product,
      channel: r.channel
    }));
    return window.REVIEWS;
  } catch(e) {
    console.warn("Supabase: usando reseñas locales.", e);
    return window.REVIEWS;
  }
};

/* ── Cargar artículos desde dinatale.articles ──────────────── */
const loadDNArticles = async () => {
  try {
    const rows = await sbGet("dn_articles", "order=created_at.desc");
    window.ARTICLES = rows.map((a) => ({
      id:      a.id,
      title:   a.title,
      excerpt: a.excerpt,
      date:    a.date,
      read:    a.read_time,
      cat:     a.category,
      img:     a.img
    }));
    return window.ARTICLES;
  } catch(e) {
    console.warn("Supabase: usando artículos locales.", e);
    return window.ARTICLES;
  }
};

/* ── Cargar FAQs desde dinatale.faqs ──────────────────────── */
const loadDNFaqs = async () => {
  try {
    const rows = await sbGet("dn_faqs", "order=sort_order.asc");
    window.FAQS = rows.map((f) => ({
      id: f.id,
      q:  f.question,
      a:  f.answer
    }));
    return window.FAQS;
  } catch(e) {
    console.warn("Supabase: usando FAQs locales.", e);
    return window.FAQS;
  }
};

/* ── Init: carga todos los datos al arrancar ───────────────── */
window.__sbLoadDNData = async () => {
  await Promise.all([
    loadDNProducts(),
    loadDNCategories(),
    loadDNReviews(),
    loadDNArticles(),
    loadDNFaqs()
  ]);
};

Object.assign(window, {
  sbGet, sbPatch, sbPost,
  loadDNProducts, loadDNCategories, loadDNReviews, loadDNArticles, loadDNFaqs,
  createDNProduct, updateDNProduct, deleteDNProduct, updateDNCategory, createDNCategory, deleteDNCategory,
  createDNReview, updateDNReview, deleteDNReview, saveDNOrder, loadDNOrders,
  mapProduct
});
