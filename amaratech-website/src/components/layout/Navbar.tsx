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
  Brain,
  Settings,
  ShieldAlert,
  Usb,
  Monitor,
  Phone,
  LogIn,
  TicketPlus,
  Sparkles,
  Zap,
  Building2,
  Sun,
  Moon
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
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark theme
  
  // System status states
  const [osInfo, setOsInfo] = useState<{ name: string; icon: 'windows' | 'mac' | 'linux' | 'unknown' }>({ name: 'Detecting...', icon: 'unknown' });

  // Helper to check if tab is active
  const isTabActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  // Detect system info on mount
  useEffect(() => {
    setOsInfo(getOS());
  }, []);

  // Theme toggle handler (for future implementation)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Future: Apply theme to document
    // document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

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
    { name: 'Microsoft Azure', href: '/services/azure', Icon: FaMicrosoft },
    { name: 'Azure Migration Strategy', href: '/services/azure-migration', Icon: Cloud },
    { name: 'Microsoft Office 365', href: '/services/office-365', Icon: FaMicrosoft },
    { name: 'Cloud Solutions', href: '/services/cloud', Icon: Cloud },
    { name: 'Cyber Security', href: '/services/security', Icon: Shield },
    { name: 'E-Governance', href: '/services/e-governance', Icon: Building2 },
    { name: 'Penetration Testing', href: '/services/penetration-testing', Icon: ShieldAlert },
    { name: 'Managed IT Support', href: '/services/managed-it', Icon: Settings },
  ];

  const aboutItems = [
    { name: 'About Us', href: '/about', Icon: Users },
    { name: 'Our Team', href: '/about/team', Icon: Users },
    { name: 'Our Mission', href: '/about/mission', Icon: Shield },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className={styles.topBar}>
        {/* Contact Info & Buttons - Left Side */}
        <div className={styles.topBarLeft}>
          <a href="mailto:info@amaratechit.com" className={styles.topBarContact}>
            <Mail size={14} />
            <span>info@amaratechit.com</span>
          </a>
          <a href="tel:+14108552206" className={styles.topBarContact}>
            <Phone size={14} />
            <span>+1 410 855 2206</span>
          </a>
        </div>

        {/* Sliding Promo Text - Center */}
        <div className={styles.promoContainer}>
          <div className={styles.promoTrack}>
            <div className={styles.promoSlide}>
              <Sparkles size={14} className={styles.promoIcon} />
              <span>Free 2-weeks trial for any of these products:</span>
              <span className={styles.promoHighlight}>Advanced Email Encryption</span>
              <span className={styles.promoDivider}>•</span>
              <span className={styles.promoHighlight}>Cloud 2 Cloud Backup</span>
              <span className={styles.promoTag}>14-day trial standard</span>
              <span className={styles.promoDivider}>•</span>
              <span className={styles.promoHighlight}>DNS Protection</span>
              <Zap size={14} className={styles.promoIcon} />
            </div>
            <div className={styles.promoSlide}>
              <Sparkles size={14} className={styles.promoIcon} />
              <span>Free 2-weeks trial for any of these products:</span>
              <span className={styles.promoHighlight}>Advanced Email Encryption</span>
              <span className={styles.promoDivider}>•</span>
              <span className={styles.promoHighlight}>Cloud 2 Cloud Backup</span>
              <span className={styles.promoTag}>14-day trial standard</span>
              <span className={styles.promoDivider}>•</span>
              <span className={styles.promoHighlight}>DNS Protection</span>
              <Zap size={14} className={styles.promoIcon} />
            </div>
          </div>
        </div>

        {/* Action Buttons - Right Side */}
        <div className={styles.topBarRight}>
          <a href="https://login.amaratechit.com" className={styles.topBarBtn}>
            <LogIn size={14} />
            <span>Employee Login</span>
          </a>
          <a href="https://helpdesk.amaratechit.com" className={styles.topBarBtnPrimary}>
            <TicketPlus size={14} />
            <span>Create a Helpdesk Ticket</span>
          </a>
        </div>
      </div>

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
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className={styles.navItem}
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`${styles.navLink} ${isTabActive('/services') ? styles.active : ''}`}>
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
              href="/services/ai" 
              className={`${styles.navLink} ${isTabActive('/services/ai') ? styles.active : ''}`}
            >
              Artificial Intelligence
            </Link>

            {/* About Us Dropdown */}
            <div 
              className={styles.navItem}
              onMouseEnter={() => setOpenDropdown('about')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`${styles.navLink} ${isTabActive('/about') ? styles.active : ''}`}>
                About Us
                <ChevronDown size={14} className={`${styles.chevron} ${openDropdown === 'about' ? styles.open : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'about' && (
                  <motion.div
                    className={styles.dropdown}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {aboutItems.map((item) => {
                      const ItemIcon = item.Icon;
                      return (
                        <Link key={item.href} href={item.href} className={styles.dropdownItem}>
                          <ItemIcon size={16} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/careers" 
              className={`${styles.navLink} ${isTabActive('/careers') ? styles.active : ''}`}
            >
              Careers
            </Link>

            <Link 
              href="/events" 
              className={`${styles.navLink} ${isTabActive('/events') ? styles.active : ''}`}
            >
              Events
            </Link>

            <Link 
              href="/swag" 
              className={`${styles.navLink} ${isTabActive('/swag') ? styles.active : ''}`}
            >
              Swag
            </Link>

            <Link 
              href="/blog" 
              className={`${styles.navLink} ${isTabActive('/blog') ? styles.active : ''}`}
            >
              Blog
            </Link>

            <Link 
              href="/self-assessment" 
              className={`${styles.navLink} ${isTabActive('/self-assessment') ? styles.active : ''}`}
            >
              Self Assessment
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <a href="https://login.amaratechit.com" className={styles.navActionBtn}>
              <LogIn size={14} />
              <span>Employee Login</span>
            </a>
            <a href="https://helpdesk.amaratechit.com" className={styles.navActionBtnPrimary}>
              <TicketPlus size={14} />
              <span>Create a Helpdesk Ticket</span>
            </a>
            <Link href="/contact" className={styles.ctaButton}>
              Contact Us
            </Link>
            
            {/* Theme Toggle Switch */}
            <button 
              className={styles.themeToggle}
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              <div className={`${styles.toggleTrack} ${isDarkMode ? styles.dark : styles.light}`}>
                <div className={styles.toggleThumb}>
                  {isDarkMode ? <Moon size={12} /> : <Sun size={12} />}
                </div>
              </div>
            </button>
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
              <Link href="/services/ai" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Brain size={20} />
                Artificial Intelligence
              </Link>
              <Link href="/about" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Users size={20} />
                About Us
              </Link>
              <Link href="/careers" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Users size={20} />
                Careers
              </Link>
              <Link href="/events" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Sparkles size={20} />
                Events
              </Link>
              <Link href="/swag" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Package size={20} />
                Swag
              </Link>
              <Link href="/blog" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Layers size={20} />
                Blog
              </Link>
              <Link href="/self-assessment" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Shield size={20} />
                Self Assessment
              </Link>
              <Link href="/contact" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                <Mail size={20} />
                Contact Us
              </Link>
            </nav>
            {/* Mobile Contact & Actions */}
            <div className={styles.mobileActions}>
              <div className={styles.mobileContactRow}>
                <a href="mailto:info@amaratechit.com" className={styles.mobileContactLink}>
                  <Mail size={18} />
                  <span>info@amaratechit.com</span>
                </a>
                <a href="tel:+14108552206" className={styles.mobileContactLink}>
                  <Phone size={18} />
                  <span>+1 410 855 2206</span>
                </a>
              </div>
              <div className={styles.mobileActionBtns}>
                <a href="https://login.amaratechit.com" className={styles.mobileActionBtn} onClick={() => setIsMenuOpen(false)}>
                  <LogIn size={18} />
                  <span>Employee Login</span>
                </a>
                <a href="https://helpdesk.amaratechit.com" className={styles.mobileActionBtnPrimary} onClick={() => setIsMenuOpen(false)}>
                  <TicketPlus size={18} />
                  <span>Create Helpdesk Ticket</span>
                </a>
              </div>
            </div>

            <div className={styles.mobileCta}>
              <Link href="/contact" className={styles.ctaButton} onClick={() => setIsMenuOpen(false)}>
                Contact Us
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
        <Link href="/about" className={`${styles.tabItem} ${isTabActive('/about') ? styles.tabActive : ''}`}>
          <Users size={20} />
          <span>About</span>
        </Link>
        <Link href="/blog" className={`${styles.tabItem} ${isTabActive('/blog') ? styles.tabActive : ''}`}>
          <Layers size={20} />
          <span>Blog</span>
        </Link>
      </nav>
    </>
  );
}
