'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Eye, Share2, User, ChevronRight } from 'lucide-react';
import styles from './blogpost.module.css';

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  views: number;
  author: string;
  content: string[];
};

type Props = {
  post: BlogPost;
  slug: string;
};

export default function BlogPostClient({ post, slug }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-50px' });

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('## ')) {
        return <h2 key={idx} className={styles.contentH2}>{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className={styles.contentH3}>{line.replace('### ', '')}</h3>;
      }
      // List items
      if (line.startsWith('- ')) {
        return <li key={idx} className={styles.listItem}>{renderInline(line.replace('- ', ''))}</li>;
      }
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        return <li key={idx} className={styles.numberedItem}>{renderInline(line.replace(/^\d+\.\s/, ''))}</li>;
      }
      // Empty lines
      if (line.trim() === '') {
        return <br key={idx} />;
      }
      // Regular paragraphs
      return <p key={idx} className={styles.paragraph}>{renderInline(line)}</p>;
    });
  };

  // Inline formatting (bold)
  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/blog" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <ChevronRight size={14} />
              <Link href="/blog">Blog</Link>
              <ChevronRight size={14} />
              <span>{post.category}</span>
            </div>

            <span className={styles.category}>{post.category}</span>

            <h1 className={styles.heroTitle}>{post.title}</h1>

            <div className={styles.heroMeta}>
              <span className={styles.metaItem}>
                <User size={14} />
                {post.author}
              </span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>
                <Calendar size={14} />
                {post.date}
              </span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>
                <Clock size={14} />
                {post.readTime}
              </span>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>
                <Eye size={14} />
                {post.views.toLocaleString()} views
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className={styles.contentSection}>
        <div className={styles.container}>
          <motion.article
            className={styles.article}
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {post.content.map((section, index) => (
              <div key={index} className={styles.contentBlock}>
                {renderContent(section)}
              </div>
            ))}
          </motion.article>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <motion.div
              className={styles.shareCard}
              initial={{ opacity: 0, x: 20 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4>Social Share</h4>
              <div className={styles.shareButtons}>
                <button className={styles.shareButton} aria-label="Share on Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className={styles.shareButton} aria-label="Share on Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className={styles.shareButton} aria-label="Share on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </motion.div>

            <motion.div
              className={styles.ctaCard}
              initial={{ opacity: 0, x: 20 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4>Need Help with Security?</h4>
              <p>Our experts can help assess and improve your organization&apos;s cybersecurity posture.</p>
              <Link href="/self-assessment" className={styles.ctaButton}>
                Take Free Assessment
              </Link>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.bottomCta}>
        <div className={styles.ctaContainer}>
          <h2>Ready to Strengthen Your Security?</h2>
          <p>Contact us today to discuss how we can help protect your organization.</p>
          <Link href="/contact" className={styles.contactButton}>
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
