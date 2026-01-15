'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Shield, Users, Globe, Award, Target, Briefcase,
  CheckCircle, ArrowRight, Zap, MapPin, Calendar,
  Building2, TrendingUp, Heart, Download, FileText,
  Linkedin, Twitter, Github, Facebook, Mail, Phone,
  Handshake, BookOpen, Lightbulb, GraduationCap, Network,
  ExternalLink
} from 'lucide-react';
import styles from './about.module.css';

const collaborativeJourney = [
  {
    title: 'Dedicated to Customer Service Excellence',
    desc: 'We are committed to fostering and nurturing strategic partnerships with our valued customers and industry peers.',
    icon: Heart,
  },
  {
    title: 'Outcome-Driven Approach',
    desc: 'Our passionate team places unwavering emphasis on delivering exceptional results and measurable outcomes.',
    icon: Target,
  },
  {
    title: 'Proactively Engage',
    desc: 'We provide comprehensive customer training programs supplemented by systematic follow-ups and refresher training.',
    icon: Zap,
  },
  {
    title: 'Fostering Cooperation',
    desc: 'We build lasting relationships based on trust, transparency, and mutual success across all partnerships.',
    icon: Handshake,
  },
];

const boardMembers = [
  {
    name: 'Mike Major',
    role: 'Board Member',
    image: '/other_images/aboutus/Mike.png',
    bio: 'Mike has a strong educational background from the University of Maryland Eastern Shore and has accumulated 10 years of professional experience in technology. He is an experienced technical professional with a background in Technical and Production Support, Managed Services, DevOps, and Senior Azure Infrastructure Engineering. At AmaraTech IT, he supports Azure cloud offerings to enhance client productivity and implementation. Mike is the President of All Liberian Network, a non-profit organization that creates opportunities for disadvantaged members of his community.',
  },
  {
    name: 'Morris Jones',
    role: 'Board Member',
    image: '/other_images/aboutus/Morris-Jones.png.jpg',
    bio: 'Morris Jones is an MBA graduate of the George Washington University School of Business. He brings with him a 40 year career in business operations/portfolio management, wireless systems engineering and core infrastructure networking. He has led and supported Cybersecurity initiatives, cloud and hybrid hosting solutions at the US House of Representatives, Health And Human Services (HHS), and the World Bank Group (IBRD, IDA, IFC, MIGA, ICSID).',
  },
];

const executiveTeam = [
  {
    name: 'Alieu Kamara',
    role: 'Chief Technology Officer',
    image: '/other_images/aboutus/ali-karama.png',
    socials: ['linkedin', 'facebook', 'twitter', 'github'],
  },
  {
    name: 'Christy Williams',
    role: 'VP Operations & Strategic Relationships',
    image: '/other_images/aboutus/Christy Williams.png',
    socials: ['linkedin', 'facebook', 'twitter'],
  },
];

const diasporaStrategies = [
  {
    title: 'African Diaspora as Assets',
    desc: 'See Africans in the diaspora as one of Africa\'s greatest offshore assets due to its ability to bring financial resources and skills back to their home communities.',
    icon: Globe,
  },
  {
    title: 'Education and Outreach',
    desc: 'Comprehensive programs designed to educate and connect diaspora members with opportunities in their home countries.',
    icon: GraduationCap,
  },
  {
    title: 'Economic Empowerment',
    desc: 'Creating pathways for economic growth and investment opportunities that benefit both diaspora and local communities.',
    icon: TrendingUp,
  },
  {
    title: 'Digital Inclusion',
    desc: 'Leveraging technology to bridge gaps and create inclusive digital ecosystems across borders.',
    icon: Network,
  },
  {
    title: 'Holistic Approach',
    desc: 'Using a holistic and integrated approach, involving practical steps to create an ecosystem where both diaspora members and entrepreneurs can benefit.',
    icon: Lightbulb,
  },
  {
    title: 'Action-Oriented Approach',
    desc: 'Moving beyond theory to implement tangible solutions that drive real impact in communities.',
    icon: Target,
  },
];

const certifications = [
  'CISSP', 'CISM', 'CEH', 'Azure Solutions Architect', 
  'AWS Certified', 'ISO 27001 Lead Auditor', 'CMMC Assessor'
];

export default function About() {
  return (
    <div className={styles.page}>
      {/* Background Elements */}
      <div className={styles.gridBg} />
      <div className={styles.glowOrb} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className={styles.breadcrumbLink}>HOME</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>ABOUT</span>
          </motion.div>

          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroNumber}>01</div>
            <div className={styles.heroTitleBlock}>
              <h1 className={styles.heroTitle}>
                ABOUT <span className={styles.titleAccent}>US</span>
              </h1>
              <div className={styles.heroRule} />
              <p className={styles.heroDescription}>
                We believe that technology should be a driver of growth — not a source of risk. 
                Our mission is to empower organizations with secure, reliable, and future-ready 
                IT solutions that protect critical assets, ensure compliance, and enable innovation.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>YEARS EXPERTISE</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>4</span>
              <span className={styles.statLabel}>INDUSTRIES</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>SUPPORT</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>02</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>OUR MISSION</h2>
              <span className={styles.sectionMeta}>WHO WE ARE</span>
            </div>
          </div>

          <div className={styles.missionGrid}>
            <motion.div 
              className={styles.missionContent}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className={styles.missionLead}>
                We Collaborate with top Industry Experts
              </p>
              <p className={styles.missionText}>
                AmaraTech IT Solutions is driven by a fervent commitment to offer entrepreneurs 
                and organizations worldwide access to remarkably effective and efficient solutions 
                meticulously crafted to address their unique needs.
              </p>
              <p className={styles.missionText}>
                Rooted in pioneering IT business strategies and cutting-edge technologies, 
                AmaraTech is a forward-looking service with a business-oriented focus. Our 
                extensive array of offerings encompasses technology consultancy, Cybersecurity 
                services and data migration. We cater to clients spanning diverse industries, 
                harnessing technology to amplify outcomes.
              </p>

              <div className={styles.missionHighlights}>
                <div className={styles.highlightItem}>
                  <CheckCircle size={18} />
                  <span>15+ years of combined IT and security expertise</span>
                </div>
                <div className={styles.highlightItem}>
                  <CheckCircle size={18} />
                  <span>Proven track record with healthcare, finance, government, and education</span>
                </div>
                <div className={styles.highlightItem}>
                  <CheckCircle size={18} />
                  <span>Trusted partner for cybersecurity, compliance, and digital transformation</span>
                </div>
              </div>

              <p className={styles.missionQuote}>
                &ldquo;We don&apos;t just secure your systems — we help secure your future.&rdquo;
              </p>
            </motion.div>

            <motion.div 
              className={styles.missionImage}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image
                src="/other_images/aboutus/about-dir-1-min.png"
                alt="AmaraTech Team"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.missionImageOverlay} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaborative Journey Section */}
      <section className={styles.collaborativeSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>03</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>OUR COLLABORATIVE JOURNEY</h2>
              <span className={styles.sectionMeta}>DELIVERING HIGH-QUALITY SOLUTIONS</span>
            </div>
          </div>

          <div className={styles.journeyGrid}>
            {collaborativeJourney.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.journeyCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.journeyIndex}>{String(index + 1).padStart(2, '0')}</div>
                  <div className={styles.journeyIcon}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className={styles.journeyTitle}>{item.title}</h3>
                  <p className={styles.journeyDesc}>{item.desc}</p>
                  <div className={styles.journeyLine} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contract Vehicles Section */}
      <section className={styles.contractSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>04</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>CONTRACT VEHICLES</h2>
              <span className={styles.sectionMeta}>VERIFIED PARTNERSHIPS</span>
            </div>
          </div>

          <div className={styles.contractGrid}>
            <motion.div 
              className={styles.contractContent}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className={styles.contractLead}>
                Unlock Your Business Potential with AmaraTech IT
              </p>
              <p className={styles.contractText}>
                Verified by American Contract Vehicles. Elevate your operations with our 
                cutting-edge IT solutions and trusted expertise. Maximize efficiency and 
                security today!
              </p>
              <p className={styles.contractText}>
                What sets us apart? Our prestigious status as a verified vendor with American 
                Contract Vehicles, ensuring our clients that they are partnering with a reliable 
                and trustworthy IT provider. This esteemed certification reflects our adherence 
                to stringent quality standards and the highest levels of professional integrity.
              </p>

              <div className={styles.contractActions}>
                <a href="#" className={styles.contractBtn}>
                  <Download size={16} />
                  <span>Download Capability Statement</span>
                </a>
                <a href="#" className={styles.contractBtnSecondary}>
                  <FileText size={16} />
                  <span>Download Certification</span>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className={styles.contractBadge}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src="/other_images/aboutus/naics.png"
                alt="NAICS Certification"
                width={200}
                height={200}
                style={{ objectFit: 'contain' }}
              />
              <div className={styles.badgeGlow} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className={styles.boardSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>05</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>BOARD MEMBERS</h2>
              <span className={styles.sectionMeta}>LEADERSHIP TEAM</span>
            </div>
          </div>

          <div className={styles.boardGrid}>
            {boardMembers.map((member, index) => (
              <motion.div
                key={index}
                className={styles.boardCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className={styles.boardImageWrapper}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.boardImageOverlay} />
                </div>
                <div className={styles.boardInfo}>
                  <div className={styles.boardMeta}>
                    <span className={styles.boardIndex}>[{String(index + 1).padStart(2, '0')}]</span>
                    <span className={styles.boardRole}>{member.role}</span>
                  </div>
                  <h3 className={styles.boardName}>{member.name}</h3>
                  <p className={styles.boardBio}>{member.bio}</p>
                </div>
                <div className={styles.boardAccent} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>06</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>EXECUTIVE TEAM</h2>
              <span className={styles.sectionMeta}>MEET OUR LEADERSHIP</span>
            </div>
          </div>

          <div className={styles.teamGrid}>
            {executiveTeam.map((member, index) => (
              <motion.div
                key={index}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className={styles.teamImageWrapper}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.teamImageGradient} />
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <span className={styles.teamRole}>{member.role}</span>
                  <div className={styles.teamSocials}>
                    {member.socials.includes('linkedin') && (
                      <a href="#" className={styles.socialLink}><Linkedin size={16} /></a>
                    )}
                    {member.socials.includes('facebook') && (
                      <a href="#" className={styles.socialLink}><Facebook size={16} /></a>
                    )}
                    {member.socials.includes('twitter') && (
                      <a href="#" className={styles.socialLink}><Twitter size={16} /></a>
                    )}
                    {member.socials.includes('github') && (
                      <a href="#" className={styles.socialLink}><Github size={16} /></a>
                    )}
                  </div>
                </div>
                <div className={styles.teamCornerTL} />
                <div className={styles.teamCornerBR} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora Engagement Section */}
      <section className={styles.diasporaSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>07</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>DIASPORA ENGAGEMENT</h2>
              <span className={styles.sectionMeta}>BRIDGING COMMUNITIES</span>
            </div>
          </div>

          <motion.div 
            className={styles.diasporaIntro}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p>
              At AmaraTech IT we aim to promote a Diaspora engagement that would serve as a 
              liaison between the African community, people of African descent to provide 
              opportunities and resources effectively meet the technological needs and concerns 
              of the Africans living and/or working in the United States and on the African Continent.
            </p>
            <p>
              We have begun this work in Liberia and will expand to countries across the continent. 
              We partner with other organizations such as All Liberian Network and African Diaspora 
              Affairs of Anne Arundel County to create a platform that promotes technological solutions 
              aimed at gaining competitive advantage for businesses and governments in Africa and 
              diaspora engagement activities.
            </p>
          </motion.div>

          <div className={styles.diasporaGrid}>
            {diasporaStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.diasporaCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className={styles.diasporaIcon}>
                    <IconComponent size={22} />
                  </div>
                  <h4 className={styles.diasporaTitle}>{strategy.title}</h4>
                  <p className={styles.diasporaDesc}>{strategy.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IT Mentorship Section */}
      <section className={styles.mentorshipSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>08</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>IT MENTORSHIP PROGRAM</h2>
              <span className={styles.sectionMeta}>EMPOWERING THE NEXT GENERATION</span>
            </div>
          </div>

          <div className={styles.mentorshipGrid}>
            <motion.div 
              className={styles.mentorshipContent}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className={styles.mentorshipLead}>
                Fostering Connections & Facilitating Growth
              </p>
              <p className={styles.mentorshipText}>
                Our mission is simple – to foster connections and facilitate growth within the 
                IT community. We are a community-driven enterprise firmly rooted in the incredible 
                power of peer-to-peer mentorship, and we are committed to investing the time and 
                effort required to educate, advocate, and inspire.
              </p>
              <p className={styles.mentorshipText}>
                We strive to eliminate any obstacles that may hinder our mission and are devoted 
                to promoting a culture of inclusivity, collaboration, and innovation.
              </p>

              <div className={styles.mentorshipCta}>
                <Link href="/contact" className={styles.mentorshipBtn}>
                  <Mail size={16} />
                  <span>Get in Touch</span>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className={styles.mentorshipImage}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image
                src="/other_images/aboutus/it-mentoring-1.png"
                alt="IT Mentorship Program"
                fill
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className={styles.certsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>09</div>
            <div className={styles.sectionTitleBlock}>
              <h2 className={styles.sectionTitle}>CERTIFICATIONS & EXPERTISE</h2>
              <span className={styles.sectionMeta}>VERIFIED CREDENTIALS</span>
            </div>
          </div>

          <div className={styles.certsGrid}>
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className={styles.certBadge}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <CheckCircle size={16} />
                <span>{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.ctaGlow} />
            <div className={styles.ctaNumber}>10</div>
            <div className={styles.ctaContent}>
              <h2>Ready to Partner with Us?</h2>
              <p>
                Let&apos;s discuss how AmaraTech can help secure and transform your IT infrastructure.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className={styles.ctaButton}>
                  <Zap size={16} />
                  <span>Contact Us</span>
                </Link>
                <Link href="/services" className={styles.ctaButtonSecondary}>
                  <span>View Services</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Strip */}
      <div className={styles.footerStrip}>
        <span>AMARATECH IT SOLUTIONS</span>
        <span className={styles.footerDot} />
        <span>ABOUT</span>
        <span className={styles.footerDot} />
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
