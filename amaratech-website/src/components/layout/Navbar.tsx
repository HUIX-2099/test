'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown,
  Home,
  Layers,
  Package,
  Mail,
  Users,
  Shield,
  Cloud,
  Building2,
  Brain,
  Settings,
  Wifi,
  WifiOff,
  ShieldCheck,
  ShieldAlert,
  Usb,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrosoft, FaWindows, FaApple, FaLinux } from 'react-icons/fa';
import styles from './Navbar.module.css';

// Detect OS
function getOS(): { name: string; icon: 'windows' | 'mac' | 'linux' | 'unknown' } {
  if (typeof window === 'undefined') return { name: 'Unknown', icon: 'unknown' };
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return { name: 'Windows', icon: 'windows' };
  if (ua.includes('Mac')) return { name: 'macOS', icon: 'mac' };
  if (ua.includes('Linux')) return { name: 'Linux', icon: 'linux' };
  return { name: 'Unknown', icon: 'unknown' };
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // System status states
  const [osInfo, setOsInfo] = useState<{ name: string; icon: 'windows' | 'mac' | 'linux' | 'unknown' }>({ name: 'Detecting...', icon: 'unknown' });
  const [isOnline, setIsOnline] = useState(true);
  const [isSecure, setIsSecure] = useState(true);

  // Helper to check if tab is active
  const isTabActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  // Detect system info on mount
  useEffect(() => {
    // Detect OS
    setOsInfo(getOS());
    
    // Detect online status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check if HTTPS (secure)
    setIsSecure(window.location.protocol === 'https:');
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const servicesItems = [
    { name: 'AI Consulting', href: '/services/ai-consulting', Icon: Brain },
    { name: 'Microsoft Azure', href: '/services/azure', Icon: FaMicrosoft },
    { name: 'Cloud Solutions', href: '/services/cloud', Icon: Cloud },
    { name: 'Cyber Security', href: '/services/security', Icon: Shield },
    { name: 'IT Consulting', href: '/services/consulting', Icon: Settings },
    { name: 'E-Governance', href: '/services/e-governance', Icon: Building2 },
  ];

  return (
    <>
      {/* Main Navigation */}
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo/AmaraTech IT Logo (new) - dark bg.png"
              alt="AmaraTech IT Solutions"
              width={180}
              height={40}
              className={styles.logoImage}
              priority
            />
          </Link>

          {/* System Status Indicators */}
          <div className={styles.systemStatus}>
            {/* OS Detect with brand colors */}
            <div className={styles.statusItem} title={`OS: ${osInfo.name}`}>
              {osInfo.icon === 'windows' && <FaWindows size={14} style={{ color: '#0078D4' }} />}
              {osInfo.icon === 'mac' && <FaApple size={14} style={{ color: '#A2AAAD' }} />}
              {osInfo.icon === 'linux' && <FaLinux size={14} style={{ color: '#FCC624' }} />}
              {osInfo.icon === 'unknown' && <Monitor size={14} />}
              <span className={styles.statusLabel}>{osInfo.name}</span>
            </div>

            {/* WiFi / Online Status */}
            <div className={`${styles.statusItem} ${isOnline ? styles.statusGood : styles.statusBad}`} title={isOnline ? 'Online' : 'Offline'}>
              {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
              <span className={styles.statusLabel}>{isOnline ? 'Online' : 'Offline'}</span>
            </div>

            {/* Secure Connection */}
            <div className={`${styles.statusItem} ${isSecure ? styles.statusGood : styles.statusWarning}`} title={isSecure ? 'Secure Connection (HTTPS)' : 'Insecure Connection'}>
              {isSecure ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
              <span className={styles.statusLabel}>{isSecure ? 'Secure' : 'Insecure'}</span>
            </div>

            {/* USB Icon (decorative) */}
            <div className={styles.statusItem} title="USB Ready">
              <Usb size={14} />
              <span className={styles.statusLabel}>USB</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link 
              href="/" 
              className={`${styles.navLink} ${isTabActive('/') && pathname === '/' ? styles.active : ''}`}
            >
              <Home size={14} className={styles.navIcon} />
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className={styles.navItem}
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`${styles.navLink} ${isTabActive('/services') ? styles.active : ''}`}>
                <Layers size={14} className={styles.navIcon} />
                Services
                <ChevronDown size={14} className={`${styles.chevron} ${openDropdown === 'services' ? styles.open : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    className={styles.dropdown}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {servicesItems.map((item) => {
                      const ItemIcon = item.Icon;
                      return (
                        <Link key={item.href} href={item.href} className={styles.dropdownItem}>
                          <ItemIcon size={16} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                    <div className={styles.dropdownFooter}>
                      <Link href="/services" className={styles.viewAllLink}>
                        View All Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/platform" 
              className={`${styles.navLink} ${isTabActive('/platform') ? styles.active : ''}`}
            >
              <Package size={14} className={styles.navIcon} />
              Platform
              <span className={styles.comingSoon}>Soon</span>
            </Link>

            <Link 
              href="/about" 
              className={`${styles.navLink} ${isTabActive('/about') ? styles.active : ''}`}
            >
              <Users size={14} className={styles.navIcon} />
              About
            </Link>

            <Link 
              href="/contact" 
              className={`${styles.navLink} ${isTabActive('/contact') ? styles.active : ''}`}
            >
              <Mail size={14} className={styles.navIcon} />
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className={styles.actions}>
            <Link href="/contact" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <nav className={styles.mobileNav}>
              <Link href="/" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Home size={20} />
                Home
              </Link>
              <Link href="/services" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Layers size={20} />
                Services
              </Link>
              <Link href="/platform" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Package size={20} />
                Platform
              </Link>
              <Link href="/about" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Users size={20} />
                About
              </Link>
              <Link href="/contact" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Mail size={20} />
                Contact
              </Link>
            </nav>
            <div className={styles.mobileCta}>
              <Link href="/contact" className={styles.ctaButton} onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Tab Bar */}
      <nav className={styles.bottomTabBar}>
        <Link href="/" className={`${styles.tabItem} ${isTabActive('/') && pathname === '/' ? styles.tabActive : ''}`}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link href="/services" className={`${styles.tabItem} ${isTabActive('/services') ? styles.tabActive : ''}`}>
          <Layers size={20} />
          <span>Services</span>
        </Link>
        <Link href="/contact" className={`${styles.tabItem} ${styles.tabCta}`}>
          <div className={styles.tabCtaIcon}>
            <Mail size={20} />
          </div>
          <span>Contact</span>
        </Link>
        <Link href="/platform" className={`${styles.tabItem} ${isTabActive('/platform') ? styles.tabActive : ''}`}>
          <Package size={20} />
          <span>Platform</span>
        </Link>
        <Link href="/about" className={`${styles.tabItem} ${isTabActive('/about') ? styles.tabActive : ''}`}>
          <Users size={20} />
          <span>About</span>
        </Link>
      </nav>
    </>
  );
}
