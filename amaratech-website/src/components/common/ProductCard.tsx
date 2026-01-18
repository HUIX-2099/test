import React from 'react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image?: string;
  learnMoreHref?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export default function ProductCard({
  title,
  subtitle,
  description,
  features,
  image,
  learnMoreHref = '#',
  actionHref,
  actionLabel = 'Access Platform',
  className = '',
}: ProductCardProps) {
  return (
    <div className={`${styles.productCard} ${className}`}>
      {image && (
        <div className={styles.imageContainer}>
          <div className={styles.screenshot}>
            <img src={image} alt={title} />
          </div>
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.description}>{description}</p>
        <ul className={styles.features}>
          {features.map((feature, index) => (
            <li key={index}>
              <span className={styles.checkmark}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <a href={learnMoreHref} className={styles.learnMore}>
            Learn More →
          </a>
          {actionHref && (
            <a href={actionHref} className={styles.actionButton}>
              {actionLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
