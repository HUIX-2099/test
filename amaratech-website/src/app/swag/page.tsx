'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  ShoppingBag, Search, ExternalLink, ArrowRight, 
  ShoppingCart, Eye, Sparkles, Tag, MousePointer
} from 'lucide-react';
import styles from './swag.module.css';

type Product = {
  id: string;
  name: string;
  category: 'polo' | 'tshirt' | 'hoodie' | 'hat' | 'mug';
  price: number;
  color: string;
  hasVariants: boolean;
  image?: string;
  catNo: string;
  isNew?: boolean;
  isBestseller?: boolean;
  views?: number;
  clicks?: number;
};

const products: Product[] = [
  // Polo Shirts - Logo and Slogan
  {
    id: 'polo-1',
    name: 'AmaraTech Logo and Slogan – Premium pique polo shirt',
    category: 'polo',
    price: 30,
    color: 'Mouse Grey',
    hasVariants: true,
    image: '/other_images/swag/AmaraTech Logo and Slogan – Premium pique polo shirt Mouse Grey.jpg',
    catNo: 'AT-PL-001',
    isBestseller: true,
    views: 1247,
    clicks: 342,
  },
  {
    id: 'polo-2',
    name: 'AmaraTech Logo and Slogan – Premium pique polo shirt',
    category: 'polo',
    price: 30,
    color: 'Red',
    hasVariants: true,
    image: '/other_images/swag/unisex-premium-pique-polo-shirt-red-front-6751b54a0d619123-300x300.jpg',
    catNo: 'AT-PL-002',
    views: 892,
    clicks: 156,
  },
  {
    id: 'polo-3',
    name: 'AmaraTech Logo and Slogan – Premium pique polo shirt',
    category: 'polo',
    price: 30,
    color: 'Navy',
    hasVariants: true,
    image: '/other_images/swag/AmaraTech Logo and Slogan – Premium pique polo shirt Navy.jpg',
    catNo: 'AT-PL-003',
    views: 756,
    clicks: 198,
  },
  {
    id: 'polo-4',
    name: 'AmaraTech Logo and Slogan – Premium pique polo shirt',
    category: 'polo',
    price: 30,
    color: 'Black',
    hasVariants: true,
    image: '/other_images/swag/unisex-premium-pique-polo-shirt-black-300x300.jpg',
    catNo: 'AT-PL-004',
    isNew: true,
    views: 423,
    clicks: 87,
  },
  // Polo Shirts - IT
  {
    id: 'polo-5',
    name: 'AmaraTech IT – Premium pique polo shirt',
    category: 'polo',
    price: 30,
    color: 'White',
    hasVariants: true,
    image: '/other_images/swag/unisex-premium-pique-polo-shirt-white-front-6751b8dd508ed123-300x300 (1).jpg',
    catNo: 'AT-PL-005',
    views: 534,
    clicks: 112,
  },
  {
    id: 'polo-6',
    name: 'AmaraTech IT – Premium pique polo shirt',
    category: 'polo',
    price: 30,
    color: 'Mouse Grey',
    hasVariants: true,
    image: '/other_images/swag/unisex-premium-pique-polo-shirt-mouse-grey-front-6751b3069f3ca123-300x300.jpg',
    catNo: 'AT-PL-006',
    views: 467,
    clicks: 98,
  },
  {
    id: 'polo-7',
    name: 'AmaraTech IT – Premium pique polo shirt',
    category: 'polo',
    price: 30,
    color: 'Navy',
    hasVariants: true,
    image: '/other_images/swag/unisex-premium-pique-polo-shirt-black-front-6751b30696c3c123-300x300.jpg',
    catNo: 'AT-PL-007',
    views: 389,
    clicks: 76,
  },
  {
    id: 'polo-8',
    name: 'AmaraTech IT – Premium pique polo shirt',
    category: 'polo',
    price: 30,
    color: 'Black',
    hasVariants: true,
    image: '/other_images/swag/unisex-premium-pique-polo-shirt-black-front-6751b54a08531123-300x300.jpg',
    catNo: 'AT-PL-008',
    views: 612,
    clicks: 134,
  },
  // T-Shirts
  {
    id: 'tshirt-1',
    name: 'AmaraTech Logo and Slogan – Crewneck T-shirt',
    category: 'tshirt',
    price: 25,
    color: 'Teal Triblend',
    hasVariants: true,
    image: '/other_images/swag/unisex-tri-blend-t-shirt-teal-triblend-front-67505ad3b6b66123-300x300.jpg',
    catNo: 'AT-TS-001',
    isNew: true,
    views: 287,
    clicks: 54,
  },
  {
    id: 'tshirt-2',
    name: 'AmaraTech Logo and Slogan – Crewneck T-shirt',
    category: 'tshirt',
    price: 25,
    color: 'Navy Triblend',
    hasVariants: true,
    image: '/other_images/swag/unisex-tri-blend-t-shirt-navy-triblend-front-67505ad2db0b3123-300x300.jpg',
    catNo: 'AT-TS-002',
    views: 445,
    clicks: 89,
  },
  {
    id: 'tshirt-3',
    name: 'AmaraTech Logo and Slogan – Crewneck T-shirt',
    category: 'tshirt',
    price: 25,
    color: 'True Royal Triblend',
    hasVariants: true,
    image: '/other_images/swag/unisex-tri-blend-t-shirt-true-royal-triblend-front-67505ad227770-1123-300x300.jpg',
    catNo: 'AT-TS-003',
    views: 378,
    clicks: 67,
  },
  {
    id: 'tshirt-4',
    name: 'AmaraTech Logo and Slogan – Crewneck T-shirt',
    category: 'tshirt',
    price: 25,
    color: 'Brown Triblend',
    hasVariants: true,
    image: '/other_images/swag/unisex-tri-blend-t-shirt-brown-triblend-left-front-67505ad1abb0e123-300x300.jpg',
    catNo: 'AT-TS-004',
    views: 234,
    clicks: 43,
  },
  {
    id: 'tshirt-5',
    name: 'AmaraTech Logo and Slogan – Crewneck T-shirt',
    category: 'tshirt',
    price: 25,
    color: 'Emerald Triblend',
    hasVariants: true,
    image: '/other_images/swag/unisex-tri-blend-t-shirt-emerald-triblend-front-67505ad1569fe123-300x300.jpg',
    catNo: 'AT-TS-005',
    views: 312,
    clicks: 58,
  },
  {
    id: 'tshirt-6',
    name: 'AmaraTech Logo and Slogan – Crewneck T-shirt',
    category: 'tshirt',
    price: 25,
    color: 'Charcoal-Black Triblend',
    hasVariants: true,
    image: '/other_images/swag/unisex-tri-blend-t-shirt-charcoal-black-triblend-right-front-67505ad112e6a123-300x300.jpg',
    catNo: 'AT-TS-006',
    views: 567,
    clicks: 123,
  },
  {
    id: 'tshirt-7',
    name: 'AmaraTech Logo and Slogan – Crewneck T-shirt',
    category: 'tshirt',
    price: 25,
    color: 'Black',
    hasVariants: true,
    image: '/other_images/swag/ozuixcoiuzxoci-300x300.jpg',
    catNo: 'AT-TS-007',
    isBestseller: true,
    views: 1089,
    clicks: 278,
  },
  // Hoodies
  {
    id: 'hoodie-1',
    name: 'AmaraTech Logo and Slogan – Unisex Hoodie',
    category: 'hoodie',
    price: 45,
    color: 'Bottle Green',
    hasVariants: true,
    image: '/other_images/swag/unisex-eco-raglan-hoodie-bottle-green-300x300.jpg',
    catNo: 'AT-HD-001',
    isNew: true,
    views: 198,
    clicks: 34,
  },
  {
    id: 'hoodie-2',
    name: 'AmaraTech Logo and Slogan – Unisex Hoodie',
    category: 'hoodie',
    price: 45,
    color: 'Charcoal Melange',
    hasVariants: true,
    image: '/other_images/swag/unisex-eco-raglan-hoodie-charcoal-melange-front--300x300.jpg',
    catNo: 'AT-HD-002',
    views: 423,
    clicks: 87,
  },
  {
    id: 'hoodie-3',
    name: 'AmaraTech Logo and Slogan – Unisex Hoodie',
    category: 'hoodie',
    price: 45,
    color: 'Burgundy',
    hasVariants: true,
    image: '/other_images/swag/unisex-eco-raglan-hoodie-burgundy-front1234-300x300.jpg',
    catNo: 'AT-HD-003',
    isBestseller: true,
    views: 876,
    clicks: 234,
  },
  {
    id: 'hoodie-4',
    name: 'AmaraTech Logo and Slogan – Unisex Hoodie',
    category: 'hoodie',
    price: 45,
    color: 'Black',
    hasVariants: true,
    image: '/other_images/swag/unisex-eco-raglan-hoodie-black-300x300.jpg',
    catNo: 'AT-HD-004',
    views: 534,
    clicks: 145,
  },
  // Hats
  {
    id: 'hat-1',
    name: 'AmaraTech Distressed Dad Hat',
    category: 'hat',
    price: 22,
    color: 'Black',
    hasVariants: false,
    image: '/other_images/swag/oiasudoiasud-300x300.jpg',
    catNo: 'AT-HT-001',
    views: 345,
    clicks: 78,
  },
  {
    id: 'hat-2',
    name: 'AmaraTech Distressed Dad Hat',
    category: 'hat',
    price: 22,
    color: 'Navy',
    hasVariants: false,
    image: '/other_images/swag/distressed-dad-hat-navy-front-675058304fd1a-min-300x300.png',
    catNo: 'AT-HT-002',
    views: 289,
    clicks: 56,
  },
  // Cybersecurity Items
  {
    id: 'tshirt-cyber',
    name: 'Cybersecurity – Cherry Red Crewneck T-shirt',
    category: 'tshirt',
    price: 25,
    color: 'Cherry Red',
    hasVariants: false,
    image: '/other_images/swag/unisex-staple-t-shirt-red-front-300x300.jpg',
    catNo: 'AT-CY-001',
    views: 678,
    clicks: 167,
  },
  {
    id: 'mug-1',
    name: 'Cybersecurity White Glossy Mug',
    category: 'mug',
    price: 18,
    color: 'White',
    hasVariants: false,
    image: '/other_images/swag/paosidpoasidpo-300x300.jpg',
    catNo: 'AT-MG-001',
    isNew: true,
    views: 156,
    clicks: 28,
  },
];

const categories = [
  { id: 'all', label: 'ALL', count: products.length },
  { id: 'polo', label: 'POLO', count: products.filter(p => p.category === 'polo').length },
  { id: 'tshirt', label: 'T-SHIRT', count: products.filter(p => p.category === 'tshirt').length },
  { id: 'hoodie', label: 'HOODIE', count: products.filter(p => p.category === 'hoodie').length },
  { id: 'hat', label: 'HAT', count: products.filter(p => p.category === 'hat').length },
  { id: 'mug', label: 'MUG', count: products.filter(p => p.category === 'mug').length },
];

export default function SwagPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const productsRef = useRef<HTMLDivElement>(null);
  const productsInView = useInView(productsRef, { once: true, margin: '-100px' });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.color.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgText}>SWAG</div>
          <div className={styles.heroGrid} />
          <div className={styles.heroGlow} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.metaLabel}>CATALOG</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.metaValue}>2024</span>
          </motion.div>

          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={styles.heroNumber}>01</div>
            <div className={styles.heroTitleBlock}>
              <h1 className={styles.heroTitle}>
                OFFICIAL <span className={styles.titleAccent}>MERCHANDISE</span>
              </h1>
              <div className={styles.heroRule} />
              <p className={styles.heroDescription}>
                Premium apparel and accessories featuring the AmaraTech brand. 
                High-quality materials, professional designs.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>{products.length}</span>
              <span className={styles.statLabel}>ITEMS</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>{categories.length - 1}</span>
              <span className={styles.statLabel}>CATEGORIES</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>$18</span>
              <span className={styles.statLabel}>FROM</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className={styles.productsSection}>
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>02</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>PRODUCT INDEX</h2>
              <span className={styles.sectionMeta}>CAT NO: AT-{new Date().getFullYear()}</span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className={styles.filtersBar}>
            <div className={styles.searchWrapper}>
              <Search size={16} />
              <input
                type="text"
                placeholder="SEARCH CATALOG..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.categoryFilters}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.filterButton} ${activeCategory === category.id ? styles.activeFilter : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className={styles.filterLabel}>{category.label}</span>
                  <span className={styles.filterCount}>[{category.count}]</span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className={styles.productsGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className={`${styles.productCard} ${hoveredProduct === product.id ? styles.cardHovered : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  layout
                >
                  {/* Card Glow Effect */}
                  <div className={styles.cardGlow} />
                  
                  {/* Corner Accents */}
                  <div className={styles.cornerTL} />
                  <div className={styles.cornerTR} />
                  <div className={styles.cornerBL} />
                  <div className={styles.cornerBR} />

                  {/* Index Number */}
                  <div className={styles.cardIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Image Container */}
                  <div className={styles.productImageWrapper}>
                    <div className={styles.productImage}>
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={`${product.name} ${product.color}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className={styles.productPlaceholder}>
                          <ShoppingBag size={40} />
                        </div>
                      )}
                      
                      {/* Image Overlay Gradient */}
                      <div className={styles.imageGradient} />
                    </div>

                    {/* Badges */}
                    <div className={styles.badgesContainer}>
                      <div className={styles.categoryBadge}>
                        <Tag size={10} />
                        {product.category.toUpperCase()}
                      </div>
                      {product.isNew && (
                        <div className={styles.newBadge}>
                          <Sparkles size={10} />
                          NEW
                        </div>
                      )}
                      {product.isBestseller && (
                        <div className={styles.bestsellerBadge}>
                          BESTSELLER
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <motion.div 
                      className={styles.quickActions}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href="https://amaratechit.com/swag/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionButton}
                      >
                        <Eye size={16} />
                        <span>VIEW</span>
                      </a>
                      <a
                        href="https://amaratechit.com/swag/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionButtonPrimary}
                      >
                        <ShoppingCart size={16} />
                        <span>BUY</span>
                      </a>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className={styles.productInfo}>
                    <div className={styles.productMeta}>
                      <span className={styles.catNo}>{product.catNo}</span>
                      <span className={styles.colorBadge}>{product.color}</span>
                    </div>
                    
                    <h4 className={styles.productName}>{product.name}</h4>
                    
                    {/* Views & Clicks Stats */}
                    <div className={styles.statsRow}>
                      <div className={styles.statItem}>
                        <Eye size={12} />
                        <span>{product.views?.toLocaleString() || 0}</span>
                      </div>
                      <div className={styles.statItem}>
                        <MousePointer size={12} />
                        <span>{product.clicks?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                    
                    <div className={styles.productFooter}>
                      <div className={styles.priceBlock}>
                        <span className={styles.priceLabel}>PRICE</span>
                        <span className={styles.price}>${product.price.toFixed(2)}</span>
                      </div>
                      {product.hasVariants && (
                        <div className={styles.variantIndicator}>
                          <div className={styles.variantDot} />
                          <div className={styles.variantDot} />
                          <div className={styles.variantDot} />
                          <span>SIZES</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className={styles.cardAccentLine} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>
                <Search size={48} />
              </div>
              <span className={styles.noResultsCode}>[NO MATCH]</span>
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.ctaGlow} />
            <div className={styles.ctaNumber}>03</div>
            <div className={styles.ctaContent}>
              <h2>VISIT OFFICIAL STORE</h2>
              <p>
                Browse the complete collection with all sizes and variants. 
                Secure checkout powered by our official merchandise partner.
              </p>
              <a
                href="https://amaratechit.com/swag/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <span>SHOP NOW</span>
                <ExternalLink size={16} />
              </a>
            </div>
            <div className={styles.ctaMeta}>
              <div className={styles.ctaMetaRow}>
                <span>TYPE</span>
                <span>EXTERNAL</span>
              </div>
              <div className={styles.ctaMetaRow}>
                <span>SECURE</span>
                <span>YES</span>
              </div>
              <div className={styles.ctaMetaRow}>
                <span>SHIPPING</span>
                <span>WORLDWIDE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Strip */}
      <div className={styles.footerStrip}>
        <span>AMARATECH IT SOLUTIONS</span>
        <span className={styles.footerDot} />
        <span>CATALOG {new Date().getFullYear()}</span>
        <span className={styles.footerDot} />
        <span>v1.0</span>
        <ArrowRight size={12} className={styles.footerArrow} />
      </div>
    </div>
  );
}
