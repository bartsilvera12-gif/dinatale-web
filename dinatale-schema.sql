-- ============================================================
-- DI NATALE — Schema Setup
-- Ejecutar en: Supabase Studio → SQL Editor
-- ============================================================

-- 1. Crear esquema
CREATE SCHEMA IF NOT EXISTS dinatale;

-- 2. Otorgar permisos a PostgREST
GRANT USAGE ON SCHEMA dinatale TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA dinatale GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA dinatale GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- ============================================================
-- TABLAS
-- ============================================================

-- Categorías
CREATE TABLE IF NOT EXISTS dinatale.categories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  img         TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Productos
CREATE TABLE IF NOT EXISTS dinatale.products (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  description  TEXT,
  category_id  TEXT REFERENCES dinatale.categories(id),
  price        NUMERIC NOT NULL,
  old_price    NUMERIC,
  stock        INTEGER NOT NULL DEFAULT 0,
  tag          TEXT CHECK (tag IN ('top','new','sale','rec') OR tag IS NULL),
  rating       NUMERIC(3,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  images       JSONB DEFAULT '[]',
  benefits     JSONB DEFAULT '[]',
  use_instructions TEXT,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Reseñas
CREATE TABLE IF NOT EXISTS dinatale.reviews (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  text       TEXT NOT NULL,
  rating     INTEGER CHECK (rating BETWEEN 1 AND 5),
  product    TEXT,
  channel    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artículos
CREATE TABLE IF NOT EXISTS dinatale.articles (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  excerpt    TEXT,
  date       TEXT,
  read_time  TEXT,
  category   TEXT,
  img        TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQs
CREATE TABLE IF NOT EXISTS dinatale.faqs (
  id         SERIAL PRIMARY KEY,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pedidos
CREATE TABLE IF NOT EXISTS dinatale.orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT,
  customer_email  TEXT,
  delivery        TEXT CHECK (delivery IN ('envio','retiro')),
  address         TEXT,
  payment         TEXT,
  note            TEXT,
  order_status    TEXT DEFAULT 'pending' CHECK (order_status IN ('pending','confirmed','shipped','delivered','cancelled')),
  subtotal        NUMERIC,
  total           NUMERIC,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Items del pedido
CREATE TABLE IF NOT EXISTS dinatale.order_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID REFERENCES dinatale.orders(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES dinatale.products(id),
  product_name TEXT NOT NULL,
  quantity    INTEGER NOT NULL,
  unit_price  NUMERIC NOT NULL,
  line_total  NUMERIC NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DATOS INICIALES — Categorías
-- ============================================================
INSERT INTO dinatale.categories (id, name, description, img, sort_order) VALUES
  ('facial',      'Cuidado facial',    'Limpieza, hidratación y rituales que respetan tu piel.',         'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80', 1),
  ('corporal',    'Cuidado corporal',  'Texturas que envuelven y nutren cada centímetro.',               'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80', 2),
  ('cosmetica',   'Cosmética',         'Color, acabado y precisión en cada gesto.',                      'https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b8?w=900&q=80', 3),
  ('estetica',    'Belleza y estética','Rituales y aliados para realzar tu rutina.',                     'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=80', 4),
  ('recomendados','Recomendados',      'La selección personal del equipo DI NATALE.',                    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=80', 5),
  ('packs',       'Packs especiales',  'Combinaciones pensadas para regalar o regalarte.',               'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=80', 6),
  ('novedades',   'Novedades',         'Lo último que sumamos a la curaduría.',                          'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80', 7)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- DATOS INICIALES — Productos
-- ============================================================
INSERT INTO dinatale.products (name, description, category_id, price, old_price, stock, tag, rating, reviews_count, images, benefits, use_instructions) VALUES
  ('Sérum Iluminador Vitamina C',
   'Una fórmula ligera con vitamina C estabilizada que puede ayudar a complementar una rutina enfocada en luminosidad.',
   'facial', 285000, 325000, 12, 'top', 4.9, 184,
   '["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80","https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80","https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80"]',
   '["Ayuda a aportar luminosidad visible","Textura ligera de rápida absorción","Apto para uso diario, mañana y noche"]',
   'Aplica 3-4 gotas sobre el rostro limpio antes de la hidratante. Evita el contorno de ojos.'),

  ('Crema Hidratante Pétalo',
   'Crema diaria con textura aterciopelada formulada para confortar la piel y dejarla suave al tacto.',
   'facial', 195000, NULL, 8, 'new', 4.8, 92,
   '["https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80","https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80"]',
   '["Hidratación cómoda durante el día","Acabado sedoso, no graso","Base ideal para maquillaje"]',
   'Aplica una pequeña cantidad sobre la piel limpia, mañana y noche.'),

  ('Aceite Corporal Rosa Damascena',
   'Aceite seco con extracto de rosa damascena para envolver la piel del cuerpo en un aroma sutilmente floral.',
   'corporal', 320000, 360000, 4, 'sale', 4.9, 213,
   '["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80"]',
   '["Acabado seco, no pegajoso","Aroma floral elegante","Ideal después del baño"]',
   'Aplica sobre la piel ligeramente húmeda y masajea con movimientos circulares.'),

  ('Mascarilla Detox Arcilla Rosa',
   'Mascarilla semanal con arcilla rosa para un ritual de limpieza profunda y suave a la vez.',
   'facial', 145000, NULL, 0, NULL, 4.7, 67,
   '["https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=1200&q=80"]',
   '["Limpieza confortable","Textura cremosa fácil de retirar","Recomendada 1-2 veces por semana"]',
   'Aplica una capa fina sobre el rostro limpio. Deja actuar 8-10 min y retira con agua tibia.'),

  ('Labial Satinado Mauve',
   'Labial de acabado satinado con un matiz mauve elegante, recomendado para quienes buscan un look sofisticado.',
   'cosmetica', 95000, NULL, 22, 'rec', 4.8, 311,
   '["https://images.unsplash.com/photo-1631214500100-3b3f4a6d77e9?w=1200&q=80"]',
   '["Acabado satinado confortable","Larga duración media","Aplicación precisa"]',
   'Aplica directo desde el bullet o con pincel para mayor precisión.'),

  ('Pack Ritual Glow',
   'Trío curado: limpiador, sérum iluminador y crema hidratante en presentación de regalo.',
   'packs', 580000, 720000, 3, 'sale', 5.0, 48,
   '["https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80"]',
   '["Ahorro frente a comprar por separado","Presentación tipo regalo","Curado por el equipo DI NATALE"]',
   'Sigue el orden: limpieza, sérum y por último hidratante.'),

  ('Bruma Floral Tónico',
   'Bruma facial ligera con notas florales para un paso intermedio fresco entre la limpieza y el sérum.',
   'facial', 125000, NULL, 18, 'new', 4.6, 54,
   '["https://images.unsplash.com/photo-1620916297893-1f3acdf65bc3?w=1200&q=80"]',
   '["Sensación fresca inmediata","Aporte de aroma sutil","Práctica para retoques"]',
   'Pulveriza a 20cm del rostro con ojos cerrados.'),

  ('Exfoliante Corporal Azúcar',
   'Exfoliante en pasta con azúcar fina y aceite, para un ritual de cuidado corporal semanal.',
   'corporal', 175000, NULL, 9, NULL, 4.7, 82,
   '["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80"]',
   '["Textura confortable","Aroma cálido y sutil","Ritual de bienestar 1-2 veces por semana"]',
   'Aplica con la piel húmeda en movimientos circulares y enjuaga.'),

  ('Tónico Equilibrante Niacinamida',
   'Tónico de uso diario con niacinamida pensado para acompañar rutinas que buscan equilibrio.',
   'facial', 165000, NULL, 14, 'rec', 4.8, 121,
   '["https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=1200&q=80"]',
   '["Confort en pieles mixtas","Textura agua, no pegajosa","Buen aliado del sérum posterior"]',
   'Aplica con algodón o palmas tras la limpieza.'),

  ('Brocha Maquillaje Edición Rosé',
   'Brocha de fibras suaves en edición rosé. Aplicación uniforme para polvos y rubores.',
   'cosmetica', 110000, 135000, 6, 'sale', 4.5, 39,
   '["https://images.unsplash.com/photo-1631214524020-1ab8e0b2640f?w=1200&q=80"]',
   '["Fibras suaves","Mango ergonómico","Edición rosé"]',
   'Limpia con jabón neutro cada 7-10 usos.'),

  ('Crema Manos Petite',
   'Crema de manos en formato petite, ideal para llevar en cartera. Absorción rápida.',
   'corporal', 75000, NULL, 30, NULL, 4.9, 410,
   '["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80"]',
   '["Textura ligera","Formato cartera","Aroma floral discreto"]',
   'Aplica las veces que necesites a lo largo del día.'),

  ('Set Brochas Estética',
   'Set de 6 brochas curadas para una rutina completa de maquillaje y cuidado.',
   'estetica', 410000, NULL, 2, 'top', 4.9, 27,
   '["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80"]',
   '["Set de 6 piezas","Estuche de viaje","Equilibrio entre fibras suaves y firmes"]',
   'Limpia las brochas regularmente con jabón neutro.')
;

-- ============================================================
-- DATOS INICIALES — Reseñas
-- ============================================================
INSERT INTO dinatale.reviews (name, text, rating, product, channel) VALUES
  ('Camila R.',  'El sérum iluminador me sumó un paso que disfruto mucho cada mañana. La asesoría por WhatsApp fue clave para elegirlo.',           5, 'Sérum Iluminador Vitamina C', 'WhatsApp'),
  ('Lorena M.',  'Pedí el Pack Ritual Glow para mi hermana y le encantó. La presentación es preciosa y se nota que está pensado.',                  5, 'Pack Ritual Glow',           'Instagram'),
  ('Sofía D.',   'Tenía dudas sobre qué usar en mi rutina. Me asesoraron con paciencia y terminé eligiendo el tónico y la crema. Súper conforme.', 5, 'Tónico Equilibrante',        'WhatsApp'),
  ('Ana V.',     'El aceite corporal de rosa es mi nuevo ritual después del baño. Aroma elegante y nada pegajoso.',                                 5, 'Aceite Corporal Rosa',       'Instagram'),
  ('Belén F.',   'La atención antes de comprar y después fue impecable. Confío plenamente en la marca.',                                            5, 'Asesoría',                   'WhatsApp'),
  ('Romina T.',  'Llegó perfectamente embalado y rapidísimo. El labial satinado mauve es justo lo que estaba buscando.',                            5, 'Labial Satinado Mauve',      'Instagram')
;

-- ============================================================
-- DATOS INICIALES — Artículos
-- ============================================================
INSERT INTO dinatale.articles (id, title, excerpt, date, read_time, category, img) VALUES
  ('a1', 'Cómo armar tu rutina facial sin saturar la piel',     'Una guía clara con 4 pasos esenciales para empezar de forma simple y constante.', '2 de mayo, 2026',    '5 min', 'Rutinas',   'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1100&q=80'),
  ('a2', 'Diferencias entre cuidado facial y corporal',          'No son intercambiables. Te contamos por qué y cómo elegir productos para cada zona.', '24 de abril, 2026', '4 min', 'Educación', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1100&q=80'),
  ('a3', 'Errores comunes al comprar productos de estética',     'Comprar por moda o sin asesoría puede ser caro. Estos son los errores más frecuentes.', '10 de abril, 2026', '6 min', 'Consejos',  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1100&q=80'),
  ('a4', 'Cuándo solicitar consulta personalizada',              'Si dudás entre dos productos, si tu piel cambió o si querés un regalo especial.', '30 de marzo, 2026', '3 min', 'Consultoría','https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1100&q=80')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- DATOS INICIALES — FAQs
-- ============================================================
INSERT INTO dinatale.faqs (question, answer, sort_order) VALUES
  ('¿Cómo realizo una compra?',           'Podés agregar productos al carrito y finalizar la compra desde el sitio o por WhatsApp.', 1),
  ('¿Los productos tienen stock?',         'Cada producto muestra su estado actual: Disponible, Stock limitado o Sin stock.',         2),
  ('¿Hacen envíos?',                       'Sí, realizamos envíos a todo el país y ofrecemos retiro en local.',                       3),
  ('¿Puedo consultar antes de comprar?',   'Por supuesto. Nuestro equipo está disponible por WhatsApp para asesorarte.',              4),
  ('¿Qué métodos de pago aceptan?',       'Aceptamos transferencia bancaria, efectivo y otros medios a coordinar.',                  5),
  ('¿Cómo sé qué producto elegir?',       'Cuéntanos tu rutina actual. Recomendaremos opciones acordes a tu piel y objetivos.',     6),
  ('¿Puedo recibir consulta personalizada?', 'Sí. Ofrecemos consulta a distancia. Escribinos para coordinar.',                      7),
  ('¿Qué pasa si un producto está sin stock?', 'Podés consultar disponibilidad por WhatsApp. Te avisaremos cuando vuelva.',         8)
;

-- ============================================================
-- EXPONER ESQUEMA EN POSTGREST
-- Agregar en la config de PostgREST: db-extra-search-path = "dinatale, public"
-- O en el archivo /etc/postgrest/postgrest.conf:
--   db-schemas = "public, dinatale"
-- ============================================================

SELECT 'Schema dinatale creado correctamente ✓' AS resultado;
