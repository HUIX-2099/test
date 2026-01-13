import React from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', onClick, style }: GlassCardProps) {
  return (
    <div 
      className={`${styles.glassCard} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
