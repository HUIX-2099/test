"use client";

import React from "react";
import styles from "./ParallaxSection.module.css";

type Props = {
  imageSrc?: string;
  kicker?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function ParallaxSection({
  imageSrc = "/other_images/download%20(98).jpg",
  kicker = "SYSTEM_LAYER",
  title,
  description,
  children,
}: Props) {
  return (
    <section className={styles.section}>
      <div
        className={styles.bg}
        style={{
          backgroundImage: `url("${imageSrc}")`,
        }}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.kicker}>// {kicker}</span>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={styles.desc}>{description}</p> : null}
        </div>

        {children ? <div className={styles.body}>{children}</div> : null}
      </div>

      <div className={styles.frame} aria-hidden="true" />
    </section>
  );
}
