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
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // System status states
  const [osInfo, setOsInfo] = useState<{ name: string; icon: 'windows' | 'mac' | 'linux' | 'unknown' }>({ name: 'Detecting...', icon: 'unknown' });

  const isDarkMode = theme === 'dark';

  // Helper to check if tab is active
  const isTabActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  // Detect system info on mount
  useEffect(() => {
    setOsInfo(getOS());
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
              src={theme === 'light' ? "/logo/Login Logo (140x60 px) light mode.png" : "/logo/AmaraTech IT Logo (new) - dark bg.png"}
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

      {/* Mobile Menu - Apple-style Micro Window */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.menuBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Floating Menu Window */}
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.8
              }}
            >
              {/* Window Header */}
              <div className={styles.menuWindowHeader}>
                <div className={styles.menuWindowDots}>
                  <span className={styles.dotRed} onClick={() => setIsMenuOpen(false)} />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <span className={styles.menuWindowTitle}>Navigation</span>
                <button className={styles.menuCloseBtn} onClick={() => setIsMenuOpen(false)}>
                  <X size={14} />
                </button>
              </div>

              {/* Menu Content */}
              <div className={styles.menuWindowContent}>
                <nav className={styles.mobileNav}>
                  <Link href="/" className={`${styles.mobileLink} ${isTabActive('/') && pathname === '/' ? styles.mobileLinkActive : ''}`} onClick={() => setIsMenuOpen(false)}>
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                  <Link href="/services" className={`${styles.mobileLink} ${isTabActive('/services') ? styles.mobileLinkActive : ''}`} onClick={() => setIsMenuOpen(false)}>
                    <Layers size={18} />
                    <span>Services</span>
                  </Link>
                  <Link href="/services/ai" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                    <Brain size={18} />
                    <span>AI Solutions</span>
                  </Link>
                  <Link href="/about" className={`${styles.mobileLink} ${isTabActive('/about') ? styles.mobileLinkActive : ''}`} onClick={() => setIsMenuOpen(false)}>
                    <Users size={18} />
                    <span>About Us</span>
                  </Link>
                  
                  <div className={styles.menuDivider} />
                  
                  <Link href="/careers" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                    <Users size={18} />
                    <span>Careers</span>
                  </Link>
                  <Link href="/events" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                    <Sparkles size={18} />
                    <span>Events</span>
                  </Link>
                  <Link href="/swag" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                    <Package size={18} />
                    <span>Swag</span>
                  </Link>
                  <Link href="/blog" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                    <Layers size={18} />
                    <span>Blog</span>
                  </Link>
                  <Link href="/self-assessment" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                    <Shield size={18} />
                    <span>Self Assessment</span>
                  </Link>
                </nav>

                <div className={styles.menuDivider} />

                {/* Quick Actions */}
                <div className={styles.menuQuickActions}>
                  <a href="tel:+14108552206" className={styles.menuQuickAction}>
                    <Phone size={16} />
                    <span>Call Us</span>
                  </a>
                  <a href="mailto:info@amaratechit.com" className={styles.menuQuickAction}>
                    <Mail size={16} />
                    <span>Email</span>
                  </a>
                  <button 
                    className={styles.menuQuickAction}
                    onClick={toggleTheme}
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    <span>{isDarkMode ? 'Light' : 'Dark'}</span>
                  </button>
                </div>

                {/* CTA Button */}
                <Link href="/contact" className={styles.menuCtaButton} onClick={() => setIsMenuOpen(false)}>
                  <Mail size={16} />
                  <span>Contact Us</span>
                </Link>
              </div>
            </motion.div>
          </>
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
        <button 
          className={styles.tabItem}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
      </nav>
    </>
  );
}
