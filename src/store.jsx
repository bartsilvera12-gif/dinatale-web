/* Global state: route, cart. Uses simple custom hook + localStorage */
const { useState, useEffect, useMemo, useCallback, useRef, useContext, createContext } = React;

const StoreCtx = createContext(null);

const useStore = () => useContext(StoreCtx);

const StoreProvider = ({ children }) => {
  // Route: { name, params }
  const [route, setRouteState] = useState(() => {
    try {
      const h = window.location.hash.replace(/^#/, "");
      if (h.startsWith("/product/")) return { name: "product", params: { id: h.split("/")[2] } };
      const map = { "/products": "products", "/categories": "categories", "/blog": "blog", "/reviews": "reviews", "/faq": "faq", "/about": "about", "/cart": "cart", "/checkout": "checkout" };
      if (map[h]) return { name: map[h], params: {} };
    } catch (e) {}
    return { name: "home", params: {} };
  });

  const setRoute = useCallback((name, params = {}) => {
    setRouteState({ name, params });
    let hash = "/" + name;
    if (name === "home") hash = "";
    if (name === "product") hash = "/product/" + params.id;
    try { window.location.hash = hash; } catch (e) {}
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, []);

  // Cart: [{ id, qty }]
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dn_cart") || "[]"); } catch (e) { return []; }
  });
  useEffect(() => {
    try { localStorage.setItem("dn_cart", JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === id);
      const product = window.PRODUCTS.find((p) => p.id === id);
      if (!product) return prev;
      const max = product.stock;
      if (found) {
        return prev.map((p) => p.id === id ? { ...p, qty: Math.min(max, p.qty + qty) } : p);
      }
      return [...prev, { id, qty: Math.min(max, qty) }];
    });
    setToast({ msg: "Añadido al carrito", action: "Ver carrito", to: "cart" });
  }, []);

  const updateQty = useCallback((id, qty) => {
    setCart((prev) => prev
      .map((p) => p.id === id ? { ...p, qty: Math.max(0, qty) } : p)
      .filter((p) => p.qty > 0));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartItems = useMemo(() => {
    return cart.map((c) => {
      const p = window.PRODUCTS.find((x) => x.id === c.id);
      return p ? { ...p, qty: c.qty, lineTotal: p.price * c.qty } : null;
    }).filter(Boolean);
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const cartTotal = useMemo(() => cartItems.reduce((s, c) => s + c.lineTotal, 0), [cartItems]);

  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // Quick view modal state
  const [quickView, setQuickView] = useState(null);

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  const value = {
    route, setRoute,
    cart, cartItems, cartCount, cartTotal,
    addToCart, updateQty, removeFromCart, clearCart,
    toast, setToast,
    quickView, setQuickView,
    menuOpen, setMenuOpen
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
};

const stockState = (n) => {
  if (n <= 0) return { kind: "out", label: "Sin stock", badge: "badge--stock-out" };
  if (n <= 5) return { kind: "low", label: "Últimas unidades", badge: "badge--stock-low" };
  return { kind: "ok", label: "Disponible", badge: "badge--stock-ok" };
};

const WA_NUMBER = "+595981234567";
const waLink = (msg) => `https://wa.me/${WA_NUMBER.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;

Object.assign(window, { StoreCtx, StoreProvider, useStore, stockState, WA_NUMBER, waLink });
