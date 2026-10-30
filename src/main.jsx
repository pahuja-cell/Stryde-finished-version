import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import './styles.css';

const STORE_KEY = 'stryde-business-store-v1';
const ADMIN_SESSION_KEY = 'stryde-admin-session';

const defaultCatalog = [
  {
    id: 'stryde-heavyweight-hoodie',
    name: 'STRYDË Heavyweight Hoodie',
    category: 'Hoodies',
    collection: 'signature',
    status: 'active',
    type: 'Hoodie',
    colour: 'Washed Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fit: 'Relaxed oversized fit',
    material: 'Heavyweight cotton fleece',
    fabricWeight: 'Heavyweight',
    careInstructions: 'Machine wash cold, line dry',
    features: ['Dropped shoulders', 'Premium ribbed cuff', 'Small left-chest embroidery'],
    productMeasurements: 'Relaxed body with dropped sleeve line',
    price: 148,
    costPerUnit: 52,
    salePrice: '',
    sku: 'STRYDE-HOOD-BLK-001',
    stock: 24,
    quantitySold: 0,
    lowStockThreshold: 5,
    supplier: 'Northline Textile Co.',
    restockInfo: 'Reorder review on 12/11',
    mainImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    frontImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    backImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    detailImages: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'],
    editorialImages: ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'],
    description: 'An oversized hoodie built around structure, weight and a quiet confidence. Heavy fleece feel, dropped shoulders and a refined finish made to sit comfortably in rotation.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'stryde-essential-tee',
    name: 'STRYDË Essential Tee',
    category: 'Tees',
    collection: 'essentials',
    status: 'active',
    type: 'T-Shirt',
    colour: 'Off White',
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Standard relaxed fit',
    material: 'Premium cotton jersey',
    fabricWeight: 'Heavyweight',
    careInstructions: 'Cold wash, air dry when possible',
    features: ['Dropped shoulder line', 'Minimal chest embroidery', 'Structured neckline'],
    productMeasurements: 'Boxy relaxed body with clean sleeve drop',
    price: 92,
    costPerUnit: 33,
    salePrice: '',
    sku: 'STRYDE-TEE-OFF-002',
    stock: 32,
    quantitySold: 0,
    lowStockThreshold: 7,
    supplier: 'Westline Fabricworks',
    restockInfo: 'Next delivery scheduled for 18/11',
    mainImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    frontImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    backImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    detailImages: ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'],
    editorialImages: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'],
    description: 'An elevated everyday tee with substantial fabric presence and a deliberate shape. Clean neckline, dropped shoulders and sharp proportions designed for layering.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'stryde-relaxed-sweatpant',
    name: 'STRYDË Relaxed Sweatpant',
    category: 'Bottoms',
    collection: 'core-collection',
    status: 'active',
    type: 'Sweatpant',
    colour: 'Charcoal',
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Relaxed straight fit',
    material: 'Fleece cotton blend',
    fabricWeight: 'Mid-weight',
    careInstructions: 'Cold wash, reshape while drying',
    features: ['Elasticised waist', 'Structured leg profile', 'Discreet upper thigh branding'],
    productMeasurements: 'Relaxed through the leg with straight finish',
    price: 128,
    costPerUnit: 43,
    salePrice: '',
    sku: 'STRYDE-SWP-CHA-003',
    stock: 18,
    quantitySold: 0,
    lowStockThreshold: 6,
    supplier: 'Northline Textile Co.',
    restockInfo: 'Awaiting fabric confirmation',
    mainImage: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
    frontImage: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
    backImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    detailImages: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80'],
    editorialImages: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'],
    description: 'A premium sweatpant with a balanced leg line and softened structure. Functional details, measured volume and clean finish from waist to hem.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'stryde-signature-zip',
    name: 'STRYDË Signature Zip',
    category: 'Hoodies',
    collection: 'signature',
    status: 'active',
    type: 'Zip Hoodie',
    colour: 'Black',
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Refined relaxed fit',
    material: 'Premium brushed fleece',
    fabricWeight: 'Heavyweight',
    careInstructions: 'Hand wash cold or gentle machine cycle',
    features: ['Heavy zip closure', 'Tonal hardware', 'Structured hood'],
    productMeasurements: 'Relaxed body with a clean architectural line',
    price: 164,
    costPerUnit: 58,
    salePrice: '',
    sku: 'STRYDE-ZIP-BLK-004',
    stock: 15,
    quantitySold: 0,
    lowStockThreshold: 5,
    supplier: 'Studio Works UK',
    restockInfo: 'Need reorder by 27/11',
    mainImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    frontImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    backImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    detailImages: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'],
    editorialImages: ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'],
    description: 'A zip hoodie with a sharper line and structured layering silhouette. Premium weight, clean collar and functional details kept understated.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const defaultOrders = [];

function buildDefaultStore() {
  return {
    catalog: defaultCatalog,
    orders: defaultOrders,
    suppliers: [
      { name: 'Northline Textile Co.', contact: 'orders@northline.co', leadTime: '2 weeks' },
      { name: 'Westline Fabricworks', contact: 'ops@westline.com', leadTime: '10 days' },
      { name: 'Studio Works UK', contact: 'team@studio-works.uk', leadTime: '3 weeks' },
    ],
  };
}

function parseList(input) {
  if (!input) return [];
  return String(input)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProductRecord(rawProduct = {}) {
  const product = rawProduct || {};
  const productId = String(product.id || '').trim() || `product-${Date.now()}`;
  const sizes = Array.isArray(product.sizes)
    ? product.sizes.map((size) => String(size).trim()).filter(Boolean)
    : parseList(product.sizes);
  const features = Array.isArray(product.features)
    ? product.features.map((feature) => String(feature).trim()).filter(Boolean)
    : parseList(product.features);

  const salePrice = product.salePrice === '' || product.salePrice == null ? '' : Number(product.salePrice);
  const price = Number(product.price) || 0;
  const costPerUnit = Number(product.costPerUnit) || 0;
  const stock = Number(product.stock) || 0;
  const lowStockThreshold = Number(product.lowStockThreshold) || 0;

  const normalized = {
    id: productId,
    name: String(product.name || '').trim() || 'Untitled product',
    category: String(product.category || '').trim() || 'Uncategorised',
    collection: String(product.collection || '').trim() || 'essentials',
    status: ['active', 'draft', 'archived'].includes(product.status) ? product.status : 'draft',
    type: String(product.type || '').trim() || 'Essential',
    colour: String(product.colour || '').trim() || 'Not specified',
    sizes,
    fit: String(product.fit || '').trim() || 'Regular fit',
    material: String(product.material || '').trim() || 'Not specified',
    fabricWeight: String(product.fabricWeight || '').trim() || 'Standard',
    careInstructions: String(product.careInstructions || '').trim() || 'Follow garment care label',
    features,
    productMeasurements: String(product.productMeasurements || '').trim() || 'Not specified',
    description: String(product.description || '').trim() || 'Product description pending',
    price,
    costPerUnit,
    salePrice,
    sku: String(product.sku || '').trim() || `SKU-${productId}`,
    stock,
    quantitySold: Number(product.quantitySold) || 0,
    lowStockThreshold,
    supplier: String(product.supplier || '').trim() || 'Not assigned',
    restockInfo: String(product.restockInfo || '').trim() || 'No restock info yet',
    mainImage: String(product.mainImage || product.frontImage || '').trim() || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    frontImage: String(product.frontImage || product.mainImage || '').trim() || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    backImage: String(product.backImage || '').trim() || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    detailImages: Array.isArray(product.detailImages) ? product.detailImages.map((item) => String(item).trim()).filter(Boolean) : parseList(product.detailImages),
    editorialImages: Array.isArray(product.editorialImages) ? product.editorialImages.map((item) => String(item).trim()).filter(Boolean) : parseList(product.editorialImages),
    images: Array.isArray(product.images) ? product.images.map((item) => String(item).trim()).filter(Boolean) : [
      String(product.mainImage || product.frontImage || '').trim() || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    ],
    createdAt: String(product.createdAt || new Date().toISOString()),
    updatedAt: new Date().toISOString(),
  };

  if (normalized.images.length === 0) {
    normalized.images = [normalized.mainImage];
  }

  return normalized;
}

function parseCsvLine(line) {
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current);
      current = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells;
}

function parseCsvToProducts(csvText) {
  const clean = String(csvText || '').trim();
  if (!clean) {
    throw new Error('No CSV content supplied.');
  }

  const rows = clean.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (rows.length < 2) {
    throw new Error('CSV needs a header row and at least one product row.');
  }

  const headers = parseCsvLine(rows[0]).map((header) => header.trim());
  const requiredColumns = ['id', 'name', 'category', 'collection', 'status'];
  const missing = requiredColumns.filter((column) => !headers.includes(column));

  if (missing.length) {
    throw new Error(`CSV is missing required columns: ${missing.join(', ')}`);
  }

  const products = rows.slice(1).map((row, index) => {
    const values = parseCsvLine(row);
    const product = {};

    headers.forEach((header, columnIndex) => {
      const value = values[columnIndex] || '';
      product[header] = value.trim();
    });

    if (!product.id && !product.name) {
      return null;
    }

    return normalizeProductRecord({
      ...product,
      sizes: product.sizes || '',
      features: product.features || '',
      detailImages: product.detailImages || '',
      editorialImages: product.editorialImages || '',
      price: product.price || 0,
      costPerUnit: product.costPerUnit || 0,
      salePrice: product.salePrice || '',
      stock: product.stock || 0,
      quantitySold: product.quantitySold || 0,
      lowStockThreshold: product.lowStockThreshold || 0,
    });
  }).filter(Boolean);

  if (!products.length) {
    throw new Error('No valid product rows were found in the CSV.');
  }

  return products;
}

function exportCatalogCsv(catalog) {
  const headers = [
    'id', 'name', 'category', 'collection', 'status', 'type', 'colour', 'sizes', 'fit', 'material', 'fabricWeight',
    'careInstructions', 'features', 'productMeasurements', 'description', 'price', 'costPerUnit', 'salePrice', 'sku',
    'stock', 'quantitySold', 'lowStockThreshold', 'supplier', 'restockInfo', 'mainImage', 'frontImage', 'backImage',
    'detailImages', 'editorialImages', 'createdAt', 'updatedAt'
  ];

  const values = catalog.map((item) => [
    item.id,
    item.name,
    item.category,
    item.collection,
    item.status,
    item.type,
    item.colour,
    (item.sizes || []).join('; '),
    item.fit,
    item.material,
    item.fabricWeight,
    item.careInstructions,
    (item.features || []).join('; '),
    item.productMeasurements,
    item.description,
    item.price,
    item.costPerUnit,
    item.salePrice || '',
    item.sku,
    item.stock,
    item.quantitySold,
    item.lowStockThreshold,
    item.supplier,
    item.restockInfo,
    item.mainImage,
    item.frontImage,
    item.backImage,
    (item.detailImages || []).join('; '),
    (item.editorialImages || []).join('; '),
    item.createdAt,
    item.updatedAt,
  ]);

  const csvRows = [headers, ...values].map((row) => row.map(escapeCsvValue).join(','));
  return csvRows.join('\n');
}

function escapeCsvValue(value) {
  const stringValue = String(value ?? '');
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function toCurrency(value) {
  const numericValue = Number(value) || 0;
  return `£${numericValue.toFixed(2)}`;
}

function getBusinessStore() {
  try {
    const rawValue = localStorage.getItem(STORE_KEY);
    if (!rawValue) {
      const defaultStore = buildDefaultStore();
      localStorage.setItem(STORE_KEY, JSON.stringify(defaultStore));
      return defaultStore;
    }

    const parsed = JSON.parse(rawValue);
    return {
      catalog: Array.isArray(parsed.catalog) ? parsed.catalog.map(normalizeProductRecord) : buildDefaultStore().catalog,
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      suppliers: Array.isArray(parsed.suppliers) ? parsed.suppliers : [],
    };
  } catch {
    return buildDefaultStore();
  }
}

function saveBusinessStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function createEmptyProduct() {
  return normalizeProductRecord({
    id: `product-${Date.now()}`,
    name: '',
    category: 'Hoodies',
    collection: 'signature',
    status: 'draft',
    type: 'Hoodie',
    colour: 'Washed Black',
    sizes: 'XS, S, M, L, XL',
    fit: 'Relaxed oversized fit',
    material: 'Heavyweight cotton fleece',
    fabricWeight: 'Heavyweight',
    careInstructions: 'Machine wash cold, line dry',
    features: 'Dropped shoulders, Premium ribbed cuff, Left-chest embroidery',
    productMeasurements: 'Relaxed body with dropped sleeve line',
    description: 'Insert product description here',
    price: 0,
    costPerUnit: 0,
    salePrice: '',
    sku: '',
    stock: 0,
    quantitySold: 0,
    lowStockThreshold: 5,
    supplier: 'Not assigned',
    restockInfo: 'No restock info yet',
    mainImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    frontImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    backImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    detailImages: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    editorialImages: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
  });
}

function App() {
  const [businessStore, setBusinessStore] = useState(() => getBusinessStore());
  const [bag, setBag] = useState(() => {
    try {
      const saved = localStorage.getItem('stryde-bag');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const publicProducts = useMemo(
    () => businessStore.catalog.filter((product) => product.status === 'active'),
    [businessStore.catalog]
  );

  useEffect(() => {
    saveBusinessStore(businessStore);
  }, [businessStore]);

  useEffect(() => {
    localStorage.setItem('stryde-bag', JSON.stringify(bag));
  }, [bag]);

  const addToBag = (product, selectedSize) => {
    setBag((currentBag) => {
      const existingIndex = currentBag.findIndex((item) => item.id === product.id && item.size === selectedSize);
      if (existingIndex >= 0) {
        const next = [...currentBag];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...currentBag, { ...product, size: selectedSize, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, size, direction) => {
    setBag((currentBag) =>
      currentBag
        .map((item) => {
          if (item.id === productId && item.size === size) {
            return { ...item, quantity: Math.max(0, item.quantity + direction) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromBag = (productId, size) => {
    setBag((currentBag) => currentBag.filter((item) => !(item.id === productId && item.size === size)));
  };

  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bag.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <BrowserRouter>
      <SiteShell bagCount={bagCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <Routes>
          <Route path="/" element={<HomePage products={publicProducts} />} />
          <Route path="/shop" element={<ShopPage products={publicProducts} addToBag={addToBag} />} />
          <Route path="/collections" element={<CollectionsPage products={publicProducts} />} />
          <Route path="/collections/:slug" element={<CollectionDetailPage products={publicProducts} />} />
          <Route path="/product/:productId" element={<ProductPage products={publicProducts} addToBag={addToBag} />} />
          <Route path="/bag" element={<BagPage bag={bag} subtotal={subtotal} updateQuantity={updateQuantity} removeFromBag={removeFromBag} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/admin" element={<AdminApp store={businessStore} setStore={setBusinessStore} />} />
          <Route path="*" element={<HomePage products={publicProducts} />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  );
}

function SiteShell({ bagCount, menuOpen, setMenuOpen, children }) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <nav className="desktop-nav" aria-label="Main navigation">
            {[
              { to: '/shop', label: 'Shop' },
              { to: '/collections', label: 'Collections' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map((item) => (
              <NavLink key={item.to} to={item.to} className="nav-link">
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/" className="wordmark" aria-label="STRYDË home">
            STRYDË
          </Link>

          <div className="nav-right">
            <Link to="/shop" className="nav-link hidden-mobile">
              Shop
            </Link>
            <Link to="/admin" className="nav-link hidden-mobile">
              Admin
            </Link>
            <Link to="/bag" className="bag-link" aria-label="Shopping bag">
              <span>Bag</span>
              <span className="bag-count">{bagCount}</span>
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mobile-menu">
            {[
              { to: '/shop', label: 'Shop' },
              { to: '/collections', label: 'Collections' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
              { to: '/admin', label: 'Admin' },
            ].map((item) => (
              <NavLink key={item.to} to={item.to} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </div>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="wordmark footer-wordmark">STRYDË</div>
            <p className="muted footer-intro">Premium streetwear shaped through rhythm, restraint and utility.</p>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <div>
            <h3>Support</h3>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h3>Newsletter</h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2024 STRYDË</span>
          <div className="legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/size-guide">Size guide</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ products }) {
  const featured = products.filter((item) => item.featured || item.status === 'active').slice(0, 3);

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow">EST. 2024 / MODERN STREETWEAR</p>
          <h1>NOT MADE TO FOLLOW.</h1>
          <p className="hero-subtext">Defined by utility, intention and sharp silhouettes for movement beyond the moment.</p>
          <div className="hero-actions">
            <Link to="/shop" className="primary-button">Shop now</Link>
            <Link to="/collections" className="secondary-button">View collections</Link>
          </div>
        </div>
      </section>

      <section className="container section-block luxury-panel">
        <div className="section-heading row-space">
          <div>
            <p className="eyebrow">Featured collection</p>
            <h2>Refined essentials for an intentional wardrobe.</h2>
          </div>
          <Link to="/collections" className="text-link">Browse all</Link>
        </div>

        <div className="editorial-grid">
          {[
            { title: 'Essentials', text: 'Clean silhouettes built to work harder every day.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80' },
            { title: 'Core Collection', text: 'Utility, rhythm and everyday ease in one consistent language.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80' },
            { title: 'Signature', text: 'A stronger point of view expressed in measured detail.', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80' },
          ].map((collection) => (
            <article key={collection.title} className="editorial-card">
              <img src={collection.image} alt={collection.title} />
              <div className="editorial-copy">
                <span>{collection.title}</span>
                <p>{collection.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block arrivals-block">
        <div className="section-heading row-space">
          <div>
            <p className="eyebrow">New arrivals</p>
            <h2>New season essentials.</h2>
          </div>
          <Link to="/shop" className="text-link">View all</Link>
        </div>

        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="campaign-section">
        <div className="container campaign-layout">
          <div className="campaign-image-wrap">
            <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80" alt="STRYDË campaign portrait" />
          </div>
          <div className="campaign-copy">
            <p className="eyebrow">Brand statement</p>
            <h2>Independent by design. Precise by instinct.</h2>
            <p>
              Strydë brings together understated luxury and urban rhythm through silhouettes that feel deliberate, effortless and unmistakably contemporary.
            </p>
            <div className="campaign-meta">
              <span>Limited run</span>
              <span>Made to layer</span>
              <span>Designed for movement</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ShopPage({ products, addToBag }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [search, setSearch] = useState('');

  const categories = ['All', ...new Set(products.map((item) => item.category))];

  const visibleProducts = useMemo(() => {
    let next = selectedCategory === 'All' ? [...products] : products.filter((product) => product.category === selectedCategory);

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      next = next.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.collection.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'low-high') next.sort((a, b) => a.price - b.price);
    else if (sortBy === 'high-low') next.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') next.sort((a, b) => a.name.localeCompare(b.name));
    else next.sort((a, b) => Number(b.featured || false) - Number(a.featured || false));

    return next;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <div className="container page-shell shop-page">
      <div className="shop-header">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>Signature essentials.</h1>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products…" aria-label="Search products" />
        </div>

        <div className="sort-box">
          <label htmlFor="sortBy">Sort by</label>
          <select id="sortBy" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to high</option>
            <option value="high-low">Price: High to low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="filters" aria-label="Product filters">
        {categories.map((category) => (
          <button key={category} type="button" className={selectedCategory === category ? 'filter active' : 'filter'} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid shop-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} smallAction={addToBag} />
        ))}
      </div>
    </div>
  );
}

function CollectionsPage({ products }) {
  const collectionMeta = {
    essentials: {
      title: 'Essentials',
      subtitle: 'Quiet confidence',
      description: 'The foundational layer. Clean silhouettes, measured structure and materials designed for everyday wear without excess.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80',
    },
    'core-collection': {
      title: 'Core Collection',
      subtitle: 'Built to move',
      description: 'A seasonless edit of weighted essentials shaped for movement, ease and effortless styling.',
      image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80',
    },
    signature: {
      title: 'Signature',
      subtitle: 'Statement without noise',
      description: 'Identity-led layers and refined silhouettes that carry the STRYDË point of view with a quieter confidence.',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80',
    },
    'new-arrivals': {
      title: 'New Arrivals',
      subtitle: 'Latest drop',
      description: 'Fresh silhouettes and studied details arriving with a sharper edit of key seasonal pieces.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80',
    },
  };

  return (
    <div className="container page-shell">
      <div className="page-heading section-spaced">
        <p className="eyebrow">Collections</p>
        <h1>Curated seasonal edits.</h1>
      </div>

      <div className="collection-page-grid">
        {Object.entries(collectionMeta).map(([slug, collection]) => (
          <Link key={slug} to={`/collections/${slug}`} className="collection-tile">
            <img src={collection.image} alt={collection.title} />
            <div className="collection-tile-copy">
              <span>{collection.subtitle}</span>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CollectionDetailPage({ products }) {
  const { slug } = useParams();
  const collectionMeta = {
    essentials: {
      title: 'Essentials',
      subtitle: 'Quiet confidence',
      description: 'The foundational layer. Clean silhouettes, measured structure and materials designed for everyday wear without excess.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80',
    },
    'core-collection': {
      title: 'Core Collection',
      subtitle: 'Built to move',
      description: 'A seasonless edit of weighted essentials shaped for movement, ease and effortless styling.',
      image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80',
    },
    signature: {
      title: 'Signature',
      subtitle: 'Statement without noise',
      description: 'Identity-led layers and refined silhouettes that carry the STRYDË point of view with a quieter confidence.',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80',
    },
    'new-arrivals': {
      title: 'New Arrivals',
      subtitle: 'Latest drop',
      description: 'Fresh silhouettes and studied details arriving with a sharper edit of key seasonal pieces.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80',
    },
  };

  const collection = collectionMeta[slug];
  if (!collection) {
    return (
      <div className="container page-shell">
        <h1>Collection not found.</h1>
      </div>
    );
  }

  const collectionProducts = products.filter((product) => product.collection === slug);

  return (
    <div className="container page-shell collection-detail">
      <div className="collection-hero">
        <img src={collection.image} alt={collection.title} />
        <div className="collection-hero-copy">
          <p className="eyebrow">{collection.subtitle}</p>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
        </div>
      </div>

      <div className="product-grid collection-products">
        {collectionProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductPage({ products, addToBag }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedImage(0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container page-shell">
        <h1>Product not found.</h1>
        <Link to="/shop" className="primary-button inline-button">Back to shop</Link>
      </div>
    );
  }

  const relatedProducts = products.filter((item) => item.id !== product.id && item.collection === product.collection).slice(0, 3);
  const gallery = [product.mainImage, product.frontImage, product.backImage, ...(product.detailImages || []), ...(product.editorialImages || [])].filter(Boolean);

  return (
    <div className="container page-shell product-page">
      <div className="product-gallery">
        <div className="thumbs">
          {gallery.map((image, index) => (
            <button key={`${image}-${index}`} type="button" className={selectedImage === index ? 'thumb active' : 'thumb'} onClick={() => setSelectedImage(index)} aria-label={`View product image ${index + 1}`}>
              <img src={image} alt={`${product.name} ${index + 1}`} />
            </button>
          ))}
        </div>

        <div className="main-image">
          <img src={gallery[selectedImage] || product.mainImage} alt={product.name} />
        </div>
      </div>

      <div className="product-details">
        <div className="product-meta-top">
          <p className="eyebrow">{product.category}</p>
          <span className="concept-badge">Concept inventory</span>
        </div>

        <h1>{product.name}</h1>
        <div className="price-row">
          <span className="price">{toCurrency(product.price)}</span>
          <span className="muted">Free delivery on orders over £150</span>
        </div>

        <div className="size-selector">
          <div className="selector-header">
            <span>Size</span>
            <span className="muted">Select</span>
          </div>
          <div className="sizes">
            {(product.sizes || []).map((size) => (
              <button key={size} type="button" className={selectedSize === size ? 'size-btn active' : 'size-btn'} onClick={() => setSelectedSize(size)}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="primary-button product-button" onClick={() => addToBag(product, selectedSize)}>
          Add to bag
        </button>

        <div className="description-block">
          <h3>Product details</h3>
          <p>{product.description}</p>
          <ul>
            <li>{product.material}</li>
            <li>{product.fit}</li>
            <li>{product.fabricWeight}</li>
            <li>{product.careInstructions}</li>
          </ul>
        </div>
      </div>

      {relatedProducts.length > 0 ? (
        <div className="related-block">
          <div className="section-heading row-space">
            <div>
              <p className="eyebrow">You may also like</p>
              <h2>Complete the set.</h2>
            </div>
          </div>
          <div className="product-grid related-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BagPage({ bag, subtotal, updateQuantity, removeFromBag }) {
  return (
    <div className="container page-shell bag-page">
      <div className="shop-header">
        <div>
          <p className="eyebrow">Bag</p>
          <h1>Shopping bag.</h1>
        </div>
      </div>

      {bag.length === 0 ? (
        <div className="empty-bag">
          <h2>Your bag is empty.</h2>
          <p>Start with the latest drop and build your rotation.</p>
          <Link to="/shop" className="primary-button inline-button">Continue shopping</Link>
        </div>
      ) : (
        <div className="bag-layout">
          <div className="bag-items">
            {bag.map((item) => (
              <div key={`${item.id}-${item.size}`} className="bag-item">
                <img src={item.mainImage || item.images?.[0]} alt={item.name} />
                <div className="bag-item-copy">
                  <div className="bag-topline">
                    <div>
                      <h3>{item.name}</h3>
                      <span>{item.size}</span>
                    </div>
                    <button type="button" className="remove-link" onClick={() => removeFromBag(item.id, item.size)}>
                      Remove
                    </button>
                  </div>

                  <div className="bag-quantity-row">
                    <div className="quantity-control">
                      <button type="button" onClick={() => updateQuantity(item.id, item.size, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.size, 1)}>+</button>
                    </div>
                    <strong>{toCurrency(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="summary-card">
            <h3>Summary</h3>
            <div className="summary-line">
              <span>Subtotal</span>
              <strong>{toCurrency(subtotal)}</strong>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <strong>Calculated at checkout</strong>
            </div>
            <div className="summary-line total-line">
              <span>Total</span>
              <strong>{toCurrency(subtotal)}</strong>
            </div>
            <button type="button" className="primary-button checkout-button">Proceed to checkout</button>
            <p className="muted checkout-note">This storefront demo is front-end only. Real payment and order handling must be integrated before launch.</p>
          </aside>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="container page-shell static-page">
      <p className="eyebrow">About</p>
      <h1>Quietly confident. Always deliberate.</h1>
      <p>
        STRYDË is a premium streetwear label shaped by contrast: minimal but expressive, structured but wearable, urban but refined. The brand is rooted in considered dressing and a culture of intentional movement.
      </p>
      <p>
        Each collection is built around a strong point of view — utility, rhythm, and calm confidence — rather than trend-driven excess. The result is a wardrobe designed to move with the wearer and hold visual clarity over time.
      </p>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="container page-shell static-page">
      <p className="eyebrow">Contact</p>
      <h1>Get in touch.</h1>
      <ul className="info-list">
        <li>Email: hello@stryde.studio</li>
        <li>Instagram: @stryde</li>
        <li>Hours: Mon–Fri / 10:00–18:00</li>
      </ul>
    </div>
  );
}

function ShippingPage() {
  return (
    <div className="container page-shell static-page">
      <p className="eyebrow">Shipping</p>
      <h1>Shipping information.</h1>
      <p>Shipping options and timing will be confirmed during checkout. This storefront content should be updated with final carrier and delivery policy details before launch.</p>
    </div>
  );
}

function ReturnsPage() {
  return (
    <div className="container page-shell static-page">
      <p className="eyebrow">Returns</p>
      <h1>Returns & exchanges.</h1>
      <p>Return windows and conditions should be defined by the final commercial operations policy before making the site live for commercial orders.</p>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="container page-shell static-page">
      <p className="eyebrow">Privacy</p>
      <h1>Privacy policy.</h1>
      <p>This page contains placeholder policy language. Before launch, replace with your final privacy notice and consent information, including data retention, cookies, and third-party processors.</p>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="container page-shell static-page">
      <p className="eyebrow">Terms</p>
      <h1>Terms & conditions.</h1>
      <p>Legal terms should be reviewed by a qualified advisor before accepting any real orders. This content is a placeholder for the final storefront.</p>
    </div>
  );
}

function FaqPage() {
  return (
    <div className="container page-shell static-page">
      <p className="eyebrow">FAQs</p>
      <h1>Frequently asked questions.</h1>
      <div className="faq-list">
        <div>
          <h3>Do you offer international shipping?</h3>
          <p>International shipping is indicated as available in principle, but final carrier setup and charges should be confirmed before live production.</p>
        </div>
        <div>
          <h3>How do I choose my size?</h3>
          <p>Refer to the size guide for a more accurate fit reference based on measurements and garment silhouette.</p>
        </div>
      </div>
    </div>
  );
}

function SizeGuidePage() {
  return (
    <div className="container page-shell static-page">
      <p className="eyebrow">Size guide</p>
      <h1>Fit notes.</h1>
      <div className="size-guide-table">
        <div><span>Size</span><span>Chest</span><span>Length</span></div>
        <div><span>S</span><span>96cm</span><span>70cm</span></div>
        <div><span>M</span><span>102cm</span><span>72cm</span></div>
        <div><span>L</span><span>108cm</span><span>75cm</span></div>
        <div><span>XL</span><span>116cm</span><span>78cm</span></div>
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setMessage('Subscribed successfully.');
    setEmail('');
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" />
      <button type="submit">Join</button>
      {message ? <p className={`form-status ${status}`}>{message}</p> : null}
    </form>
  );
}

function ProductCard({ product, smallAction }) {
  const image = product.mainImage || product.frontImage || product.images?.[0];

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={image} alt={product.name} />
      </Link>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
        </div>
        <div className="product-meta">
          <span>{toCurrency(product.price)}</span>
          {smallAction ? (
            <button
              type="button"
              className="link-button"
              onClick={(event) => {
                event.preventDefault();
                smallAction(product, product.sizes?.[0] || 'M');
              }}
            >
              Add
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function AdminApp({ store, setStore }) {
  const [isUnlocked, setIsUnlocked] = useState(() => !!sessionStorage.getItem(ADMIN_SESSION_KEY));
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [draft, setDraft] = useState(createEmptyProduct());

  const handleUnlock = (event) => {
    event.preventDefault();
    const trimmed = passphrase.trim();
    if (!trimmed) {
      setError('Enter an admin passphrase to continue.');
      return;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, trimmed);
    setIsUnlocked(true);
    setError('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsUnlocked(false);
    setPassphrase('');
  };

  const filteredProducts = useMemo(() => {
    return store.catalog.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter, store.catalog]);

  const totals = useMemo(() => {
    const totalUnits = store.catalog.reduce((sum, product) => sum + Number(product.stock || 0), 0);
    const lowStock = store.catalog.filter((product) => Number(product.stock || 0) <= Number(product.lowStockThreshold || 0)).length;
    const revenue = store.orders.reduce((sum, order) => sum + Number(order.amount || 0), 0);
    const totalProducts = store.catalog.length;
    const profit = store.catalog.reduce((sum, product) => sum + (Number(product.price || 0) - Number(product.costPerUnit || 0)) * Number(product.quantitySold || 0), 0);

    return { totalProducts, totalUnits, lowStock, revenue, profit };
  }, [store.catalog, store.orders]);

  const handleSaveProduct = (event) => {
    event.preventDefault();
    const normalized = normalizeProductRecord(draft);

    if (!normalized.name || !normalized.category || !normalized.sku) {
      alert('Name, category and SKU are required before saving.');
      return;
    }

    setStore((current) => {
      const existingIndex = current.catalog.findIndex((item) => item.id === normalized.id);
      const nextCatalog = [...current.catalog];

      if (existingIndex >= 0) {
        nextCatalog[existingIndex] = normalized;
      } else {
        nextCatalog.push(normalized);
      }

      return { ...current, catalog: nextCatalog };
    });

    setDraft(createEmptyProduct());
  };

  const handleEditProduct = (product) => {
    setDraft(normalizeProductRecord(product));
  };

  const handleDeleteProduct = (productId) => {
    setStore((current) => ({
      ...current,
      catalog: current.catalog.filter((product) => product.id !== productId),
    }));
  };

  const handleArchiveProduct = (productId) => {
    setStore((current) => ({
      ...current,
      catalog: current.catalog.map((product) =>
        product.id === productId ? { ...product, status: 'archived', updatedAt: new Date().toISOString() } : product
      ),
    }));
  };

  const handleCsvExport = () => {
    downloadTextFile('stryde-product-catalog.csv', exportCatalogCsv(store.catalog), 'text/csv;charset=utf-8;');
  };

  const handleImportCsv = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedProducts = parseCsvToProducts(text);
      const productMap = new Map();

      store.catalog.forEach((item) => productMap.set(item.id, item));
      importedProducts.forEach((item) => {
        productMap.set(item.id, item);
      });

      setStore((current) => ({
        ...current,
        catalog: Array.from(productMap.values()).map((product) => normalizeProductRecord(product)),
      }));
      event.target.value = '';
      alert(`${importedProducts.length} product record(s) imported successfully.`);
    } catch (error) {
      alert(error.message || 'CSV import failed.');
      event.target.value = '';
    }
  };

  if (!isUnlocked) {
    return (
      <div className="container admin-auth-shell">
        <div className="admin-auth-card">
          <p className="eyebrow">Private admin</p>
          <h1>STRYDË inventory access</h1>
          <p className="admin-auth-copy">
            This is a development-ready admin gate for the storefront. For production, replace with a secured backend session and role-based authentication.
          </p>
          <form onSubmit={handleUnlock} className="admin-auth-form">
            <input type="password" value={passphrase} onChange={(event) => setPassphrase(event.target.value)} placeholder="Enter admin passphrase" />
            <button type="submit" className="primary-button">Unlock dashboard</button>
          </form>
          {error ? <p className="form-status error">{error}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="container admin-shell">
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>STRYDË administration</h1>
        </div>
        <button type="button" className="secondary-button" onClick={handleLogout}>Log out</button>
      </div>

      <div className="admin-summary-grid">
        <div className="admin-stat-card">
          <span>Total products</span>
          <strong>{totals.totalProducts}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Total inventory</span>
          <strong>{totals.totalUnits}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Low stock</span>
          <strong>{totals.lowStock}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Revenue</span>
          <strong>{toCurrency(totals.revenue)}</strong>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-actions">
          <button type="button" className="primary-button" onClick={() => setDraft(createEmptyProduct())}>Add product</button>
          <button type="button" className="secondary-button" onClick={handleCsvExport}>Export CSV</button>
          <label className="secondary-button import-label">
            Import CSV
            <input type="file" accept=".csv" onChange={handleImportCsv} />
          </label>
        </div>

        <div className="admin-search-row">
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="admin-layout">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="table-product-cell">
                      <img src={product.mainImage || product.frontImage} alt={product.name} />
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{toCurrency(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`status-pill ${product.status}`}>{product.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button type="button" onClick={() => handleEditProduct(product)}>Edit</button>
                      <button type="button" onClick={() => handleArchiveProduct(product.id)}>Archive</button>
                      <button type="button" className="danger-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form className="admin-form" onSubmit={handleSaveProduct}>
          <h2>{draft.id ? 'Edit product' : 'Create product'}</h2>
          <div className="field-grid">
            <label>
              Product ID
              <input value={draft.id} onChange={(event) => setDraft({ ...draft, id: event.target.value })} />
            </label>
            <label>
              Product name
              <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            </label>
            <label>
              Category
              <input value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} />
            </label>
            <label>
              Collection
              <input value={draft.collection} onChange={(event) => setDraft({ ...draft, collection: event.target.value })} />
            </label>
            <label>
              Status
              <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label>
              Type
              <input value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })} />
            </label>
            <label>
              Colour
              <input value={draft.colour} onChange={(event) => setDraft({ ...draft, colour: event.target.value })} />
            </label>
            <label>
              SKU
              <input value={draft.sku} onChange={(event) => setDraft({ ...draft, sku: event.target.value })} />
            </label>
            <label>
              Retail price
              <input type="number" value={draft.price} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) || 0 })} />
            </label>
            <label>
              Cost per unit
              <input type="number" value={draft.costPerUnit} onChange={(event) => setDraft({ ...draft, costPerUnit: Number(event.target.value) || 0 })} />
            </label>
            <label>
              Sale price
              <input type="number" value={draft.salePrice || ''} onChange={(event) => setDraft({ ...draft, salePrice: event.target.value })} />
            </label>
            <label>
              Stock
              <input type="number" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: Number(event.target.value) || 0 })} />
            </label>
            <label>
              Low stock threshold
              <input type="number" value={draft.lowStockThreshold} onChange={(event) => setDraft({ ...draft, lowStockThreshold: Number(event.target.value) || 0 })} />
            </label>
            <label>
              Supplier
              <input value={draft.supplier} onChange={(event) => setDraft({ ...draft, supplier: event.target.value })} />
            </label>
            <label>
              Reorder info
              <input value={draft.restockInfo} onChange={(event) => setDraft({ ...draft, restockInfo: event.target.value })} />
            </label>
            <label className="full-width">
              Available sizes
              <input value={(draft.sizes || []).join(', ')} onChange={(event) => setDraft({ ...draft, sizes: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} />
            </label>
            <label>
              Fit
              <input value={draft.fit} onChange={(event) => setDraft({ ...draft, fit: event.target.value })} />
            </label>
            <label>
              Material
              <input value={draft.material} onChange={(event) => setDraft({ ...draft, material: event.target.value })} />
            </label>
            <label>
              Fabric weight
              <input value={draft.fabricWeight} onChange={(event) => setDraft({ ...draft, fabricWeight: event.target.value })} />
            </label>
            <label className="full-width">
              Features
              <input value={(draft.features || []).join(', ')} onChange={(event) => setDraft({ ...draft, features: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} />
            </label>
            <label className="full-width">
              Care instructions
              <textarea value={draft.careInstructions} onChange={(event) => setDraft({ ...draft, careInstructions: event.target.value })} />
            </label>
            <label className="full-width">
              Description
              <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
            </label>
            <label className="full-width">
              Main image
              <input value={draft.mainImage} onChange={(event) => setDraft({ ...draft, mainImage: event.target.value })} />
            </label>
            <label className="full-width">
              Front image
              <input value={draft.frontImage} onChange={(event) => setDraft({ ...draft, frontImage: event.target.value })} />
            </label>
            <label className="full-width">
              Back image
              <input value={draft.backImage} onChange={(event) => setDraft({ ...draft, backImage: event.target.value })} />
            </label>
            <label className="full-width">
              Detail images
              <input value={(draft.detailImages || []).join(', ')} onChange={(event) => setDraft({ ...draft, detailImages: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} />
            </label>
            <label className="full-width">
              Editorial images
              <input value={(draft.editorialImages || []).join(', ')} onChange={(event) => setDraft({ ...draft, editorialImages: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">Save product</button>
            <button type="button" className="secondary-button" onClick={() => setDraft(createEmptyProduct())}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
