import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import './styles.css';

const products = [
  {
    id: 'signature-oversized-hoodie',
    name: 'STRYDË Heavyweight Hoodie',
    category: 'Hoodies',
    collection: 'signature',
    price: 148,
    description:
      'An oversized hoodie built around structure, weight and a quiet confidence. Heavy fleece feel, dropped shoulders and a refined finish made to sit comfortably in rotation.',
    fit: 'Relaxed / oversized fit',
    material: 'Heavyweight cotton fleece',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Stone', 'Warm Cream'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isConcept: true,
    conceptLabel: 'Concept styling',
  },
  {
    id: 'essential-heavyweight-tee',
    name: 'STRYDË Essential Tee',
    category: 'Tees',
    collection: 'essentials',
    price: 92,
    description:
      'An elevated everyday tee with substantial fabric presence and a deliberate shape. Clean neckline, dropped shoulders and sharp proportions designed for layering.',
    fit: 'Standard / relaxed',
    material: 'Premium cotton jersey',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Off White', 'Charcoal', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isConcept: true,
    conceptLabel: 'Concept styling',
  },
  {
    id: 'stryde-relaxed-sweatpants',
    name: 'STRYDË Relaxed Sweatpant',
    category: 'Bottoms',
    collection: 'core-collection',
    price: 128,
    description:
      'A premium sweatpant with a balanced leg line and softened structure. Functional details, measured volume and clean finish from waist to hem.',
    fit: 'Relaxed fit',
    material: 'Fleece cotton blend',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Stone', 'Charcoal'],
    images: [
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
    isConcept: true,
    conceptLabel: 'Concept styling',
  },
  {
    id: 'signature-zip-hoodie',
    name: 'STRYDË Signature Zip',
    category: 'Hoodies',
    collection: 'signature',
    price: 164,
    description:
      'A zip hoodie with a sharper line and structured layering silhouette. Premium weight, clean collar and functional details kept understated.',
    fit: 'Slim / refined relaxed',
    material: 'Premium brushed fleece',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal', 'Cream'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isConcept: true,
    conceptLabel: 'Concept styling',
  },
  {
    id: 'city-utility-overshirt',
    name: 'STRYDË Utility Overshirt',
    category: 'Outerwear',
    collection: 'new-arrivals',
    price: 182,
    description:
      'A structured outer layer with utility references and a sharper silhouette. Designed for layering without excess, finished with clean functional details.',
    fit: 'Structured relaxed',
    material: 'Cotton twill blend',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Graphite', 'Stone'],
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isConcept: true,
    conceptLabel: 'Concept styling',
  },
  {
    id: 'edge-utility-cap',
    name: 'STRYDË Utility Cap',
    category: 'Accessories',
    collection: 'essentials',
    price: 54,
    description:
      'A structured cap aiming for subtle utility and a polished finish. Built to complete the look without visual overload.',
    fit: 'One size fit',
    material: 'Cotton canvas',
    sizes: ['One Size'],
    colors: ['Black', 'Stone'],
    images: [
      'https://images.unsplash.com/photo-1521369909026-2afed882baee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988c2477d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
    isConcept: true,
    conceptLabel: 'Concept styling',
  },
];

const collectionMeta = {
  essentials: {
    title: 'Essentials',
    subtitle: 'Quiet confidence',
    description:
      'The foundational layer. Clean silhouettes, measured structure and materials designed for everyday wear without excess.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80',
  },
  'core-collection': {
    title: 'Core Collection',
    subtitle: 'Built to move',
    description:
      'A seasonless edit of weighted essentials shaped for movement, ease and effortless styling.',
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80',
  },
  signature: {
    title: 'Signature',
    subtitle: 'Statement without noise',
    description:
      'Identity-led layers and refined silhouettes that carry the Strydë point of view with a quieter confidence.',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80',
  },
  'new-arrivals': {
    title: 'New Arrivals',
    subtitle: 'Latest drop',
    description:
      'Fresh silhouettes and studied details arriving with a sharper edit of key seasonal pieces.',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80',
  },
};

const navItems = [
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function App() {
  const [bag, setBag] = useState(() => {
    try {
      const saved = localStorage.getItem('stryde-bag');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('stryde-bag', JSON.stringify(bag));
  }, [bag]);

  const addToBag = (product, selectedSize) => {
    setBag((currentBag) => {
      const existingIndex = currentBag.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );

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
    setBag((currentBag) =>
      currentBag.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bag.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <BrowserRouter>
      <SiteShell bagCount={bagCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/shop" element={<ShopPage products={products} addToBag={addToBag} />} />
          <Route path="/collections" element={<CollectionsPage products={products} />} />
          <Route path="/collections/:slug" element={<CollectionDetailPage products={products} />} />
          <Route path="/product/:productId" element={<ProductPage products={products} addToBag={addToBag} />} />
          <Route path="/bag" element={<BagPage bag={bag} subtotal={subtotal} updateQuantity={updateQuantity} removeFromBag={removeFromBag} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="*" element={<HomePage products={products} />} />
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
            {navItems.map((item) => (
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
            {navItems.map((item) => (
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
  const featured = products.filter((item) => item.featured);

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow">EST. 2024 / MODERN STREETWEAR</p>
          <h1>NOT MADE TO FOLLOW.</h1>
          <p className="hero-subtext">
            Defined by utility, intention and sharp silhouettes for movement beyond the moment.
          </p>
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
    else next.sort((a, b) => Number(b.featured) - Number(a.featured));

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
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? 'filter active' : 'filter'}
            onClick={() => setSelectedCategory(category)}
          >
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

function CollectionsPage() {
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
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M');

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

  return (
    <div className="container page-shell product-page">
      <div className="product-gallery">
        <div className="thumbs">
          {product.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={selectedImage === index ? 'thumb active' : 'thumb'}
              onClick={() => setSelectedImage(index)}
              aria-label={`View product image ${index + 1}`}
            >
              <img src={image} alt={`${product.name} ${index + 1}`} />
            </button>
          ))}
        </div>

        <div className="main-image">
          <img src={product.images[selectedImage]} alt={product.name} />
        </div>
      </div>

      <div className="product-details">
        <div className="product-meta-top">
          <p className="eyebrow">{product.category}</p>
          {product.isConcept ? <span className="concept-badge">{product.conceptLabel}</span> : null}
        </div>

        <h1>{product.name}</h1>
        <div className="price-row">
          <span className="price">£{product.price}</span>
          <span className="muted">Free delivery on orders over £150</span>
        </div>

        <div className="size-selector">
          <div className="selector-header">
            <span>Size</span>
            <span className="muted">Select</span>
          </div>
          <div className="sizes">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={selectedSize === size ? 'size-btn active' : 'size-btn'}
                onClick={() => setSelectedSize(size)}
              >
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
            <li>Minimal tonal branding</li>
            <li>Designed for layering and daily wear</li>
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
                <img src={item.images[0]} alt={item.name} />
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
                    <strong>£{item.price * item.quantity}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="summary-card">
            <h3>Summary</h3>
            <div className="summary-line">
              <span>Subtotal</span>
              <strong>£{subtotal}</strong>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <strong>Calculated at checkout</strong>
            </div>
            <div className="summary-line total-line">
              <span>Total</span>
              <strong>£{subtotal}</strong>
            </div>
            <button type="button" className="primary-button checkout-button">Proceed to checkout</button>
            <p className="muted checkout-note">
              This storefront demo is front-end only. Real payment and order handling must be integrated before launch.
            </p>
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
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.images[0]} alt={product.name} />
      </Link>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
        </div>
        <div className="product-meta">
          <span>£{product.price}</span>
          {smallAction ? (
            <button
              type="button"
              className="link-button"
              onClick={(event) => {
                event.preventDefault();
                smallAction(product, product.sizes[0] || 'M');
              }}
            >
              Add
            </button>
          ) : null}
        </div>
      </div>
      {product.isConcept ? <span className="concept-pill">{product.conceptLabel}</span> : null}
    </article>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
