'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Tag, Eye, MessageCircle } from 'lucide-react';
import styles from './blog.module.css';

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  views: number;
  featured?: boolean;
};

const blogPosts: BlogPost[] = [
  {
    slug: 'think-like-a-hacker-act-like-a-defender',
    title: 'Think Like a Hacker, Act Like a Defender',
    excerpt: 'Inside the Attacker\'s Mind: Why Your Organization Needs Internal Security Testing. In today\'s rapidly evolving threat landscape, organizations are confronted with a critical question: Should you proactively test your cybersecurity defenses?',
    date: 'March 14, 2025',
    readTime: '8 min read',
    image: '/other_images/blog/think like a defender.png',
    category: 'Cybersecurity',
    views: 1247,
    featured: true,
  },
  {
    slug: 'the-evolving-landscape-of-internal-cybersecurity-testing',
    title: 'The Evolving Landscape of Internal Cybersecurity Testing: Friend or Foe?',
    excerpt: 'Inside the Attacker\'s Mind: Why Your Organization Needs Internal Security Testing. In today\'s rapidly evolving threat landscape, organizations face a critical question: should you proactively test your own cybersecurity defenses?',
    date: 'January 16, 2025',
    readTime: '10 min read',
    image: '/other_images/blog/think like a defender.png',
    category: 'Security Testing',
    views: 892,
    featured: true,
  },
];

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const postsRef = useRef<HTMLDivElement>(null);
  const postsInView = useInView(postsRef, { once: true, margin: '-100px' });

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgText}>BLOG</div>
          <div className={styles.heroGrid} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroMeta}>
              <span className={styles.metaIndex}>[TECH INSIGHTS]</span>
              <span className={styles.metaDivider}>—</span>
              <span className={styles.metaLabel}>KNOWLEDGE BASE</span>
            </div>

            <h1 className={styles.heroTitle}>
              Read the Latest on <span className={styles.titleAccent}>Technology</span>
              <br />and Innovation
            </h1>

            <p className={styles.heroSubtitle}>
              Explore insights, strategies, and innovations in cybersecurity, cloud solutions, 
              and digital transformation from our expert team.
            </p>

            <Link href="#articles" className={styles.exploreButton}>
              Explore Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Latest Articles</h2>
          </motion.div>

          <motion.article
            className={styles.featuredCard}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredLink}>
              <div className={styles.featuredImage}>
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.featuredOverlay} />
                <span className={styles.featuredBadge}>Featured</span>
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.postMeta}>
                  <span className={styles.category}>{featuredPost.category}</span>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.date}>
                    <Calendar size={14} />
                    {featuredPost.date}
                  </span>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.readTime}>
                    <Clock size={14} />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className={styles.featuredTitle}>{featuredPost.title}</h3>
                <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                <div className={styles.postStats}>
                  <span className={styles.stat}>
                    <Eye size={14} />
                    {featuredPost.views.toLocaleString()} views
                  </span>
                </div>
                <span className={styles.readMore}>
                  Read More
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </motion.article>
        </div>
      </section>

      {/* All Articles */}
      <section id="articles" ref={postsRef} className={styles.articlesSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={postsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>All Services</h2>
            <p>Insights, Strategies, and Innovations</p>
          </motion.div>

          <div className={styles.articlesGrid}>
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className={styles.articleCard}
                initial={{ opacity: 0, y: 30 }}
                animate={postsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className={styles.articleLink}>
                  <div className={styles.articleImage}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.articleOverlay} />
                  </div>
                  <div className={styles.articleContent}>
                    <div className={styles.postMeta}>
                      <span className={styles.category}>{post.category}</span>
                      <span className={styles.metaDot}>•</span>
                      <span className={styles.date}>
                        <Calendar size={12} />
                        {post.date}
                      </span>
                    </div>
                    <h3 className={styles.articleTitle}>{post.title}</h3>
                    <p className={styles.articleExcerpt}>{post.excerpt}</p>
                    <div className={styles.articleFooter}>
                      <span className={styles.stat}>
                        <Eye size={12} />
                        {post.views.toLocaleString()}
                      </span>
                      <span className={styles.readMore}>
                        Read More
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
