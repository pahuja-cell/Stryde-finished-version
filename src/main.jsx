import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import './styles.css';

const products = [
  {
    id: 'signature-oversized-hoodie',
    name: 'Signature Oversized Hoodie',
    category: 'Hoodies',
    price: 148,
    description:
      'A weighty oversized silhouette cut for everyday layering with a relaxed drape, clean finish and premium brushed fleece comfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Stone'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
  },
  {
    id: 'essential-heavyweight-tee',
    name: 'Essential Heavyweight T-Shirt',
    category: 'Tees',
    price: 92,
    description:
      'A dense, structured cotton tee with an understated finish, designed to hold shape in motion while maintaining everyday ease.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Off White', 'Charcoal'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
  },
  {
    id: 'stryde-relaxed-sweatpants',
    name: 'Strydë Relaxed Sweatpants',
    category: 'Bottoms',
    price: 128,
    description:
      'Relaxed volume through the leg with a streamlined waist, premium fleece weight and a clean, modern fit built for movement.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Moss'],
    images: [
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    ],
    featured: true,
  },
  {
    id: 'signature-zip-hoodie',
    name: 'Signature Zip Hoodie',
    category: 'Hoodies',
    price: 164,
    description:
      'A sharper, layered essential with a full zip profile, tonal hardware and a premium hand-feel for all-day wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Warm Grey'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
  },
  {
    id: 'city-utility-overshirt',
    name: 'City Utility Overshirt',
    category: 'Outerwear',
    price: 182,
    description:
      'A structured layering piece with a subtle utility attitude, sharp construction and tonal detailing for an elevated off-duty silhouette.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Graphite', 'Stone'],
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
  },
  {
    id: 'edge-utility-cap',
    name: 'Edge Utility Cap',
    category: 'Accessories',
    price: 54,
    description:
      'A structured cap balanced between premium utility and understated styling, built to finish the fit without ever overpowering it.',
    sizes: ['One Size'],
    colors: ['Black', 'Stone'],
    images: [
      'https://images.unsplash.com/photo-1521369909026-2afed882baee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988c2477d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    ],
    featured: false,
  },
];

const collectionHighlights = [
  {
    title: 'NEW SEASON / 01',
    text: 'Refined silhouettes, structured layers and everyday essentials.',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'CORE / 02',
    text: 'A modern foundation built for movement, identity and intent.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'DROP / 03',
    text: 'Limited-run pieces designed to sit quietly at the edge of culture.',
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80',
  },
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

  useEffect(() => {
    localStorage.setItem('stryde-bag', JSON.stringify(bag));
  }, [bag]);

  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bag.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  return (
    <BrowserRouter>
      <SiteShell bagCount={bagCount}>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route
            path="/shop"
            element={<ShopPage products={products} addToBag={addToBag} />}
          />
          <Route
            path="/product/:productId"
            element={<ProductPage products={products} addToBag={addToBag} />}
          />
          <Route
            path="/bag"
            element={<BagPage bag={bag} subtotal={subtotal} updateQuantity={updateQuantity} removeFromBag={removeFromBag} />}
          />
          <Route path="*" element={<HomePage products={products} />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  );
}

function SiteShell({ bagCount, children }) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <nav className="nav-left" aria-label="Primary navigation">
            <NavLink to="/shop" className="nav-link">
              Shop
            </NavLink>
            <NavLink to="/shop" className="nav-link">
              Collections
            </NavLink>
            <NavLink to="/" className="nav-link">
              About
            </NavLink>
          </nav>

          <Link to="/" className="wordmark" aria-label="STRYDË home">
            STRYDË
          </Link>

          <div className="nav-right">
            <button type="button" className="minimal-button">
              Search
            </button>
            <Link to="/bag" className="bag-link" aria-label="Shopping bag">
              <span>Bag</span>
              <span className="bag-count">{bagCount}</span>
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="wordmark footer-wordmark">STRYDË</div>
            <p className="muted">Premium streetwear built for movement and perspective.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/">Collections</Link></li>
              <li><Link to="/bag">Bag</Link></li>
            </ul>
          </div>
          <div>
            <h3>Support</h3>
            <ul>
              <li><a href="mailto:hello@stryde.studio">hello@stryde.studio</a></li>
              <li><a href="tel:+441234567890">+44 (0)20 0000 0000</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h3>Newsletter</h3>
            <form className="newsletter-form">
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <button type="submit">Join</button>
            </form>
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
          <div className="hero-actions">
            <Link to="/shop" className="primary-button">
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <section className="collection-strip container">
        <div className="section-heading">
          <p className="eyebrow">Featured collection</p>
          <h2>Built for a sharper silhouette.</h2>
        </div>
        <div className="editorial-grid">
          {collectionHighlights.map((collection) => (
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

      <section className="arrivals container">
        <div className="section-heading split-heading">
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
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
              alt="STRYDË campaign"
            />
          </div>
          <div className="campaign-copy">
            <p className="eyebrow">Brand statement</p>
            <h2>Independent by design. Precise by instinct.</h2>
            <p>
              Strydë moves with intention — blending statement silhouettes with minimal,
              understated detail to create garments that feel confident without excess.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ShopPage({ products, addToBag }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((item) => item.category))];

  const visibleProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory, products]);

  return (
    <div className="container page-shell shop-page">
      <div className="shop-header">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>Signature essentials.</h1>
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

function ProductPage({ products, addToBag }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[1] || 'M');

  useEffect(() => {
    if (product) setSelectedSize(product.sizes[1] || 'M');
    setSelectedImage(0);
  }, [product]);

  if (!product) {
    return (
      <div className="container page-shell">
        <h1>Product not found.</h1>
        <Link to="/shop" className="primary-button inline-button">
          Back to shop
        </Link>
      </div>
    );
  }

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
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <div className="price-row">
          <span className="price">£{product.price}</span>
          <span className="muted">Free worldwide shipping over £150</span>
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

        <button
          type="button"
          className="primary-button product-button"
          onClick={() => addToBag(product, selectedSize)}
        >
          Add to bag
        </button>

        <div className="description-block">
          <h3>Product details</h3>
          <p>{product.description}</p>
          <ul>
            <li>Premium cotton fleece composition</li>
            <li>Relaxed oversized fit</li>
            <li>Minimal tonal branding</li>
            <li>Designed for layering and daily wear</li>
          </ul>
        </div>
      </div>
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
          <Link to="/shop" className="primary-button inline-button">
            Continue shopping
          </Link>
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
                    <button
                      type="button"
                      className="remove-link"
                      onClick={() => removeFromBag(item.id, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="bag-quantity-row">
                    <div className="quantity-control">
                      <button type="button" onClick={() => updateQuantity(item.id, item.size, -1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.size, 1)}>
                        +
                      </button>
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
            <button type="button" className="primary-button checkout-button">
              Proceed to checkout
            </button>
            <p className="muted checkout-note">
              This is a front-end storefront demo. Real payment and order processing must be integrated before going live.
            </p>
          </aside>
        </div>
      )}
    </div>
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
            <button type="button" className="link-button" onClick={() => smallAction(product, product.sizes[1] || 'M')}>
              Add
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
