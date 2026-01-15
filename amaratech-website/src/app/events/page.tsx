'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, MapPin, Clock, Users, ArrowRight, 
  Play, Video, ChevronDown, ChevronUp, Mail,
  Sparkles, Building2, User, ExternalLink
} from 'lucide-react';
import styles from './events.module.css';

type Speaker = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

type PastEvent = {
  id: string;
  title: string;
  date: string;
  image?: string;
};

type FAQ = {
  question: string;
  answer: string;
};

const speakers: Speaker[] = [
  {
    name: 'Yasmin Abdi',
    role: 'Technical Advisor',
    bio: 'Yasmin Abdi stands as a distinguished technical advisor renowned for her expertise in the domains of security, privacy, and data protection. With an illustrious career spanning over seven years.',
    image: '/other_images/events_images/team/Yasmin.png',
  },
  {
    name: 'Deon James',
    role: 'Partner Engineer & Gen AI Ambassador at Google',
    bio: 'Deon James, a Partner Engineer and Gen AI Ambassador at Google Public Sector, promotes the adoption of Cloud and Generative AI technologies by Google Cloud Platform and Google Workspace.',
    image: '/other_images/events_images/team/Deon James.png',
  },
  {
    name: 'Alieu Kamara',
    role: 'Founder & CTO of AmaraTech IT Solutions',
    bio: 'Alieu "Ali" Kamara is the founder and CTO of AmaraTech IT Solutions. Ali has over 15 years of experience in the IT industry, working with both U.S. and international entities. He is an innovative cybersecurity engineer.',
    image: '/other_images/events_images/team/Alieu kamara.png',
  },
];

const webinars = [
  'Copilot For Microsoft 365',
  'Live Training Microsoft 365',
  'Unlock AI Power with Microsoft 365',
  'Microsoft Copilot Training Session',
  'AI-Powered Cybersecurity: Protecting Your Future Today',
];

const previousMeetings = [
  { id: '1', image: '/other_images/events_images/Previous Meetings/m1.png' },
  { id: '2', image: '/other_images/events_images/Previous Meetings/m2.png' },
];

const pastEvents: PastEvent[] = [
  { id: '1', title: 'Maryland Money', date: '15 Sep 2023', image: '/other_images/events_images/maryland.jpeg' },
  { id: '2', title: 'Clark Construction', date: '14 Sep 2023', image: '/other_images/events_images/clack const.jpeg' },
  { id: '3', title: 'XChange / Open Text', date: '20 Aug 2023', image: '/other_images/events_images/xchange.jpeg' },
  { id: '4', title: 'Kaseya + Datto Connect Local event', date: '30 May 2023', image: '/other_images/events_images/kesaya.jpeg' },
  { id: '5', title: 'Fort Meade Alliance President\'s Reception', date: '15 Dec 2022' },
  { id: '6', title: 'Defcon and Black Hat (Defcon 29)', date: '05 Aug 2022' },
  { id: '7', title: 'Ten Anne Arundel County Businesses', date: '22 Apr 2021' },
];

const featuredTopics = [
  'Digital marketing for start-ups and businesses of all sizes',
  'Effective networking for start-ups: How to tell your story without selling',
  'Using AI safely and effectively',
];

const faqs: FAQ[] = [
  {
    question: 'What are the sponsorship opportunities available, and what benefits do they offer?',
    answer: 'Thank you for showing interest in sponsoring AmaraTech IT Solutions\' networking event. We appreciate your support in covering the costs for the venue, food, and other necessities required to make this event a success. The cost to sponsor this event is $100. Sponsors will receive two registrations, brand recognition, and swag. We look forward to collaborating with you to make this event memorable.',
  },
  {
    question: 'Where will the event take place?',
    answer: 'The event is scheduled to take place at Venture X located at 8865 Stanford Blvd, Ste. 202, Columbia, MD 21045.',
  },
  {
    question: 'What is the networking event all about?',
    answer: 'This event is designed to connect you with tech innovators and businesses from various industries. It is perfect for both tech enthusiasts as well as small to mid-sized businesses in healthcare, legal, marketing, non-profit, financial management, or retail. You can expect to learn about the latest technology, the products, and services AmaraTech IT and vendors offer, and how they can help you innovate, protect your assets, and improve your business efficiency.',
  },
  {
    question: 'Is there a cost to attend the event?',
    answer: 'Please check our registration page for the most current pricing and early bird discounts.',
  },
  {
    question: 'Can I participate in the event virtually?',
    answer: 'We want to bring as many great minds as possible together for old-fashioned human interaction to exchange innovative ideas, business cards, and cultivate lasting professional connections. We will keep you in mind for our next virtual event.',
  },
  {
    question: 'Will refreshments be provided at the event?',
    answer: 'Yes, refreshments will be provided at the event for all attendees.',
  },
];

export default function EventsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const speakersRef = useRef<HTMLDivElement>(null);
  const speakersInView = useInView(speakersRef, { once: true, margin: '-100px' });
  const pastRef = useRef<HTMLDivElement>(null);
  const pastInView = useInView(pastRef, { once: true, margin: '-100px' });

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Filter past events with images for the carousel
  const carouselEvents = pastEvents.filter(e => e.image);
  
  // Auto-slide for past events carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselEvents.length);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [carouselEvents.length]);
  
  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to next event (set to a future date)
  useEffect(() => {
    const targetDate = new Date('2025-12-07T10:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgText}>EVENTS</div>
          <div className={styles.heroGrid} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>
              2nd Annual <span className={styles.titleAccent}>Small Business Summit</span>
            </h1>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Calendar size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Date</span>
                  <span className={styles.statValue}>December 7, 2024</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <MapPin size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Location</span>
                  <span className={styles.statValue}>Columbia, MD</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Users size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Speakers</span>
                  <span className={styles.statValue}>Experts in their industries</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className={styles.upcomingSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Upcoming Events</h2>
          </motion.div>

          <div className={styles.upcomingGrid}>
            <motion.div
              className={styles.eventCard}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={styles.eventCardImage}>
                <Image
                  src="/other_images/events_images/Conference is coming to Columbia, M.jpg"
                  alt="Conference in Columbia, MD"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.eventCardContent}>
                <div className={styles.eventDate}>December 7, 2024</div>
                <h3>Conference is coming to Columbia, MD</h3>
                <p className={styles.eventTime}>
                  <Clock size={16} />
                  10am to 1:00pm
                </p>
                <button className={styles.registerButton}>
                  Register Now
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              className={styles.eventCard}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={styles.eventCardImage}>
                <Image
                  src="/other_images/events_images/Register for our Upcoming conference.jpg"
                  alt="Register for conference"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.eventCardContent}>
                <div className={styles.eventDate}>December the 7th</div>
                <h3>Register for our Upcoming conference</h3>
                <p className={styles.eventDescription}>
                  Join industry experts for insights on digital transformation, cybersecurity, and AI adoption.
                </p>
                <button className={styles.registerButton}>
                  Register Now
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Countdown Timer */}
          <motion.div
            className={styles.countdown}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{String(countdown.days).padStart(2, '0')}</span>
              <span className={styles.countdownLabel}>Days</span>
            </div>
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{String(countdown.hours).padStart(2, '0')}</span>
              <span className={styles.countdownLabel}>Hours</span>
            </div>
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{String(countdown.minutes).padStart(2, '0')}</span>
              <span className={styles.countdownLabel}>Minutes</span>
            </div>
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{String(countdown.seconds).padStart(2, '0')}</span>
              <span className={styles.countdownLabel}>Seconds</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Past Events Section */}
      <section ref={pastRef} className={styles.pastSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={pastInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>Previous Events</h2>
          </motion.div>

          {/* Auto-sliding Carousel */}
          <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className={styles.carouselSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {carouselEvents[currentSlide] && (
                    <div className={styles.carouselCard}>
                      <div className={styles.carouselImage}>
                        <Image
                          src={carouselEvents[currentSlide].image!}
                          alt={carouselEvents[currentSlide].title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                          priority
                        />
                        <div className={styles.carouselOverlay} />
                      </div>
                      <div className={styles.carouselContent}>
                        <div className={styles.carouselDate}>
                          <Calendar size={16} />
                          {carouselEvents[currentSlide].date}
                        </div>
                        <h3>{carouselEvents[currentSlide].title}</h3>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Indicators */}
            <div className={styles.carouselIndicators}>
              {carouselEvents.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${currentSlide === index ? styles.activeIndicator : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              className={`${styles.carouselArrow} ${styles.prevArrow}`}
              onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselEvents.length) % carouselEvents.length)}
              aria-label="Previous slide"
            >
              <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button
              className={`${styles.carouselArrow} ${styles.nextArrow}`}
              onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselEvents.length)}
              aria-label="Next slide"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Thumbnail Grid */}
          <div className={styles.pastGrid}>
            {carouselEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`${styles.pastCard} ${currentSlide === index ? styles.activeCard : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={pastInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setCurrentSlide(index)}
              >
                {event.image && (
                  <div className={styles.pastCardImage}>
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                )}
                <div className={styles.pastCardContent}>
                  <div className={styles.pastDate}>{event.date}</div>
                  <h4>{event.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className={styles.webinarsSection}>
        <div className={styles.container}>
          <div className={styles.webinarsTabs}>
            <div className={styles.webinarTab}>
              <Video size={20} />
              Upcoming Webinar
            </div>
            <div className={styles.webinarTab}>
              <Play size={20} />
              Previous Webinar
            </div>
          </div>

          {/* Webinar Marquee */}
          <div className={styles.webinarMarquee}>
            <div className={styles.webinarTrack}>
              {[...webinars, ...webinars].map((webinar, index) => (
                <div key={index} className={styles.webinarItem}>
                  <Play size={16} />
                  <span>{webinar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Previous Meetings Section */}
      <section className={styles.meetingsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Previous Meetings</h2>
          </motion.div>

          <div className={styles.meetingsGrid}>
            {previousMeetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                className={styles.meetingCard}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.meetingImage}>
                  <Image
                    src={meeting.image}
                    alt={`Previous meeting ${meeting.id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section ref={speakersRef} className={styles.speakersSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={speakersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>Meet the Speakers</h2>
            <p className={styles.sectionSubtitle}>MEET THE LEADERS OF TOMORROW&apos;S GLOBAL TECH LANDSCAPE</p>
          </motion.div>

          <div className={styles.speakersGrid}>
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.name}
                className={styles.speakerCard}
                initial={{ opacity: 0, y: 30 }}
                animate={speakersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.speakerImageWrapper}>
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="150px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3>{speaker.name}</h3>
                <p className={styles.speakerRole}>{speaker.role}</p>
                <p className={styles.speakerBio}>{speaker.bio}</p>
              </motion.div>
            ))}
          </div>

          <div className={styles.speakerCta}>
            <button className={styles.speakerFormButton}>
              Complete the Speaker Form
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Topics Section */}
      <section className={styles.topicsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={speakersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>Featured Topics</h2>
          </motion.div>

          <div className={styles.topicsGrid}>
            {featuredTopics.map((topic, index) => (
              <motion.div
                key={index}
                className={styles.topicCard}
                initial={{ opacity: 0, x: -20 }}
                animate={speakersInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Sparkles size={20} className={styles.topicIcon} />
                <span>{topic}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>FAQs for Sponsors and Exhibitors</h2>
            <p>AmaraTech IT Fall Networking Event</p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterCard}>
            <h2>Get AmaraTech Event Updates</h2>
            {subscribed ? (
              <p className={styles.successText}>Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.signupButton}>
                  Sign up
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
