'use client';

import React, { useState } from 'react';
import {
  Globe2,
  MapPin,
  Laptop,
  MonitorSmartphone,
  Smartphone,
  Bot,
  Usb,
  Wifi,
} from 'lucide-react';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import styles from './SystemInfo.module.css';

const osIconMap: Record<string, React.ReactNode> = {
  Windows: <MonitorSmartphone size={16} style={{ color: '#0078D4' }} />,
  macOS: <Laptop size={16} style={{ color: '#A2AAAD' }} />,
  Linux: <Laptop size={16} style={{ color: '#FCC624' }} />,
  iOS: <Smartphone size={16} style={{ color: '#A2AAAD' }} />,
  Android: <Bot size={16} style={{ color: '#3DDC84' }} />,
};

export default function SystemInfo() {
  const { systemInfo, loading } = useSystemInfo();
  const [showDetails, setShowDetails] = useState(false);

  if (loading) {
    return (
      <div className={styles.systemInfo}>
        <div className={styles.loading}>Detecting...</div>
      </div>
    );
  }

  const osIcon = osIconMap[systemInfo.os] ?? <MonitorSmartphone size={16} />;

  return (
    <div
      className={styles.systemInfo}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className={styles.infoItems}>
        {/* Country/Region */}
        <div className={styles.infoItem}>
          <Globe2 size={16} className={styles.icon} />
          <span className={styles.text}>
            {systemInfo.countryCode} • {systemInfo.region}
          </span>
        </div>

        {/* OS Detection */}
        <div className={styles.infoItem}>
          <span className={styles.icon}>{osIcon}</span>
          <span className={styles.text}>
            {systemInfo.os} {systemInfo.osVersion !== 'Unknown' && systemInfo.osVersion}
          </span>
        </div>

        {/* Network/WiFi Indicator (placeholder) */}
        <div className={styles.infoItem}>
          <Wifi size={16} className={styles.icon} />
          <span className={styles.text}>Secure</span>
        </div>

        {/* USB Detector */}
        <div className={styles.infoItem}>
          <Usb
            size={16}
            className={`${styles.icon} ${systemInfo.hasUSB ? styles.usbActive : styles.usbInactive}`}
          />
          <span className={styles.text}>
            USB {systemInfo.usbDevices > 0 ? `(${systemInfo.usbDevices})` : ''}
          </span>
        </div>
      </div>

      {showDetails && (
        <div className={styles.detailsPanel}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Country:</span>
            <span className={styles.value}>{systemInfo.country}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Region:</span>
            <span className={styles.value}>{systemInfo.region}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Operating System:</span>
            <span className={styles.value}>
              {systemInfo.os} {systemInfo.osVersion}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>USB Support:</span>
            <span className={styles.value}>
              {systemInfo.hasUSB
                ? `Yes (${systemInfo.usbDevices} device${systemInfo.usbDevices !== 1 ? 's' : ''})`
                : 'No'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
