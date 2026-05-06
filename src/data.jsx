/* Mock catalog: products, categories, reviews, articles, FAQ */
const fmtGs = (n) => "Gs. " + n.toLocaleString("es-PY");

const CATEGORIES = [
  { id: "facial", name: "Cuidado facial", desc: "Limpieza, hidratación y rituales que respetan tu piel.", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80" },
  { id: "corporal", name: "Cuidado corporal", desc: "Texturas que envuelven y nutren cada centímetro.", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80" },
  { id: "cosmetica", name: "Cosmética", desc: "Color, acabado y precisión en cada gesto.", img: "https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b8?w=900&q=80" },
  { id: "estetica", name: "Belleza y estética", desc: "Rituales y aliados para realzar tu rutina.", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=80" },
  { id: "recomendados", name: "Recomendados", desc: "La selección personal del equipo DI NATALE.", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=80" },
  { id: "packs", name: "Packs especiales", desc: "Combinaciones pensadas para regalar o regalarte.", img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=80" },
  { id: "novedades", name: "Novedades", desc: "Lo último que sumamos a la curaduría.", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80" }
];

const PRODUCTS = [
  { id: "p01", name: "Sérum Iluminador Vitamina C", category: "facial", price: 285000, oldPrice: 325000, stock: 12, tag: "top", rating: 4.9, reviews: 184,
    desc: "Una fórmula ligera con vitamina C estabilizada que puede ayudar a complementar una rutina enfocada en luminosidad.",
    benefits: ["Ayuda a aportar luminosidad visible", "Textura ligera de rápida absorción", "Apto para uso diario, mañana y noche"],
    use: "Aplica 3-4 gotas sobre el rostro limpio antes de la hidratante. Evita el contorno de ojos.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80"
    ]
  },
  { id: "p02", name: "Crema Hidratante Pétalo", category: "facial", price: 195000, oldPrice: null, stock: 8, tag: "new", rating: 4.8, reviews: 92,
    desc: "Crema diaria con textura aterciopelada formulada para confortar la piel y dejarla suave al tacto.",
    benefits: ["Hidratación cómoda durante el día", "Acabado sedoso, no graso", "Base ideal para maquillaje"],
    use: "Aplica una pequeña cantidad sobre la piel limpia, mañana y noche.",
    images: ["https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80","https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80"]
  },
  { id: "p03", name: "Aceite Corporal Rosa Damascena", category: "corporal", price: 320000, oldPrice: 360000, stock: 4, tag: "sale", rating: 4.9, reviews: 213,
    desc: "Aceite seco con extracto de rosa damascena para envolver la piel del cuerpo en un aroma sutilmente floral.",
    benefits: ["Acabado seco, no pegajoso", "Aroma floral elegante", "Ideal después del baño"],
    use: "Aplica sobre la piel ligeramente húmeda y masajea con movimientos circulares.",
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80"]
  },
  { id: "p04", name: "Mascarilla Detox Arcilla Rosa", category: "facial", price: 145000, oldPrice: null, stock: 0, tag: null, rating: 4.7, reviews: 67,
    desc: "Mascarilla semanal con arcilla rosa para un ritual de limpieza profunda y suave a la vez.",
    benefits: ["Limpieza confortable", "Textura cremosa fácil de retirar", "Recomendada 1-2 veces por semana"],
    use: "Aplica una capa fina sobre el rostro limpio. Deja actuar 8-10 min y retira con agua tibia.",
    images: ["https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=1200&q=80"]
  },
  { id: "p05", name: "Labial Satinado Mauve", category: "cosmetica", price: 95000, oldPrice: null, stock: 22, tag: "rec", rating: 4.8, reviews: 311,
    desc: "Labial de acabado satinado con un matiz mauve elegante, recomendado para quienes buscan un look sofisticado.",
    benefits: ["Acabado satinado confortable", "Larga duración media", "Aplicación precisa"],
    use: "Aplica directo desde el bullet o con pincel para mayor precisión.",
    images: ["https://images.unsplash.com/photo-1631214500100-3b3f4a6d77e9?w=1200&q=80"]
  },
  { id: "p06", name: "Pack Ritual Glow", category: "packs", price: 580000, oldPrice: 720000, stock: 3, tag: "sale", rating: 5.0, reviews: 48,
    desc: "Trío curado: limpiador, sérum iluminador y crema hidratante en presentación de regalo.",
    benefits: ["Ahorro frente a comprar por separado", "Presentación tipo regalo", "Curado por el equipo DI NATALE"],
    use: "Sigue el orden: limpieza, sérum y por último hidratante.",
    images: ["https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80"]
  },
  { id: "p07", name: "Bruma Floral Tónico", category: "facial", price: 125000, oldPrice: null, stock: 18, tag: "new", rating: 4.6, reviews: 54,
    desc: "Bruma facial ligera con notas florales para un paso intermedio fresco entre la limpieza y el sérum.",
    benefits: ["Sensación fresca inmediata", "Aporte de aroma sutil", "Práctica para retoques"],
    use: "Pulveriza a 20cm del rostro con ojos cerrados.",
    images: ["https://images.unsplash.com/photo-1620916297893-1f3acdf65bc3?w=1200&q=80"]
  },
  { id: "p08", name: "Exfoliante Corporal Azúcar", category: "corporal", price: 175000, oldPrice: null, stock: 9, tag: null, rating: 4.7, reviews: 82,
    desc: "Exfoliante en pasta con azúcar fina y aceite, para un ritual de cuidado corporal semanal.",
    benefits: ["Textura confortable", "Aroma cálido y sutil", "Ritual de bienestar 1-2 veces por semana"],
    use: "Aplica con la piel húmeda en movimientos circulares y enjuaga.",
    images: ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80"]
  },
  { id: "p09", name: "Tónico Equilibrante Niacinamida", category: "facial", price: 165000, oldPrice: null, stock: 14, tag: "rec", rating: 4.8, reviews: 121,
    desc: "Tónico de uso diario con niacinamida pensado para acompañar rutinas que buscan equilibrio.",
    benefits: ["Confort en pieles mixtas", "Textura agua, no pegajosa", "Buen aliado del sérum posterior"],
    use: "Aplica con algodón o palmas tras la limpieza.",
    images: ["https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=1200&q=80"]
  },
  { id: "p10", name: "Brocha Maquillaje Edición Rosé", category: "cosmetica", price: 110000, oldPrice: 135000, stock: 6, tag: "sale", rating: 4.5, reviews: 39,
    desc: "Brocha de fibras suaves en edición rosé. Aplicación uniforme para polvos y rubores.",
    benefits: ["Fibras suaves", "Mango ergonómico", "Edición rosé"],
    use: "Limpia con jabón neutro cada 7-10 usos.",
    images: ["https://images.unsplash.com/photo-1631214524020-1ab8e0b2640f?w=1200&q=80"]
  },
  { id: "p11", name: "Crema Manos Petite", category: "corporal", price: 75000, oldPrice: null, stock: 30, tag: null, rating: 4.9, reviews: 410,
    desc: "Crema de manos en formato petite, ideal para llevar en cartera. Absorción rápida.",
    benefits: ["Textura ligera", "Formato cartera", "Aroma floral discreto"],
    use: "Aplica las veces que necesites a lo largo del día.",
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80"]
  },
  { id: "p12", name: "Set Brochas Estética", category: "estetica", price: 410000, oldPrice: null, stock: 2, tag: "top", rating: 4.9, reviews: 27,
    desc: "Set de 6 brochas curadas para una rutina completa de maquillaje y cuidado.",
    benefits: ["Set de 6 piezas", "Estuche de viaje", "Equilibrio entre fibras suaves y firmes"],
    use: "Limpia las brochas regularmente con jabón neutro.",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80"]
  }
];

const REVIEWS = [
  { id: 1, name: "Camila R.", text: "El sérum iluminador me sumó un paso que disfruto mucho cada mañana. La asesoría por WhatsApp fue clave para elegirlo.", rating: 5, product: "Sérum Iluminador Vitamina C", channel: "WhatsApp" },
  { id: 2, name: "Lorena M.", text: "Pedí el Pack Ritual Glow para mi hermana y le encantó. La presentación es preciosa y se nota que está pensado.", rating: 5, product: "Pack Ritual Glow", channel: "Instagram" },
  { id: 3, name: "Sofía D.", text: "Tenía dudas sobre qué usar en mi rutina. Me asesoraron con paciencia y termine eligiendo el tónico y la crema. Súper conforme.", rating: 5, product: "Tónico Equilibrante", channel: "WhatsApp" },
  { id: 4, name: "Ana V.", text: "El aceite corporal de rosa es mi nuevo ritual después del baño. Aroma elegante y nada pegajoso.", rating: 5, product: "Aceite Corporal Rosa", channel: "Instagram" },
  { id: 5, name: "Belén F.", text: "La atención antes de comprar y después fue impecable. Confío plenamente en la marca.", rating: 5, product: "Asesoría", channel: "WhatsApp" },
  { id: 6, name: "Romina T.", text: "Llegó perfectamente embalado y rapidísimo. El labial satinado mauve es justo lo que estaba buscando.", rating: 5, product: "Labial Satinado Mauve", channel: "Instagram" }
];

const ARTICLES = [
  { id: "a1", title: "Cómo armar tu rutina facial sin saturar la piel", excerpt: "Una guía clara con 4 pasos esenciales para empezar de forma simple y constante.", date: "2 de mayo, 2026", read: "5 min", cat: "Rutinas", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1100&q=80" },
  { id: "a2", title: "Diferencias entre cuidado facial y corporal", excerpt: "No son intercambiables. Te contamos por qué y cómo elegir productos para cada zona.", date: "24 de abril, 2026", read: "4 min", cat: "Educación", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1100&q=80" },
  { id: "a3", title: "Errores comunes al comprar productos de estética", excerpt: "Comprar por moda o sin asesoría puede ser caro. Estos son los errores más frecuentes y cómo evitarlos.", date: "10 de abril, 2026", read: "6 min", cat: "Consejos", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1100&q=80" },
  { id: "a4", title: "Cuándo solicitar asesoría personalizada", excerpt: "Si dudas entre dos productos, si tu piel cambió o si quieres un regalo especial: estos son los momentos.", date: "30 de marzo, 2026", read: "3 min", cat: "Asesoría", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1100&q=80" }
];

const FAQS = [
  { q: "¿Cómo realizo una compra?", a: "Puedes agregar productos al carrito y finalizar la compra desde el sitio o por WhatsApp. Te guiamos en cada paso si lo necesitas." },
  { q: "¿Los productos tienen stock disponible?", a: "Cada producto muestra su estado actual: Disponible, Stock limitado o Sin stock. Si está sin stock, puedes consultar disponibilidad por WhatsApp." },
  { q: "¿Hacen envíos?", a: "Sí, realizamos envíos a todo el país y ofrecemos retiro en local. El costo y tiempo se confirma al finalizar la compra." },
  { q: "¿Puedo consultar antes de comprar?", a: "Por supuesto. Nuestro equipo está disponible por WhatsApp para asesorarte en la elección del producto adecuado." },
  { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos transferencia bancaria, efectivo y otros medios a coordinar al momento de finalizar la compra." },
  { q: "¿Cómo sé qué producto elegir?", a: "Cuéntanos tu rutina actual y tus expectativas. Recomendaremos opciones acordes a tu tipo de piel y objetivos, con un tono responsable." },
  { q: "¿Puedo recibir asesoría personalizada?", a: "Sí. Ofrecemos asesoría a distancia y, según disponibilidad, encuentros personalizados. Escríbenos para coordinar." },
  { q: "¿Qué pasa si un producto está sin stock?", a: "Puedes consultar disponibilidad por WhatsApp. Si está por reponerse, te avisaremos cuando vuelva." }
];

const VALUES = [
  { icon: "shield", title: "Confianza", text: "Curaduría con criterio, nada por moda." },
  { icon: "heart", title: "Cuidado", text: "Cada cliente es acompañada con respeto." },
  { icon: "sparkle", title: "Elegancia", text: "Producto, packaging y experiencia coherentes." },
  { icon: "leaf", title: "Asesoría", text: "Recomendaciones a tu rutina y expectativas." },
  { icon: "check", title: "Calidad", text: "Marcas y formulaciones que probamos antes de incorporar." }
];

window.fmtGs = fmtGs;
window.CATEGORIES = CATEGORIES;
window.PRODUCTS = PRODUCTS;
window.REVIEWS = REVIEWS;
window.ARTICLES = ARTICLES;
window.FAQS = FAQS;
window.VALUES = VALUES;
