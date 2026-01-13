'use client';

import React, { useState, useEffect } from 'react';
import MatrixLoading from './MatrixLoading';

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if loading has been completed before
    const hasLoaded = sessionStorage.getItem('amaratech_loaded');
    if (hasLoaded === 'true') {
      setIsLoading(false);
      return;
    }

    // Show loading screen on first visit
    // The MatrixLoading component will call handleComplete after animation
  }, []);

  const handleComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('amaratech_loaded', 'true');
  };

  if (isLoading) {
    return <MatrixLoading onComplete={handleComplete} />;
  }

  return <>{children}</>;
}
